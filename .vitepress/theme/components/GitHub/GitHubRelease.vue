<script>
import { ref } from "vue";
const expandedRepos = ref(new Set());
</script>

<script setup>
import { computed, onMounted, nextTick, watch, onUnmounted } from "vue";
import { useGitHub } from "../../composables/useGitHub";
import { createGitHubMD } from "../../utils/markdown";
import Icon from "../Icon.vue";

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

const showDialog = ref(false);
const selectedAsset = ref(null);

const {
  latestRelease: release,
  loadingLatest: loading,
  errorLatest: error,
  fetchLatestRelease,
} = useGitHub(props.repo);

const renderMD = createGitHubMD(props.repo);

const checkHeight = () => {
  if (contentWrapper.value) {
    isLong.value = contentWrapper.value.scrollHeight > 280;
  }
};

watch(
  () => release.value,
  async () => {
    await nextTick();
    checkHeight();
  },
);

onMounted(async () => {
  await fetchLatestRelease();
  await nextTick();
  checkHeight();

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
  return renderMD(release.value.body, "latest-release");
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
</script>

<template>
  <div class="gh-release" v-if="release">
    <div class="gh-release__header">
      <div class="gh-release__title-row">
        <h3 class="gh-release__title">{{ release.name || release.tag_name }}</h3>
        <span v-if="release.prerelease" class="gh-tag gh-tag--pre">Pre-release</span>
      </div>
      <div class="gh-release__meta">
        <span class="gh-meta-item">
          <Icon name="calendar" type="regular" :size="13" />
          {{ new Date(release.published_at).toLocaleDateString() }}
        </span>
        <span class="gh-meta-sep" />
        <span class="gh-meta-item">
          <Icon name="arrow-down" type="solid" :size="12" />
          {{ formatDownloads(totalDownloads) }}
        </span>
        <span class="gh-meta-sep" />
        <a
          :href="release.html_url"
          target="_blank"
          rel="noopener"
          class="gh-meta-link"
        >
          <Icon name="github" type="brands" :size="14" />
          <span>GitHub</span>
          <Icon name="arrow-up-right-from-square" type="solid" :size="10" />
        </a>
      </div>
    </div>

    <div class="gh-release__assets" v-if="release.assets?.length">
      <button
        v-for="asset in release.assets"
        :key="asset.id"
        class="gh-asset"
        @click="handleDownload(asset)"
      >
        <div class="gh-asset__icon">
          <Icon name="download" type="solid" :size="18" />
        </div>
        <div class="gh-asset__info">
          <span class="gh-asset__name">{{ asset.name }}</span>
          <span class="gh-asset__meta">
            {{ formatSize(asset.size) }} &middot; {{ formatDownloads(asset.download_count) }} downloads
          </span>
        </div>
        <Icon name="chevron-right" type="solid" :size="14" class="gh-asset__arrow" />
      </button>
    </div>

    <div
      v-if="release.body"
      class="gh-release__notes"
      :class="{ 'is-expanded': isExpanded, 'is-long': isLong }"
    >
      <div class="gh-notes__label">
        <Icon name="file-lines" type="regular" :size="14" />
        Release Notes
      </div>
      <div class="gh-notes__wrapper" ref="contentWrapper">
        <div class="gh-notes__content vp-doc" v-html="renderedBody" />
        <div
          v-if="isLong && !isExpanded"
          class="gh-notes__fade"
          @click="isExpanded = true"
        >
          <button class="gh-notes__expand">
            <span>Show more</span>
            <Icon name="chevron-down" type="solid" :size="12" />
          </button>
        </div>
      </div>
      <button
        v-if="isLong && isExpanded"
        class="gh-notes__collapse"
        @click="isExpanded = false"
      >
        <Icon name="chevron-up" type="solid" :size="12" />
        <span>Show less</span>
      </button>
    </div>
  </div>

  <!-- Skeleton -->
  <div v-else-if="loading || (!release && !error)" class="gh-release gh-release--skeleton">
    <div class="gh-skel">
      <div class="gh-skel__title" />
      <div class="gh-skel__meta" />
      <div class="gh-skel__asset" />
    </div>
  </div>

  <div v-else-if="error" class="gh-error">{{ error }}</div>

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

            <a href="https://discord.gg/tDUBDCYw9Q" target="_blank" rel="noopener" class="gh-action">
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
/* ── Release Card ── */
.gh-release {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  content-visibility: auto;
  contain-intrinsic-size: 0 400px;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.gh-release:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px) translateZ(0);
}

.dark .gh-release:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}

/* ── Header ── */
.gh-release__header {
  margin-bottom: 1.25rem;
}

.gh-release__title-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.gh-release__title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.gh-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 6px;
  line-height: 1.4;
}

.gh-tag--pre {
  background: color-mix(in srgb, var(--vp-c-warning-1) 12%, transparent);
  color: var(--vp-c-warning-1);
}

.gh-release__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.gh-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.gh-meta-sep {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}

.gh-meta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.gh-meta-link:hover {
  color: var(--vp-c-text-1);
}

/* ── Asset Buttons ── */
.gh-release__assets {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gh-asset {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
  width: 100%;
  color: inherit;
  font: inherit;
}

.gh-asset:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px) translateZ(0);
}

.dark .gh-asset:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dark .gh-asset {
  background: var(--vp-c-bg-elv);
}

.gh-asset__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.gh-asset__info {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.gh-asset__name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gh-asset__meta {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.gh-asset__arrow {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  transform: translateZ(0);
  transition: transform 0.15s, color 0.15s;
}

.gh-asset:hover .gh-asset__arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(2px) translateZ(0);
}

/* ── Release Notes ── */
.gh-release__notes {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
}

.gh-notes__label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.85rem;
}

.gh-notes__wrapper {
  position: relative;
  max-height: 280px;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-long.is-expanded .gh-notes__wrapper {
  max-height: none;
}

.gh-release__notes:not(.is-long) .gh-notes__wrapper {
  max-height: none;
}

.gh-notes__content {
  contain: content;
}

.gh-notes__fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(transparent, var(--vp-c-bg-soft) 85%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.25rem;
  cursor: pointer;
}

.gh-notes__expand {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  cursor: pointer;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.gh-notes__expand:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px) translateZ(0);
}

.dark .gh-notes__expand:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.gh-notes__collapse {
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
  border-radius: 8px;
  cursor: pointer;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: color 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.gh-notes__collapse:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-3);
  transform: translateY(-1px) translateZ(0);
}

/* ── Markdown Content ── */
.gh-notes__content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 1rem 0;
  background: var(--vp-c-bg-mute);
  min-height: 60px;
  transform: translateZ(0);
}

.gh-notes__content :deep(.mention) {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  padding: 0.1rem 0.3rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.gh-notes__content :deep(.mention:hover) {
  background: color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}

.gh-notes__content :deep(h1),
.gh-notes__content :deep(h2),
.gh-notes__content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border: none;
}

.gh-notes__content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
}

/* ── Skeleton ── */
.gh-release--skeleton {
  animation: gh-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.gh-skel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gh-skel__title {
  width: 40%;
  height: 20px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--vp-c-bg-mute) 25%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg-mute) 75%);
  background-size: 200% 100%;
  animation: skel-shimmer 1.5s ease-in-out infinite;
}

.gh-skel__meta {
  width: 25%;
  height: 14px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--vp-c-bg-mute) 25%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg-mute) 75%);
  background-size: 200% 100%;
  animation: skel-shimmer 1.5s ease-in-out infinite;
}

.gh-skel__asset {
  width: 100%;
  height: 56px;
  border-radius: 10px;
  margin-top: 0.5rem;
  background: linear-gradient(90deg, var(--vp-c-bg-mute) 25%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg-mute) 75%);
  background-size: 200% 100%;
  animation: skel-shimmer 1.5s ease-in-out infinite;
}

@keyframes gh-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes skel-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.gh-error {
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-danger-1);
  font-size: 0.9rem;
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
  .gh-asset {
    align-items: flex-start;
  }

  .gh-release__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .gh-meta-sep {
    display: none;
  }
}
</style>
