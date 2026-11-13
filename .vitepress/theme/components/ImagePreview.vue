<script setup>
import { ref, computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Image preview' },
  caption: { type: String, default: '' },
  maxWidth: { type: String, default: '100%' },
})

const dialogRef = ref(null)
const isLoaded = ref(false)
const isClosing = ref(false)
let savedScrollY = 0

const downloadName = computed(() => {
  if (props.caption) return props.caption.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  if (props.alt && props.alt !== 'Image preview') return props.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return 'optimizerduck-screenshot'
})

function open() {
  if (typeof window !== 'undefined') {
    savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
  }
  isClosing.value = false
  dialogRef.value?.showModal()
}

function close() {
  if (isClosing.value) return
  isClosing.value = true
  setTimeout(() => {
    dialogRef.value?.close()
    isClosing.value = false
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: savedScrollY, behavior: 'instant' })
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, behavior: 'instant' })
      })
    }
  }, 150)
}

function onCancel(e) {
  e.preventDefault()
  close()
}

function onBackdropClick(e) {
  // If clicked anywhere except the image or action buttons, close
  if (!e.target.closest('.dialog-img') && !e.target.closest('.dialog-actions')) {
    close()
  }
}
</script>

<template>
  <figure class="image-preview" :style="{ maxWidth }">
    <button
      type="button"
      class="preview-trigger"
      :aria-label="'Enlarge image: ' + (caption || alt)"
      @click="open"
    >
      <div class="thumb-container">
        <img
          :src="src"
          :alt="caption || alt"
          class="thumb-img"
          :class="{ loaded: isLoaded }"
          loading="lazy"
          decoding="async"
          @load="isLoaded = true"
        />
        <div class="thumb-overlay" aria-hidden="true">
          <span class="zoom-pill">
            <Icon name="arrow-up-right" :size="14" />
            <span>Click to enlarge</span>
          </span>
        </div>
      </div>
    </button>

    <figcaption v-if="caption" class="preview-caption">
      {{ caption }}
    </figcaption>

    <!-- Native HTML5 Dialog teleported to body -->
    <Teleport to="body">
      <dialog
        ref="dialogRef"
        class="preview-dialog"
        :class="{ 'is-closing': isClosing }"
        :aria-label="caption || alt"
        @click="onBackdropClick"
        @cancel="onCancel"
      >
        <div class="dialog-bar">
          <div class="dialog-actions">
            <a
              :href="src"
              :download="downloadName"
              class="dialog-btn"
              title="Download image"
              aria-label="Download image"
              @click.stop
            >
              <Icon name="download" :size="16" />
            </a>
            <button
              type="button"
              class="dialog-btn dialog-btn--close"
              title="Close (Esc)"
              aria-label="Close dialog"
              @click="close"
            >
              <Icon name="xmark" :size="16" />
            </button>
          </div>
        </div>

        <div class="dialog-viewport">
          <img
            :src="src"
            :alt="caption || alt"
            class="dialog-img"
          />
        </div>

        <div v-if="caption" class="dialog-footer">
          <span class="caption-tag">{{ caption }}</span>
        </div>
      </dialog>
    </Teleport>
  </figure>
</template>

<style scoped>
/* ─── Thumbnail & Figure ─── */
.image-preview {
  margin: 1.75rem auto;
  width: 100%;
}

.preview-trigger {
  all: unset;
  display: block;
  width: 100%;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.preview-trigger:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.dark .preview-trigger:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.preview-trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.thumb-container {
  position: relative;
  overflow: hidden;
  background: var(--vp-c-bg-elv);
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumb-img.loaded {
  opacity: 1;
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.preview-trigger:hover .thumb-overlay,
.preview-trigger:focus-visible .thumb-overlay {
  opacity: 1;
}

.zoom-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(17, 19, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 0.8125rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.preview-caption {
  margin: 0.5rem 0 0 0;
  text-align: center;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* ─── Native Modal Dialog ─── */
.preview-dialog {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  box-sizing: border-box;
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.preview-dialog[open] {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 1;
  transform: scale(1);
}

.preview-dialog.is-closing {
  opacity: 0 !important;
  transform: scale(0.98) !important;
}

/* MANDATORY per modern-web-guidance (prevent-page-scroll-under-modal-dialog) */
.preview-dialog:modal {
  overscroll-behavior: contain;
}

.preview-dialog::backdrop {
  overflow: hidden;
  overscroll-behavior: contain;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.preview-dialog[open]::backdrop {
  opacity: 1;
}

.preview-dialog.is-closing::backdrop {
  opacity: 0 !important;
}

/* ─── Dialog Top Bar ─── */
.dialog-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 20px;
  flex-shrink: 0;
  z-index: 2;
  cursor: default;
}

.dialog-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dialog-btn {
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.dialog-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.dialog-btn--close:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.35);
  color: #f87171;
}

.dialog-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* ─── Dialog Viewport & Image ─── */
.dialog-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  min-height: 0;
  cursor: default;
}

.dialog-img {
  display: block;
  max-width: 90vw;
  max-height: calc(85vh - 80px);
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
  user-select: none;
  -webkit-user-drag: none;
  cursor: default;
}

/* ─── Dialog Footer ─── */
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px 20px 20px;
  flex-shrink: 0;
  cursor: default;
}

.caption-tag {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 14px;
  border-radius: 100px;
  backdrop-filter: blur(8px);
}

/* ─── Responsive & Accessibility ─── */
@media (max-width: 640px) {
  .dialog-bar {
    padding: 12px 14px;
  }
  .dialog-viewport {
    padding: 8px 12px;
  }
  .dialog-img {
    max-width: 96vw;
    max-height: calc(85vh - 70px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-trigger,
  .thumb-img,
  .thumb-overlay,
  .preview-dialog,
  .preview-dialog::backdrop {
    transition: none !important;
  }
}
</style>
