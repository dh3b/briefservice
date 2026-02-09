import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageSquare, Trash2, Send, Pencil, Check, X } from "lucide-react";
import { Chat, Message } from "@/types";
import * as api from "@/api";

const ChatPanel = () => {
  const { t } = useLanguage();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [replyInput, setReplyInput] = useState("");
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState("");

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
    const load = async () => { try { setChatMessages(await api.fetchMessages(selectedChat)); } catch {} };
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  const handleReply = async () => {
    if (!replyInput.trim() || !selectedChat) return;
    try {
      await api.sendMessage(selectedChat, "admin", replyInput.trim());
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

  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium text-foreground truncate">{getChatDisplayTitle(chat)}</p>
                        <button onClick={(e) => { e.stopPropagation(); setEditingTitle(chat.id); setTitleInput(chat.title || ""); }}
                          className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100"><Pencil className="w-3 h-3" /></button>
                      </div>
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
        {!selectedChat ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a chat</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className="flex flex-col gap-0.5">
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender_type === "admin" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md"}`}>
                      {msg.content}
                    </div>
                    <span className={`text-[10px] text-muted-foreground ${msg.sender_type === "admin" ? "text-right" : "text-left"}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3 flex gap-2">
              <input type="text" value={replyInput} onChange={(e) => setReplyInput(e.target.value)}
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
