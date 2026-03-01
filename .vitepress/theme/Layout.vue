<script setup>
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";

onMounted(async () => {
  if (typeof window !== "undefined") {
    // Inject Vercel Analytics
    const { inject: injectAnalytics } = await import("@vercel/analytics");
    injectAnalytics();

    // Inject Vercel Speed Insights
    const { injectSpeedInsights } = await import("@vercel/speed-insights");
    injectSpeedInsights();
  }
});
</script>

<template>
  <DefaultTheme.Layout />
</template>
