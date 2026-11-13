<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  variant: {
    type: String,
    default: 'card',
    validator: (v) => ['card', 'flat'].includes(v),
  },
  title: {
    type: String,
    default: undefined,
  },
})

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
const renderedTitle = computed(() => (props.title ? md.renderInline(props.title) : ''))
</script>

<template>
  <div class="steps-container" :class="[`steps--${variant}`]">
    <div v-if="title" class="steps-title" v-html="renderedTitle" />
    <div class="steps-list">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.steps-container {
  margin: 20px 0;
}

.steps--card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 24px 24px 8px 24px;
}

.steps--flat {
  border: none;
  background: transparent;
  padding: 8px 0;
}

.steps-title {
  margin: 0 0 16px 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.steps-list {
  counter-reset: step-counter;
  position: relative;
}

/* Fallback direct h3/h4 headings inside .steps-list */
.steps-list :deep(h3),
.steps-list :deep(h4) {
  counter-increment: step-counter;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0 8px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  border-top: none;
  padding-top: 0;
}

.steps-list :deep(h3)::before,
.steps-list :deep(h4)::before {
  content: counter(step-counter);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.dark .steps-list :deep(h3)::before,
.dark .steps-list :deep(h4)::before {
  background: rgba(255, 255, 255, 0.05);
}

.steps-list > :last-child :deep(.step-connector) {
  display: none;
}
</style>
