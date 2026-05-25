import { ref, computed } from "vue";

const CACHE_KEY_LATEST = "github-latest-release-cache";
const CACHE_KEY_CHANGELOG = "github-changelog-cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache
const PER_PAGE = 5;
const isClient = typeof window !== "undefined";

function getCachedItem(key: string) {
  if (!isClient) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.timestamp && Date.now() - data.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {}
    return null;
  }
}

function setCachedItem(key: string, value: any) {
  if (!isClient) return;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        timestamp: Date.now(),
      })
    );
  } catch {}
}

const latestRelease = ref<any>(getCachedItem(CACHE_KEY_LATEST));
const releases = ref<any[]>(getCachedItem(CACHE_KEY_CHANGELOG) || []);

const loadingLatest = ref(false);
const loadingChangelog = ref(false);
const errorLatest = ref<string | null>(null);
const errorChangelog = ref<string | null>(null);

const fetchLatestPromise = ref<Promise<void> | null>(null);
const fetchChangelogPromise = ref<Promise<void> | null>(null);

const currentPage = ref(1);
const hasMore = ref(true);
const loadingMore = ref(false);

export function useGitHub(repo: string = "itsfatduck/optimizerDuck") {
  
  const fetchLatestRelease = () => {
    // If we have cached data, resolve immediately
    if (latestRelease.value) {
      return Promise.resolve();
    }
    if (fetchLatestPromise.value) return fetchLatestPromise.value;

    loadingLatest.value = true;
    errorLatest.value = null;

    fetchLatestPromise.value = fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          }
          throw new Error("Failed to fetch latest release");
        }
        return res.json();
      })
      .then((data) => {
        latestRelease.value = data;
        setCachedItem(CACHE_KEY_LATEST, data);
        errorLatest.value = null;
      })
      .catch((err) => {
        errorLatest.value = err.message;
      })
      .finally(() => {
        loadingLatest.value = false;
        fetchLatestPromise.value = null;
      });

    return fetchLatestPromise.value;
  };

  const fetchChangelog = () => {
    // If we have cached data, resolve immediately
    if (releases.value.length > 0) {
      return Promise.resolve();
    }
    if (fetchChangelogPromise.value) return fetchChangelogPromise.value;

    loadingChangelog.value = true;
    errorChangelog.value = null;

    fetchChangelogPromise.value = fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=${PER_PAGE}&page=1`
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          }
          throw new Error("Failed to fetch changelog");
        }
        return res.json();
      })
      .then((data) => {
        releases.value = data as any[];
        setCachedItem(CACHE_KEY_CHANGELOG, data);
        hasMore.value = data.length >= PER_PAGE;
        currentPage.value = 1;
        errorChangelog.value = null;

        // Intelligent Cross-Caching: If latestRelease is not cached, populate it using the first release in the array
        if (data.length > 0 && !latestRelease.value) {
          latestRelease.value = data[0];
          setCachedItem(CACHE_KEY_LATEST, data[0]);
        }
      })
      .catch((err) => {
        errorChangelog.value = err.message;
      })
      .finally(() => {
        loadingChangelog.value = false;
        fetchChangelogPromise.value = null;
      });

    return fetchChangelogPromise.value;
  };

  const loadMoreReleases = async () => {
    if (loadingMore.value || !hasMore.value) return;

    loadingMore.value = true;
    const nextPage = currentPage.value + 1;

    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/releases?per_page=${PER_PAGE}&page=${nextPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch more releases");

      const more = (await res.json()) as any[];
      releases.value = [...releases.value, ...more];
      currentPage.value = nextPage;
      hasMore.value = more.length >= PER_PAGE;
    } catch (err: any) {
      errorChangelog.value = err.message;
    } finally {
      loadingMore.value = false;
    }
  };

  const fetchReleases = async () => {
    const promises: Promise<any>[] = [];
    if (!latestRelease.value) promises.push(fetchLatestRelease());
    if (releases.value.length === 0) promises.push(fetchChangelog());
    await Promise.all(promises);
  };

  return {
    latestRelease,
    releases,
    loading: computed(() => loadingLatest.value || loadingChangelog.value),
    error: computed(() => errorLatest.value || errorChangelog.value),
    loadingLatest,
    loadingChangelog,
    errorLatest,
    errorChangelog,
    hasMore,
    loadingMore,
    fetchLatestRelease,
    fetchChangelog,
    fetchReleases,
    loadMoreReleases,
  };
}
