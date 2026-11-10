<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCache, setCache } from '../utils/cache'
import Icon from './Icon.vue'

interface HeroMetrics {
  stars: number
  downloads: number
  discordMembers: number
  discordOnline: number
}

const CACHE_KEY = 'optimizerduck-hero-badges-metrics'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// Sensible initial fallbacks to avoid layout jump
const metrics = ref<HeroMetrics>({
  stars: 11400,
  downloads: 499000,
  discordMembers: 1060,
  discordOnline: 130,
})

const loaded = ref(false)

function formatCompact(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return new Intl.NumberFormat().format(num)
}

function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer))
}

async function loadMetrics() {
  const cached = getCache<HeroMetrics>(CACHE_KEY, CACHE_TTL)
  if (cached) {
    metrics.value = cached
    loaded.value = true
    return
  }

  const updated: Partial<HeroMetrics> = {}

  const tasks = [
    // 1. GitHub Stars
    fetchWithTimeout('https://api.github.com/repos/itsfatduck/optimizerDuck')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          updated.stars = data.stargazers_count
        }
      })
      .catch(() => {}),

    // 2. Total Downloads across releases
    fetchWithTimeout('https://api.github.com/repos/itsfatduck/optimizerDuck/releases?per_page=100')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (Array.isArray(data)) {
          const total = data.reduce((acc: number, rel: any) => {
            return acc + (rel.assets || []).reduce((a: number, b: any) => a + (b.download_count || 0), 0)
          }, 0)
          if (total > 0) updated.downloads = total
        }
      })
      .catch(() => {}),

    // 3. Discord counts
    fetchWithTimeout('https://discord.com/api/v9/invites/tDUBDCYw9Q?with_counts=true')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          if (typeof data.approximate_member_count === 'number') {
            updated.discordMembers = data.approximate_member_count
          }
          if (typeof data.approximate_presence_count === 'number') {
            updated.discordOnline = data.approximate_presence_count
          }
        }
      })
      .catch(() => {}),
  ]

  await Promise.allSettled(tasks)

  metrics.value = {
    stars: updated.stars ?? metrics.value.stars,
    downloads: updated.downloads ?? metrics.value.downloads,
    discordMembers: updated.discordMembers ?? metrics.value.discordMembers,
    discordOnline: updated.discordOnline ?? metrics.value.discordOnline,
  }

  setCache(CACHE_KEY, metrics.value)
  loaded.value = true
}

onMounted(() => {
  loadMetrics()
})
</script>

<template>
  <div class="hero-badges" role="region" aria-label="Project statistics">
    <!-- Downloads Badge -->
    <a
      href="/docs/download"
      class="hero-badge"
      title="View downloads"
    >
      <div class="hero-badge__icon hero-badge__icon--download">
        <Icon name="download" :size="14" />
      </div>
      <div class="hero-badge__content">
        <span class="hero-badge__value">{{ formatCompact(metrics.downloads) }}</span>
        <span class="hero-badge__label">Downloads</span>
      </div>
    </a>

    <!-- Discord Badge -->
    <a
      href="https://discord.gg/tDUBDCYw9Q"
      target="_blank"
      rel="noopener noreferrer"
      class="hero-badge"
      title="Join Discord community"
    >
      <div class="hero-badge__icon hero-badge__icon--discord">
        <Icon name="discord" :size="14" />
      </div>
      <div class="hero-badge__content">
        <div class="hero-badge__title-row">
          <span class="hero-badge__value">{{ formatCompact(metrics.discordMembers) }}</span>
          <span class="hero-badge__online">
            <span class="hero-badge__dot" aria-hidden="true"></span>
            {{ metrics.discordOnline }}
          </span>
        </div>
        <span class="hero-badge__label">Discord</span>
      </div>
    </a>

    <!-- GitHub Stars Badge -->
    <a
      href="https://github.com/itsfatduck/optimizerDuck"
      target="_blank"
      rel="noopener noreferrer"
      class="hero-badge"
      title="Star optimizerDuck on GitHub"
    >
      <div class="hero-badge__icon hero-badge__icon--star">
        <Icon name="star" :size="14" />
      </div>
      <div class="hero-badge__content">
        <span class="hero-badge__value">{{ formatCompact(metrics.stars) }}</span>
        <span class="hero-badge__label">Stars</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 960px) {
  .hero-badges {
    justify-content: center;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  color: inherit !important;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition:
    border-color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-badge:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px) translateZ(0);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.dark .hero-badge:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.hero-badge:active {
  transform: translateY(0) translateZ(0);
}

.hero-badge__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  flex-shrink: 0;
  transition: color 0.2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-badge:hover .hero-badge__icon--download {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.hero-badge:hover .hero-badge__icon--discord {
  color: #5865f2;
  background: color-mix(in srgb, #5865f2 12%, transparent);
}

.hero-badge:hover .hero-badge__icon--star {
  color: #eab308;
  background: color-mix(in srgb, #eab308 12%, transparent);
}

.hero-badge__content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.hero-badge__title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero-badge__value {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.hero-badge__online {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  font-weight: 500;
  color: #16a34a;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.dark .hero-badge__online {
  color: #4cc38a;
}

.hero-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a34a;
}

.dark .hero-badge__dot {
  background: #4cc38a;
}

.hero-badge__label {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  line-height: 1.2;
}
</style>
