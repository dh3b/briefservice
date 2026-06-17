import { Head } from "vite-react-ssg";
import { useLanguage } from "@/i18n/LanguageContext";
import { canonicalUrl, hreflangAlternates } from "@/seo/site";

export interface SeoProps {
  /** Document <title>. */
  title: string;
  /** Meta description. */
  description: string;
  /** Path after the language segment ("" for the language home page). */
  path: string;
  /** When true, emit `noindex` and skip hreflang alternates. */
  noindex?: boolean;
  /** Optional JSON-LD object(s) to embed for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Emits per-page, per-language head tags at render time so they end up in the
 * prerendered HTML: title, description, a self-referential canonical, Open
 * Graph tags, hreflang alternates (+ x-default) and optional JSON-LD.
 *
 * Replaces the old `useSEO` effect, which set these only after React mounted.
 */
export default function Seo({ title, description, path, noindex, jsonLd }: SeoProps) {
  const { language } = useLanguage();
  const canonical = canonicalUrl(language, path);
  const alternates = hreflangAlternates(path);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BriefService" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={language} />

      {!noindex &&
        alternates.map((a) => (
          <link key={a.hreflang} rel="alternate" hrefLang={a.hreflang} href={a.href} />
        ))}

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}
