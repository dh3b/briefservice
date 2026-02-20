import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, Send, X, Minimize2, Languages } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/types";
import { createChat, fetchMessages, sendMessage as apiSendMessage, updateChat } from "@/api";
import { translateText } from "@/lib/translate";
import { POLL_INTERVAL_MESSAGES, MAX_MESSAGE_LEN, MAX_NAME_LEN, MAX_EMAIL_LEN, EMAIL_REGEX } from "@/config";
import ChatBubble from "./ChatBubble";

interface ChatWidgetProps {
  serviceId?: string | null;
  serviceName?: string | null;
  onOpenTriggered?: () => void;
}

function getChatIdFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|; )chat_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getUserDataFromStorage(): { name: string; email: string } | null {
  const name = localStorage.getItem("chat_user_name");
  const email = localStorage.getItem("chat_user_email");
  return name && email ? { name, email } : null;
}



const ChatWidget = ({ serviceId, serviceName, onOpenTriggered }: ChatWidgetProps) => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(getChatIdFromCookie);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(getUserDataFromStorage);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>();
  const prevServiceRef = useRef<string | null>(null);
  const lastSentRef = useRef<number>(0);
  const [sending, setSending] = useState(false);

  const SEND_COOLDOWN_MS = 800;

  // Translation state
  const [translated, setTranslated] = useState(false);
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, translatedMessages]);

  useEffect(() => {
    if (serviceName && serviceName !== prevServiceRef.current) {
      prevServiceRef.current = serviceName;
      setOpen(true);
      onOpenTriggered?.();
      if (chatId) {
        updateChat(chatId, { service_ref: serviceName }).catch(() => {});
      }
    }
  }, [serviceName, chatId, onOpenTriggered]);

  const clearChatCookie = () => {
    document.cookie = "chat_id=; max-age=0; path=/; SameSite=Lax";
  };

  const ensureChat = useCallback(async () => {
    let id = chatId;
    if (!id) {
      try {
        const chat = await createChat(userData?.name || "Guest", userData?.email || "", serviceName || undefined);
        id = chat.id;
        setChatId(id);
        setConnected(true);
      } catch {
        return null;
      }
    } else if (!connected) {
      try {
        await fetchMessages(id);
        setConnected(true);
      } catch {
        clearChatCookie();
        setChatId(null);
        try {
          const chat = await createChat(userData?.name || "Guest", userData?.email || "", serviceName || undefined);
          id = chat.id;
          setChatId(id);
          setConnected(true);
        } catch {
          return null;
        }
      }
    }
    return id;
  }, [chatId, serviceName, connected, userData]);

  useEffect(() => {
    if (!open || !userData) return;
    const load = async () => {
      const id = await ensureChat();
      if (!id) return;
      try {
        setMessages(await fetchMessages(id));
      } catch {}
    };
    load();
  }, [open, ensureChat, userData]);

  useEffect(() => {
    if (!open || !chatId) return;
    pollRef.current = setInterval(async () => {
      try {
        setMessages(await fetchMessages(chatId));
      } catch {}
    }, POLL_INTERVAL_MESSAGES);
    return () => clearInterval(pollRef.current);
  }, [open, chatId]);

  const handleNameSubmit = () => {
    const name = nameInput.trim();
    const email = emailInput.trim();
    if (!name || !email) return;
    if (!EMAIL_REGEX.test(email)) return;
    setUserData({ name, email });
    localStorage.setItem("chat_user_name", name);
    localStorage.setItem("chat_user_email", email);
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const now = Date.now();
    if (now - lastSentRef.current < SEND_COOLDOWN_MS) return;
    lastSentRef.current = now;
    const id = await ensureChat();
    if (!id) return;
    const content = input.trim().slice(0, MAX_MESSAGE_LEN);
    setInput("");
    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      chat_id: id,
      sender_type: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setSending(true);
    try {
      await apiSendMessage(id, "user", content);
    } catch {}
    finally { setSending(false); }
  };

  const handleTranslate = async () => {
    if (translated) {
      setTranslated(false);
      return;
    }
    setTranslating(true);
    const entries = await Promise.all(
      messages.map(async (msg) => [msg.id, await translateText(msg.content, language)] as const)
    );
    setTranslatedMessages(Object.fromEntries(entries));
    setTranslated(true);
    setTranslating(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-gradient shadow-chat flex items-center justify-center hover:scale-110 transition-transform animate-chat-bounce"
        >
          <MessageCircle className="w-6 h-6 text-accent-foreground" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl bg-card border border-border shadow-chat flex flex-col overflow-hidden">
          <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-primary-foreground font-semibold text-sm">{t.chat.title}</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-md text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-md text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!userData ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
              <p className="text-sm text-muted-foreground text-center">{t.chat.namePrompt}</p>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value.slice(0, MAX_NAME_LEN))}
                placeholder={t.chat.namePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value.slice(0, MAX_EMAIL_LEN))}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder={t.chat.emailPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleNameSubmit}
                className="w-full py-2.5 rounded-xl bg-gold-gradient text-accent-foreground font-semibold text-sm hover:shadow-md transition-all"
              >
                {t.chat.nameSubmit}
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm bg-secondary text-secondary-foreground rounded-bl-md">
                      {t.chat.greeting}
                    </div>
                  </div>
                )}
                {serviceName && messages.length === 0 && (
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {t.chat.serviceContext} {serviceName}
                    </span>
                  </div>
                )}
                {messages.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    content={msg.content}
                    translatedContent={translatedMessages[msg.id]}
                    isTranslated={translated}
                    isOwnMessage={msg.sender_type === "user"}
                    timestamp={msg.timestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {messages.length > 0 && (
                <div className="px-4 pb-2 flex-shrink-0">
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

              <div className="border-t border-border p-3 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_LEN))}
                  onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center hover:shadow-md transition-all flex-shrink-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-accent-foreground" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
