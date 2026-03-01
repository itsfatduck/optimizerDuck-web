import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { config as enConfig, searchLocale as searchLocaleEn } from "./config/en";

export default defineConfig({
  title: "optimizerDuck",
  titleTemplate: "optimizerDuck - :title",
  description:
    "Free, open-source Windows optimization tool for performance, privacy, and simplicity.",
  head: [
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
  ],
  lang: "en-US",

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

  // Replace VitePress built-in components with custom ones
  vite: {
    resolve: {
      alias: ["VPNavBarMenu", "VPNavScreenMenu", "VPFooter"].map(
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
  },
});
