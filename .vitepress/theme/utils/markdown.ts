import MarkdownIt from "markdown-it";

let md: MarkdownIt | null = null;

function getParser(): MarkdownIt {
  if (!md) {
    md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    });
  }
  return md;
}

/**
 * Enhance img tags with lazy loading and async decoding.
 */
function enhanceImages(html: string): string {
  return html.replace(
    /<img([^>]*?)src=["']([^"']+?)["']([^>]*?)>/gi,
    (match, p1, src, p2) => {
      let attrs = ` ${p1} ${p2} `;
      if (!attrs.includes("loading=")) attrs += 'loading="lazy" ';
      if (!attrs.includes("decoding=")) attrs += 'decoding="async" ';
      return `<img src="${src}" ${attrs}>`;
    },
  );
}

/**
 * Convert @mentions and #issue references to GitHub links.
 * Skips mentions already inside <a>, <code>, or <pre> tags.
 */
function parseMentions(html: string, repo: string): string {
  let inSkipTag = 0;
  const parts = html.split(/(<\/?[a-z0-9]+[^>]*>)/gi);
  const processed = parts.map((part, index) => {
    if (index % 2 === 0) {
      if (inSkipTag > 0) return part;
      return part
        .replace(
          /\B@([a-z0-9](?:-?[a-z0-9]){0,38})\b/gi,
          '<a href="https://github.com/$1" target="_blank" rel="noopener noreferrer" class="mention">@$1</a>',
        )
        .replace(
          /(?<!\w|>)#(\d+)\b/g,
          `<a href="https://github.com/${repo}/issues/$1" target="_blank" rel="noopener noreferrer" class="issue-ref">#$1</a>`,
        );
    }
    const tagName = part.match(/^<\/?([a-z0-9]+)/i)?.[1]?.toLowerCase();
    if (tagName === "a" || tagName === "code" || tagName === "pre") {
      if (part.startsWith("</")) {
        inSkipTag = Math.max(0, inSkipTag - 1);
      } else {
        inSkipTag++;
      }
    }
    return part;
  });
  return processed.join("");
}

/**
 * Shorten GitHub PR (pull/N) and compare URLs into markdown links.
 * PR → [#N](url)  like GitHub does.
 */
function shortenGitHubUrls(content: string): string {
  return content
    .replace(
      /https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)/g,
      (_m, _owner, _repo, num) => `[#${num}](${_m})`,
    )
    .replace(
      /https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/compare\/([\w.%]+)/g,
      (_m, _owner, _repo, range) => `[${range}](${_m})`,
    );
}

// ponytail: one shared render cache for all renderer instances. Components
// remount on every SPA navigation and previously each rebuilt its own empty
// cache, re-rendering the same release bodies. Key includes a content hash
// so edited release bodies still re-render. Capped to bound memory.
const renderCache = new Map<string, string>();
const RENDER_CACHE_LIMIT = 100;

function hashContent(content: string): number {
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash + content.charCodeAt(i)) | 0;
  }
  return hash;
}

/**
 * Create a cached markdown renderer for GitHub release/changelog content.
 * Returns (content: string, id: string | number) => HTML string.
 */
export function createGitHubMD(repo: string) {
  return function renderMD(content: string, id: string | number): string {
    if (!content) return "";
    const key = `${repo}:${id}:${hashContent(content)}`;
    const hit = renderCache.get(key);
    if (hit !== undefined) return hit;

    let processed = shortenGitHubUrls(content);
    let html = getParser().render(processed);
    html = enhanceImages(html);
    html = parseMentions(html, repo);

    if (renderCache.size >= RENDER_CACHE_LIMIT) {
      const oldest = renderCache.keys().next();
      if (!oldest.done) renderCache.delete(oldest.value);
    }
    renderCache.set(key, html);
    return html;
  };
}
