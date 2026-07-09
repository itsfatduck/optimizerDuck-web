<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  repo: {
    type: String,
    default: "itsfatduck/optimizerDuck",
  },
});

const CACHE_KEY = `github-contributors-${props.repo}`;
const CACHE_TTL = 10 * 60 * 1000;
const isClient = typeof window !== "undefined";

const contributors = ref([]);
const loading = ref(true);
const error = ref(null);
const visibleCount = ref(15);

const visibleContributors = computed(() =>
  contributors.value.slice(0, visibleCount.value),
);

const hasMore = computed(() => visibleCount.value < contributors.value.length);

function loadMore() {
  visibleCount.value += 15;
}

function getCachedData() {
  if (!isClient) return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
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

onMounted(async () => {
  const cached = getCachedData();
  if (cached) {
    contributors.value = cached.contributors;
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${props.repo}/contributors`,
    );
    if (!res.ok) {
      if (res.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      }
      throw new Error("Failed to fetch contributors");
    }
    const data = await res.json();
    contributors.value = data.filter(
      (c) => c.type === "User" && !c.login.toLowerCase().includes("bot"),
    );

    if (isClient) {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            contributors: contributors.value,
            timestamp: Date.now(),
          }),
        );
      } catch {}
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const formatContributions = (count) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
};
</script>

<template>
  <div v-if="loading" class="cl-loading">
    <svg class="cl-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    Loading contributors...
  </div>
  <div v-else-if="error" class="cl-error">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    {{ error }}
  </div>
  <div v-else>
    <div class="cl-grid">
      <a
        v-for="contributor in visibleContributors"
        :key="contributor.id"
        :href="contributor.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="cl-card"
      >
        <div class="cl-avatar">
          <img
            :src="contributor.avatar_url"
            :alt="contributor.login"
            class="cl-avatar__img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="cl-info">
          <span class="cl-name">{{ contributor.login }}</span>
          <span class="cl-commits">{{ formatContributions(contributor.contributions) }} commits</span>
        </div>
      </a>
    </div>
    <button v-if="hasMore" class="cl-load-more" @click="loadMore">
      Load more ({{ contributors.length - visibleCount }} remaining)
    </button>
  </div>
</template>

<style scoped>
.cl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.cl-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  color: inherit !important;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0);
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

.cl-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  transform: translateY(-2px) translateZ(0);
}

.cl-avatar {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
  outline: 2px solid var(--vp-c-divider);
  outline-offset: -1px;
  transition: outline-color 0.2s;
}

.cl-card:hover .cl-avatar {
  outline-color: var(--vp-c-brand-1);
}

.cl-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cl-info {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.cl-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.cl-commits {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  line-height: 1.2;
}

.cl-loading,
.cl-error {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cl-spinner {
  animation: cl-spin 1s linear infinite;
}

.cl-load-more {
  display: block;
  margin: 1rem auto 0;
  padding: 0.55rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.cl-load-more:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

@keyframes cl-spin {
  to { transform: rotate(360deg); }
}
</style>
