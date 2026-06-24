import type { APIRoute } from "astro";
import { buildSitemapXml, baseSitemapEntries, type SitemapEntry } from "@/seo/site";
import { getServices, getGuides, availableLangs, listingLangs } from "@/lib/content-source";

// Prerendered to dist/sitemap.xml from the route matrix + the (DB-or-seed)
// service/guide content, per language, so it never drifts out of sync.
export const GET: APIRoute = async () => {
  const [services, guides] = await Promise.all([getServices(), getGuides()]);

  const serviceListingLangs = listingLangs(services);
  const guideListingLangs = listingLangs(guides);

  const entries: SitemapEntry[] = [
    ...baseSitemapEntries(),
    ...(serviceListingLangs.length ? [{ subPath: "services", langs: serviceListingLangs }] : []),
    ...services.map((s) => ({ subPath: `services/${s.slug}`, langs: availableLangs(s) })),
    ...(guideListingLangs.length ? [{ subPath: "guides", langs: guideListingLangs }] : []),
    ...guides.map((g) => ({ subPath: `guides/${g.slug}`, langs: availableLangs(g) })),
  ];

  return new Response(buildSitemapXml(entries), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
