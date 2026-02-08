import { ServiceRow, Admin, Chat, Message } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Services
export const fetchServices = (category?: string, lang = "pl") => {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  params.set("lang", lang);
  return request<ServiceRow[]>(`/services?${params}`);
};

export const createService = (data: Omit<ServiceRow, "id" | "created_at">) =>
  request<ServiceRow>("/services", { method: "POST", body: JSON.stringify(data) });

export const updateService = (id: string, data: Omit<ServiceRow, "id" | "created_at">) =>
  request<ServiceRow>(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteService = (id: string) =>
  request<{ message: string }>(`/services/${id}`, { method: "DELETE" });

// Auth
export const adminLogin = (username: string, password: string) =>
  request<Admin>("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });

export const adminLogout = () =>
  request<{ message: string }>("/auth/logout", { method: "POST" });

export const adminMe = () =>
  request<Admin>("/auth/me");

// Chat
export const createChat = (service_id?: string | null) =>
  request<Chat>("/chats", { method: "POST", body: JSON.stringify({ service_id }) });

export const fetchChats = () =>
  request<Chat[]>("/chats");

export const fetchMessages = (chatId: string) =>
  request<Message[]>(`/chats/${chatId}/messages`);

export const sendMessage = (chatId: string, sender_type: "user" | "admin", content: string) =>
  request<Message>(`/chats/${chatId}/messages`, {
    method: "POST",
    body: JSON.stringify({ sender_type, content }),
  });

export const deleteChat = (chatId: string) =>
  request<{ message: string }>(`/chats/${chatId}`, { method: "DELETE" });

export const assignChat = (chatId: string) =>
  request<Chat>(`/chats/${chatId}/assign`, { method: "PUT" });
