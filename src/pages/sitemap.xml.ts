import type { APIRoute } from "astro";
import { buildSitemapXml, baseSitemapEntries, type SitemapEntry } from "@/seo/site";
import { getServicePages, getGuides } from "@/lib/content-source";

// Prerendered to dist/sitemap.xml from the route matrix + the (DB-or-seed)
// Polish service/guide content, so it never drifts out of sync.
export const GET: APIRoute = async () => {
  const [services, guides] = await Promise.all([getServicePages(), getGuides()]);

  const entries: SitemapEntry[] = [
    ...baseSitemapEntries(),
    { subPath: "uslugi", langs: ["pl"] },
    ...services.map((s) => ({ subPath: `uslugi/${s.slug}`, langs: ["pl"] as const })),
    { subPath: "poradnik", langs: ["pl"] },
    ...guides.map((g) => ({ subPath: `poradnik/${g.slug}`, langs: ["pl"] as const })),
  ];

  return new Response(buildSitemapXml(entries), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
