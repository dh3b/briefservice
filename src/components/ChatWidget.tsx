import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/types";
import { createChat, fetchMessages, sendMessage as apiSendMessage } from "@/api";

interface ChatWidgetProps {
  serviceId?: string | null;
}

function getChatIdFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|; )chat_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const POLL_INTERVAL = 3000;

const ChatWidget = ({ serviceId }: ChatWidgetProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(getChatIdFromCookie);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize or resume chat
  const ensureChat = useCallback(async () => {
    let id = chatId;
    if (!id) {
      try {
        const chat = await createChat(serviceId);
        id = chat.id;
        setChatId(id);
        setConnected(true);
      } catch {
        console.error("Failed to create chat");
        return null;
      }
    } else if (!connected) {
      setConnected(true);
    }
    return id;
  }, [chatId, serviceId, connected]);

  // Load messages when chat opens
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      const id = await ensureChat();
      if (!id) return;
      try {
        const msgs = await fetchMessages(id);
        setMessages(msgs);
      } catch {
        console.error("Failed to load messages");
      }
    };

    load();
  }, [open, ensureChat]);

  // Poll for new messages
  useEffect(() => {
    if (!open || !chatId) return;

    pollRef.current = setInterval(async () => {
      try {
        const msgs = await fetchMessages(chatId);
        setMessages(msgs);
      } catch {
        // silent
      }
    }, POLL_INTERVAL);

    return () => clearInterval(pollRef.current);
  }, [open, chatId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const id = await ensureChat();
    if (!id) return;

    const content = input.trim();
    setInput("");

    // Optimistic update
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
    } catch {
      console.error("Failed to send message");
    }
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm bg-secondary text-secondary-foreground rounded-bl-md">
                  {t.chat.greeting}
                </div>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender_type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender_type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-secondary-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
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
        </div>
      )}
    </>
  );
};

export default ChatWidget;
