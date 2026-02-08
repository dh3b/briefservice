export interface ServiceRow {
  id: string;
  title_pl: string;
  title_en: string;
  description_pl: string;
  description_en: string;
  price_range: string;
  image_url: string;
  category_pl: string;
  category_en: string;
  created_at: string;
}

/** Localized service — resolved by the frontend based on current language */
export interface Service {
  id: string;
  title: string;
  description: string;
  price_range: string;
  image_url: string;
  category: string;
}

export function localizeService(row: ServiceRow, lang: Language): Service {
  return {
    id: row.id,
    title: lang === "en" ? row.title_en : row.title_pl,
    description: lang === "en" ? row.description_en : row.description_pl,
    price_range: row.price_range,
    image_url: row.image_url,
    category: lang === "en" ? row.category_en : row.category_pl,
  };
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

export type Language = "pl" | "en";
