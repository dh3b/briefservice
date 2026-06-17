import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync } from "node:fs";
import { componentTagger } from "lovable-tagger";
import { staticRenderPaths, buildSitemapXml } from "./src/seo/site";
// Type-only import: pulls in vite-react-ssg's `declare module "vite"`
// augmentation so `ssgOptions` is recognised on the Vite config. Erased at
// build time, so it does not load the package's runtime in the config context.
import type {} from "vite-react-ssg";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Static-site generation (vite-react-ssg). See src/main.tsx for the entry.
  ssgOptions: {
    entry: "src/main.tsx",
    // /pl -> dist/pl/index.html, /pl/zmiana-dmc -> dist/pl/zmiana-dmc/index.html
    dirStyle: "nested",
    // Render the explicit language × page matrix (admin included for its
    // noindex markup); the bare "/" is rendered as the SPA fallback shell.
    includedRoutes: () => staticRenderPaths(),
    // Emit the sitemap from the same matrix so it never drifts out of sync.
    onFinished: (dir: string) => {
      writeFileSync(path.join(dir, "sitemap.xml"), buildSitemapXml());
    },
  },
}));
