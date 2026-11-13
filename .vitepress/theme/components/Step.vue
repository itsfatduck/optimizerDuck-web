<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import Icon from './Icon.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  step: {
    type: [String, Number],
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
})

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

const renderedTitle = computed(() => (props.title ? md.renderInline(props.title) : ''))
const renderedDescription = computed(() => (props.description ? md.render(props.description) : ''))
</script>

<template>
  <div class="step-item">
    <div class="step-indicator">
      <div class="step-badge">
        <Icon v-if="icon" :name="icon" :size="14" class="step-icon" />
        <span v-else-if="step !== undefined" class="step-number">{{ step }}</span>
        <span v-else class="step-number-auto" />
      </div>
      <div class="step-connector" />
    </div>
    <div class="step-content">
      <div class="step-header">
        <div class="step-title" v-html="renderedTitle" />
      </div>
      <div v-if="description || $slots.default" class="step-body vp-doc">
        <div v-if="description" class="step-description" v-html="renderedDescription" />
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-item {
  position: relative;
  display: flex;
  gap: 16px;
  counter-increment: step-counter;
}

.step-indicator {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 28px;
}

.step-badge {
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
  line-height: 1;
  flex-shrink: 0;
  z-index: 1;
  user-select: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.dark .step-badge {
  background: rgba(255, 255, 255, 0.05);
}

.step-item:hover .step-badge {
  border-color: var(--vp-c-text-3);
}

.step-number-auto::before {
  content: counter(step-counter);
}

.step-connector {
  position: absolute;
  top: 28px;
  bottom: 0;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background: var(--vp-c-divider);
}

.step-item:last-child .step-connector {
  display: none;
}

.step-content {
  flex: 1;
  min-width: 0;
  padding-bottom: 24px;
}

.step-item:last-child .step-content {
  padding-bottom: 16px;
}

.step-header {
  min-height: 28px;
  display: flex;
  align-items: center;
}

.step-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.step-title :deep(p) {
  margin: 0;
  display: inline;
}

.step-title :deep(code) {
  font-size: 0.85em;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
}

.step-title :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.step-body {
  margin-top: 6px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.875rem;
}

.step-body :deep(p) {
  margin: 0.35rem 0;
}

.step-body :deep(p:first-child) {
  margin-top: 0;
}

.step-body :deep(p:last-child) {
  margin-bottom: 0;
}

.step-body :deep(code) {
  font-size: 0.85em;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
}

.step-body :deep(a) {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.step-body :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
