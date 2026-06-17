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
  },
});
