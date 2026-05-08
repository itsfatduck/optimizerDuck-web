# AGENTS.md

## Project Overview

VitePress documentation website for optimizerDuck - a Windows optimization tool.

**Stack**: VitePress + Vue 3 + TypeScript  
**Deployment**: Vercel  
**Package Manager**: npm (or bun)

## Commands

```bash
npm run docs:dev      # Start dev server (http://localhost:5173)
npm run docs:build   # Production build
npm run docs:preview # Preview production build
```

## Architecture

- `docs/` - Markdown documentation content
- `.vitepress/` - VitePress config and theme
  - `config.mts` - Main config entry
  - `config/en.ts` - English locale config
  - `theme/Layout.vue` - Custom theme with Vercel analytics
- `public/` - Static assets (favicon, images)

## Custom Skills

This repo has installed skills for documentation and UI work:

- **`docs-writer`** - Use for any `.md` file editing in `docs/`
- **`vitepress`** - Use for VitePress-specific questions
- **`vue`** - Use for Vue component questions

## Build Output

Production build outputs to `.vitepress/dist/` - this is the deploy target for Vercel.

## Verification

After changes:
1. Run `npm run docs:build` to verify no build errors
2. Preview with `npm run docs:preview` to check locally