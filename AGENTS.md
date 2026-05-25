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

<!-- CODEGRAPH_START -->
## CodeGraph

This project has a CodeGraph MCP server (`codegraph_*` tools) configured. CodeGraph is a tree-sitter-parsed knowledge graph of every symbol, edge, and file. Reads are sub-millisecond and return structural information grep cannot.

### When to prefer codegraph over native search

Use codegraph for **structural** questions — what calls what, what would break, where is X defined, what is X's signature. Use native grep/read only for **literal text** queries (string contents, comments, log messages) or after you already have a specific file open.

| Question | Tool |
|---|---|
| "Where is X defined?" / "Find symbol named X" | `codegraph_search` |
| "What calls function Y?" | `codegraph_callers` |
| "What does Y call?" | `codegraph_callees` |
| "What would break if I changed Z?" | `codegraph_impact` |
| "Show me Y's signature / source / docstring" | `codegraph_node` |
| "Give me focused context for a task/area" | `codegraph_context` |
| "Survey an unfamiliar module/topic" | `codegraph_explore` |
| "What files exist under path/" | `codegraph_files` |
| "Is the index healthy?" | `codegraph_status` |

### Rules of thumb

- **Trust codegraph results.** They come from a full AST parse. Do NOT re-verify them with grep — that's slower, less accurate, and wastes context.
- **Don't grep first** when looking up a symbol by name. `codegraph_search` is faster and returns kind + location + signature in one call.
- **Don't chain `codegraph_search` + `codegraph_node`** when you just want context — `codegraph_context` is one call.
- **`codegraph_explore` is the heavy hitter** for unfamiliar areas — it returns full source from all relevant files in one call, but is token-heavy. If your harness supports parallel subagents (e.g., Claude Code's Task tool), spawn one for explore-class questions to keep main session context clean.
- **Index lag**: the file watcher debounces ~500ms behind writes; don't re-query immediately after editing a file in the same turn.

### If `.codegraph/` doesn't exist

The MCP server returns "not initialized." Ask the user: *"I notice this project doesn't have CodeGraph initialized. Want me to run `codegraph init -i` to build the index?"*
<!-- CODEGRAPH_END -->
