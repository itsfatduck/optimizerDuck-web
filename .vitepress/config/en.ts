import type { DefaultTheme } from "vitepress";

export const META_DESCRIPTION =
  "Free, open-source Windows optimization tool for performance, privacy, and simplicity.";

export const searchLocale: Record<
  string,
  Partial<Omit<DefaultTheme.LocalSearchOptions, "locales">>
> = {
  root: {
    translations: {
      button: {
        buttonText: "Search",
        buttonAriaLabel: "Search",
      },
      modal: {
        resetButtonTitle: "Reset search",
        backButtonTitle: "Close search",
        noResultsText: "No results for",
        footer: {
          selectText: "to select",
          selectKeyAriaLabel: "enter",
          navigateText: "to navigate",
          navigateUpKeyAriaLabel: "up arrow",
          navigateDownKeyAriaLabel: "down arrow",
          closeText: "to close",
          closeKeyAriaLabel: "escape",
        },
      },
    },
  },
};

export interface FooterNavItem {
  text: string;
  link: string;
}

export interface FooterNavGroup {
  title: string;
  items: FooterNavItem[];
}

export interface FooterConfig {
  navigation: FooterNavGroup[];
  license?: {
    text: string;
    link: string;
  };
  social?: {
    icon: string;
    name: string;
    link: string;
  }[];
  copyright?: string;
}

export const config = {
  root: {
    label: "English",
    lang: "en",
    description: META_DESCRIPTION,

    themeConfig: {
      nav: getNav(),
      sidebar: getSidebar(),
      outline: {
        label: "On this page",
        level: "deep" as const,
      },
      docFooter: {
        prev: "Previous page",
        next: "Next page",
      },
      footer: getFooter(),
      editLink: {
        pattern: "https://github.com/itsfatduck/optimizerduck-web/edit/main/:path",
        text: "Suggest improvements",
      },
      lastUpdated: {
        text: "Last updated",
        transformer: (timestamp: number) => {
          return new Date(timestamp).toLocaleDateString('en-US')
        }
      },
    },
  },
};

function getSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "General Sections",
      items: [
        { text: "Download", link: "/docs/download" },
        { text: "Changelog", link: "/docs/changelog" },
        { text: "Community", link: "/docs/community" },
      ],
    },
    {
      text: "Frequently Asked Questions",
      items: [
        {
          text: "General",
          link: "/docs/faq/general",
        },
        {
          text: "Troubleshooting",
          link: "/docs/faq/troubleshooting",
          collapsed: true,
          items: [
            {
              text: "SmartScreen Warning",
              link: "/docs/faq/troubleshooting/smartscreen",
            },
            {
              text: "Antivirus False Positive",
              link: "/docs/faq/troubleshooting/antivirus",
            },
            {
              text: "Download Issues",
              link: "/docs/faq/troubleshooting/download",
            },
            {
              text: "App Won't Open",
              link: "/docs/faq/troubleshooting/app-wont-open",
            },
            {
              text: "App Running Slowly",
              link: "/docs/faq/troubleshooting/slow-performance",
            },
            {
              text: "Something Broke",
              link: "/docs/faq/troubleshooting/revert-changes",
            },
          ],
        },
        {
          text: "Optimizing",
          link: "/docs/faq/optimizing",
        },
        {
          text: "Compatibility",
          link: "/docs/faq/compatibility",
        },
      ],
    },
    {
      text: "Guides",
      items: [
        {
          text: "Getting Started",
          link: "/docs/guides/getting-started",
        },
        {
          text: "How it Works",
          link: "/docs/guides/how-it-works",
        },
        {
          text: "Best Practices",
          link: "/docs/guides/best-practices",
        },
        {
          text: "Uninstalling & Reverting",
          link: "/docs/guides/uninstall",
        },
      ],
    },
    {
      text: "Features",
      items: [
        {
          text: "Optimize",
          link: "/docs/features/optimize",
        },
        {
          text: "Features",
          link: "/docs/features/features",
        },
        {
          text: "Bloatware",
          link: "/docs/features/bloatware",
        },
        {
          text: "Startup Manager",
          link: "/docs/features/startup-manager",
        },
        {
          text: "Scheduled Tasks",
          link: "/docs/features/scheduled-tasks",
        },
        {
          text: "Disk Cleanup",
          link: "/docs/features/disk-cleanup",
        },
      ],
    },
    {
      text: "Contribute",
      items: [
        {
          text: "Overview",
          link: "/docs/contribute/overview",
        },
        {
          text: "Contributors",
          link: "/docs/contribute/contributors",
        },
        {
          text: "Support Me",
          link: "/docs/contribute/support-me",
        },
        {
          text: "Website Development",
          link: "/docs/contribute/website-development",
        },
      ],
    },
  ];
}

function getNav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Get {app_version}",
      activeMatch: "^/*?(download|changelog)/*?$",
      items: [
        {
          text: "Download",
          link: "/docs/download",
        },
        {
          text: "Changelog",
          link: "/docs/changelog",
        },
      ],
    },
    {
      text: "Documentation",
      link: "/docs/guides/getting-started",
      activeMatch: "/docs/guides/",
    },
    {
      text: "Contribute",
      link: "/docs/contribute/overview",
      activeMatch: "/docs/contribute/",
    },
  ];
}

function getFooter(): FooterConfig {
  return {
    navigation: [
      {
        title: "Links",
        items: [
          { text: "GitHub", link: "https://github.com/itsfatduck/optimizerDuck" },
          { text: "Discord", link: "https://discord.gg/tDUBDCYw9Q" },
        ],
      },
      {
        title: "Legal",
        items: [
          { text: "License", link: "https://github.com/itsfatduck/optimizerDuck/blob/master/LICENSE" },
        ],
      },
    ],
    license: {
      text: "GPL-3.0 Licensed",
      link: "https://github.com/itsfatduck/optimizerDuck/blob/master/LICENSE",
    },
    social: [
      {
        icon: "discord",
        name: "Discord",
        link: "https://discord.gg/tDUBDCYw9Q",
      },
      {
        icon: "github",
        name: "GitHub",
        link: "https://github.com/itsfatduck/optimizerDuck",
      },
    ],
    copyright: `© ${new Date(2025, 1).getFullYear()}-${new Date().getFullYear()} optimizerDuck Developers. All rights reserved.`,
  };
}
