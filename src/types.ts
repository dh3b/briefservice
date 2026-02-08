export interface Service {
  id: string;
  title: string;
  description: string;
  price_range: string;
  image_url: string;
  category: string;
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
}

export interface Message {
  id: string;
  chat_id: string;
  sender_type: "user" | "admin";
  content: string;
  timestamp: string;
}

export type Language = "pl" | "en";
