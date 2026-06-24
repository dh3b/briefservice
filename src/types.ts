import { SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE, type Language } from "@/seo/site";

export { SUPPORTED_LANGUAGES };
export type { Language };

export const LANGUAGE_LABELS: Record<Language, string> = {
  pl: "Polski",
  en: "English",
  uk: "Українська",
  ru: "Русский",
  cs: "Čeština",
  es: "Español",
  it: "Italiano",
  hu: "Magyar",
  ro: "Română",
  lt: "Lietuvių",
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  pl: "🇵🇱", en: "🇬🇧", uk: "🇺🇦", ru: "🇷🇺", cs: "🇨🇿", es: "🇪🇸", it: "🇮🇹", hu: "🇭🇺", ro: "🇷🇴", lt: "🇱🇹",
};

/** One language's content for a service/guide, as served by the API. */
export interface ApiTranslation {
  lang: Language;
  title?: string | null;
  h1?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  excerpt?: string | null;
  markdown?: string | null;
  faq?: { q: string; a: string }[];
  cta?: { serviceSlug?: string; label?: string; text?: string } | null;
  images?: unknown[];
}

/** Pick a translation for a language, falling back to pl then the first one. */
export function pickTranslation(
  translations: ApiTranslation[] | undefined,
  lang: Language,
): ApiTranslation | null {
  if (!translations?.length) return null;
  return (
    translations.find((t) => t.lang === lang) ??
    translations.find((t) => t.lang === "pl") ??
    translations[0]
  );
}

export interface ServiceRow {
  id: string;
  category_id: string | null;
  image_url: string;
  hero_image?: string | null;
  slug: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  translations: ApiTranslation[];
  /** Curated related-guide slugs. */
  related_guides: string[];
}

/** Localized service for display (homepage tiles + admin list). */
export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string | null;
  /** When set, the service has a dedicated page at /<lang>/services/<slug>. */
  slug: string | null;
  featured: boolean;
}

export function localizeService(row: ServiceRow, lang: Language): Service {
  const t = pickTranslation(row.translations, lang);
  return {
    id: row.id,
    title: t?.title || "",
    description: t?.excerpt || "",
    image_url: row.image_url,
    category_id: row.category_id ?? null,
    slug: row.slug ?? null,
    featured: Boolean(row.featured),
  };
}

export interface CategoryRow {
  id: string;
  created_at: string;
  [key: string]: string | null | undefined; // name_xx
}

/** A guide article row served by the API (content in `translations`). */
export interface GuideRow {
  id: string;
  slug: string;
  hero_image?: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  translations: ApiTranslation[];
}

export function localizeCategory(row: CategoryRow, lang: Language): string {
  const fb = FALLBACK_LANGUAGE;
  return (row[`name_${lang}`] as string) || (row[`name_${fb}`] as string) || "";
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

export interface Admin {
  id: string;
  username: string;
}

export interface Chat {
  id: string;
  user_id: string | null;
  admin_id: string | null;
  service_id: string | null;
  service_ref: string | null;
  user_name: string | null;
  user_email: string | null;
  title: string | null;
  created_at: string;
  last_message?: string;
  message_count?: number;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_type: "user" | "admin";
  content: string;
  timestamp: string;
}
