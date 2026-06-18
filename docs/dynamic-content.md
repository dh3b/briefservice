# Dynamic, DB-driven services & guides

Service and guide pages are **content, not code**: they're edited in the admin,
stored in Postgres, and rendered into the existing polished Astro templates.
The homepage tiles and the dedicated pages are two views of the **same** record,
so there's no duplication.

## How it fits together

```
Admin (structured editor)  ──save──▶  Express API  ──▶  Postgres (services / guides)
        │ "Publish"                                            │
        ▼                                                       │ astro build reads it
  POST /api/rebuild ──▶ builder container ──(astro build)──▶ dist ──▶ Caddy serves it
```

- **Tiles**: the homepage services grid (a React island) fetches `/api/services`
  at runtime. A service with a `slug` links its tile to `/pl/uslugi/<slug>`;
  one without keeps the inline expand. Single source of truth = the DB row.
- **Pages**: `/pl/uslugi/<slug>` and `/pl/poradnik/<slug>` are **static**, built
  from the DB at build time via [`src/lib/content-source.ts`](../src/lib/content-source.ts).
- **Fallback / seed**: when `CONTENT_API` is unset or unreachable (local builds,
  empty DB), the build falls back to the committed content in `src/content/*`.
  So a build never breaks, and that content is also the seed (see below).

## Data model

`services` gained `slug`, `content` (JSONB), `published`, `sort_order`; a new
`guides` table mirrors it. `content` is keyed by language:

```jsonc
// services.content
{ "pl": { "seoTitle", "seoDescription", "h1", "lead",
          "sections": [{ "heading", "body": [], "bullets": [] }],
          "highlights": [], "faq": [{ "q", "a" }], "relatedGuides": [] } }
// guides.content
{ "pl": { "seoTitle", "seoDescription", "h1", "summary", "lead",
          "sections": [...], "faq": [...], "cta": { "href", "label", "text" } } }
```

The tile name/summary stay in the existing `title_<lang>` / `description_<lang>`
columns. Currently Polish only; add a language by writing another `content` key.

## One-time setup on an existing deployment

1. **Migrate** the database (schema.sql only runs on a fresh DB):
   ```bash
   psql "$DATABASE_URL" -f migrations/001_dynamic_content.sql
   ```
2. **Seed** the authored content so it's editable in the admin:
   ```bash
   DB_HOST=… DB_NAME=… DB_USER=… DB_PASSWORD=… npm run seed
   ```
   (Idempotent — existing slugs are skipped. Skip this if you'd rather author
   everything fresh in the admin; the build falls back to committed content
   until the DB has published rows.)
3. **Rebuild + redeploy** so the `builder` image is created and the API knows
   `BUILDER_URL`: `docker compose up -d --build`.

## Editing & publishing

1. Admin → **Services** or **Guides** → add/edit (structured fields: SEO, H1,
   lead, repeatable sections, highlights, FAQ, CTA). Set a **slug** and tick
   **Published** to give a service its page.
2. Click **Publish** (top-right). This calls `POST /api/rebuild`, which triggers
   the `builder` to run `astro build` against the live API and swap the served
   files. Changes go live in a few seconds.

## Configuration

| Var | Where | Purpose |
|-----|-------|---------|
| `CONTENT_API` | builder | API base for build-time fetch (`http://api:3001/api`). Unset elsewhere → committed fallback. |
| `BUILDER_URL` | api | Builder trigger endpoint (`http://builder:9000/rebuild`). |
| `SERVE_DIR` | builder | Served volume path it rewrites (`/srv/dist`). |

## Verifying in your environment

The static/fallback build is verified in CI (`npm run build`). The DB→API→admin
→rebuild loop needs the running stack:

1. `docker compose up -d --build`, then run the migration + seed.
2. `GET /api/services` and `/api/guides` return rows with `content`.
3. Admin: edit a service, Publish, confirm the builder logs a rebuild
   (`docker compose logs builder`) and the page reflects the change.
4. Add a brand-new service with a slug + Publish → its tile links to the new
   `/pl/uslugi/<slug>` page, which exists after the rebuild.

## Notes / trade-offs

- **Rebuild swap** clears and recopies `SERVE_DIR` (sub-second for a static
  site). For strict zero-downtime, switch to a `releases/<ts>` + `current`
  symlink and point Caddy's root at `current`.
- A service given a slug but **not yet rebuilt** links to a page that 404s until
  the next publish; publishing triggers the rebuild, so this is a brief window.
