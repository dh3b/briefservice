import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LogIn, MessageSquare, Package, Trash2, ArrowLeft, LogOut, Plus, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Admin, Chat, Message, ServiceRow } from "@/types";
import * as api from "@/api";

const AdminPage = () => {
  const { t } = useLanguage();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"chats" | "services">("chats");

  // Chat state
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [replyInput, setReplyInput] = useState("");

  // Services state
  const [services, setServices] = useState<ServiceRow[]>([]);

  // Check existing session
  useEffect(() => {
    api.adminMe().then(setAdmin).catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const adm = await api.adminLogin(username, password);
      setAdmin(adm);
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    await api.adminLogout();
    setAdmin(null);
  };

  // Load data when logged in
  const loadChats = useCallback(async () => {
    try {
      setChats(await api.fetchChats());
    } catch {}
  }, []);

  const loadServices = useCallback(async () => {
    try {
      setServices(await api.fetchServices());
    } catch {}
  }, []);

  useEffect(() => {
    if (!admin) return;
    loadChats();
    loadServices();
    const interval = setInterval(loadChats, 5000);
    return () => clearInterval(interval);
  }, [admin, loadChats, loadServices]);

  // Load messages for selected chat
  useEffect(() => {
    if (!selectedChat) return;
    const load = async () => {
      try {
        setChatMessages(await api.fetchMessages(selectedChat));
      } catch {}
    };
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

  const handleDeleteService = async (id: string) => {
    try {
      await api.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {}
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/" className="font-display text-2xl font-bold text-foreground">
              <span className="text-gradient-gold">Pro</span>Services
            </Link>
            <h2 className="font-display text-2xl font-bold text-foreground mt-6">{t.admin.login}</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && <p className="text-sm text-destructive text-center">{loginError}</p>}
            <input type="text" placeholder={t.admin.username} value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring outline-none" />
            <input type="password" placeholder={t.admin.password} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring outline-none" />
            <button type="submit" className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-navy-light transition-colors flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> {t.admin.signIn}
            </button>
          </form>
          <Link to="/" className="flex items-center justify-center gap-1 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.nav.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display text-lg font-bold text-foreground">
            <span className="text-gradient-gold">Pro</span>Services
          </Link>
          <span className="text-muted-foreground text-sm">/ {t.admin.dashboard}</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-4 h-4" /> {t.admin.logout}
        </button>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab("chats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "chats" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            <MessageSquare className="w-4 h-4" /> {t.admin.chats}
          </button>
          <button onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "services" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            <Package className="w-4 h-4" /> {t.admin.servicesManage}
          </button>
        </div>

        {activeTab === "chats" && (
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            {/* Chat list */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {chats.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t.admin.noChats}</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {chats.map((chat) => (
                    <div key={chat.id} className={`p-4 cursor-pointer hover:bg-muted/50 flex justify-between items-start ${selectedChat === chat.id ? "bg-muted" : ""}`}
                      onClick={() => setSelectedChat(chat.id)}>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Chat #{chat.id.slice(0, 8)}</p>
                        <p className="text-xs text-muted-foreground truncate">{chat.last_message || "..."}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                        className="text-muted-foreground hover:text-destructive p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat messages */}
            <div className="bg-card rounded-xl border border-border flex flex-col h-[500px]">
              {!selectedChat ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a chat</div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender_type === "admin" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md"}`}>
                          {msg.content}
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
        )}

        {activeTab === "services" && (
          <div>
            <div className="flex justify-end mb-6">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-gradient text-accent-foreground text-sm font-medium hover:shadow-md transition-all">
                <Plus className="w-4 h-4" /> {t.admin.addService}
              </button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Title (PL / EN)</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Price</th>
                    <th className="text-right px-6 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr><td className="px-6 py-4 text-muted-foreground" colSpan={4}>No services found</td></tr>
                  ) : services.map((s) => (
                    <tr key={s.id} className="border-b border-border last:border-0">
                      <td className="px-6 py-4">
                        <p className="text-foreground">{s.title_pl}</p>
                        <p className="text-xs text-muted-foreground">{s.title_en}</p>
                      </td>
                      <td className="px-6 py-4 text-foreground">{s.category_pl} / {s.category_en}</td>
                      <td className="px-6 py-4 text-foreground">{s.price_range}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteService(s.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
