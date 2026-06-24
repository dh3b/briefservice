-- Migration 002: normalized, multilingual Markdown content for services + guides.
-- Run against an existing database (schema.sql only runs on a fresh init):
--   psql "$DATABASE_URL" -f migrations/002_translations.sql
-- Idempotent: safe to run more than once.

-- Service-level fields -------------------------------------------------------
ALTER TABLE services ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE guides ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE guides ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);

-- Per-language service content ----------------------------------------------
CREATE TABLE IF NOT EXISTS service_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  lang VARCHAR(5) NOT NULL,
  title TEXT,
  h1 TEXT,
  seo_title TEXT,
  seo_description TEXT,
  excerpt TEXT,
  markdown TEXT,                                   -- raw Markdown (sanitized on render)
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,          -- [{q,a}]
  images JSONB NOT NULL DEFAULT '[]'::jsonb,       -- gallery / auxiliary image metadata
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (service_id, lang)
);

-- Per-language guide content -------------------------------------------------
CREATE TABLE IF NOT EXISTS guide_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  lang VARCHAR(5) NOT NULL,
  title TEXT,
  h1 TEXT,
  seo_title TEXT,
  seo_description TEXT,
  excerpt TEXT,
  markdown TEXT,
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta JSONB,                                       -- {serviceSlug,label,text}
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (guide_id, lang)
);

-- Curated "related guides" per service (ordered) ----------------------------
CREATE TABLE IF NOT EXISTS service_guides (
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (service_id, guide_id)
);

CREATE INDEX IF NOT EXISTS idx_service_translations_service ON service_translations(service_id);
CREATE INDEX IF NOT EXISTS idx_guide_translations_guide ON guide_translations(guide_id);
CREATE INDEX IF NOT EXISTS idx_service_guides_service ON service_guides(service_id);
