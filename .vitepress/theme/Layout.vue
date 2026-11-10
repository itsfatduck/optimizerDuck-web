<script setup>
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";

// Analytics + Speed Insights: idle-deferred so they never compete with LCP on load.
function injectVercelVitals() {
  const isProd =
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1";
  if (!isProd) return;

  const run = () => {
    import("@vercel/analytics").then(({ inject }) => inject());
    import("@vercel/speed-insights").then(({ injectSpeedInsights }) =>
      injectSpeedInsights(),
    );
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1500);
  }
}

onMounted(() => {
  injectVercelVitals();
});
</script>

<template>
  <DefaultTheme.Layout />
</template>
