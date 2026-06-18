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

export interface ServiceRow {
  id: string;
  category_id: string | null;
  image_url: string;
  created_at: string;
  [key: string]: string | null | undefined; // title_xx, description_xx
}

/** Localized service for display */
export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string | null;
  /** When set, the service has a dedicated page at /<lang>/uslugi/<slug>. */
  slug: string | null;
}

export function localizeService(row: ServiceRow, lang: Language): Service {
  const fb = FALLBACK_LANGUAGE;
  return {
    id: row.id,
    title: (row[`title_${lang}`] as string) || (row[`title_${fb}`] as string) || "",
    description: (row[`description_${lang}`] as string) || (row[`description_${fb}`] as string) || "",
    image_url: row.image_url,
    category_id: row.category_id ?? null,
    slug: (row.slug as string) ?? null,
  };
}

export interface CategoryRow {
  id: string;
  created_at: string;
  [key: string]: string | null | undefined; // name_xx
}

/** A guide article row (rich content keyed by language in `content`). */
export interface GuideRow {
  id: string;
  slug: string;
  content: Record<string, Record<string, unknown>>;
  published: boolean;
  sort_order: number;
  created_at: string;
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
