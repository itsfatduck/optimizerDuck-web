<script setup>
import { computed } from 'vue'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import Icon from './Icon.vue'

const props = defineProps({
  icon: { type: [String, Object], default: undefined },
  title: { type: String, required: true },
  details: { type: String, default: undefined },
  link: { type: String, default: undefined },
  linkText: { type: String, default: undefined },
  rel: { type: String, default: undefined },
  target: { type: String, default: undefined },
})

const isImageObject = computed(() => {
  return typeof props.icon === 'object' && ('src' in props.icon || 'light' in props.icon || 'dark' in props.icon)
})

const isLucideIcon = computed(() => {
  return typeof props.icon === 'string' && !props.icon.startsWith('<') && !props.icon.startsWith('http')
})
</script>

<template>
  <VPLink
    class="VPFeature"
    :href="link"
    :rel="rel"
    :target="target"
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
  >
    <article class="box">
      <div v-if="isLucideIcon" class="icon">
        <Icon :name="icon" :size="24" />
      </div>
      <div v-else-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 48"
          :width="icon.width || 48"
        />
      </div>
      <VPImage
        v-else-if="isImageObject"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 48"
        :width="icon.width || 48"
      />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <h2 class="title" v-html="title"></h2>
      <p v-if="details" class="details" v-html="details"></p>

      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
        </p>
      </div>
    </article>
  </VPLink>
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0);
  transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.VPFeature.link:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transform: translateY(-3px) translateZ(0);
}

.dark .VPFeature.link:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.box > :deep(.VPImage) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.link-text-icon {
  margin-left: 6px;
}
</style>
