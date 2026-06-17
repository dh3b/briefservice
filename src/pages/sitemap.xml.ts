import type { APIRoute } from "astro";
import { buildSitemapXml } from "@/seo/site";

// Prerendered to dist/sitemap.xml from the same language × page matrix that
// drives the routes, so it never drifts out of sync.
export const GET: APIRoute = () =>
  new Response(buildSitemapXml(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
