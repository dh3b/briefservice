/**
 * `[guide:slug]` / `[guide:slug|Custom label]` shortcode handling.
 *
 * Dependency-free so it can be shared by the build-time Markdown renderer
 * (server) and the admin live preview (browser) without pulling in
 * sanitize-html.
 */

export interface GuideLink {
  href: string;
  label: string;
}

/** Resolve a guide slug (and optional custom label) to a link, or null. */
export type GuideLinkResolver = (slug: string, customLabel?: string) => GuideLink | null;

export const GUIDE_SHORTCODE = /\[guide:([a-z0-9-]+)(?:\|([^\]]+))?\]/g;

/**
 * Expand `[guide:slug]` / `[guide:slug|Label]` shortcodes into Markdown links.
 * Unknown slugs degrade gracefully to plain text (the label or the slug).
 */
export function resolveGuideShortcodes(markdown: string, resolve: GuideLinkResolver): string {
  return markdown.replace(GUIDE_SHORTCODE, (_whole, slug: string, rawLabel?: string) => {
    const label = rawLabel?.trim();
    const link = resolve(slug, label);
    if (!link) return label || slug;
    return `[${link.label}](${link.href})`;
  });
}
