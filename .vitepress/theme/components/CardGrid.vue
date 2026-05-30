<script setup>
defineProps({
  stagger: { type: Boolean, default: false },
})
</script>

<template>
  <div class="card-grid" :class="{ stagger }">
    <slot />
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 100%;
  gap: 1rem;
}

.card-grid > :deep(*) {
  margin-top: 0 !important;
}

@media (min-width: 800px) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .stagger {
    --stagger-height: 3rem;
    padding-bottom: var(--stagger-height);
  }

  .stagger > :deep(*):nth-child(2n) {
    transform: translateY(var(--stagger-height));
  }
}
</style>
