/**
 * Content model for the multilingual, Markdown-backed service + guide pages
 * (Phase 3).
 *
 * A service/guide is language-neutral (slug, ordering, relations); its content
 * lives in a per-language `Translation`. `pl` is the authored base and the
 * fallback used when a locale has no translation of its own.
 */
import type { Language } from "@/seo/site";

export interface Faq {
  q: string;
  a: string;
}

/** A guide's closing call-to-action, pointing at a service. */
export interface GuideCta {
  /** Target service slug; the page builds a language-aware URL from it. */
  serviceSlug: string;
  label: string;
  text: string;
}

/** One language's content for a service or guide. The body is Markdown. */
export interface Translation {
  /** Short label for cards, listings and breadcrumbs. */
  title: string;
  /** Visible page heading. Defaults to `title`. */
  h1?: string;
  /** Document `<title>`. Defaults to `title`. */
  seoTitle?: string;
  /** Meta description. Defaults to `excerpt`. */
  seoDescription?: string;
  /** One-line summary for tiles / listings / the default meta description. */
  excerpt: string;
  /** Body content as Markdown (may contain `[guide:slug]` shortcodes). */
  markdown: string;
  /** Optional Q&A - rendered visibly and emitted as FAQPage JSON-LD. */
  faq?: Faq[];
  /** Guides only: closing CTA to a service. */
  cta?: GuideCta;
}

export type Translations = Partial<Record<Language, Translation>>;

/** A dedicated, indexable service. */
export interface ServiceEntry {
  slug: string;
  /** Featured services sort first and render with the featured card. */
  featured: boolean;
  sortOrder: number;
  heroImage?: string;
  /** Curated related-guide slugs (the `service_guides` join in the DB). */
  relatedGuides: string[];
  /** Per-language content; `pl` is the authored base / fallback. */
  translations: Translations;
}

/** An informational guide article. */
export interface GuideEntry {
  slug: string;
  sortOrder: number;
  heroImage?: string;
  translations: Translations;
}

/** A translation resolved for a requested language (fallback applied). */
export interface ResolvedTranslation extends Translation {
  /** Language actually used - may differ from the request after fallback. */
  resolvedLang: Language;
}
