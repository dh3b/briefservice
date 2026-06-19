import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  site: "https://brief-service.com",
  output: "static",
  // /pl -> dist/pl/index.html, /pl/zmiana-dmc -> dist/pl/zmiana-dmc/index.html
  build: { format: "directory" },
  // Canonical/hreflang/sitemap are emitted from src/seo/site.ts, so Astro's
  // own sitemap integration is not used here.
  trailingSlash: "ignore",
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // Dev-only: proxy API/uploads to the local Express server so API-backed
    // islands work under `astro dev` the same way they do behind Caddy in prod
    // (same-origin `/api`). Ignored by the static build.
    server: {
      proxy: {
        "/api": "http://localhost:3001",
        "/uploads": "http://localhost:3001",
      },
    },
  },
});
