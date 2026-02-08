-- ProServices Database Schema

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pl VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_pl TEXT,
  description_en TEXT,
  price_range VARCHAR(100),
  image_url TEXT,
  category_pl VARCHAR(100),
  category_en VARCHAR(100),
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender_type VARCHAR(10) CHECK (sender_type IN ('user', 'admin')) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_services_category_en ON services(category_en);
CREATE INDEX idx_services_category_pl ON services(category_pl);

-- Seed default admin (password: admin123 — change in production!)
-- Hash generated with bcrypt, 10 rounds
INSERT INTO admins (username, password_hash) VALUES
  ('admin', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PqKe1g0mMKx6oDEjU3Kxm');

-- Seed sample services
INSERT INTO services (title_pl, title_en, description_pl, description_en, price_range, image_url, category_pl, category_en) VALUES
  ('Konsulting Strategiczny', 'Strategic Consulting', 'Kompleksowa analiza i strategia rozwoju Twojego biznesu.', 'Comprehensive analysis and growth strategy for your business.', '2 000 PLN', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop', 'Konsulting', 'Consulting'),
  ('Tworzenie Stron WWW', 'Website Development', 'Nowoczesne, responsywne strony internetowe dopasowane do Twojej marki.', 'Modern, responsive websites tailored to your brand.', '5 000 PLN', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', 'Rozwój', 'Development'),
  ('Projektowanie UI/UX', 'UI/UX Design', 'Intuicyjne i piękne interfejsy, które zachwycą Twoich klientów.', 'Intuitive and beautiful interfaces that delight your customers.', '3 500 PLN', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', 'Projektowanie', 'Design'),
  ('Marketing Cyfrowy', 'Digital Marketing', 'Skuteczne kampanie online, SEO i social media dla Twojej firmy.', 'Effective online campaigns, SEO and social media for your company.', '1 500 PLN', 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop', 'Marketing', 'Marketing'),
  ('Aplikacje Mobilne', 'Mobile Applications', 'Natywne i cross-platform aplikacje mobilne najwyższej jakości.', 'Native and cross-platform mobile applications of the highest quality.', '10 000 PLN', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop', 'Rozwój', 'Development'),
  ('Branding & Identyfikacja', 'Branding & Identity', 'Budowanie silnej marki z spójną identyfikacją wizualną.', 'Building a strong brand with consistent visual identity.', '4 000 PLN', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop', 'Projektowanie', 'Design');
