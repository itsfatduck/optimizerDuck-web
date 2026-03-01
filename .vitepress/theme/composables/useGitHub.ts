import { ref } from "vue";

const CACHE_KEY = "github-release-cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const PER_PAGE = 5;
const isClient = typeof window !== "undefined";

function getCachedData() {
  if (!isClient) return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Check TTL
    if (data.timestamp && Date.now() - data.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    try { localStorage.removeItem(CACHE_KEY); } catch {}
    return null;
  }
}

const cached = getCachedData();
const latestRelease = ref<any>(cached?.latest || null);
const releases = ref<any[]>(cached?.all || []);
const loading = ref(false);
const error = ref<string | null>(null);
const fetchPromise = ref<Promise<void> | null>(null);
const currentPage = ref(1);
const hasMore = ref(true);
const loadingMore = ref(false);

export function useGitHub(repo: string = "itsfatduck/optimizerDuck") {
  const fetchReleases = () => {
    if (fetchPromise.value) return fetchPromise.value;

    // If we have fresh cached data, skip fetch
    if (latestRelease.value && releases.value.length > 0) {
      return Promise.resolve();
    }

    loading.value = true;
    fetchPromise.value = Promise.all([
      fetch(`https://api.github.com/repos/${repo}/releases/latest`).then(
        (res) => {
          if (!res.ok) throw new Error("Failed to fetch latest release");
          return res.json();
        },
      ),
      fetch(
        `https://api.github.com/repos/${repo}/releases?per_page=${PER_PAGE}&page=1`,
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch changelog");
        return res.json();
      }),
    ])
      .then(([latest, all]) => {
        latestRelease.value = latest;
        releases.value = all as any[];
        hasMore.value = (all as any[]).length >= PER_PAGE;
        currentPage.value = 1;
        error.value = null;

        if (isClient) {
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                latest,
                all: releases.value,
                timestamp: Date.now(),
              }),
            );
          } catch {}
        }
      })
      .catch((err) => {
        error.value = err.message;
      })
      .finally(() => {
        loading.value = false;
      });

    return fetchPromise.value;
  };

  const loadMoreReleases = async () => {
    if (loadingMore.value || !hasMore.value) return;

    loadingMore.value = true;
    const nextPage = currentPage.value + 1;

    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/releases?per_page=${PER_PAGE}&page=${nextPage}`,
      );
      if (!res.ok) throw new Error("Failed to fetch more releases");

      const more = (await res.json()) as any[];
      releases.value = [...releases.value, ...more];
      currentPage.value = nextPage;
      hasMore.value = more.length >= PER_PAGE;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loadingMore.value = false;
    }
  };

  return {
    latestRelease,
    releases,
    loading,
    error,
    hasMore,
    loadingMore,
    fetchReleases,
    loadMoreReleases,
  };
}
