<script setup lang="ts">
import type { DefaultTheme } from "vitepress";

import { useData } from "vitepress";
import VPNavScreenMenuGroup from "vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue";
import VPNavScreenMenuLink from "vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue";
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
  const appVersion = version.startsWith("v") ? version.substring(1) : version;

  return theme.value.nav?.map((item) => {
    if (!item.text?.includes("{app_version}")) {
      return item;
    }

    return {
      ...item,
      text: item.text.replace(/{app_version}/g, appVersion),
    } satisfies DefaultTheme.NavItem;
  });
});
</script>

<template>
  <nav v-if="nav" class="VPNavScreenMenu">
    <template v-for="item in nav" :key="item.text">
      <VPNavScreenMenuLink v-if="'link' in item" :item="item" />
      <VPNavScreenMenuGroup
        v-else
        :text="item.text || ''"
        :items="item.items"
      />
    </template>
  </nav>
</template>
