import { useLanguage } from "@/i18n/LanguageContext";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-foreground tracking-tight">
          <span className="text-gradient-gold">Pro</span>Services
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("hero")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</button>
          <button onClick={() => scrollTo("services")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.services}</button>
          <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</button>
          <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.admin}</Link>
          
          <button
            onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language === "pl" ? "EN" : "PL"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 py-4 space-y-3">
          <button onClick={() => scrollTo("hero")} className="block text-sm font-medium text-muted-foreground">{t.nav.home}</button>
          <button onClick={() => scrollTo("services")} className="block text-sm font-medium text-muted-foreground">{t.nav.services}</button>
          <button onClick={() => scrollTo("contact")} className="block text-sm font-medium text-muted-foreground">{t.nav.contact}</button>
          <Link to="/admin" className="block text-sm font-medium text-muted-foreground">{t.nav.admin}</Link>
          <button onClick={() => setLanguage(language === "pl" ? "en" : "pl")} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Globe className="w-4 h-4" /> {language === "pl" ? "English" : "Polski"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
