import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { config as enConfig, searchLocale as searchLocaleEn } from "./config/en";

const PROD_URL = "https://optimizerduck.vercel.app";

export default defineConfig({
  title: "optimizerDuck",
  titleTemplate: ":title - optimizerDuck",
  ignoreDeadLinks: true,
  lastUpdated: true,
  description:
    "Free, open-source Windows optimization tool for performance, privacy, and simplicity.",
  lang: "en-US",

  head: [
    // Fonts
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
    ["link", { rel: "icon", href: "/favicon.ico" }],

    // SEO - Open Graph
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "optimizerDuck" }],
    ["meta", { property: "og:title", content: "optimizerDuck - Windows Optimization Tool" }],
    ["meta", { property: "og:description", content: "Free, open-source Windows optimization tool for performance, privacy, and simplicity." }],
    ["meta", { property: "og:url", content: PROD_URL }],
    ["meta", { property: "og:image", content: `${PROD_URL}/icon.png` }],
    ["meta", { property: "og:locale", content: "en_US" }],

    // SEO - Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "optimizerDuck - Windows Optimization Tool" }],
    ["meta", { name: "twitter:description", content: "Free, open-source Windows optimization tool for performance, privacy, and simplicity." }],
    ["meta", { name: "twitter:image", content: `${PROD_URL}/icon.png` }],

    // SEO - Structured Data (JSON-LD)
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "optimizerDuck",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Windows",
        description:
          "Free, open-source Windows optimization tool for performance, privacy, and simplicity.",
        url: PROD_URL,
        image: `${PROD_URL}/icon.png`,
        author: {
          "@type": "Organization",
          name: "optimizerDuck Developers",
          url: "https://github.com/itsfatduck/optimizerDuck",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }),
    ],
  ],

  // Sitemap for SEO
  sitemap: {
    hostname: PROD_URL,
  },

  // Canonical URLs for every page
  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/\.md$/, "");
    const canonicalUrl = `${PROD_URL}/${path}`;
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push([
      "link",
      { rel: "canonical", href: canonicalUrl },
    ]);
  },

  themeConfig: {
    logo: "/icon.png",
    siteTitle: 'optimizer<span class="duck-text">Duck</span>',

    socialLinks: [
      { icon: "discord", link: "https://discord.gg/tDUBDCYw9Q" },
      {
        icon: "github",
        link: "https://github.com/itsfatduck/optimizerDuck",
      },
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          ...searchLocaleEn,
        },
      },
    },
  },

  locales: {
    ...enConfig,
  },

  vite: {
    resolve: {
      alias: ["VPNavBarMenu", "VPNavScreenMenu", "VPFooter", "VPFeature"].map(
        (componentName) => ({
          find: new RegExp(`^.*/${componentName}\\.vue$`),
          replacement: fileURLToPath(
            new URL(
              `./theme/components/${componentName.replace(/^VP/, "")}.vue`,
              import.meta.url,
            ),
          ),
        }),
      ),
    },
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "@nolebase/ui",
      ],
    },
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/ui",
      ],
    },
  },
});
