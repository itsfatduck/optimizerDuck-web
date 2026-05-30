<script setup>
import { ref, onMounted, computed, nextTick, watch } from "vue";
import MarkdownIt from "markdown-it";
import { useGitHub } from "../../composables/useGitHub";
import Icon from "../Icon.vue";

const props = defineProps({
  repo: {
    type: String,
    required: true,
  },
});

const {
  releases,
  loadingChangelog: loading,
  errorChangelog: error,
  hasMore,
  loadingMore,
  fetchChangelog,
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

  const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = mdImgRegex.exec(body)) !== null) {
    if (!isBadgeUrl(match[1])) {
      imageUrl = match[1];
      break;
    }
  }

  if (!imageUrl) {
    const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*\/?>/gi;
    while ((match = htmlImgRegex.exec(body)) !== null) {
      if (!isBadgeImg(match[0])) {
        imageUrl = match[1];
        break;
      }
    }
  }

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

const renderedCache = new Map();

const parseMentions = (html) => {
  let inSkipTag = 0;
  const parts = html.split(/(<\/?[a-z0-9]+[^>]*>)/gi);
  const processed = parts.map((part, index) => {
    if (index % 2 === 0) {
      if (inSkipTag > 0) return part;
      return part.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})\b/gi, '<a href="https://github.com/$1" target="_blank" rel="noopener noreferrer" class="mention">@$1</a>');
    } else {
      const tagName = part.match(/^<\/?([a-z0-9]+)/i)?.[1]?.toLowerCase();
      if (tagName === 'a' || tagName === 'code' || tagName === 'pre') {
        if (part.startsWith('</')) {
          inSkipTag = Math.max(0, inSkipTag - 1);
        } else {
          inSkipTag++;
        }
      }
      return part;
    }
  });
  return processed.join('');
};

const renderMD = (content, id) => {
  if (!content) return "";
  if (renderedCache.has(id)) return renderedCache.get(id);
  let html = md.render(content);
  html = html.replace(
    /<img([^>]*?)src=["']([^"']+?)["']([^>]*?)>/gi,
    (match, p1, src, p2) => {
      let attrs = ` ${p1} ${p2} `;
      if (!attrs.includes("loading=")) attrs += 'loading="lazy" ';
      if (!attrs.includes("decoding=")) attrs += 'decoding="async" ';
      return `<img src="${src}" ${attrs}>`;
    },
  );
  html = parseMentions(html);
  renderedCache.set(id, html);
  return html;
};

const handleLoadMore = async () => {
  await loadMoreReleases();
  await nextTick();
  updateVitePressTOC();
};

const updateVitePressTOC = () => {
  if (typeof window === "undefined") return;

  const headings = document.querySelectorAll(".github-changelog h2");
  if (!headings.length) return;

  let tocContainer = document.querySelector(".VPDocAsideOutline");
  if (!tocContainer) {
    const asideContainer = document.querySelector(".aside-container") || document.querySelector(".aside-content");
    if (!asideContainer) return;

    tocContainer = document.createElement("div");
    tocContainer.className = "VPDocAsideOutline";
    tocContainer.innerHTML = `
      <div class="content">
        <div class="outline-title" role="heading" aria-level="2">On this page</div>
        <div class="outline-marker"></div>
        <nav aria-labelledby="doc-outline-aria-label">
          <span id="doc-outline-aria-label" class="visually-hidden">Table of Contents</span>
          <ul class="outline-links"></ul>
        </nav>
      </div>
    `;
    asideContainer.appendChild(tocContainer);
  }

  const outlineList = tocContainer.querySelector(".outline-links");
  if (!outlineList) return;

  outlineList.innerHTML = "";

  headings.forEach((heading) => {
    const id = heading.id;
    if (!id) return;

    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = heading.textContent.trim();
    link.className = "outline-link";

    const listItem = document.createElement("li");
    listItem.className = "outline-item";
    listItem.appendChild(link);

    outlineList.appendChild(listItem);
  });
};

watch(releases, async () => {
  await nextTick();
  updateVitePressTOC();
});

onMounted(() => {
  fetchChangelog();
});

const toggleRelease = (id) => {
  if (expandedReleases.value.has(id)) {
    expandedReleases.value.delete(id);
  } else {
    expandedReleases.value.add(id);
  }
};

const isExpanded = (id) => expandedReleases.value.has(id);

const getReleaseDownloads = (release) => {
  if (!release?.assets?.length) return 0;
  return release.assets.reduce(
    (total, asset) => total + (asset.download_count || 0),
    0,
  );
};

const formatDownloads = (count) => {
  return new Intl.NumberFormat().format(count || 0);
};
</script>

<template>
  <div class="gh-changelog" v-if="releases && releases.length > 0">
    <div
      v-for="release in processedReleases"
      :key="release.id"
      class="gh-cl-item"
    >
      <div class="gh-cl-item__header">
        <div class="gh-cl-item__left">
          <h2 :id="release.tag_name" class="gh-cl-item__title">
            <a
              :href="release.html_url"
              target="_blank"
              rel="noopener"
              class="gh-cl-item__link"
            >
              {{ release.name || release.tag_name }}
            </a>
          </h2>
          <span v-if="release.isLatest" class="gh-tag gh-tag--latest">Latest</span>
          <span v-if="release.prerelease" class="gh-tag gh-tag--pre">Pre</span>
        </div>
        <div class="gh-cl-item__meta">
          <span class="gh-cl-meta-item">
            <Icon name="calendar" type="regular" :size="12" />
            {{ new Date(release.published_at).toLocaleDateString() }}
          </span>
          <span class="gh-cl-meta-sep" />
          <span class="gh-cl-meta-item">
            <Icon name="arrow-down" type="solid" :size="11" />
            {{ formatDownloads(getReleaseDownloads(release)) }}
          </span>
        </div>
      </div>

      <div class="gh-cl-item__body">
        <template v-if="!isExpanded(release.id)">
          <div class="gh-cl-preview" @click="toggleRelease(release.id)">
            <div v-if="release.preview.hasImage" class="gh-cl-preview__img-wrap">
              <img
                :src="release.preview.imageUrl"
                class="gh-cl-preview__img"
                alt="Release Preview"
                loading="lazy"
              />
            </div>
            <div v-if="release.preview.snippet" class="gh-cl-preview__content">
              <p class="gh-cl-preview__text">{{ release.preview.snippet }}</p>
              <span class="gh-cl-preview__hint">
                <Icon name="chevron-down" type="solid" :size="11" />
                Expand
              </span>
            </div>
          </div>
        </template>
        <div
          v-else
          class="gh-cl-expanded vp-doc"
          v-html="renderMD(release.body || '', release.id)"
        />
      </div>

      <button
        v-if="isExpanded(release.id)"
        class="gh-cl-collapse"
        @click="toggleRelease(release.id)"
      >
        <Icon name="chevron-up" type="solid" :size="12" />
        <span>Show less</span>
      </button>
    </div>

    <div v-if="hasMore" class="gh-cl-load-more">
      <button
        class="gh-cl-load-btn"
        :disabled="loadingMore"
        @click="handleLoadMore"
      >
        <template v-if="loadingMore">
          <Icon name="spinner" type="solid" :size="13" />
          <span>Loading...</span>
        </template>
        <template v-else>
          <Icon name="plus" type="solid" :size="13" />
          <span>Load more releases</span>
        </template>
      </button>
    </div>
  </div>
  <div v-else-if="loading || (!releases.length && !error)" class="gh-cl-loading">
    <Icon name="spinner" type="solid" :size="16" />
    Loading changelog...
  </div>
  <div v-else-if="error" class="gh-cl-error">{{ error }}</div>
</template>

<style scoped>
/* ── Changelog Container ── */
.gh-changelog {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ── Release Item ── */
.gh-cl-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 300px;
}

.gh-cl-item__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 0.5rem 0.75rem;
}

.gh-cl-item__left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  min-width: 0;
}

.gh-cl-item__title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
  word-break: break-word;
}

.gh-cl-item__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s;
}

.gh-cl-item__link:hover {
  color: var(--vp-c-brand-1);
}

/* ── Tags ── */
.gh-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 4px;
  line-height: 1.3;
  margin-top: 0.1rem;
}

.gh-tag--latest {
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
}

.gh-tag--pre {
  background: color-mix(in srgb, var(--vp-c-warning-1) 12%, transparent);
  color: var(--vp-c-warning-1);
}

/* ── Meta ── */
.gh-cl-item__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  flex-wrap: nowrap;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.gh-cl-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  white-space: nowrap;
}

.gh-cl-meta-sep {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  flex-shrink: 0;
}

/* ── Preview Card ── */
.gh-cl-preview {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.gh-cl-preview:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.gh-cl-preview__img-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--vp-c-bg-mute);
  position: relative;
  min-height: 100px;
}

.gh-cl-preview__img {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.gh-cl-preview:hover .gh-cl-preview__img {
  transform: scale(1.015);
}

.gh-cl-preview__content {
  padding: 1rem 1.15rem;
}

.gh-cl-preview__text {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.88rem;
}

.gh-cl-preview__hint {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: color 0.15s;
}

.gh-cl-preview:hover .gh-cl-preview__hint {
  color: var(--vp-c-brand-1);
}

/* ── Expanded Body ── */
.gh-cl-expanded {
  overflow: hidden;
}

.gh-cl-expanded :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 1rem 0;
  background: var(--vp-c-bg-mute);
  min-height: 60px;
  transform: translateZ(0);
}

.gh-cl-expanded :deep(.mention) {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  transition: background 0.15s;
}

.gh-cl-expanded :deep(.mention:hover) {
  background: color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}

.gh-cl-expanded :deep(h1),
.gh-cl-expanded :deep(h2),
.gh-cl-expanded :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border: none;
}

.gh-cl-expanded :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
}

/* ── Collapse Button ── */
.gh-cl-collapse {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.75rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.gh-cl-collapse:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-3);
}

/* ── Load More ── */
.gh-cl-load-more {
  text-align: center;
  padding: 1.5rem 0 0.5rem;
}

.gh-cl-load-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.5rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;
}

.gh-cl-load-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.gh-cl-load-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Loading / Error ── */
.gh-cl-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
}

.gh-cl-error {
  padding: 1.5rem;
  text-align: center;
  color: var(--vp-c-danger-1);
  font-size: 0.88rem;
}

@media (max-width: 640px) {
  .gh-cl-item__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .gh-cl-item__meta {
    justify-content: flex-start;
  }
}
</style>
