import { ServiceRow, Admin, Chat, Message, CategoryRow } from "./types";
import { API_BASE } from "./config";

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
export const fetchServices = () =>
  request<ServiceRow[]>("/services");

export const createService = (data: Record<string, unknown>) =>
  request<ServiceRow>("/services", { method: "POST", body: JSON.stringify(data) });

export const updateService = (id: string, data: Record<string, unknown>) =>
  request<ServiceRow>(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteService = (id: string) =>
  request<{ message: string }>(`/services/${id}`, { method: "DELETE" });

// Categories
export const fetchCategories = () =>
  request<CategoryRow[]>("/categories");

export const createCategory = (data: Record<string, unknown>) =>
  request<CategoryRow>("/categories", { method: "POST", body: JSON.stringify(data) });

export const updateCategory = (id: string, data: Record<string, unknown>) =>
  request<CategoryRow>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteCategory = (id: string) =>
  request<{ message: string }>(`/categories/${id}`, { method: "DELETE" });

// Auth
export const adminLogin = (username: string, password: string) =>
  request<Admin>("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });

export const adminLogout = () =>
  request<{ message: string }>("/auth/logout", { method: "POST" });

export const adminMe = () =>
  request<Admin>("/auth/me");

// Chat
export const createChat = (user_name: string, user_email: string, service_ref?: string | null) =>
  request<Chat>("/chats", { method: "POST", body: JSON.stringify({ user_name, user_email, service_ref }) });

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

export const updateChat = (chatId: string, data: { title?: string; service_ref?: string | null }) =>
  request<Chat>(`/chats/${chatId}`, { method: "PUT", body: JSON.stringify(data) });

export const assignChat = (chatId: string) =>
  request<Chat>(`/chats/${chatId}/assign`, { method: "PUT" });

// Contact
export const submitContact = (data: { name: string; email: string; message: string }) =>
  request<{ message: string }>("/contact", { method: "POST", body: JSON.stringify(data) });

// Upload
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}

// Stats
export interface VisitStat { country: string; date: string; count: number; }
export interface ChatStat { service_ref: string; date: string; count: number; }

export const fetchVisitStats = (range: string) =>
  request<VisitStat[]>(`/stats/visits?range=${range}`);

export const fetchChatStats = (range: string) =>
  request<ChatStat[]>(`/stats/chats?range=${range}`);

export const recordVisit = (country: string) =>
  request<{ ok: boolean }>("/stats/visit", { method: "POST", body: JSON.stringify({ country }) });
