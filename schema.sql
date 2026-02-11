-- ProServices Database Schema
-- Supported languages: pl, en, de, fr, es, it, pt, nl, cs, ro, hu, sv

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_pl VARCHAR(255),
  name_en VARCHAR(255),
  name_de VARCHAR(255),
  name_fr VARCHAR(255),
  name_es VARCHAR(255),
  name_it VARCHAR(255),
  name_pt VARCHAR(255),
  name_nl VARCHAR(255),
  name_cs VARCHAR(255),
  name_ro VARCHAR(255),
  name_hu VARCHAR(255),
  name_sv VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price_range TEXT,
  image_url TEXT,
  title_pl VARCHAR(255),
  title_en VARCHAR(255),
  title_de VARCHAR(255),
  title_fr VARCHAR(255),
  title_es VARCHAR(255),
  title_it VARCHAR(255),
  title_pt VARCHAR(255),
  title_nl VARCHAR(255),
  title_cs VARCHAR(255),
  title_ro VARCHAR(255),
  title_hu VARCHAR(255),
  title_sv VARCHAR(255),
  description_pl TEXT,
  description_en TEXT,
  description_de TEXT,
  description_fr TEXT,
  description_es TEXT,
  description_it TEXT,
  description_pt TEXT,
  description_nl TEXT,
  description_cs TEXT,
  description_ro TEXT,
  description_hu TEXT,
  description_sv TEXT,
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
CREATE INDEX idx_page_visits_date ON page_visits(visited_at);
CREATE INDEX idx_chats_created_at ON chats(created_at);

-- Seed default admin (password: admin123)
INSERT INTO admins (username, password_hash) VALUES
  ('admin', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PqKe1g0mMKx6oDEjU3Kxm');

-- Seed categories
INSERT INTO categories (id, name_pl, name_en, name_de, name_fr, name_es, name_it, name_pt, name_nl, name_cs, name_ro, name_hu, name_sv) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Konsulting', 'Consulting', 'Beratung', 'Conseil', 'Consultoría', 'Consulenza', 'Consultoria', 'Advies', 'Poradenství', 'Consultanță', 'Tanácsadás', 'Konsulting'),
  ('a0000000-0000-0000-0000-000000000002', 'Rozwój', 'Development', 'Entwicklung', 'Développement', 'Desarrollo', 'Sviluppo', 'Desenvolvimento', 'Ontwikkeling', 'Vývoj', 'Dezvoltare', 'Fejlesztés', 'Utveckling'),
  ('a0000000-0000-0000-0000-000000000003', 'Projektowanie', 'Design', 'Design', 'Design', 'Diseño', 'Design', 'Design', 'Ontwerp', 'Design', 'Design', 'Tervezés', 'Design'),
  ('a0000000-0000-0000-0000-000000000004', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marketing', 'Marknadsföring');

-- Seed sample services
INSERT INTO services (category_id, price_range, image_url,
  title_pl, title_en, title_de, title_fr, title_es, title_it, title_pt, title_nl, title_cs, title_ro, title_hu, title_sv,
  description_pl, description_en, description_de, description_fr, description_es, description_it, description_pt, description_nl, description_cs, description_ro, description_hu, description_sv
) VALUES
  ('a0000000-0000-0000-0000-000000000001', '2 000 PLN', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
   'Konsulting Strategiczny', 'Strategic Consulting', 'Strategieberatung', 'Conseil stratégique', 'Consultoría estratégica', 'Consulenza strategica', 'Consultoria estratégica', 'Strategisch advies', 'Strategické poradenství', 'Consultanță strategică', 'Stratégiai tanácsadás', 'Strategisk konsulting',
   'Kompleksowa analiza i strategia rozwoju Twojego biznesu.', 'Comprehensive analysis and growth strategy for your business.', 'Umfassende Analyse und Wachstumsstrategie für Ihr Unternehmen.', 'Analyse complète et stratégie de croissance pour votre entreprise.', 'Análisis integral y estrategia de crecimiento para su negocio.', 'Analisi completa e strategia di crescita per la tua azienda.', 'Análise abrangente e estratégia de crescimento para o seu negócio.', 'Uitgebreide analyse en groeistrategie voor uw bedrijf.', 'Komplexní analýza a strategie růstu pro vaše podnikání.', 'Analiză cuprinzătoare și strategie de creștere pentru afacerea dvs.', 'Átfogó elemzés és növekedési stratégia vállalkozása számára.', 'Omfattande analys och tillväxtstrategi för ditt företag.'),
  ('a0000000-0000-0000-0000-000000000002', '5 000 PLN', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
   'Tworzenie Stron WWW', 'Website Development', 'Webentwicklung', 'Développement web', 'Desarrollo web', 'Sviluppo web', 'Desenvolvimento web', 'Webontwikkeling', 'Vývoj webových stránek', 'Dezvoltare web', 'Webfejlesztés', 'Webbutveckling',
   'Nowoczesne, responsywne strony internetowe dopasowane do Twojej marki.', 'Modern, responsive websites tailored to your brand.', 'Moderne, responsive Websites, die auf Ihre Marke zugeschnitten sind.', 'Sites web modernes et réactifs adaptés à votre marque.', 'Sitios web modernos y responsivos adaptados a su marca.', 'Siti web moderni e responsive su misura per il tuo brand.', 'Websites modernos e responsivos adaptados à sua marca.', 'Moderne, responsieve websites op maat van uw merk.', 'Moderní, responzivní webové stránky přizpůsobené vaší značce.', 'Site-uri web moderne și responsive adaptate brandului dvs.', 'Modern, reszponzív weboldalak az Ön márkájához igazítva.', 'Moderna, responsiva webbplatser anpassade till ditt varumärke.'),
  ('a0000000-0000-0000-0000-000000000003', '3 500 PLN', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
   'Projektowanie UI/UX', 'UI/UX Design', 'UI/UX-Design', 'Design UI/UX', 'Diseño UI/UX', 'Design UI/UX', 'Design UI/UX', 'UI/UX-ontwerp', 'UI/UX design', 'Design UI/UX', 'UI/UX tervezés', 'UI/UX-design',
   'Intuicyjne i piękne interfejsy, które zachwycą Twoich klientów.', 'Intuitive and beautiful interfaces that delight your customers.', 'Intuitive und schöne Oberflächen, die Ihre Kunden begeistern.', 'Des interfaces intuitives et belles qui raviront vos clients.', 'Interfaces intuitivas y hermosas que deleitarán a sus clientes.', 'Interfacce intuitive e belle che delizieranno i tuoi clienti.', 'Interfaces intuitivas e bonitas que encantarão os seus clientes.', 'Intuïtieve en mooie interfaces die uw klanten verrukken.', 'Intuitivní a krásná rozhraní, která potěší vaše zákazníky.', 'Interfețe intuitive și frumoase care vă vor încânta clienții.', 'Intuitív és gyönyörű felületek, amelyek elragadják ügyfeleit.', 'Intuitiva och vackra gränssnitt som gläder dina kunder.'),
  ('a0000000-0000-0000-0000-000000000004', '1 500 PLN', 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop',
   'Marketing Cyfrowy', 'Digital Marketing', 'Digitales Marketing', 'Marketing numérique', 'Marketing digital', 'Marketing digitale', 'Marketing digital', 'Digitale marketing', 'Digitální marketing', 'Marketing digital', 'Digitális marketing', 'Digital marknadsföring',
   'Skuteczne kampanie online, SEO i social media dla Twojej firmy.', 'Effective online campaigns, SEO and social media for your company.', 'Effektive Online-Kampagnen, SEO und Social Media für Ihr Unternehmen.', 'Campagnes en ligne efficaces, SEO et réseaux sociaux pour votre entreprise.', 'Campañas online efectivas, SEO y redes sociales para su empresa.', 'Campagne online efficaci, SEO e social media per la tua azienda.', 'Campanhas online eficazes, SEO e redes sociais para a sua empresa.', 'Effectieve online campagnes, SEO en social media voor uw bedrijf.', 'Efektivní online kampaně, SEO a sociální média pro vaši firmu.', 'Campanii online eficiente, SEO și social media pentru compania dvs.', 'Hatékony online kampányok, SEO és közösségi média vállalata számára.', 'Effektiva onlinekampanjer, SEO och sociala medier för ditt företag.');
