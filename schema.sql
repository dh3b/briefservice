CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_pl VARCHAR(255),
  name_en VARCHAR(255),
  name_uk VARCHAR(255),
  name_ru VARCHAR(255),
  name_cs VARCHAR(255),
  name_es VARCHAR(255),
  name_it VARCHAR(255),
  name_hu VARCHAR(255),
  name_ro VARCHAR(255),
  name_lt VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  -- URL slug for the dedicated service page (/<lang>/uslugi/<slug>).
  -- When NULL the service is only a homepage tile (no landing page).
  slug VARCHAR(120) UNIQUE,
  -- Rich page content, keyed by language:
  -- { "<lang>": { seoTitle, seoDescription, h1, lead,
  --              sections:[{heading, body:[], bullets:[]}],
  --              highlights:[], faq:[{q,a}], relatedGuides:[] } }
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  title_pl VARCHAR(255),
  title_en VARCHAR(255),
  title_uk VARCHAR(255),
  title_ru VARCHAR(255),
  title_cs VARCHAR(255),
  title_es VARCHAR(255),
  title_it VARCHAR(255),
  title_hu VARCHAR(255),
  title_ro VARCHAR(255),
  title_lt VARCHAR(255),
  description_pl TEXT,
  description_en TEXT,
  description_uk TEXT,
  description_ru TEXT,
  description_cs TEXT,
  description_es TEXT,
  description_it TEXT,
  description_hu TEXT,
  description_ro TEXT,
  description_lt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  -- Rich guide content, keyed by language:
  -- { "<lang>": { seoTitle, seoDescription, h1, summary, lead,
  --              sections:[{heading, body:[], bullets:[]}],
  --              faq:[{q,a}], cta:{href,label,text} } }
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_ref TEXT,
  user_name TEXT,
  user_email VARCHAR(255),
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender_type VARCHAR(10) CHECK (sender_type IN ('user', 'admin')) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE page_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country VARCHAR(100) NOT NULL DEFAULT 'Unknown',
  visited_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_services_category_id ON services(category_id);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_published ON services(published);
CREATE INDEX idx_guides_slug ON guides(slug);
CREATE INDEX idx_guides_published ON guides(published);
CREATE INDEX idx_page_visits_date ON page_visits(visited_at);
CREATE INDEX idx_chats_created_at ON chats(created_at);
