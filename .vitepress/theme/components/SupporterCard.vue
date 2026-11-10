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
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: border-color 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.sp-card:hover {
  border-color: #ff5e5b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark .sp-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
