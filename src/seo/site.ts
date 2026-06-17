/**
 * Single source of truth for the site's language/route data and the SEO
 * primitives derived from it: canonical URLs, hreflang alternates, JSON-LD
 * builders, and the sitemap.
 *
 * Pure data + functions (no browser globals), so it can be imported anywhere —
 * Astro layouts, the sitemap endpoint, and unit tests.
 */

export const SUPPORTED_LANGUAGES = ["pl", "en", "uk", "ru", "cs", "es", "it", "hu", "ro", "lt"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Language used for x-default and as the fallback for invalid/unknown locales. */
export const FALLBACK_LANGUAGE: Language = "en";

export const BASE_DOMAIN = "brief-service.com";
export const SITE_URL = `https://${BASE_DOMAIN}`;

/** Strip leading/trailing slashes from a sub-path. */
function clean(subPath: string): string {
  return subPath.replace(/^\/+|\/+$/g, "");
}

/**
 * Absolute, self-referential canonical URL for a page in a given language.
 * The language home keeps a trailing slash (`/pl/`); sub-pages do not
 * (`/pl/zmiana-dmc`), matching the served file layout.
 */
export function canonicalUrl(lang: Language, subPath: string): string {
  const rest = clean(subPath);
  return rest ? `${SITE_URL}/${lang}/${rest}` : `${SITE_URL}/${lang}/`;
}

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

/**
 * hreflang alternates for a sub-path. `langs` is the set of languages the page
 * actually exists in (defaults to all). x-default points at the fallback
 * language when present, otherwise the first available language.
 */
export function hreflangAlternates(
  subPath: string,
  langs: readonly Language[] = SUPPORTED_LANGUAGES,
): HreflangAlternate[] {
  const alts: HreflangAlternate[] = langs.map((lang) => ({
    hreflang: lang,
    href: canonicalUrl(lang, subPath),
  }));
  const xDefault = langs.includes(FALLBACK_LANGUAGE) ? FALLBACK_LANGUAGE : langs[0];
  if (xDefault) alts.push({ hreflang: "x-default", href: canonicalUrl(xDefault, subPath) });
  return alts;
}

export interface PageDef {
  /** Path after the language segment. "" is the language home page. */
  path: string;
  /** Whether the page should be indexed and appear in the sitemap. */
  index: boolean;
}

/**
 * The base pages that exist in every supported language (driven by
 * translations.ts). Per-service and guide pages are Polish-only and live in
 * their own content modules; the sitemap endpoint adds them as entries.
 */
export const PAGES: readonly PageDef[] = [
  { path: "", index: true },
  { path: "zmiana-dmc", index: true },
  { path: "landing", index: true },
  { path: "privacy-policy", index: true },
  { path: "admin", index: false },
];

/** A page (sub-path) and the set of languages it is published in. */
export interface SitemapEntry {
  subPath: string;
  langs: readonly Language[];
}

/** Sitemap entries for the base, all-language indexable pages. */
export function baseSitemapEntries(): SitemapEntry[] {
  return PAGES.filter((p) => p.index).map((p) => ({
    subPath: p.path,
    langs: SUPPORTED_LANGUAGES,
  }));
}

/** Build sitemap XML from a list of (sub-path × languages) entries. */
export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls: string[] = [];

  for (const entry of entries) {
    for (const lang of entry.langs) {
      const loc = canonicalUrl(lang, entry.subPath);
      const alternates = hreflangAlternates(entry.subPath, entry.langs)
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
        .join("\n");
      urls.push(`  <url>\n    <loc>${loc}</loc>\n${alternates}\n  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

/* ----------------------------- JSON-LD builders ---------------------------- */

/**
 * Sitewide Organization structured data. States explicitly that this is a
 * private service, not a government authority.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BriefService",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Private service company handling vehicle formalities and technical modifications in Germany (GVW/DMC changes, structural modifications, recovery of the German vehicle title/brief). Not affiliated with any government authority.",
    areaServed: { "@type": "Country", name: "DE" },
    availableLanguage: [...SUPPORTED_LANGUAGES],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+48696513109",
      email: "audicarforme@op.pl",
      availableLanguage: ["Polish", "German", "English"],
    },
  };
}

/** `Service` JSON-LD for a single service page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: opts.url,
    areaServed: { "@type": "Country", name: "DE" },
    provider: {
      "@type": "Organization",
      name: "BriefService",
      url: `${SITE_URL}/`,
    },
  };
}

/** `FAQPage` JSON-LD from question/answer pairs. */
export function faqSchema(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** `BreadcrumbList` JSON-LD from an ordered list of crumbs. */
export function breadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
