<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import Icon from './Icon.vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: undefined },
  iconType: { type: String, default: 'solid' },
  content: { type: String, default: undefined },
})

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

const renderedTitle = computed(() => md.renderInline(props.title))

const renderedContent = computed(() => {
  if (props.content) return md.render(props.content)
  return undefined
})
</script>

<template>
  <article class="card">
    <p class="card__title">
      <span v-if="icon" class="card__icon">
        <Icon :name="icon" :type="iconType" :size="16" />
      </span>
      <span v-html="renderedTitle" />
    </p>
    <div v-if="content" class="card__body vp-doc" v-html="renderedContent" />
    <div v-else class="card__body vp-doc">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.card {
  --card-accent: var(--vp-c-brand-1);
  --card-accent-bg: var(--vp-c-brand-soft);

  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 0.125rem + 1vw, 0.75rem);
  padding: clamp(0.85rem, 0.125rem + 2vw, 1.5rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: border-color 0.2s;
}

.card:hover {
  border-color: var(--card-accent);
}

/* Accent rotation — brand first, then complementary palette */
.card:nth-child(5n + 2) {
  --card-accent: var(--vp-c-success-1);
  --card-accent-bg: var(--vp-c-success-soft);
}

.card:nth-child(5n + 3) {
  --card-accent: var(--vp-c-indigo-1);
  --card-accent-bg: var(--vp-c-indigo-soft);
}

.card:nth-child(5n + 4) {
  --card-accent: var(--vp-c-warning-1);
  --card-accent-bg: var(--vp-c-warning-soft);
}

.card:nth-child(5n + 5) {
  --card-accent: var(--vp-c-danger-1);
  --card-accent-bg: var(--vp-c-danger-soft);
}

.card__title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--card-accent);
  border-radius: 6px;
  background: var(--card-accent-bg);
  color: var(--card-accent);
  flex-shrink: 0;
}

.card__body {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--vp-c-text-1);
}

.card__body :deep(p:first-child) {
  margin-top: 0;
}

.card__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
