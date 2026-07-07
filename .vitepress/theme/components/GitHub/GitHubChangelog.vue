<script setup>
import { ref, onMounted, computed, nextTick, watch } from "vue";
import { useGitHub } from "../../composables/useGitHub";
import { createGitHubMD } from "../../utils/markdown";
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

const renderMD = createGitHubMD(props.repo);

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
    .replace(/\[([^\]]*?)\]\(([^)]+)\)/g, '$1 → $2')
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/https?:\/\/\S+/g, (m) => m.length > 50 ? m.slice(0, 47) + '...' : m)
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

const handleLoadMore = async () => {
  await loadMoreReleases();
  await nextTick();
  updateVitePressTOC();
};

const updateVitePressTOC = () => {
  if (typeof window === "undefined") return;

  const headings = document.querySelectorAll(".github-changelog h2");
  if (!headings.length) return;

  const asideContainer = document.querySelector(".aside-container") || document.querySelector(".aside-content");
  if (!asideContainer) return;

  // Hide VitePress's native outline — it only sees static h2, not our dynamic ones
  const vpOutline = asideContainer.querySelector(".VPDocAsideOutline");
  if (vpOutline) vpOutline.style.display = "none";

  // Create our own TOC that Vue won't manage/overwrite
  let ghToc = asideContainer.querySelector(".gh-toc");
  if (!ghToc) {
    ghToc = document.createElement("div");
    ghToc.className = "gh-toc";
    asideContainer.prepend(ghToc);
  }

  let html = `<div class="content">
    <div class="outline-title" role="heading" aria-level="2">On this page</div>
    <div class="outline-marker"></div>
    <nav aria-labelledby="doc-outline-aria-label">
      <span id="doc-outline-aria-label" class="visually-hidden">Table of Contents</span>
      <ul class="outline-links">`;

  headings.forEach((heading) => {
    const id = heading.id;
    if (!id) return;
    const text = heading.textContent?.trim() || "";
    html += `<li class="outline-item"><a href="#${id}" class="outline-link">${text}</a></li>`;
  });

  html += `</ul></nav></div>`;
  ghToc.innerHTML = html;

  // Activate link on hash change / scroll
  const links = ghToc.querySelectorAll(".outline-link");
  const onHashChange = () => {
    const hash = window.location.hash;
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === hash);
    });
  };
  window.addEventListener("hashchange", onHashChange, { once: true });
  onHashChange();
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

const showDialog = ref(false);
const selectedAsset = ref(null);

const handleDownload = (asset) => {
  selectedAsset.value = asset;
  showDialog.value = true;
  const a = document.createElement("a");
  a.href = asset.browser_download_url;
  a.download = asset.name;
  document.body.appendChild(a);
  try {
    a.click();
  } finally {
    document.body.removeChild(a);
  }
};

const closeDialog = () => {
  showDialog.value = false;
  selectedAsset.value = null;
};

const formatSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
          <div class="gh-cl-item__tags">
            <span v-if="release.isLatest" class="gh-tag gh-tag--latest">Latest</span>
            <span v-if="release.prerelease" class="gh-tag gh-tag--pre">Pre</span>
          </div>
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
        <div v-else class="gh-cl-expanded-wrap">
          <div class="gh-cl-expanded-card">
            <div
              class="gh-cl-expanded vp-doc"
              v-html="renderMD(release.body || '', release.id)"
            />

            <!-- Assets -->
            <div v-if="release.assets?.length" class="gh-cl-assets">
              <div class="gh-cl-assets__title">
                <Icon name="download" type="solid" :size="14" />
                Downloads
              </div>
              <button
                v-for="asset in release.assets"
                :key="asset.id"
                class="gh-cl-asset"
                @click="handleDownload(asset)"
              >
                <div class="gh-cl-asset__icon">
                  <Icon name="download" type="solid" :size="16" />
                </div>
                <div class="gh-cl-asset__info">
                  <span class="gh-cl-asset__name">{{ asset.name }}</span>
                  <span class="gh-cl-asset__meta">
                    {{ formatSize(asset.size) }} &middot; {{ formatDownloads(asset.download_count) }} downloads
                  </span>
                </div>
                <svg class="gh-cl-asset__arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 7h10v10" />
                  <path d="M7 17L17 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
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

  <!-- Download Dialog -->
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="showDialog" class="gh-dialog-backdrop" @click.self="closeDialog">
        <div class="gh-dialog">
          <button class="gh-dialog__close" @click="closeDialog" aria-label="Close">
            <Icon name="xmark" type="solid" :size="16" />
          </button>

          <div class="gh-dialog__body">
            <div class="gh-dialog__icon">
              <Icon name="download" type="solid" :size="28" />
            </div>
            <h3 class="gh-dialog__title">Thank you for downloading</h3>
            <p class="gh-dialog__desc">
              Click
              <a v-if="selectedAsset" :href="selectedAsset.browser_download_url" class="gh-dialog__link">here</a>
              if your download hasn't started.
            </p>
          </div>

          <div class="gh-dialog__divider" />

          <div class="gh-dialog__actions">
            <a href="/docs/guides/getting-started" class="gh-action" @click="closeDialog">
              <div class="gh-action__icon">
                <Icon name="book" type="solid" :size="18" />
              </div>
              <div class="gh-action__text">
                <span class="gh-action__title">Documentation</span>
                <span class="gh-action__desc">Learn how to get started</span>
              </div>
              <Icon name="chevron-right" type="solid" :size="14" class="gh-action__arrow" />
            </a>

            <a href="https://discord.gg/tDUBDCYw9Q" target="_blank" rel="noopener" class="gh-action" @click="closeDialog">
              <div class="gh-action__icon gh-action__icon--discord">
                <Icon name="discord" type="brands" :size="18" />
              </div>
              <div class="gh-action__text">
                <span class="gh-action__title">Discord</span>
                <span class="gh-action__desc">Join the community</span>
              </div>
              <Icon name="chevron-right" type="solid" :size="14" class="gh-action__arrow" />
            </a>
          </div>

          <a href="/docs/faq/troubleshooting" class="gh-dialog__help" @click="closeDialog">
            Having issues?
            <Icon name="chevron-right" type="solid" :size="10" />
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
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
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
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
.gh-cl-item__tags {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

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
  overflow: hidden;
  background: var(--vp-c-bg-mute);
}

.gh-cl-preview__img {
  display: block;
  width: 100%;
  max-height: 400px;
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
.gh-cl-expanded-wrap {
  margin-top: 0.5rem;
}

.gh-cl-expanded-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
  overflow: hidden;
}

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

.gh-cl-expanded :deep(.mention),
.gh-cl-expanded :deep(.issue-ref) {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  transition: background 0.15s;
}

.gh-cl-expanded :deep(.mention:hover),
.gh-cl-expanded :deep(.issue-ref:hover) {
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

/* ── Assets Section ── */
.gh-cl-assets {
  margin-top: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.gh-cl-assets__title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
}

.gh-cl-asset {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  text-decoration: none;
  transition: background 0.15s;
  border-bottom: 1px solid var(--vp-c-divider);
  width: 100%;
  text-align: left;
  font: inherit;
  color: inherit;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
}

.gh-cl-asset:last-child {
  border-bottom: none;
}

.gh-cl-asset:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, transparent);
}

.gh-cl-asset__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
}

.gh-cl-asset__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.gh-cl-asset__name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.gh-cl-asset__meta {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.gh-cl-asset__arrow {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: color 0.15s, transform 0.15s;
}

.gh-cl-asset:hover .gh-cl-asset__arrow {
  color: var(--vp-c-brand-1);
  transform: translate(2px, -2px);
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

/* ── Dialog ── */
.gh-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-backdrop-bg-color, rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem;
}

.gh-dialog {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--vp-shadow-4);
}

.gh-dialog__close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.gh-dialog__close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.gh-dialog__body {
  text-align: center;
}

.gh-dialog__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

.gh-dialog__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
}

.gh-dialog__desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.gh-dialog__link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}

.gh-dialog__link:hover {
  color: var(--vp-c-brand-2);
}

.gh-dialog__divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 1.25rem 0;
}

.gh-dialog__actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gh-action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  cursor: pointer;
}

.gh-action:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.gh-action__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.gh-action__icon--discord {
  background: color-mix(in srgb, #5865f2 10%, transparent);
  color: #5865f2;
}

.gh-action__text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 0;
}

.gh-action__title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.gh-action__desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.gh-action__arrow {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  transition: transform 0.15s, color 0.15s;
}

.gh-action:hover .gh-action__arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(2px);
}

.gh-dialog__help {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 1rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.15s;
}

.gh-dialog__help:hover {
  color: var(--vp-c-brand-1);
}

/* ── Dialog Transitions ── */
.dialog-enter-active { transition: opacity 0.2s ease; }
.dialog-leave-active { transition: opacity 0.15s ease; }
.dialog-enter-from,
.dialog-leave-to { opacity: 0; }

.dialog-enter-active .gh-dialog {
  animation: dialog-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dialog-leave-active .gh-dialog {
  animation: dialog-out 0.15s ease forwards;
}

@keyframes dialog-in {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes dialog-out {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.96) translateY(8px); }
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

<!-- Custom TOC styles — injected outside scoped, so added globally in style.css -->
<style>
/* ── Custom TOC (gh-toc) ── */
.gh-toc .outline-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0 0 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.gh-toc .outline-marker {
  position: absolute;
  top: 33px;
  left: -1px;
  width: 2px;
  height: 18px;
  background: var(--vp-c-brand-1);
  opacity: 0;
  transition: top 0.25s ease, opacity 0.25s ease;
}

.gh-toc .visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

.gh-toc .outline-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.gh-toc .outline-item {
  margin: 0;
}

.gh-toc .outline-link {
  display: block;
  padding: 0.2rem 0 0.2rem 13px;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-left: 1px solid var(--vp-c-divider);
  transition: color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gh-toc .outline-link:hover,
.gh-toc .outline-link.active {
  color: var(--vp-c-brand-1);
}
</style>
