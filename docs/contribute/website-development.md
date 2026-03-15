# Website development

This guide explains how the optimizerDuck website and documentation are built,
how to run them locally, and where to make changes. It is written for people
who want to improve content, update the VitePress theme, or add custom Vue
components without having to reverse-engineer the project first.

## What this project uses

This repository is the source for the public optimizerDuck website. It uses
[VitePress](https://vitepress.dev/) for routing, Markdown pages, the docs
layout, and static site generation. The site also uses Vue 3 inside Markdown
pages and in the custom theme.

At a glance:

- `VitePress` powers the site and docs
- `Vue 3` powers custom theme components and interactive content
- `Bun` is the preferred package manager for local development
- `npm` also works if you do not use Bun

## Prerequisites

Before you start, make sure your machine has the tools needed to run the site
locally and contribute changes safely.

- [Git](https://git-scm.com/) for cloning the repository and opening pull
  requests
- [Node.js](https://nodejs.org/) 18 or newer for the VitePress toolchain
- [Bun](https://bun.sh/) if you want to use the recommended package manager

> **Note:** Bun is the preferred option for this guide. If you use `npm`, the
> project still works, and both command sets are included below.

## Clone and install

Clone the repository, move into the project root, and install dependencies.
Run these commands from a terminal.

1. Clone the repository.
2. Move into the project directory.
3. Install dependencies with Bun or npm.

::: code-group

```bash [Bun]
git clone https://github.com/itsfatduck/optimizerDuck-web.git
cd optimizerDuck-web
bun install
```

```bash [npm]
git clone https://github.com/itsfatduck/optimizerDuck-web.git
cd optimizerDuck-web
npm install
```

:::

## Run the website locally

After dependencies are installed, start the VitePress development server. The
repository exposes the standard docs scripts from `package.json`.

::: code-group

```bash [Bun]
bun run docs:dev
```

```bash [npm]
npm run docs:dev
```

:::

VitePress usually starts on `http://localhost:5173`. When you edit Markdown,
Vue components, config files, or theme styles, the browser updates through hot
module replacement.

## Build and preview before opening a pull request

Before you submit larger changes, build the site once to catch broken imports,
invalid frontmatter, and Markdown errors. If you want to inspect the generated
site locally, run the preview command after the build completes.

::: code-group

```bash [Bun]
bun run docs:build
bun run docs:preview
```

```bash [npm]
npm run docs:build
npm run docs:preview
```

:::

## Understand the project structure

Most contributions only touch a small part of the repository. Knowing which
directory owns which responsibility makes the project much easier to navigate.

```text
optimizerDuck-web/
|- index.md                  # Home page
|- docs/                     # Documentation content pages
|- public/                   # Static assets served as-is
|- .vitepress/config.mts     # Main VitePress config entry
|- .vitepress/config/en.ts   # Navigation, sidebar, footer, edit links
|- .vitepress/theme/         # Custom theme, styles, layouts, components
`- package.json              # Dev scripts
```

### Content pages

The content layer is mostly Markdown. If you are fixing wording, adding a new
guide, or updating screenshots, you will usually work in these files.

- `index.md` is the landing page
- `docs/guides/` contains user-facing guides
- `docs/features/` explains optimizerDuck features
- `docs/faq/` contains frequently asked questions and troubleshooting pages
- `docs/contribute/` contains contributor-focused pages, including this guide

### VitePress configuration

The VitePress config is stored in the repository root under `.vitepress/`, not
inside `docs/`.

- `.vitepress/config.mts` defines the site title, head tags, social links,
  search, and Vite aliases
- `.vitepress/config/en.ts` defines the sidebar, top navigation, footer links,
  edit link behavior, and labels like **Last updated**

If you add a new page that should appear in the sidebar or top navigation, this
is where you wire it up.

### Theme and Vue components

The custom theme extends the default VitePress theme and registers shared Vue
components globally.

- `.vitepress/theme/index.ts` registers shared components such as
  `ImagePreview`, `ContributorList`, `SupportCard`, and GitHub-related widgets
- `.vitepress/theme/Layout.vue` customizes the overall site layout
- `.vitepress/theme/style.css` contains the global color system, typography,
  component styling, and VitePress overrides
- `.vitepress/theme/components/` contains reusable Vue components

If you need interactive UI or a site-wide visual change, you will usually work
in this area.

### Static assets

Files inside `public/` are served directly from the site root. This is the
right place for screenshots, icons, and other assets referenced by Markdown or
theme components.

Examples already in the project include:

- `public/guides/`
- `public/features/`
- `public/faq/`
- `public/icon.png`
- `public/favicon.ico`

When you add new images, keep filenames descriptive and use lowercase with
hyphens where possible.

## Write and edit Markdown pages

VitePress pages are Markdown-first, but they can also include Vue syntax. That
lets you keep most docs easy to edit while still using interactive components
where they improve the page.

Common patterns used in this repository:

- Standard Markdown headings, lists, links, and code blocks
- Custom containers such as `::: tip`, `::: info`, and `::: warning`
- Inline Vue expressions when a page needs dynamic content
- `<script setup>` blocks at the top of a page when Vue logic is needed
- Globally registered components such as `<ImagePreview />`

For internal links, follow the route style already used across the project.
For example:

```md
[Getting started](/docs/guides/getting-started)
```

If you create a new page, add the `.md` file in the correct `docs/` section and
then update `.vitepress/config/en.ts` if the page needs to appear in the
navigation or sidebar.

## Use the existing Vue-powered patterns

Some docs pages do more than render static Markdown. For example,
`docs/guides/getting-started.md` uses `<script setup>` together with a Vue
composable from `.vitepress/theme/composables/useGitHub.ts` to display release
data.

That means you can safely use:

- `<script setup>` in Markdown files when the page needs Vue logic
- Vue composables from the theme folder when the logic is shared
- Globally registered components without importing them manually

For example, screenshots usually use `ImagePreview` instead of a plain Markdown
image because it provides the lightbox experience already built into the site.

```md
<ImagePreview
  src="/guides/getting-started/tw.png"
  alt="Traditional Chinese interface of optimizerDuck"
  caption="Traditional Chinese interface of optimizerDuck"
/>
```

## Common contribution tasks

Most website contributions fall into one of the following categories. Start in
the matching area so you do not waste time searching.

### Update page content

If you are fixing copy, improving explanations, or adding a new doc page, work
inside `docs/` or `index.md`.

### Add or replace screenshots

If you are updating images:

1. Add the image file under the matching folder in `public/`.
2. Reference it with a root-relative path such as `/features/optimize/view.png`.
3. Prefer `<ImagePreview />` for screenshots shown inside documentation pages.

### Add a new reusable component

If a pattern appears in multiple pages:

1. Create the Vue component in `.vitepress/theme/components/`.
2. Register it in `.vitepress/theme/index.ts`.
3. Use it from Markdown pages without per-page imports.

### Update navigation or footer links

If you add a page or reorganize sections, update `.vitepress/config/en.ts`.
That file controls:

- top navigation
- sidebar groups
- footer navigation
- edit link settings
- localized labels used by the theme

### Change global styling

If you need to update colors, typography, spacing, or VitePress overrides, edit
`.vitepress/theme/style.css`. This file also contains the design tokens that
control brand colors and code block styling.

## A safe workflow for changes

If you are not sure where to begin, this workflow is a reliable default.

1. Start the dev server with `bun run docs:dev`.
2. Open the affected page in the browser.
3. Make the smallest change that solves the issue.
4. Verify links, screenshots, and sidebar entries still work.
5. Run a production build with `bun run docs:build`.

For content-only changes, this is usually enough. For theme or component work,
check both desktop and mobile layouts before you open a pull request.

## Submit your work

Once your changes are ready, push them to your fork or branch and open a pull
request against the website repository.

1. Commit your changes with a clear message.
2. Push your branch to GitHub.
3. Open a pull request in
   [`itsfatduck/optimizerDuck-web`](https://github.com/itsfatduck/optimizerDuck-web).
4. Describe what changed, why it changed, and how you verified it.

An example commit message:

```bash
git commit -m "docs: improve website development guide"
```

## Next steps

If you want to keep contributing after your first docs change, these are good
next areas to explore:

- improve a page under `docs/guides/` or `docs/faq/`
- add missing screenshots with `ImagePreview`
- clean up navigation labels in `.vitepress/config/en.ts`
- extract repeated page UI into a reusable component under
  `.vitepress/theme/components/`
