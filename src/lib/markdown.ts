/**
 * Markdown rendering for service/guide bodies.
 *
 * Content is authored as Markdown and stored as raw Markdown (in the DB or the
 * committed seed). It is rendered to sanitized HTML at build time. Inline
 * `[guide:slug]` / `[guide:slug|Custom label]` shortcodes are expanded to
 * language-aware links before parsing.
 */
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export interface GuideLink {
  href: string;
  label: string;
}

/** Resolve a guide slug (and optional custom label) to a link, or null. */
export type GuideLinkResolver = (slug: string, customLabel?: string) => GuideLink | null;

const SHORTCODE = /\[guide:([a-z0-9-]+)(?:\|([^\]]+))?\]/g;

/**
 * Expand `[guide:slug]` / `[guide:slug|Label]` shortcodes into Markdown links.
 * Unknown slugs degrade gracefully to plain text (the label or the slug).
 */
export function resolveGuideShortcodes(markdown: string, resolve: GuideLinkResolver): string {
  return markdown.replace(SHORTCODE, (_whole, slug: string, rawLabel?: string) => {
    const label = rawLabel?.trim();
    const link = resolve(slug, label);
    if (!link) return label || slug;
    return `[${link.label}](${link.href})`;
  });
}

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
