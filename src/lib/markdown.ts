/**
 * Build-time Markdown rendering for service/guide bodies.
 *
 * Content is authored as Markdown and stored as raw Markdown (in the DB or the
 * committed seed). It is rendered to sanitized HTML at build time. Inline
 * `[guide:slug]` shortcodes are expanded to language-aware links first (see
 * ./guide-shortcodes, which is dependency-free so the admin can share it).
 */
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { resolveGuideShortcodes, type GuideLinkResolver } from "./guide-shortcodes";

export { resolveGuideShortcodes };
export type { GuideLink, GuideLinkResolver } from "./guide-shortcodes";

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2", "img"],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
};

export interface RenderOptions {
  /** When provided, `[guide:slug]` shortcodes are expanded to links. */
  resolveGuide?: GuideLinkResolver;
}

/** Render (trusted-but-sanitized) Markdown to an HTML string. */
export function renderMarkdown(markdown: string, opts: RenderOptions = {}): string {
  const withLinks = opts.resolveGuide
    ? resolveGuideShortcodes(markdown, opts.resolveGuide)
    : markdown;
  const html = marked.parse(withLinks, { async: false }) as string;
  return sanitizeHtml(html, SANITIZE_OPTS);
}
