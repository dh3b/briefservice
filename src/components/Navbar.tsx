import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, LANGUAGE_FLAGS, Language } from "@/types";

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-foreground tracking-tight">
          <span className="text-gradient-gold">Brief</span>Service
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("hero")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</button>
          <button onClick={() => scrollTo("services")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.services}</button>
          <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</button>
          <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav.admin}</Link>

          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span>{LANGUAGE_FLAGS[language]}</span>
              <span>{LANGUAGE_LABELS[language]}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto">
                {SUPPORTED_LANGUAGES.map((code) => (
                  <button
                    key={code}
                    onClick={() => { setLanguage(code as Language); setLangOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${language === code ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    <span>{LANGUAGE_FLAGS[code as Language]}</span>
                    <span>{LANGUAGE_LABELS[code as Language]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
          <div className="border-t border-border pt-3 grid grid-cols-3 gap-1">
            {SUPPORTED_LANGUAGES.map((code) => (
              <button
                key={code}
                onClick={() => { setLanguage(code as Language); setMobileOpen(false); }}
                className={`px-2 py-1.5 text-xs rounded-md text-center ${language === code ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                {LANGUAGE_FLAGS[code as Language]} {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
