<script setup lang="ts">
import type { DefaultTheme } from "vitepress";

import { useData } from "vitepress";
import VPNavBarMenuGroup from "vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue";
import VPNavBarMenuLink from "vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue";
import { computed, onMounted, ref } from "vue";

import { useGitHub } from "../composables/useGitHub";

const { theme } = useData<DefaultTheme.Config>();
const { latestRelease, fetchReleases } = useGitHub("itsfatduck/optimizerDuck");

// Used to avoid hydration mismatch between SSR and client.
const replace = ref(false);

onMounted(() => {
  replace.value = true;
  fetchReleases();
});

/**
 * Replaces {app_version} placeholder in nav items with
 * the actual version from the latest GitHub release.
 */
const nav = computed(() => {
  if (!replace.value || !latestRelease.value?.tag_name) {
    return theme.value.nav;
  }

  const version = latestRelease.value.tag_name;

  return theme.value.nav?.map((item) => {
    if (!item.text?.includes("{app_version}")) {
      return item;
    }

    return {
      ...item,
      text: item.text.replace(/{app_version}/g, version),
    } satisfies DefaultTheme.NavItem;
  });
});
</script>

<template>
  <nav v-if="nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">
      Main Navigation
    </span>
    <template v-for="item in nav" :key="JSON.stringify(item)">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <component v-else-if="'component' in item" :is="item.component" v-bind="item.props" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
