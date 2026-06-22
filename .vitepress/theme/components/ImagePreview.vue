<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Image Preview' },
  caption: { type: String, default: '' },
  maxWidth: { type: String, default: '1200px' },
})

const isOpen = ref(false)
const loaded = ref(false)
const lightboxImgLoaded = ref(false)
const touchStartY = ref(0)
const touchDeltaY = ref(0)
const isSwiping = ref(false)
const lightboxScale = ref(1)

const isDark = ref(false)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  isDark.value = mq.matches
  mq.addEventListener('change', onThemeChange)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onThemeChange)
  document.body.style.overflow = ''
})

function onThemeChange(e) {
  isDark.value = e.matches
}

function handleKeydown(e) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
}

function open() {
  isOpen.value = true
  lightboxScale.value = 1
  touchDeltaY.value = 0
  document.body.style.overflow = 'hidden'
  // Re-check dark mode on open
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

function close() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function onThumbnailLoad() {
  loaded.value = true
}

function onLightboxImgLoad() {
  lightboxImgLoaded.value = true
}

/* ── Touch / Swipe to close ── */

function onTouchStart(e) {
  if (lightboxScale.value > 1) return // don't swipe while zoomed
  touchStartY.value = e.touches[0].clientY
  touchDeltaY.value = 0
  isSwiping.value = true
}

function onTouchMove(e) {
  if (!isSwiping.value) return
  touchDeltaY.value = e.touches[0].clientY - touchStartY.value
  const opacity = Math.max(0, 1 - Math.abs(touchDeltaY.value) / 300)
  const scale = Math.max(0.7, 1 - Math.abs(touchDeltaY.value) / 600)
  const el = document.querySelector('.lightbox-overlay')
  if (el) {
    el.style.opacity = opacity
    el.style.transform = `scale(${scale})`
  }
}

function onTouchEnd() {
  if (!isSwiping.value) return
  isSwiping.value = false
  const el = document.querySelector('.lightbox-overlay')
  if (Math.abs(touchDeltaY.value) > 100) {
    close()
  } else if (el) {
    el.style.opacity = ''
    el.style.transform = ''
  }
  touchDeltaY.value = 0
}

/* ── Zoom via scroll ── */

function onWheel(e) {
  if (!isOpen.value) return
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  lightboxScale.value = Math.max(0.5, Math.min(3, lightboxScale.value + delta))
}
</script>

<template>
  <div class="image-preview-root">
    <!-- ─── Thumbnail ─── -->
    <div
      class="thumb-frame"
      :style="{ maxWidth }"
      @click="open"
      role="button"
      tabindex="0"
      :aria-label="'View larger: ' + (caption || alt)"
      @keydown.enter="open"
      @keydown.space.prevent="open"
    >
      <div class="thumb-aspect">
        <!-- Loading skeleton -->
        <div v-if="!loaded" class="thumb-skeleton" />

        <img
          :src="src"
          :alt="alt"
          class="thumb-img"
          :class="{ loaded }"
          loading="lazy"
          decoding="async"
          @load="onThumbnailLoad"
        />

        <!-- Hover zoom icon -->
        <div class="thumb-hover">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="thumb-zoom-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span class="thumb-zoom-label">Click to zoom</span>
        </div>
      </div>

      <p v-if="caption" class="thumb-caption">{{ caption }}</p>
    </div>

    <!-- ─── Lightbox ─── -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="isOpen"
          class="lightbox-overlay"
          :class="{ dark: isDark }"
          @click.self="close"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend.passive="onTouchEnd"
          @wheel.passive="onWheel"
        >
          <!-- Top bar -->
          <div class="lightbox-topbar">
            <span class="lightbox-filename">{{ alt }}</span>
            <div class="lightbox-actions">
              <!-- Download -->
              <a
                :href="src"
                :download="alt || 'image'"
                class="lightbox-btn"
                aria-label="Download image"
                title="Download"
                @click.stop
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
              <!-- Close -->
              <button class="lightbox-btn lightbox-btn--close" @click="close" aria-label="Close (Esc)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Image area -->
          <div class="lightbox-body">
            <!-- Loading spinner -->
            <div v-if="!lightboxImgLoaded" class="lightbox-spinner">
              <div class="spinner-ring" />
            </div>

            <img
              :src="src"
              :alt="caption || alt"
              class="lightbox-img"
              :class="{ loaded: lightboxImgLoaded }"
              :style="{ transform: `scale(${lightboxScale})` }"
              decoding="async"
              @load="onLightboxImgLoad"
            />
          </div>

          <!-- Caption -->
          <div v-if="caption" class="lightbox-footer">
            <span class="lightbox-caption">{{ caption }}</span>
            <span class="lightbox-hint">Scroll to zoom &middot; Swipe to close</span>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ─── Root ─── */
.image-preview-root {
  margin: 2rem 0;
  width: 100%;
}

/* ─── Thumbnail ─── */
.thumb-frame {
  margin: 0 auto;
  cursor: pointer;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  outline: none;
}

.thumb-frame:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent),
    0 8px 30px rgba(0, 0, 0, 0.08);
}

.thumb-frame:focus-visible {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

.thumb-aspect {
  position: relative;
  overflow: hidden;
  background: var(--vp-c-bg-elv);
  line-height: 0;
  width: 100%;
  aspect-ratio: auto;
}

/* Loading skeleton */
.thumb-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    var(--vp-c-bg-soft) 20%,
    var(--vp-c-bg-elv) 50%,
    var(--vp-c-bg-soft) 80%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.8s ease-in-out infinite;
  z-index: 1;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.thumb-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: opacity 0.5s ease;
  opacity: 0;
  position: relative;
  z-index: 2;
}

.thumb-img.loaded {
  opacity: 1;
}

/* Hover overlay */
.thumb-hover {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumb-frame:hover .thumb-hover {
  opacity: 1;
}

.thumb-zoom-icon {
  color: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
}

.thumb-zoom-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* Caption */
.thumb-caption {
  margin: 0;
  padding: 14px 18px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  border-top: 1px solid var(--vp-c-divider);
}

/* ─── Lightbox ─── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* ─── Top bar ─── */
.lightbox-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  flex-shrink: 0;
  z-index: 2;
}

.lightbox-filename {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 50%;
}

.lightbox-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.lightbox-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.lightbox-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.lightbox-btn--close:hover {
  background: rgba(255, 70, 70, 0.2);
  border-color: rgba(255, 70, 70, 0.3);
  color: #ff6b6b;
}

/* ─── Body ─── */
.lightbox-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  position: relative;
  min-height: 0;
}

.lightbox-img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: scale(0.92) translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  -webkit-user-drag: none;
}

.lightbox-img.loaded {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* ─── Loading Spinner ─── */
.lightbox-spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-ring {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Footer ─── */
.lightbox-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 14px 20px 20px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.lightbox-caption {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  background: rgba(255, 255, 255, 0.08);
  padding: 7px 18px;
  border-radius: 100px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
}

.lightbox-hint {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 400;
  text-align: center;
}

/* ─── Transition ─── */
.lightbox-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.lightbox-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

/* ─── Mobile ─── */
@media (max-width: 768px) {
  .lightbox-body {
    padding: 12px;
  }

  .lightbox-topbar {
    padding: 12px 14px;
  }

  .lightbox-footer {
    padding: 10px 14px 14px;
    flex-direction: column;
    gap: 8px;
  }

  .lightbox-hint {
    display: none;
  }

  .lightbox-caption {
    font-size: 0.82rem;
    padding: 6px 14px;
  }

  .thumb-zoom-label {
    display: none;
  }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .thumb-img,
  .thumb-frame,
  .lightbox-overlay,
  .lightbox-img {
    transition: none !important;
    animation: none !important;
  }
}
</style>
