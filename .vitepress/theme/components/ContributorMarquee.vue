<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  repo: { type: String, default: 'itsfatduck/optimizerDuck' }
})

const CACHE_KEY = `github-contributors-marquee-${props.repo}`
const CACHE_TTL = 10 * 60 * 1000
const isClient = typeof window !== 'undefined'

const contributors = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const hoveredId = ref<number | null>(null)
const phase = ref<'loading' | 'static' | 'marquee'>('loading')
const heartsMap = ref<Record<number, { id: number; x: number; delay: number }[]>>({})

const marqueeItems = computed(() => {
  if (!contributors.value.length) return []
  return [...contributors.value, ...contributors.value]
})

const staticItems = computed(() => contributors.value.slice(0, 12))

function getCachedData() {
  if (!isClient) return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.timestamp && Date.now() - data.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return data
  } catch {
    try { localStorage.removeItem(CACHE_KEY) } catch {}
    return null
  }
}

onMounted(async () => {
  const cached = getCachedData()
  if (cached) {
    contributors.value = cached.contributors
    loading.value = false
    phase.value = 'static'
    setTimeout(() => { phase.value = 'marquee' }, 2500)
    return
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${props.repo}/contributors`)
    if (!res.ok) {
      if (res.status === 403) throw new Error('GitHub API rate limit exceeded')
      throw new Error('Failed to fetch contributors')
    }
    const data = await res.json()
    contributors.value = data.filter((c: any) => c.type === 'User' && !c.login.toLowerCase().includes('bot'))

    if (isClient) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          contributors: contributors.value,
          timestamp: Date.now()
        }))
      } catch {}
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
    phase.value = 'static'
    setTimeout(() => { phase.value = 'marquee' }, 2500)
  }
})

function onHover(contributor: any) {
  hoveredId.value = contributor.id
  // Generate hearts for this contributor
  const hearts: { id: number; x: number; delay: number }[] = []
  for (let i = 0; i < 6; i++) {
    hearts.push({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 70,
      delay: Math.random() * 0.4
    })
  }
  heartsMap.value[contributor.id] = hearts
}

function onLeave() {
  hoveredId.value = null
  heartsMap.value = {}
}

function getHeartStyle(heart: { x: number; delay: number }) {
  return {
    '--x': `${heart.x}px`,
    '--delay': `${heart.delay}s`
  }
}
</script>

<template>
  <div class="cm-section">
    <!-- Loading -->
    <div v-if="phase === 'loading'" class="cm-loading">
      <svg class="cm-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Loading contributors...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="cm-error">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {{ error }}
    </div>

    <!-- Contributors loaded -->
    <div v-else class="cm-container">
      <!-- STATIC phase: centered grid -->
      <div class="cm-static" :class="{ 'cm-hidden': phase !== 'static' }">
        <div
          v-for="contributor in staticItems"
          :key="contributor.id"
          class="cm-item"
        >
          <div class="cm-avatar-wrapper">
            <img
              :src="contributor.avatar_url"
              :alt="contributor.login"
              class="cm-avatar"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span class="cm-name">{{ contributor.login }}</span>
        </div>
      </div>

      <!-- MARQUEE phase: infinite scroll -->
      <div class="cm-marquee-wrapper" :class="{ 'cm-visible': phase === 'marquee' }">
        <div
          class="cm-marquee-track"
          :class="{ 'cm-paused': hoveredId !== null }"
        >
          <div
            v-for="(contributor, index) in marqueeItems"
            :key="`${contributor.id}-${index}`"
            class="cm-item cm-item--marquee"
            :class="{ 'cm-item--hovered': hoveredId === contributor.id }"
            @mouseenter="onHover(contributor)"
            @mouseleave="onLeave"
          >
            <div class="cm-avatar-wrapper">
              <img
                :src="contributor.avatar_url"
                :alt="contributor.login"
                class="cm-avatar"
                loading="lazy"
                decoding="async"
              />
              <!-- Hearts on hover -->
              <div v-if="heartsMap[contributor.id]" class="cm-hearts" :key="'hearts-' + index">
                <span
                  v-for="heart in heartsMap[contributor.id]"
                  :key="heart.id"
                  class="cm-heart"
                  :style="getHeartStyle(heart)"
                >❤️</span>
              </div>
            </div>
            <span class="cm-name">{{ contributor.login }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cm-section {
  width: 100%;
}


/* ── Loading / Error ── */
.cm-loading,
.cm-error {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 0;
}

.cm-spinner {
  animation: cm-spin 1s linear infinite;
}

@keyframes cm-spin {
  to { transform: rotate(360deg); }
}

/* ── Container ── */
.cm-container {
  position: relative;
  min-height: 100px;
}

/* ── Static grid ── */
.cm-static {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 0.5rem 0;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.cm-static.cm-hidden {
  opacity: 0;
  position: absolute;
  width: 100%;
  pointer-events: none;
}

/* ── Marquee wrapper ── */
.cm-marquee-wrapper {
  opacity: 0;
  transition: opacity 0.5s ease;
  width: 100%;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
}

.cm-marquee-wrapper.cm-visible {
  opacity: 1;
  position: relative;
  pointer-events: auto;
}

.cm-marquee-track {
  display: flex;
  gap: 1.5rem;
  width: fit-content;
  opacity: 1;
  animation: cm-marquee 90s linear infinite;
  transform: translateX(-50%);
  padding: 16px 0 18px;
  /* Gradient fade on edges (narrower fade so hover shadows aren't clipped) */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 2%,
    black 98%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 2%,
    black 98%,
    transparent 100%
  );
}

.cm-marquee-track.cm-paused {
  animation-play-state: paused;
}

@keyframes cm-marquee {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* ── Individual item ── */
.cm-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  border-radius: 12px;
  flex-shrink: 0;
}

.cm-item--marquee:hover {
  transform: translateY(-4px);
}

.cm-item--hovered {
  transform: translateY(-4px);
}

.cm-item--hovered .cm-name {
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.cm-avatar-wrapper {
  position: relative;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  overflow: visible;
}

.cm-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  background: var(--vp-c-bg-alt);
}

.cm-item--hovered .cm-avatar {
  box-shadow:
    0 0 0 3px var(--vp-c-brand-1),
    0 0 10px color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
}

.cm-name {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease, font-weight 0.3s ease;
  text-align: center;
  line-height: 1.2;
}

/* ── Dropping Hearts ── */
.cm-hearts {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 10;
}

.cm-heart {
  position: absolute;
  font-size: 18px;
  opacity: 0;
  animation: cm-heart-drop 1s ease-out forwards;
  animation-delay: var(--delay);
  transform: translateX(var(--x)) translateY(0);
}

@keyframes cm-heart-drop {
  0% {
    opacity: 1;
    transform: translateX(var(--x)) translateY(0) scale(0.5);
  }
  30% {
    opacity: 1;
    transform: translateX(var(--x)) translateY(-8px) scale(1.15);
  }
  100% {
    opacity: 0;
    transform: translateX(var(--x)) translateY(32px) scale(0.6);
  }
}
</style>
