import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageSquare, Trash2, Send, Pencil, Check, X, Languages } from "lucide-react";
import { Chat, Message } from "@/types";
import * as api from "@/api";

const LIBRETRANSLATE_URL = "http://localhost:5000/translate";

const LANG_TO_LT: Record<string, string> = {
  pl: "pl", en: "en", de: "de", fr: "fr", es: "es", it: "it",
  pt: "pt", nl: "nl", cs: "cs", ro: "ro", hu: "hu", sv: "sv",
};

async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const res = await fetch(LIBRETRANSLATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: "auto", target: LANG_TO_LT[targetLang] || "en", format: "text" }),
    });
    if (!res.ok) return text;
    const data = await res.json();
    return data.translatedText || text;
  } catch {
    return text;
  }
}

const ChatPanel = () => {
  const { t, language } = useLanguage();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [replyInput, setReplyInput] = useState("");
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState("");

  // Translation state
  const [translated, setTranslated] = useState(false);
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState(false);

  const loadChats = useCallback(async () => {
    try { setChats(await api.fetchChats()); } catch {}
  }, []);

  useEffect(() => {
    loadChats();
    const interval = setInterval(loadChats, 5000);
    return () => clearInterval(interval);
  }, [loadChats]);

  useEffect(() => {
    if (!selectedChat) return;
    setTranslated(false);
    setTranslatedMessages({});
    const load = async () => { try { setChatMessages(await api.fetchMessages(selectedChat)); } catch {} };
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  const handleReply = async () => {
    if (!replyInput.trim() || !selectedChat) return;
    try {
      await api.sendMessage(selectedChat, "admin", replyInput.trim().slice(0, 500));
      setReplyInput("");
      setChatMessages(await api.fetchMessages(selectedChat));
    } catch {}
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await api.deleteChat(chatId);
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (selectedChat === chatId) setSelectedChat(null);
    } catch {}
  };

  const handleSaveTitle = async (chatId: string) => {
    try {
      await api.updateChat(chatId, { title: titleInput });
      setChats((prev) => prev.map((c) => c.id === chatId ? { ...c, title: titleInput } : c));
      setEditingTitle(null);
    } catch {}
  };

  const getChatDisplayTitle = (chat: Chat) => {
    if (chat.title) return chat.title;
    if (chat.user_name) return chat.user_name;
    return `Chat #${chat.id.slice(0, 8)}`;
  };

  const handleTranslate = async () => {
    if (translated) {
      setTranslated(false);
      return;
    }
    setTranslating(true);
    const map: Record<string, string> = {};
    for (const msg of chatMessages) {
      map[msg.id] = await translateText(msg.content, language);
    }
    setTranslatedMessages(map);
    setTranslated(true);
    setTranslating(false);
  };

  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const selectedChatObj = chats.find((c) => c.id === selectedChat);

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {chats.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t.admin.noChats}</p>
          </div>
        ) : (
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {chats.map((chat) => (
              <div key={chat.id} className={`p-4 cursor-pointer hover:bg-muted/50 ${selectedChat === chat.id ? "bg-muted" : ""}`}
                onClick={() => setSelectedChat(chat.id)}>
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    {editingTitle === chat.id ? (
                      <div className="flex items-center gap-1">
                        <input value={titleInput} onChange={(e) => setTitleInput(e.target.value)}
                          className="flex-1 px-2 py-1 text-sm rounded bg-secondary text-foreground outline-none"
                          onKeyDown={(e) => e.key === "Enter" && handleSaveTitle(chat.id)} />
                        <button onClick={() => handleSaveTitle(chat.id)} className="p-1 text-accent-foreground"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditingTitle(null)} className="p-1 text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-foreground truncate">{getChatDisplayTitle(chat)}</p>
                    )}
                    {chat.service_ref && <p className="text-[11px] text-accent-foreground/70 truncate">📦 {chat.service_ref}</p>}
                    <p className="text-xs text-muted-foreground truncate">{chat.last_message || "..."}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); setEditingTitle(chat.id); setTitleInput(chat.title || getChatDisplayTitle(chat)); }}
                      className="text-muted-foreground hover:text-foreground p-1"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                      className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card rounded-xl border border-border flex flex-col h-[500px]">
        {!selectedChat || !selectedChatObj ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a chat</div>
        ) : (
          <>
            {/* Title bar */}
            <div className="bg-muted/50 border-b border-border px-4 py-2.5 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs flex-shrink-0">
              <span><strong>ID:</strong> {selectedChatObj.id.slice(0, 8)}</span>
              <span><strong>{t.admin.chatUser}:</strong> {selectedChatObj.user_name || "—"}</span>
              <span><strong>{t.admin.chatEmail}:</strong> {selectedChatObj.user_email || "—"}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => {
                const displayContent = translated && translatedMessages[msg.id] ? translatedMessages[msg.id] : msg.content;
                return (
                  <div key={msg.id} className={`flex ${msg.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] flex flex-col gap-0.5 ${msg.sender_type === "admin" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender_type === "admin" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md"}`}
                        style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
                      >
                        {translated && translatedMessages[msg.id] ? (
                          <span className="font-semibold">{displayContent}</span>
                        ) : (
                          displayContent
                        )}
                      </div>
                      <span className={`text-[10px] text-muted-foreground px-1 ${msg.sender_type === "admin" ? "text-right" : "text-left"}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {chatMessages.length > 0 && (
              <div className="px-4 pb-1 flex-shrink-0">
                <button
                  onClick={handleTranslate}
                  disabled={translating}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-accent-foreground hover:underline disabled:opacity-50 transition-opacity"
                >
                  <Languages className="w-3.5 h-3.5" />
                  {translating ? "..." : translated ? t.chat.showOriginal : t.chat.translateAll}
                </button>
              </div>
            )}

            <div className="border-t border-border p-3 flex gap-2">
              <input type="text" value={replyInput} onChange={(e) => setReplyInput(e.target.value.slice(0, 500))}
                onKeyDown={(e) => e.key === "Enter" && handleReply()}
                placeholder="Reply..." className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
              <button onClick={handleReply} className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
