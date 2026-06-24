-- Migration 001: dynamic, DB-driven service pages + guides.
-- Run against an existing database (schema.sql only runs on a fresh init):
--   psql "$DATABASE_URL" -f migrations/001_dynamic_content.sql
-- Idempotent: safe to run more than once.

-- Rich content for service pages -------------------------------------------
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug VARCHAR(120);
ALTER TABLE services ADD COLUMN IF NOT EXISTS content JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'services_slug_key'
  ) THEN
    ALTER TABLE services ADD CONSTRAINT services_slug_key UNIQUE (slug);
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);

-- Guides (informational articles) -------------------------------------------
CREATE TABLE IF NOT EXISTS guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guides_slug ON guides(slug);
CREATE INDEX IF NOT EXISTS idx_guides_published ON guides(published);
