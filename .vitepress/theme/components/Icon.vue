<script setup>
defineProps({
  name: { type: String, required: true },
  type: { type: String, default: 'solid' },
  size: { type: [String, Number], default: undefined },
})

const typeMap = { solid: 'fas', regular: 'far', brands: 'fab' }
</script>

<template>
  <i
    :class="[typeMap[type] || 'fas', `fa-${name}`]"
    :style="size ? { fontSize: typeof size === 'number' ? `${size}px` : size } : undefined"
    aria-hidden="true"
  />
</template>
