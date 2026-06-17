import type { APIRoute } from "astro";
import { buildSitemapXml, baseSitemapEntries, type SitemapEntry } from "@/seo/site";
import { SERVICE_PAGES } from "@/content/services";
import { GUIDES } from "@/content/guides";

// Prerendered to dist/sitemap.xml from the route matrix + the Polish-only
// service/guide content, so it never drifts out of sync.
const entries: SitemapEntry[] = [
  ...baseSitemapEntries(),
  { subPath: "uslugi", langs: ["pl"] },
  ...SERVICE_PAGES.map((s) => ({ subPath: `uslugi/${s.slug}`, langs: ["pl"] as const })),
  { subPath: "poradnik", langs: ["pl"] },
  ...GUIDES.map((g) => ({ subPath: `poradnik/${g.slug}`, langs: ["pl"] as const })),
];

export const GET: APIRoute = () =>
  new Response(buildSitemapXml(entries), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
