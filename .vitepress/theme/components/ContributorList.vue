<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  repo: {
    type: String,
    default: 'itsfatduck/OptimizerDuck'
  }
})

const contributors = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${props.repo}/contributors`)
    if (!res.ok) throw new Error('Failed to fetch contributors')
    const data = await res.json()
    // filter to only display actual users and ignore bots
    contributors.value = data.filter(c => c.type === 'User' && !c.login.toLowerCase().includes('bot'))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="loading">Loading contributors...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else class="contributor-grid">
    <a 
      v-for="contributor in contributors" 
      :key="contributor.id"
      :href="contributor.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="contributor-card"
    >
      <div class="avatar-wrapper">
        <img :src="contributor.avatar_url" :alt="contributor.login" class="avatar-img" loading="lazy" />
      </div>
      <div class="info-wrapper">
        <h3 class="name">{{ contributor.login }}</h3>
      </div>
    </a>
  </div>
</template>

<style scoped>
.contributor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.contributor-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px; 
  background: var(--vp-c-bg-soft); 
  text-decoration: none !important;
  color: inherit !important;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.contributor-card:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-2px);
}

.avatar-wrapper {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-wrapper {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.name {
  margin: 0 !important;
  font-size: 0.95rem !important;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.loading, .error {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin: 1rem 0;
}
</style>
