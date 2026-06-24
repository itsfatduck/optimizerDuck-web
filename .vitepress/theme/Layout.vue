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

  // Restore animations on Windows with "Show animations" disabled.
  // Debloat tools often turn this off → browser sees prefers-reduced-motion: reduce →
  // VitePress default base.css kills ALL transitions/animations with !important.
  // We find and remove that rule so functional UI transitions keep working.
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let s = 0; s < document.styleSheets.length; s++) {
      const sheet = document.styleSheets[s];
      try {
        const rules = sheet.cssRules || [];
        for (let i = rules.length - 1; i >= 0; i--) {
          const rule = rules[i];
          if (!(rule instanceof CSSMediaRule)) continue;
          const cond = rule.conditionText?.replace(/\s/g, "").toLowerCase();
          if (cond !== "(prefers-reduced-motion:reduce)") continue;
          // Found a prefers-reduced-motion media rule. Check if it has a universal
          // selector subrule with transition-duration: 0s (VitePress's aggressive kill).
          const innerRules = rule.cssRules || [];
          for (let j = 0; j < innerRules.length; j++) {
            const inner = innerRules[j];
            if (inner instanceof CSSStyleRule && inner.style?.transitionDuration === "0s") {
              sheet.deleteRule(i);
              break;
            }
          }
        }
      } catch (_) { /* cross-origin stylesheet, skip */ }
    }
  }
});
</script>

<template>
  <DefaultTheme.Layout />
</template>
