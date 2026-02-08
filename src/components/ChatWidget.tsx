import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types";

interface ChatWidgetProps {
  serviceId?: string | null;
}

const ChatWidget = ({ serviceId }: ChatWidgetProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      chat_id: "local",
      sender_type: "admin",
      content: t.chat.greeting,
      timestamp: new Date().toISOString(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (serviceId && open) {
      const contextMsg: Message = {
        id: `ctx-${serviceId}`,
        chat_id: "local",
        sender_type: "admin",
        content: `${t.chat.serviceContext} #${serviceId}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => {
        if (prev.some((m) => m.id === contextMsg.id)) return prev;
        return [...prev, contextMsg];
      });
    }
  }, [serviceId, open, t.chat.serviceContext]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      chat_id: "local",
      sender_type: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    // Will connect to real API later
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-gradient shadow-chat flex items-center justify-center hover:scale-110 transition-transform animate-chat-bounce"
        >
          <MessageCircle className="w-6 h-6 text-accent-foreground" />
        </button>
      )}

      {/* Chat popup */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl bg-card border border-border shadow-chat flex flex-col overflow-hidden">
          {/* Header */}
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
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

          {/* Input */}
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
