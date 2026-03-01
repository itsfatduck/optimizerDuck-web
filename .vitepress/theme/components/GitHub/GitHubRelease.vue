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
  html = html.replace(/<img /g, '<img loading="lazy" ');
  return html;
});

const formatSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

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
      <p class="release-date">
        Published on:
        {{ new Date(release.published_at).toLocaleDateString() }}
      </p>

      <div v-for="asset in release.assets" :key="asset.id" class="download-card">
        <button class="download-button" @click="handleDownload(asset)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download {{ asset.name }}
          <span class="file-size">({{ formatSize(asset.size) }})</span>
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
  <div v-else-if="loading" class="loading">Fetching latest release...</div>
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
            <a href="/docs/documentation/getting-started" class="action-card" @click="closeDialog">
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
}

h3 {
  margin-top: 0;
  color: var(--vp-c-brand-1);
}

.release-date {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.download-card {
  margin-top: 1rem;
}

.download-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--vp-c-brand-3);
  color: var(--vp-c-black);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.dark .download-button {
  background-color: var(--vp-c-brand-1);
}

.download-button:hover {
  background-color: var(--vp-c-brand-2);
  color: var(--vp-c-black);
}

.file-size {
  font-weight: 400;
  font-size: 0.9em;
  opacity: 0.9;
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
  transition: max-height 0.3s ease;
}

.is-long.is-expanded .release-body-wrapper {
  max-height: none;
}

.release-body:not(.is-long) .release-body-wrapper {
  max-height: none;
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

.release-body-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
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

.loading,
.error {
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger-1);
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
