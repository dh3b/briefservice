import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LogIn, ArrowLeft, LogOut, MessageSquare, Package, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Admin } from "@/types";
import * as api from "@/api";
import ChatPanel from "@/components/admin/ChatPanel";
import ServicesPanel from "@/components/admin/ServicesPanel";
import StatsPanel from "@/components/admin/StatsPanel";

const AdminPage = () => {
  const { t, language } = useLanguage();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"chats" | "services" | "stats">("chats");

  useEffect(() => { api.adminMe().then(setAdmin).catch(() => {}); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try { setAdmin(await api.adminLogin(username, password)); } catch (err: any) { setLoginError(err.message || "Login failed"); }
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to={`/${language}`} className="font-display text-2xl font-bold text-foreground"><span className="text-gradient-gold">Brief</span>Service</Link>
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
          <Link to={`/${language}`} className="flex items-center justify-center gap-1 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          <Link to={`/${language}`} className="font-display text-lg font-bold text-foreground"><span className="text-gradient-gold">Brief</span>Service</Link>
          <span className="text-muted-foreground text-sm">/ {t.admin.dashboard}</span>
        </div>
        <button onClick={async () => { await api.adminLogout(); setAdmin(null); }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          <button onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "stats" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            <BarChart3 className="w-4 h-4" /> {t.admin.statistics}
          </button>
        </div>
        {activeTab === "chats" ? <ChatPanel /> : activeTab === "services" ? <ServicesPanel /> : <StatsPanel />}
      </div>
    </div>
  );
};

export default AdminPage;
