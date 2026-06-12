import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'optimizerDuck',
  },
  links: [
    {
      text: 'Download',
      url: '/docs/download',
      active: 'nested-url',
    },
    {
      text: 'Changelog',
      url: '/docs/changelog',
      active: 'nested-url',
    },
    {
      text: 'Documentation',
      url: '/docs/guides/getting-started',
      active: 'nested-url',
    },
    {
      text: 'Contribute',
      url: '/docs/contribute/overview',
      active: 'nested-url',
    },
  ],
  githubUrl: 'https://github.com/itsfatduck/optimizerDuck',
};
