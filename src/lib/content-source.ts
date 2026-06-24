/**
 * Build-time content source for the multilingual service + guide pages.
 *
 * When `CONTENT_API` is set (the in-place rebuild builder runs with
 * `CONTENT_API=http://api:3001/api`), content is fetched from the live API and
 * the database is the source of truth. Otherwise - local builds, an
 * empty/unreachable DB - services and guides are empty: everything is DB-only,
 * including the featured `zmiana-dmc` service. The former committed mockup
 * bodies are archived in `docs/archived-content.md`.
 *
 * `pl` is the authored base and the fallback language for any locale that has
 * no translation of its own.
 */
import { SUPPORTED_LANGUAGES, type Language } from "@/seo/site";
import type {
  ServiceEntry,
  GuideEntry,
  Translation,
  Translations,
  ResolvedTranslation,
  Faq,
  GuideCta,
} from "@/content/types";
import type { GuideLinkResolver } from "@/lib/markdown";

/** Language used as the content fallback (distinct from the SEO x-default). */
export const DEFAULT_CONTENT_LANG: Language = "pl";

const API = process.env.CONTENT_API;

/* ------------------------------- fetching --------------------------------- */

async function fetchRows(resource: string): Promise<Record<string, unknown>[] | null> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}/${resource}`);
    if (!res.ok) throw new Error(`${resource} -> HTTP ${res.status}`);
    return (await res.json()) as Record<string, unknown>[];
  } catch (err) {
    console.warn(
      `[content-source] Could not load ${resource} from ${API} (${(err as Error).message}). ` +
        `Falling back to committed content.`,
    );
    return null;
  }
}

/* --------------------------- normalisation -------------------------------- */

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const num = (v: unknown): number => (typeof v === "number" ? v : 0);
const asStrings = (v: unknown): string[] =>
  Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
const asFaq = (v: unknown): Faq[] | undefined =>
  Array.isArray(v) ? (v as Faq[]) : undefined;

/** Parse the API's per-language translation rows into a `Translations` map. */
function parseTranslations(v: unknown): Translations {
  const out: Translations = {};
  if (!Array.isArray(v)) return out;
  for (const raw of v) {
    const row = raw as Record<string, unknown>;
    const lang = str(row.lang) as Language;
    if (!SUPPORTED_LANGUAGES.includes(lang)) continue;
    const title = str(row.title);
    const markdown = str(row.markdown);
    if (!title && !markdown) continue;
    const t: Translation = {
      title,
      h1: str(row.h1) || undefined,
      seoTitle: str(row.seo_title) || undefined,
      seoDescription: str(row.seo_description) || undefined,
      excerpt: str(row.excerpt),
      markdown,
      faq: asFaq(row.faq),
      cta: (row.cta as GuideCta | undefined) ?? undefined,
    };
    out[lang] = t;
  }
  return out;
}

function rowToService(row: Record<string, unknown>): ServiceEntry | null {
  const slug = str(row.slug);
  if (!slug) return null;
  const translations = parseTranslations(row.translations);
  if (!Object.keys(translations).length) return null;
  return {
    slug,
    featured: Boolean(row.featured),
    sortOrder: num(row.sort_order),
    heroImage: str(row.hero_image) || undefined,
    relatedGuides: asStrings(row.related_guides),
    translations,
  };
}

function rowToGuide(row: Record<string, unknown>): GuideEntry | null {
  const slug = str(row.slug);
  if (!slug) return null;
  const translations = parseTranslations(row.translations);
  if (!Object.keys(translations).length) return null;
  return {
    slug,
    sortOrder: num(row.sort_order),
    heroImage: str(row.hero_image) || undefined,
    translations,
  };
}

/* ------------------------------- ordering --------------------------------- */

function sortServices(list: ServiceEntry[]): ServiceEntry[] {
  return [...list].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
  );
}
function sortGuides(list: GuideEntry[]): GuideEntry[] {
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

/* ----------------------------- public API --------------------------------- */
// Memoised so each build fetches once, not once per consuming page.
// No committed fallback: services/guides are DB-only (empty without CONTENT_API).

let servicesPromise: Promise<ServiceEntry[]> | undefined;
let guidesPromise: Promise<GuideEntry[]> | undefined;

export function getServices(): Promise<ServiceEntry[]> {
  servicesPromise ??= (async () => {
    const rows = await fetchRows("services");
    if (!rows) return [];
    const mapped = rows
      .filter((r) => Boolean(r.published))
      .map(rowToService)
      .filter((s): s is ServiceEntry => Boolean(s));
    return sortServices(mapped);
  })();
  return servicesPromise;
}

export function getGuides(): Promise<GuideEntry[]> {
  guidesPromise ??= (async () => {
    const rows = await fetchRows("guides");
    if (!rows) return [];
    const mapped = rows
      .filter((r) => Boolean(r.published))
      .map(rowToGuide)
      .filter((g): g is GuideEntry => Boolean(g));
    return sortGuides(mapped);
  })();
  return guidesPromise;
}

/* ---------------------------- language helpers ---------------------------- */

/** Languages an entry is published in, in canonical order. */
export function availableLangs(entry: { translations: Translations }): Language[] {
  return SUPPORTED_LANGUAGES.filter((l) => entry.translations[l]);
}

/** The set of languages that have at least one of the given entries. */
export function listingLangs(entries: { translations: Translations }[]): Language[] {
  const set = new Set<Language>();
  for (const e of entries) for (const l of availableLangs(e)) set.add(l);
  return SUPPORTED_LANGUAGES.filter((l) => set.has(l));
}

/**
 * Resolve an entry's translation for a requested language, falling back to `pl`
 * and then to the first available language. Returns null only for empty
 * entries.
 */
export function resolveTranslation(
  entry: { translations: Translations },
  lang: Language,
): ResolvedTranslation | null {
  const direct = entry.translations[lang];
  if (direct) return { ...direct, resolvedLang: lang };
  const fallback = entry.translations[DEFAULT_CONTENT_LANG];
  if (fallback) return { ...fallback, resolvedLang: DEFAULT_CONTENT_LANG };
  const first = availableLangs(entry)[0];
  return first ? { ...entry.translations[first]!, resolvedLang: first } : null;
}

/**
 * Build a `[guide:slug]` resolver for a page in `lang`. Links point at the
 * language the guide actually exists in (falling back to `pl`), so generated
 * links never 404.
 */
export function makeGuideLinkResolver(guides: GuideEntry[], lang: Language): GuideLinkResolver {
  const bySlug = new Map(guides.map((g) => [g.slug, g]));
  return (slug, customLabel) => {
    const guide = bySlug.get(slug);
    if (!guide) return null;
    const t = resolveTranslation(guide, lang);
    if (!t) return null;
    return { href: `/${t.resolvedLang}/guides/${slug}`, label: customLabel || t.title };
  };
}
