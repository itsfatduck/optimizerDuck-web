<script setup>
import { computed } from 'vue'
import * as Icons from '@lucide/vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: 20 },
})

const lucideMap = {
  calendar: Icons.Calendar,
  'arrow-down': Icons.ArrowDown,
  code: Icons.Code,
  'arrow-up-right-from-square': Icons.ExternalLink,
  download: Icons.Download,
  'chevron-right': Icons.ChevronRight,
  'file-lines': Icons.FileText,
  'chevron-down': Icons.ChevronDown,
  'chevron-up': Icons.ChevronUp,
  xmark: Icons.X,
  book: Icons.BookOpen,
  spinner: Icons.LoaderCircle,
  plus: Icons.Plus,
  'circle-info': Icons.CircleHelp,
  lightbulb: Icons.Lightbulb,
  'triangle-exclamation': Icons.TriangleAlert,
  'circle-exclamation': Icons.CircleAlert,
  'pen-to-square': Icons.SquarePen,
  star: Icons.Star,
  'shield-exclamation': Icons.ShieldAlert,
  wrench: Icons.Wrench,
  'screwdriver-wrench': Icons.Wrench,
  globe: Icons.Globe,
}

const iconComponent = computed(() => lucideMap[props.name] || Icons.CircleHelp)
</script>

<template>
  <span class="icon-wrap">
    <!-- GitHub brand icon -->
    <svg v-if="name === 'github'" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="icon-svg">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
    </svg>

    <!-- Discord brand icon -->
    <svg v-else-if="name === 'discord'" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" class="icon-svg">
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
    </svg>

    <!-- Lucide icons -->
    <component
      v-else
      :is="iconComponent"
      :size="size"
      stroke-width="1.5"
      aria-hidden="true"
      class="icon-svg"
    />
  </span>
</template>

<style scoped>
.icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

.icon-svg {
  display: block;
}
</style>
