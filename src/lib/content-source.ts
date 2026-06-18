/**
 * Build-time content source for the Polish service + guide pages.
 *
 * When `CONTENT_API` is set (e.g. the in-place rebuild builder runs with
 * `CONTENT_API=http://api:3001/api`), service/guide content is fetched from the
 * live API and the database is the source of truth. Otherwise — local builds,
 * an empty/unreachable DB — it falls back to the committed content in
 * `src/content/*`, so a build never breaks and the authored content doubles as
 * the seed.
 *
 * Polish only for now; the DB `content` JSONB is keyed by language, so adding
 * locales later is a matter of reading another key.
 */
import type { ServicePage, Guide, ContentSection, Faq } from "@/content/types";
import { SERVICE_PAGES } from "@/content/services";
import { GUIDES } from "@/content/guides";

const LANG = "pl";
// Build runs in Node, so the data-source URL comes from the process env.
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

function asSections(v: unknown): ContentSection[] {
  return Array.isArray(v) ? (v as ContentSection[]) : [];
}
function asStrings(v: unknown): string[] {
  return Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
}
function asFaq(v: unknown): Faq[] {
  return Array.isArray(v) ? (v as Faq[]) : [];
}

function langContent(row: Record<string, unknown>): Record<string, unknown> | null {
  const byLang = row.content as Record<string, Record<string, unknown>> | undefined;
  return byLang?.[LANG] ?? null;
}
const str = (v: unknown): string => (typeof v === "string" ? v : "");

/** Map a DB service row (rich `content` JSONB + tile columns) to a ServicePage. */
function rowToService(row: Record<string, unknown>): ServicePage | null {
  const slug = str(row.slug);
  const c = langContent(row);
  if (!slug || !c) return null;
  const title = str(row[`title_${LANG}`]);
  const desc = str(row[`description_${LANG}`]);
  return {
    slug,
    name: title || str(c.name) || slug,
    summary: desc || str(c.summary),
    title: str(c.seoTitle) || title || slug,
    description: str(c.seoDescription) || desc,
    h1: str(c.h1) || title || slug,
    lead: str(c.lead),
    sections: asSections(c.sections),
    highlights: asStrings(c.highlights),
    faq: asFaq(c.faq),
    relatedGuides: asStrings(c.relatedGuides),
  };
}

/** Map a DB guide row to a Guide. */
function rowToGuide(row: Record<string, unknown>): Guide | null {
  const slug = str(row.slug);
  const c = langContent(row);
  if (!slug || !c) return null;
  const cta = (c.cta as Guide["cta"] | undefined) ?? { href: "/pl/uslugi", label: "Skontaktuj się", text: "" };
  return {
    slug,
    title: str(c.seoTitle) || str(c.h1) || slug,
    description: str(c.seoDescription),
    h1: str(c.h1) || slug,
    summary: str(c.summary),
    lead: str(c.lead),
    sections: asSections(c.sections),
    faq: asFaq(c.faq),
    cta,
  };
}

/* ----------------------------- public API --------------------------------- */
// Memoised so each build fetches once, not once per consuming page.

let servicesPromise: Promise<ServicePage[]> | undefined;
let guidesPromise: Promise<Guide[]> | undefined;

export function getServicePages(): Promise<ServicePage[]> {
  servicesPromise ??= (async () => {
    const rows = await fetchRows("services");
    if (!rows) return SERVICE_PAGES;
    const mapped = rows
      .filter((r) => Boolean(r.published))
      .map(rowToService)
      .filter((s): s is ServicePage => Boolean(s));
    return mapped.length ? mapped : SERVICE_PAGES;
  })();
  return servicesPromise;
}

export function getGuides(): Promise<Guide[]> {
  guidesPromise ??= (async () => {
    const rows = await fetchRows("guides");
    if (!rows) return GUIDES;
    const mapped = rows
      .filter((r) => Boolean(r.published))
      .map(rowToGuide)
      .filter((g): g is Guide => Boolean(g));
    return mapped.length ? mapped : GUIDES;
  })();
  return guidesPromise;
}
