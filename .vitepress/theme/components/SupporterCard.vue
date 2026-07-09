<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="sp-card">
    <div class="sp-card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </div>
    <span class="sp-card-name">{{ name }}</span>
  </div>
</template>

<style scoped>
.sp-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.25rem;
  border-radius: 100px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  backface-visibility: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.sp-card:hover {
  border-color: #ff5e5b;
  box-shadow: 0 0 0 2px rgba(255, 94, 91, 0.25);
}

.sp-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5e5b;
  flex-shrink: 0;
}

.sp-card-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
