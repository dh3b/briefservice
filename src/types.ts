export const SUPPORTED_LANGUAGES = ["pl", "en", "de", "fr", "es", "it", "pt", "nl", "cs", "ro", "hu", "sv"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Language, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  cs: "Čeština",
  ro: "Română",
  hu: "Magyar",
  sv: "Svenska",
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  pl: "🇵🇱", en: "🇬🇧", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", it: "🇮🇹",
  pt: "🇵🇹", nl: "🇳🇱", cs: "🇨🇿", ro: "🇷🇴", hu: "🇭🇺", sv: "🇸🇪",
};

/** Raw DB row — has title/description columns per language */
export interface ServiceRow {
  id: string;
  category_id: string | null;
  price_range: string;
  image_url: string;
  created_at: string;
  [key: string]: string | null | undefined; // title_xx, description_xx
}

/** Localized service for display */
export interface Service {
  id: string;
  title: string;
  description: string;
  price_range: string;
  image_url: string;
  category_id: string | null;
}

export function localizeService(row: ServiceRow, lang: Language): Service {
  return {
    id: row.id,
    title: (row[`title_${lang}`] as string) || (row.title_en as string) || "",
    description: (row[`description_${lang}`] as string) || (row.description_en as string) || "",
    price_range: row.price_range,
    image_url: row.image_url,
    category_id: row.category_id ?? null,
  };
}

export interface CategoryRow {
  id: string;
  created_at: string;
  [key: string]: string | null | undefined; // name_xx
}

export function localizeCategory(row: CategoryRow, lang: Language): string {
  return (row[`name_${lang}`] as string) || (row.name_en as string) || "";
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
