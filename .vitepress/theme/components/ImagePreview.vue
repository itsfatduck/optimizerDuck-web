<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image Preview'
  },
  caption: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: '1200px'
  }
})

const isOpen = ref(false)

const toggleZoom = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const handleEsc = (e) => {
  if (e.key === 'Escape' && isOpen.value) toggleZoom()
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="image-preview-container">
    <div class="image-frame" :style="{ maxWidth: maxWidth }" @click="toggleZoom">
      <div class="image-wrapper">
        <img :src="src" :alt="alt" class="preview-img" loading="lazy" />
        <div class="zoom-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="zoom-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        </div>
      </div>
      <div v-if="caption" class="image-caption">
        {{ caption }}
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="lightbox-overlay" @click.self="toggleZoom">
          <button class="close-btn" @click="toggleZoom" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="lightbox-content">
            <img :src="src" :alt="alt" class="lightbox-img" />
            <div v-if="caption" class="lightbox-caption">
              {{ caption }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.image-preview-container {
  margin: 2.5rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

.image-frame {
  position: relative;
  padding: 8px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  cursor: pointer;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  line-height: 0;
}

.preview-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
}

.zoom-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zoom-icon {
  color: white;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
}

.image-frame:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.image-frame:hover .zoom-overlay {
  opacity: 1;
}

.image-caption {
  margin-top: 14px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  opacity: 0.7;
  letter-spacing: 0.3px;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 95vw;
  max-height: 85vh;
}

.lightbox-img {
  max-width: 100%;
  max-height: 75vh;
  border-radius: 12px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
}

.lightbox-caption {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 24px;
  border-radius: 100px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10000;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg) scale(1.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .lightbox-overlay {
    padding: 20px;
  }
  .close-btn {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>
