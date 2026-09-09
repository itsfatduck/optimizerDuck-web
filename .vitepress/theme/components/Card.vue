<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import Icon from './Icon.vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: undefined },
  content: { type: String, default: undefined },
  type: { type: String, default: 'info' },
  link: { type: String, default: undefined },
  linkText: { type: String, default: undefined },
  linkHref: { type: String, default: undefined },
})

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

const renderedTitle = computed(() => md.renderInline(props.title))

const renderedContent = computed(() => {
  if (props.content) return md.render(props.content)
  return undefined
})
</script>

<template>
  <article class="card" :class="`card--${type}`">
    <h3 class="card__title">
      <span v-if="icon" class="card__icon">
        <Icon :name="icon" :size="16" />
      </span>
      <span v-html="renderedTitle" />
    </h3>
    <div v-if="content" class="card__body vp-doc" v-html="renderedContent" />
    <div v-else class="card__body vp-doc">
      <slot />
    </div>
    <a v-if="link || linkHref" :href="linkHref || link" class="card__link">
      <span>{{ linkText || 'Learn more' }}</span>
      <Icon name="arrow-up-right" :size="14" class="card__link-icon" />
    </a>
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
  border-radius: 14px;
  overflow: hidden;
  background: var(--vp-c-bg);
}


/* Type-based accent colors */
.card--info {
  --card-accent: var(--vp-c-success-1);
  --card-accent-bg: var(--vp-c-success-soft);
}

.card--warning {
  --card-accent: var(--vp-c-warning-1);
  --card-accent-bg: var(--vp-c-warning-soft);
}

.card--danger {
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

.card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--card-accent);
  text-decoration: none;
  width: fit-content;
  border-radius: 6px;
  transition: opacity 0.2s ease;
}

.card__link:hover {
  opacity: 0.75;
  color: var(--card-accent);
}

.card__link-icon {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.card__link:hover .card__link-icon {
  transform: translate(2px, -2px);
}

.card__link:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 3px;
}
</style>
