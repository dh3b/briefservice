/**
 * Content model for the Polish service + guide pages (Phase 3).
 *
 * Content is currently authored in Polish only. The shape is language-neutral,
 * so a `Record<Language, ...>` layer can be added later without changing the
 * page templates.
 */

export interface ContentSection {
  heading: string;
  /** Body paragraphs. */
  body?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface Faq {
  q: string;
  a: string;
}

/** A dedicated, indexable service page under /pl/uslugi/<slug>. */
export interface ServicePage {
  slug: string;
  /** Document <title>. */
  title: string;
  /** Meta description. */
  description: string;
  h1: string;
  /** Short service name (cards, nav, Service schema). */
  name: string;
  /** One-line summary for the services hub card. */
  summary: string;
  /** Intro paragraph under the H1. */
  lead: string;
  sections: ContentSection[];
  /** "What you get" highlights. */
  highlights: string[];
  faq: Faq[];
  /** Slugs of related guides (under /pl/poradnik/). */
  relatedGuides?: string[];
}

/** An informational guide page under /pl/poradnik/<slug>. */
export interface Guide {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** One-line summary for the guides hub card. */
  summary: string;
  lead: string;
  sections: ContentSection[];
  faq: Faq[];
  /** CTA at the end of the guide, pointing at the relevant service. */
  cta: { href: string; label: string; text: string };
}
