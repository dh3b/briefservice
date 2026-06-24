# Dynamic, DB-driven services & guides

Service and guide pages are **content, not code**: they're edited in the admin,
stored in Postgres as **multilingual Markdown**, and rendered into the polished
Astro templates at build time. The homepage tiles, the listing pages, and the
detail pages are all views of the **same** record - one source of truth.

## How it fits together

```
Admin (Markdown editor)  ──save──▶  Express API  ──▶  Postgres
        │ "Publish"                  (services / guides + *_translations)
        ▼                                                   │ astro build reads it
  POST /api/rebuild ──▶ builder container ──(astro build)──▶ dist ──▶ Caddy serves it
```

- **Tiles**: the homepage services grid (a React island) fetches `/api/services`
  at runtime and localizes from the row's `translations`. Featured services sort
  first and use the featured card; a service with a `slug` links to
  `/<lang>/services/<slug>`. Single source of truth = the DB row.
- **Pages**: `/<lang>/services/<slug>`, `/<lang>/services/`, `/<lang>/guides/<slug>`
  and `/<lang>/guides/` are **static**, built from the DB at build time via
  [`src/lib/content-source.ts`](../src/lib/content-source.ts). A detail/listing
  page is generated **only for languages that have a translation** (pl is the
  authored base + fallback).
- **No committed fallback**: services and guides are DB-only. When `CONTENT_API`
  is unset or unreachable (local builds with no DB), the build simply produces no
  service/guide pages - it never breaks. Run a local build against the API (the
  `astro dev` proxy / `CONTENT_API`) to work with real content; the former
  committed bodies are archived in [`archived-content.md`](archived-content.md).

## Data model

Normalized per-language content lives in translation tables (see
[`migrations/002_translations.sql`](../migrations/002_translations.sql)):

```
services(id, slug, published, featured, sort_order, hero_image, image_url,
         category_id, metadata, …)
service_translations(service_id, lang, title, h1, seo_title, seo_description,
                     excerpt, markdown, faq jsonb, images jsonb)   UNIQUE(service_id, lang)

guides(id, slug, published, sort_order, hero_image, metadata, …)
guide_translations(guide_id, lang, title, h1, seo_title, seo_description,
                   excerpt, markdown, faq jsonb, cta jsonb, images jsonb)  UNIQUE(guide_id, lang)

service_guides(service_id, guide_id, position)   -- curated, ordered related guides
```

- **Markdown** is the body format (`markdown` column), rendered + sanitized at
  build time ([`src/lib/markdown.ts`](../src/lib/markdown.ts)). Inline
  `[guide:slug]` / `[guide:slug|Label]` shortcodes expand to language-aware links.
- `faq` drives **FAQPage** JSON-LD; `cta` (guides) is `{serviceSlug,label,text}`
  and renders a language-aware button.
- The legacy `services.content` / `title_<lang>` columns are kept for backward
  compatibility but are no longer the source of truth.

## One-time setup on an existing deployment

1. **Migrate** the database (schema.sql only runs on a fresh DB). Run both
   migrations in order:
   ```bash
   psql "$DATABASE_URL" -f migrations/001_dynamic_content.sql
   psql "$DATABASE_URL" -f migrations/002_translations.sql
   ```
2. **Add content** - services and guides are DB-only; create them in the admin
   (or restore a dump from the `backup` service). The previous committed seed
   bodies are archived in [`archived-content.md`](archived-content.md).
3. **Rebuild + redeploy** so the `builder` image exists and the API knows
   `BUILDER_URL`: `docker compose up -d --build`.

## Editing & publishing

1. Admin → **Services** or **Guides** → add/edit. Per-language tabs hold the
   **title, excerpt, H1, SEO title/description, Markdown body, and FAQ**. The
   Markdown editor has a **live preview** and an **Insert guide link** helper.
   Services also have a **Featured** toggle and a **Related guides** manager.
2. Set a **slug** and tick **Published** to give a service/guide its page.
3. Click **Publish** (top-right). This calls `POST /api/rebuild`, which triggers
   the `builder` to run `astro build` against the live API and swap the served
   files. Changes go live in a few seconds.

## Configuration

| Var | Where | Purpose |
|-----|-------|---------|
| `CONTENT_API` | builder | API base for build-time fetch (`http://api:3001/api`). Unset elsewhere → no service/guide pages (DB-only). |
| `BUILDER_URL` | api | Builder trigger endpoint (`http://builder:9000/rebuild`). |
| `SERVE_DIR` | builder | Served volume path it rewrites (`/srv/dist`). |

For local development, `astro dev` proxies `/api` and `/uploads` to
`http://localhost:3001` (see `astro.config.mjs`), so API-backed islands and the
admin work the same way they do behind Caddy in production.

## Verifying in your environment

The static build is verified in CI (`npm run build`). The DB→API→admin→rebuild
loop needs the running stack:

1. `docker compose up -d --build`, then run the migrations and add content in the admin.
2. `GET /api/services` and `/api/guides` return rows with a `translations` array
   (and services with `featured` + `related_guides`).
3. Admin: edit a service (toggle Featured, edit Markdown), Publish, confirm the
   builder logs a rebuild (`docker compose logs builder`) and the page reflects
   the change.
4. Add a brand-new service with a slug + translation + Publish → its tile links
   to the new `/<lang>/services/<slug>` page, which exists after the rebuild.

## Notes / trade-offs

- **Rebuild swap** clears and recopies `SERVE_DIR` (sub-second for a static
  site). For strict zero-downtime, switch to a `releases/<ts>` + `current`
  symlink and point Caddy's root at `current`.
- A service given a slug but **not yet rebuilt** links to a page that 404s until
  the next publish; publishing triggers the rebuild, so this is a brief window.
- Other languages fall back to `pl` content; a detail page is only generated for
  a language once it has its own translation, so no thin machine-translated pages.
