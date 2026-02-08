import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LogIn, MessageSquare, Package, Trash2, ArrowLeft, LogOut, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const { t } = useLanguage();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"chats" | "services">("chats");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Will connect to real auth API
    if (username && password) setLoggedIn(true);
  };

  if (!loggedIn) {
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
            <input
              type="text"
              placeholder={t.admin.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
            />
            <input
              type="password"
              placeholder={t.admin.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {t.admin.signIn}
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
      {/* Admin Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display text-lg font-bold text-foreground">
            <span className="text-gradient-gold">Pro</span>Services
          </Link>
          <span className="text-muted-foreground text-sm">/ {t.admin.dashboard}</span>
        </div>
        <button onClick={() => setLoggedIn(false)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-4 h-4" /> {t.admin.logout}
        </button>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "chats" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> {t.admin.chats}
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "services" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <Package className="w-4 h-4" /> {t.admin.servicesManage}
          </button>
        </div>

        {activeTab === "chats" && (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t.admin.noChats}</p>
            <p className="text-xs text-muted-foreground/60 mt-2">Connect Lovable Cloud to enable real-time chat</p>
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
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">ID</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Price</th>
                    <th className="text-right px-6 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border last:border-0">
                    <td className="px-6 py-4 text-muted-foreground" colSpan={5}>
                      Connect Lovable Cloud to manage services from database
                    </td>
                  </tr>
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
