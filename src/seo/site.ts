/**
 * Single source of truth for the site's language/route matrix and the
 * SEO primitives derived from it (canonical URLs, hreflang alternates,
 * prerender path list, sitemap XML).
 *
 * This module is intentionally dependency-free: it imports nothing and
 * touches no browser or `import.meta` globals, so it can be imported both
 * by the React app (via the `@/seo/site` alias) and by `vite.config.ts`
 * at build time (via a relative path) without resolution surprises.
 *
 * `src/config.ts` and `src/types.ts` re-export the constants below so the
 * rest of the codebase keeps importing from its usual places.
 */

export const SUPPORTED_LANGUAGES = ["pl", "en", "uk", "ru", "cs", "es", "it", "hu", "ro", "lt"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Language used for x-default and as the fallback for invalid/unknown locales. */
export const FALLBACK_LANGUAGE: Language = "en";

export const BASE_DOMAIN = "brief-service.com";
export const SITE_URL = `https://${BASE_DOMAIN}`;

export interface PageDef {
  /** Path after the language segment. "" is the language home page. */
  path: string;
  /** Whether the page should be indexed and appear in the sitemap. */
  index: boolean;
}

/**
 * Every content route the app renders under `/:lang`. Order here drives the
 * sitemap order. `admin` is rendered (so its noindex tag is baked in) but is
 * never indexed nor listed in the sitemap.
 */
export const PAGES: readonly PageDef[] = [
  { path: "", index: true },
  { path: "zmiana-dmc", index: true },
  { path: "landing", index: true },
  { path: "privacy-policy", index: true },
  { path: "admin", index: false },
];

/** Strip leading/trailing slashes from a sub-path. */
function clean(subPath: string): string {
  return subPath.replace(/^\/+|\/+$/g, "");
}

/**
 * Absolute, self-referential canonical URL for a page in a given language.
 * The language home keeps a trailing slash (`/pl/`); sub-pages do not
 * (`/pl/zmiana-dmc`), matching the served file layout (dirStyle: nested).
 */
export function canonicalUrl(lang: Language, subPath: string): string {
  const rest = clean(subPath);
  return rest ? `${SITE_URL}/${lang}/${rest}` : `${SITE_URL}/${lang}/`;
}

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

/** hreflang alternates for a given sub-path: one per language, plus x-default. */
export function hreflangAlternates(subPath: string): HreflangAlternate[] {
  const alts: HreflangAlternate[] = SUPPORTED_LANGUAGES.map((lang) => ({
    hreflang: lang,
    href: canonicalUrl(lang, subPath),
  }));
  alts.push({ hreflang: "x-default", href: canonicalUrl(FALLBACK_LANGUAGE, subPath) });
  return alts;
}

/**
 * The full list of route paths to statically prerender:
 * the bare root plus every language × page (admin included so its noindex
 * markup is generated). Consumed by `ssgOptions.includedRoutes`.
 */
export function staticRenderPaths(): string[] {
  const paths: string[] = ["/"];
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const page of PAGES) {
      paths.push(page.path ? `/${lang}/${page.path}` : `/${lang}`);
    }
  }
  return paths;
}

/** Build the sitemap XML from the indexable language × page matrix. */
export function buildSitemapXml(): string {
  const indexable = PAGES.filter((p) => p.index);
  const urls: string[] = [];

  for (const page of indexable) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const loc = canonicalUrl(lang, page.path);
      const alternates = hreflangAlternates(page.path)
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
