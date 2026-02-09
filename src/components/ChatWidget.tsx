import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/types";
import { createChat, fetchMessages, sendMessage as apiSendMessage, updateChat } from "@/api";

interface ChatWidgetProps {
  serviceId?: string | null;
  serviceName?: string | null;
  onOpenTriggered?: () => void;
}

function getChatIdFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|; )chat_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getUserNameFromStorage(): string | null {
  return localStorage.getItem("chat_user_name");
}

const POLL_INTERVAL = 3000;

const ChatWidget = ({ serviceId, serviceName, onOpenTriggered }: ChatWidgetProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(getChatIdFromCookie);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState<string | null>(getUserNameFromStorage);
  const [nameInput, setNameInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>();
  const prevServiceRef = useRef<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle "chat about this" service change
  useEffect(() => {
    if (serviceName && serviceName !== prevServiceRef.current) {
      prevServiceRef.current = serviceName;
      setOpen(true);
      onOpenTriggered?.();

      // Update service_ref on existing chat
      if (chatId) {
        updateChat(chatId, { service_ref: serviceName }).catch(() => {});
      }
    }
  }, [serviceName, chatId, onOpenTriggered]);

  const ensureChat = useCallback(async () => {
    let id = chatId;
    if (!id) {
      try {
        const chat = await createChat(userName || "Guest", serviceName || undefined);
        id = chat.id;
        setChatId(id);
        setConnected(true);
      } catch {
        return null;
      }
    } else if (!connected) {
      setConnected(true);
    }
    return id;
  }, [chatId, serviceName, connected, userName]);

  useEffect(() => {
    if (!open || !userName) return;
    const load = async () => {
      const id = await ensureChat();
      if (!id) return;
      try {
        setMessages(await fetchMessages(id));
      } catch {}
    };
    load();
  }, [open, ensureChat, userName]);

  useEffect(() => {
    if (!open || !chatId) return;
    pollRef.current = setInterval(async () => {
      try {
        setMessages(await fetchMessages(chatId));
      } catch {}
    }, POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [open, chatId]);

  const handleNameSubmit = () => {
    const name = nameInput.trim();
    if (!name) return;
    setUserName(name);
    localStorage.setItem("chat_user_name", name);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const id = await ensureChat();
    if (!id) return;
    const content = input.trim();
    setInput("");
    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      chat_id: id,
      sender_type: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    try {
      await apiSendMessage(id, "user", content);
    } catch {}
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

          {!userName ? (
            /* Name prompt */
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
              <p className="text-sm text-muted-foreground text-center">{t.chat.namePrompt}</p>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder={t.chat.namePlaceholder}
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
                  <div key={msg.id} className={`flex ${msg.sender_type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex flex-col gap-0.5">
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender_type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary text-secondary-foreground rounded-bl-md"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className={`text-[10px] text-muted-foreground ${msg.sender_type === "user" ? "text-right" : "text-left"}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-border p-3 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center hover:shadow-md transition-all flex-shrink-0"
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
