import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { config as enConfig, searchLocale as searchLocaleEn } from "./config/en";

const PROD_URL = "https://optimizerduck.vercel.app";

// Per-page default descriptions for pages without explicit frontmatter description
const PAGE_DESCRIPTIONS: Record<string, string> = {
  "docs/download":
    "Download optimizerDuck for Windows 10 and 11. Free, portable Windows optimization tool. No installation needed. Get the latest release.",
  "docs/changelog":
    "See all optimizerDuck release notes, version history, bug fixes, and new features. Stay up to date with the latest improvements.",
  "docs/community":
    "Join the optimizerDuck community on Discord and GitHub. Get help, share feedback, report bugs, and connect with other Windows optimization users.",
  "docs/guides/getting-started":
    "Get started with optimizerDuck. Download, launch, change language, and start optimizing your Windows PC for better performance and privacy.",
  "docs/guides/how-it-works":
    "Learn how optimizerDuck works under the hood. Registry edits, Windows Services, Scheduled Tasks, and PowerShell commands explained for safe optimization.",
  "docs/guides/best-practices":
    "Best practices for Windows optimization with optimizerDuck. Safe tweaks for gamers, office users, developers, and daily PC use.",
  "docs/guides/uninstall":
    "How to uninstall optimizerDuck and revert system changes. Step-by-step guide to safely undo all optimizations and remove the portable app.",
  "docs/features/optimize":
    "Optimize Windows performance and privacy with optimizerDuck. Apply tweaks for gaming, network, latency, and system responsiveness.",
  "docs/features/customize":
    "Customize Windows appearance and behavior with optimizerDuck. Tweak desktop icons, taskbar, Explorer, gaming settings, and system features.",
  "docs/features/bloatware":
    "Remove Windows bloatware and pre-installed apps with optimizerDuck. Free up disk space and improve system performance safely.",
  "docs/features/startup-manager":
    "Manage Windows startup programs with optimizerDuck's Startup Manager. Disable unnecessary startup apps to speed up boot time.",
  "docs/features/scheduled-tasks":
    "Manage Windows Scheduled Tasks with optimizerDuck. Disable or remove unnecessary automated processes and improve system performance.",
  "docs/features/disk-cleanup":
    "Free up disk space on Windows with optimizerDuck's Disk Cleanup tool. Remove temporary files, browser caches, and system junk safely.",
  "docs/faq/general":
    "Frequently asked questions about optimizerDuck. Is it safe? Is it free? Does it collect data? Windows 10/11 support, portability, and more.",
  "docs/faq/optimizing":
    "Frequently asked questions about Windows optimization with optimizerDuck. Performance benefits, risks, FPS impact, and how optimizations work.",
  "docs/faq/compatibility":
    "optimizerDuck compatibility guide. Anti-cheat systems, antivirus conflicts, offline use, Windows Server support, and work environment safety.",
  "docs/faq/troubleshooting":
    "Troubleshooting guide for optimizerDuck. Fix SmartScreen warnings, antivirus false positives, download issues, app crashes, and slow performance.",
  "docs/faq/troubleshooting/antivirus":
    "Fix antivirus false positives flagging optimizerDuck. Steps for Windows Defender, Avast, Bitdefender, Malwarebytes, Norton, and others.",
  "docs/faq/troubleshooting/app-wont-open":
    "Fix optimizerDuck not opening or crashing on launch. Check system requirements, run as administrator, verify downloads, and repair system files.",
  "docs/faq/troubleshooting/download":
    "Fix optimizerDuck download issues. Browser blocks, SmartScreen warnings, manual GitHub download, cache clearing, and connectivity checks.",
  "docs/faq/troubleshooting/revert-changes":
    "Revert optimizerDuck system changes. Use System Restore, toggle off optimizations, fix network or audio issues, and restore missing backup files.",
  "docs/faq/troubleshooting/slow-performance":
    "Fix optimizerDuck running slowly or being unresponsive. Close programs, free disk space, manage startup, re-download the app.",
  "docs/faq/troubleshooting/smartscreen":
    "Fix Windows SmartScreen warning for optimizerDuck. Click Run anyway to bypass the Windows protected your PC message safely.",
  "docs/contribute/overview":
    "Contribute to optimizerDuck. Report bugs, suggest features, improve documentation, add translations, or submit code. Open source welcomes you.",
  "docs/contribute/contributors":
    "Meet the optimizerDuck contributors and core maintainers. Learn how to become a contributor and get featured on the contributors page.",
  "docs/contribute/support-me":
    "Support optimizerDuck development. Buy me a coffee, star the GitHub repository, or share the project with friends. Every contribution helps.",
  "docs/contribute/website-development":
    "Guide to developing the optimizerDuck website. VitePress setup, Vue components, Markdown pages, and how to contribute to the documentation.",
  "docs/thanks":
    "Meet the supporters who made optimizerDuck possible. Thank you to everyone who donated, contributed, and supported the project.",
};

export default defineConfig({
  title: "optimizerDuck",
  titleTemplate: ":title - optimizerDuck",
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  description:
    "Free, open-source Windows optimization tool for performance, privacy, and simplicity.",
  lang: "en-US",

  head: [
    // Fonts
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        crossorigin: "anonymous",
      },
    ],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "/icon.png" }],
    ["link", { rel: "preload", href: "/icon.webp", as: "image", type: "image/webp" }],

    // Meta - Theme & Viewport
    ["meta", { name: "theme-color", content: "#0a0a0a" }],
    [
      "meta",
      {
        name: "referrer",
        content: "strict-origin-when-cross-origin",
      },
    ],

    // Meta - SEO
    [
      "meta",
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
    ],
    [
      "meta",
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large" },
    ],
    ["meta", { name: "mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      {
        name: "format-detection",
        content: "telephone=no, address=no, email=no",
      },
    ],

    // SEO - Keywords
    [
      "meta",
      {
        name: "keywords",
        content: "optimizerDuck, Windows optimization, Windows cleaner, PC optimizer, debloat Windows, privacy tool, free open source, system tweaks, gaming optimization",
      },
    ],
    ["meta", { name: "application-name", content: "optimizerDuck" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "optimizerDuck" }],
    ["meta", { name: "author", content: "fatDuck" }],

    // SEO - Open Graph (static base values; per-page title/desc/url set in transformPageData)
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "optimizerDuck" }],
    ["meta", { property: "og:image", content: `${PROD_URL}/icon.png` }],
    ["meta", { property: "og:image:width", content: "256" }],
    ["meta", { property: "og:image:height", content: "256" }],
    ["meta", { property: "og:locale", content: "en_US" }],

    // SEO - Twitter Card (static base values; per-page title/desc set in transformPageData)
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: `${PROD_URL}/icon.png` }],

    // SEO - Structured Data (JSON-LD) - Organization + SoftwareApplication
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${PROD_URL}/#organization`,
            name: "optimizerDuck",
            url: PROD_URL,
            logo: `${PROD_URL}/icon.png`,
            sameAs: [
              "https://github.com/itsfatduck/optimizerDuck",
              "https://discord.gg/tDUBDCYw9Q",
            ],
          },
          {
            "@type": "SoftwareApplication",
            "@id": `${PROD_URL}/#softwareapplication`,
            name: "optimizerDuck",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Windows 10, Windows 11",
            description:
              "Free, open-source Windows optimization tool for performance, privacy, and simplicity.",
            url: PROD_URL,
            image: `${PROD_URL}/icon.png`,
            downloadUrl: "https://github.com/itsfatduck/optimizerDuck/releases/latest",
            softwareHelp: {
              "@id": `${PROD_URL}/docs/guides/getting-started`,
            },
            author: {
              "@type": "Person",
              name: "fatDuck",
              url: "https://github.com/itsfatduck",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            license: "https://github.com/itsfatduck/optimizerDuck/blob/master/LICENSE",
          },
          {
            "@type": "WebSite",
            "@id": `${PROD_URL}/#website`,
            url: PROD_URL,
            name: "optimizerDuck",
            description:
              "Free, open-source Windows optimization tool for performance, privacy, and simplicity.",
            publisher: {
              "@id": `${PROD_URL}/#organization`,
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${PROD_URL}/?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
        ],
      }),
    ],
  ],

  // Sitemap for SEO
  sitemap: {
    hostname: PROD_URL,
    lastModified: true,
    changefreq: 'weekly',
    priority: 0.7,
  },

  // Per-page SEO: canonical URLs + dynamic OG/Twitter tags
  transformPageData(pageData) {
    const pageId = pageData.relativePath.replace(/\.md$/, "");
    const canonicalUrl = `${PROD_URL}/${pageId === "index" ? "" : pageId}`;
    const pageTitle = pageData.frontmatter.title || pageData.title || "optimizerDuck";
    const pageDesc =
      pageData.frontmatter.description ||
      PAGE_DESCRIPTIONS[pageId] ||
      "Free, open-source Windows optimization tool for performance, privacy, and simplicity.";

    pageData.frontmatter.head ??= [];

    // Canonical URL
    pageData.frontmatter.head.push([
      "link",
      { rel: "canonical", href: canonicalUrl },
    ]);

    // Per-page OG tags
    pageData.frontmatter.head.push([
      "meta",
      { property: "og:title", content: pageTitle },
    ]);
    pageData.frontmatter.head.push([
      "meta",
      { property: "og:description", content: pageDesc },
    ]);
    pageData.frontmatter.head.push([
      "meta",
      { property: "og:url", content: canonicalUrl },
    ]);

    // Per-page Twitter tags
    pageData.frontmatter.head.push([
      "meta",
      { name: "twitter:title", content: pageTitle },
    ]);
    pageData.frontmatter.head.push([
      "meta",
      { name: "twitter:description", content: pageDesc },
    ]);

    // Breadcrumb structured data per page
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: PROD_URL,
      },
    ];

    if (pageId !== "index") {
      const parts = pageId.split("/");
      let accumulated = "";
      for (let i = 0; i < parts.length; i++) {
        accumulated += "/" + parts[i];
        breadcrumbItems.push({
          "@type": "ListItem",
          position: i + 2,
          name: parts[i],
          item: `${PROD_URL}${accumulated}`,
        });
      }
    }

    pageData.frontmatter.head.push([
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        itemListElement: breadcrumbItems,
      }),
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
