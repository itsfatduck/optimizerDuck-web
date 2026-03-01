<script setup>
import { ref, onMounted, computed } from "vue";
import MarkdownIt from "markdown-it";
import { useGitHub } from "../../composables/useGitHub";

const props = defineProps({
  repo: {
    type: String,
    required: true,
  },
});

const {
  releases,
  loading,
  error,
  hasMore,
  loadingMore,
  fetchReleases,
  loadMoreReleases,
} = useGitHub(props.repo);

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const expandedReleases = ref(new Set());

const isBadgeUrl = (url) => {
  if (!url) return true;
  const badgePatterns = [
    /shields\.io/i,
    /badge/i,
    /img\.shields/i,
    /badgen\.net/i,
    /forthebadge/i,
    /\.svg(\?|$)/i,
  ];
  return badgePatterns.some((p) => p.test(url));
};

const isBadgeImg = (tag) => {
  const widthMatch = tag.match(/width=["']?(\d+)/i);
  const heightMatch = tag.match(/height=["']?(\d+)/i);
  if (widthMatch && heightMatch) {
    const w = parseInt(widthMatch[1]);
    const h = parseInt(heightMatch[1]);
    if (h < 80 || (w > 0 && h > 0 && w / h > 5)) return true;
  }
  const srcMatch = tag.match(/src=["']([^"']+)["']/i);
  if (srcMatch) return isBadgeUrl(srcMatch[1]);
  return false;
};

const getReleasePreview = (body) => {
  if (!body) return { hasImage: false, imageUrl: null, snippet: "" };

  let imageUrl = null;

  // Try markdown images first, filtering badges
  const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = mdImgRegex.exec(body)) !== null) {
    if (!isBadgeUrl(match[1])) {
      imageUrl = match[1];
      break;
    }
  }

  // Try HTML <img> tags, filtering badges
  if (!imageUrl) {
    const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*\/?>/gi;
    while ((match = htmlImgRegex.exec(body)) !== null) {
      if (!isBadgeImg(match[0])) {
        imageUrl = match[1];
        break;
      }
    }
  }

  // Build snippet text
  let snippet = body
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/<img[^>]*\/?>/gi, "")
    .replace(/^#+ .*/gm, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .trim();

  const firstSentenceMatch = snippet.match(/.*?[.!?](?:\s|$)/);
  if (firstSentenceMatch) {
    snippet = firstSentenceMatch[0].trim();
  } else {
    snippet = snippet.split("\n")[0].trim();
    if (snippet.length > 200) snippet = snippet.substring(0, 200) + "...";
  }

  return { hasImage: !!imageUrl, imageUrl, snippet };
};

const processedReleases = computed(() => {
  return releases.value.map((release, index) => ({
    ...release,
    preview: getReleasePreview(release.body),
    isLatest: index === 0,
  }));
});

// Cache rendered markdown per release ID
const renderedCache = new Map();

const renderMD = (content, id) => {
  if (!content) return "";
  if (renderedCache.has(id)) return renderedCache.get(id);
  let html = md.render(content);
  // Add lazy loading to all images
  html = html.replace(/<img /g, '<img loading="lazy" ');
  renderedCache.set(id, html);
  return html;
};

const handleLoadMore = async () => {
  await loadMoreReleases();
};

onMounted(() => {
  fetchReleases();
});

const toggleRelease = (id) => {
  if (expandedReleases.value.has(id)) {
    expandedReleases.value.delete(id);
  } else {
    expandedReleases.value.add(id);
  }
};

const isExpanded = (id) => expandedReleases.value.has(id);
</script>

<template>
  <div class="github-changelog" v-if="!loading && !error">
    <div v-for="release in processedReleases" :key="release.id" class="changelog-item">
      <div class="changelog-header">
        <div class="header-left">
          <h2 :id="release.tag_name">
            <a :href="release.html_url" target="_blank" rel="noopener" class="release-title-link">
              {{ release.name || release.tag_name }}
            </a>
          </h2>
          <span v-if="release.isLatest" class="tag tag-latest">Latest</span>
          <span v-if="release.prerelease" class="tag tag-unstable">Unstable</span>
        </div>
        <span class="date">
          {{ new Date(release.published_at).toLocaleDateString() }}
        </span>
      </div>

      <div class="changelog-body-wrapper">
        <template v-if="!isExpanded(release.id)">
          <div class="release-preview" @click="toggleRelease(release.id)">
            <div v-if="release.preview.hasImage" class="preview-image-container">
              <img :src="release.preview.imageUrl" class="preview-image" alt="Release Preview" loading="lazy" />
            </div>
            <div v-if="release.preview.snippet" class="preview-content">
              <p class="preview-snippet">{{ release.preview.snippet }}</p>
            </div>
          </div>
        </template>
        <div v-else class="changelog-body vp-doc" v-html="renderMD(release.body || '', release.id)" />
      </div>

      <button v-if="isExpanded(release.id)" class="collapse-btn" @click="toggleRelease(release.id)">
        <span class="icon">↑</span>
        Show less
      </button>
    </div>

    <div v-if="hasMore" class="load-more-wrapper">
      <button class="load-more-btn" :disabled="loadingMore" @click="handleLoadMore">
        {{ loadingMore ? "Loading..." : "Load more releases" }}
      </button>
    </div>
  </div>
  <div v-else-if="loading" class="loading">Loading changelog...</div>
  <div v-else class="error">Error: {{ error }}</div>
</template>

<style scoped>
.changelog-item {
  margin-bottom: 2.5rem;
}

.changelog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  min-width: 0;
}

h2 {
  margin: 0;
}

.release-title-link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.release-title-link:hover {
  text-decoration-color: var(--vp-c-brand-1);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 4px;
  white-space: nowrap;
  line-height: 1.4;
}

.tag-latest {
  background: color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
  color: var(--vp-c-brand-1);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
}

.tag-unstable {
  background: color-mix(in srgb, var(--vp-c-warning-1) 15%, transparent);
  color: var(--vp-c-warning-1);
  border: 1px solid color-mix(in srgb, var(--vp-c-warning-1) 30%, transparent);
}

.date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  white-space: nowrap;
}

.changelog-body-wrapper {
  position: relative;
}

.release-preview {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.release-preview:hover {
  border-color: var(--vp-c-brand-1);
}

.preview-image-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.release-preview:hover .preview-image {
  transform: scale(1.02);
}

.preview-content {
  padding: 1.25rem;
}

.preview-snippet {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.95rem;
}

.changelog-body {
  overflow: hidden;
}

.changelog-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.changelog-body :deep(h1),
.changelog-body :deep(h2),
.changelog-body :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border: none;
}

.changelog-body :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.collapse-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.collapse-btn .icon {
  font-size: 1rem;
  transition: transform 0.25s ease;
}

.collapse-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.collapse-btn:hover .icon {
  transform: translateY(-2px);
}

.load-more-wrapper {
  text-align: center;
  padding: 1rem 0;
}

.load-more-btn {
  padding: 0.6rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.load-more-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger-1);
}
</style>
