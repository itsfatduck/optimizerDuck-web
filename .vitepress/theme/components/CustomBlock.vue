<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'tip', 'warning', 'danger', 'note', 'important', 'caution', 'details'].includes(v),
  },
  title: { type: String, default: undefined },
  icon: { type: String, default: undefined },
  color: { type: String, default: undefined },
})

const defaultIcons = {
  info: 'circle-info',
  tip: 'lightbulb',
  warning: 'triangle-exclamation',
  danger: 'circle-exclamation',
  note: 'pen-to-square',
  important: 'star',
  caution: 'shield-exclamation',
  details: 'chevron-down',
}

const resolvedIcon = computed(() => props.icon || defaultIcons[props.type] || 'info')

const typeLabels = {
  info: 'Info',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Danger',
  note: 'Note',
  important: 'Important',
  caution: 'Caution',
  details: 'Details',
}

const displayTitle = computed(() => props.title || typeLabels[props.type] || 'Note')

</script>

<template>
  <div class="cb" :class="[`cb--${type}`]" :style="color ? { '--cb-accent': color } : undefined">
    <div class="cb__header">
      <span class="cb__icon">
        <Icon :name="resolvedIcon" :size="15" />
      </span>
      <span class="cb__title">{{ displayTitle }}</span>
    </div>
    <div class="cb__body vp-doc">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cb {
  position: relative;
  margin: 1.25rem 0;
  padding: 1rem 1.15rem 1rem 1.15rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

/* Accent top bar */
.cb::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--cb-accent, var(--vp-c-brand-1));
  border-radius: 8px 8px 0 0;
}

.cb__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.cb__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--cb-accent, var(--vp-c-brand-1)) 10%, transparent);
  color: var(--cb-accent, var(--vp-c-brand-1));
  flex-shrink: 0;
}

.cb__title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.cb__body {
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

/* ── Type accents ── */
.cb--info    { --cb-accent: var(--vp-c-default-1); }
.cb--tip     { --cb-accent: var(--vp-c-tip-1); }
.cb--note    { --cb-accent: var(--vp-c-brand-1); }
.cb--warning { --cb-accent: var(--vp-c-warning-1); }
.cb--danger  { --cb-accent: var(--vp-c-danger-1); }
.cb--important { --cb-accent: var(--vp-c-important-1); }
.cb--caution { --cb-accent: var(--vp-c-caution-1); }
.cb--details { --cb-accent: var(--vp-c-default-1); }

/* ── Content styles ── */
.cb__body :deep(p) {
  margin: 0.4rem 0;
}

.cb__body :deep(p:first-child) {
  margin-top: 0;
}

.cb__body :deep(p:last-child) {
  margin-bottom: 0;
}

.cb__body :deep(code) {
  font-size: 0.82em;
  background: var(--vp-c-default-soft);
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
}

.cb__body :deep(a) {
  color: var(--cb-accent, var(--vp-c-brand-1));
  font-weight: 500;
}
</style>
