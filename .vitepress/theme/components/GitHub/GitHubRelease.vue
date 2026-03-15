<script>
import { ref } from "vue";
// Global state to persist expanded status during session (resets on refresh)
const expandedRepos = ref(new Set());
</script>

<script setup>
import { computed, onMounted, nextTick, watch, onUnmounted } from "vue";
import MarkdownIt from "markdown-it";
import { useGitHub } from "../../composables/useGitHub";

const props = defineProps({
  repo: {
    type: String,
    required: true,
  },
});

const isExpanded = computed({
  get: () => expandedRepos.value.has(props.repo),
  set: (val) => {
    if (val) expandedRepos.value.add(props.repo);
    else expandedRepos.value.delete(props.repo);
  },
});

const isLong = ref(false);
const contentWrapper = ref(null);
let resizeObserver = null;

// Download dialog state
const showDialog = ref(false);
const selectedAsset = ref(null);

const {
  latestRelease: release,
  loading,
  error,
  fetchReleases,
} = useGitHub(props.repo);

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const checkHeight = () => {
  if (contentWrapper.value) {
    isLong.value = contentWrapper.value.scrollHeight > 280;
  }
};

// Watch for content changes to re-check height
watch(() => release.value, async () => {
  await nextTick();
  checkHeight();
});

onMounted(async () => {
  await fetchReleases();
  await nextTick();
  checkHeight();

  // Robust height detection for dynamic content (images, etc)
  if (typeof ResizeObserver !== "undefined" && contentWrapper.value) {
    resizeObserver = new ResizeObserver(checkHeight);
    resizeObserver.observe(contentWrapper.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

const renderedBody = computed(() => {
  if (!release.value?.body) return "";
  let html = md.render(release.value.body);
  // Optimize images: use proxy for WebP conversion, resize, and lazy load
  return html.replace(
    /<img([^>]*?)src=["']([^"']+?)["']([^>]*?)>/gi,
    (match, p1, src, p2) => {
      let optimizedSrc = src;
      if (src.startsWith('http')) {
        const isBadge = src.match(/shields\.io|badge|badgen\.net|sonarcloud\.io|\.svg(\?|$)/i);
        if (!isBadge) {
          optimizedSrc = `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=1000&output=webp&we`;
        }
      }
      let attrs = ` ${p1} ${p2} `;
      if (!attrs.includes('loading=')) attrs += 'loading="lazy" ';
      if (!attrs.includes('decoding=')) attrs += 'decoding="async" ';
      return `<img src="${optimizedSrc}" ${attrs}>`;
    }
  );
});

const formatSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDownloads = (count) => {
  return new Intl.NumberFormat().format(count || 0);
};

const totalDownloads = computed(() => {
  if (!release.value?.assets?.length) return 0;
  return release.value.assets.reduce(
    (total, asset) => total + (asset.download_count || 0),
    0,
  );
});

const handleDownload = (asset) => {
  selectedAsset.value = asset;
  showDialog.value = true;
  // Trigger the actual download
  const a = document.createElement('a');
  a.href = asset.browser_download_url;
  a.download = asset.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const closeDialog = () => {
  showDialog.value = false;
  selectedAsset.value = null;
};
</script>

<template>
  <div class="github-release" v-if="!loading && !error && release">
    <div class="release-info">
      <h3>Latest Version: {{ release.tag_name }}</h3>
      <div class="release-meta">
        <p class="release-date">
          Published on:
          {{ new Date(release.published_at).toLocaleDateString() }}
        </p>
        <span class="meta-divider">•</span>
        <p class="release-downloads">
          Downloads: {{ formatDownloads(totalDownloads) }}
        </p>
        <span class="meta-divider">•</span>
        <a :href="release.html_url" target="_blank" rel="noopener" class="github-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
          </svg>
          View Release on GitHub
        </a>
      </div>

      <div v-for="asset in release.assets" :key="asset.id" class="download-card">
        <button class="download-button" @click="handleDownload(asset)">
          <span class="download-icon-wrap" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>

          <span class="download-copy">
            <span class="download-title">Download {{ asset.name }}</span>
            <span class="download-meta">
              <span class="file-size">{{ formatSize(asset.size) }}</span>
              <span class="asset-downloads">{{ formatDownloads(asset.download_count) }} downloads</span>
            </span>
          </span>

          <span class="download-arrow" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <div v-if="release.body" class="release-body" :class="{ 'is-expanded': isExpanded, 'is-long': isLong }">
      <h4>Release Notes</h4>
      <div class="release-body-wrapper" ref="contentWrapper">
        <div class="release-body-content vp-doc" v-html="renderedBody" />
        <div v-if="isLong && !isExpanded" class="fade-overlay" @click="isExpanded = true">
          <button class="expand-trigger">
            Click to expand
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
      <button v-if="isLong && isExpanded" class="collapse-btn" @click="isExpanded = false">
        <span class="icon">↑</span>
        Show less
      </button>
    </div>
  </div>

  <!-- Skeleton Loader -->
  <div v-else-if="loading" class="github-release skeleton-container">
    <div class="skeleton-header">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-date"></div>
      <div class="skeleton-line skeleton-btn"></div>
    </div>
    <div class="skeleton-body">
      <div class="skeleton-line" style="width: 100%"></div>
      <div class="skeleton-line" style="width: 85%"></div>
      <div class="skeleton-line" style="width: 70%"></div>
      <div class="skeleton-line" style="width: 90%"></div>
    </div>
  </div>

  <div v-else class="error">Error: {{ error }}</div>

  <!-- Download Dialog -->
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="showDialog" class="dialog-backdrop" @click.self="closeDialog">
        <div class="dialog-container">
          <!-- Close button -->
          <button class="dialog-close" @click="closeDialog" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Header -->
          <div class="dialog-header">
            <div class="dialog-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3 class="dialog-title">Thank you for downloading optimizerDuck</h3>
            <p class="dialog-description">
              Click <a v-if="selectedAsset" :href="selectedAsset.browser_download_url" class="manual-link">here</a> if
              your download hasn't started.
            </p>
          </div>

          <!-- Divider -->
          <div class="dialog-divider"></div>

          <!-- Actions -->
          <div class="dialog-actions">
            <a href="/docs/guides/getting-started" class="action-card" @click="closeDialog">
              <div class="action-icon">
                <!-- Book / Docs icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="13" y2="11" />
                </svg>
              </div>
              <div class="action-text">
                <span class="action-title">Read the Documentation</span>
                <span class="action-desc">Learn how to set up and use optimizerDuck</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="action-arrow">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            <a href="https://discord.gg/tDUBDCYw9Q" target="_blank" rel="noopener" class="action-card">
              <div class="action-icon discord">
                <!-- Discord icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8733.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                </svg>
              </div>
              <div class="action-text">
                <span class="action-title">Join our Discord</span>
                <span class="action-desc">Get help, share feedback, and connect with the community</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="action-arrow">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>

          <!-- Troubleshooting link -->
          <a href="/docs/faq/troubleshooting" class="dialog-help-link" @click="closeDialog">
            Having issues downloading or opening optimizerDuck?
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.github-release {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  content-visibility: auto;
  contain-intrinsic-size: 0 400px;
}

h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-1);
}

.release-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.release-date {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.release-downloads {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.meta-divider {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--vp-c-brand-1);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}

.github-link:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.download-card {
  margin-top: 1rem;
}

.download-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.95rem 1rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.dark .download-button {
  background: var(--vp-c-bg-elv);
}

.download-button:hover {
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 24px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.download-icon-wrap {
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.download-copy {
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.28rem;
}

.download-title {
  display: block;
  min-width: 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.35;
  word-break: break-word;
}

.download-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.download-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

.file-size {
  font-weight: 600;
  font-size: 0.92em;
}

.asset-downloads {
  font-weight: 600;
  font-size: 0.92em;
}

.release-body {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.release-body h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
}

.release-body-wrapper {
  position: relative;
  max-height: 280px;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.is-long.is-expanded .release-body-wrapper {
  max-height: none;
}

.release-body:not(.is-long) .release-body-wrapper {
  max-height: none;
}

/* Performance: isolate layout recalculations to the release body */
.release-body-content {
  contain: content;
}

.fade-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(transparent, var(--vp-c-bg-soft) 80%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.5rem;
  cursor: pointer;
}

.expand-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  cursor: pointer;
}

.expand-trigger:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
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

/* Image performance optimizations */
.release-body-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  /* GPU-accelerated rendering */
  transform: translateZ(0);
  /* Prevent layout shifts while images load */
  background: var(--vp-c-bg-mute);
  min-height: 60px;
  /* Smooth fade-in when loaded */
  opacity: 1;
  transition: opacity 0.3s ease;
  content-visibility: auto;
}

.release-body-content :deep(h1),
.release-body-content :deep(h2),
.release-body-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border: none;
}

.release-body-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.error {
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-danger-1);
}

/* === Skeleton Loader === */
.skeleton-container {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.skeleton-line {
  height: 14px;
  border-radius: 6px;
  background: var(--vp-c-bg-mute);
}

.skeleton-title {
  width: 50%;
  height: 22px;
}

.skeleton-date {
  width: 35%;
  height: 14px;
}

.skeleton-btn {
  width: 240px;
  height: 44px;
  border-radius: 8px;
  margin-top: 0.25rem;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ===== Download Dialog ===== */
.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 1rem;
}

.dialog-container {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.dialog-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.dialog-header {
  text-align: center;
}

.dialog-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft), color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent));
  color: var(--vp-c-brand-1);
  margin-bottom: 1.25rem;
  animation: pulse-download 2s ease-in-out infinite;
}

@keyframes pulse-download {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.dialog-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem;
}

.dialog-description {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.manual-link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
  transition: color 0.2s;
}

.manual-link:hover {
  color: var(--vp-c-brand-2);
}

.dialog-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 1.5rem 0;
}

.dialog-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
}

.action-card:hover {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 5%, var(--vp-c-bg-soft));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.action-icon.discord {
  background: color-mix(in srgb, #5865F2 12%, transparent);
  color: #5865F2;
}

.action-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
}

.action-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.action-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.action-arrow {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  transition: transform 0.2s;
}

.action-card:hover .action-arrow {
  transform: translateX(2px);
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .download-button {
    align-items: flex-start;
  }

  .download-title {
    font-size: 0.96rem;
  }

  .download-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }
}

.dialog-help-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 1.25rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.2s;
}

.dialog-help-link:hover {
  color: var(--vp-c-brand-1);
}

.dialog-help-link svg {
  transition: transform 0.2s;
}

.dialog-help-link:hover svg {
  transform: translateX(3px);
}

/* Dialog transition */
.dialog-enter-active {
  transition: opacity 0.25s ease;
}

.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-container {
  animation: dialog-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-leave-active .dialog-container {
  animation: dialog-out 0.2s ease forwards;
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes dialog-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}
</style>
