import { createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { translations, Translations } from "./translations";
import { Language, SUPPORTED_LANGUAGES } from "@/types";
import { FALLBACK_LANGUAGE } from "@/config";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Detects the user's preferred language from the URL path, localStorage, or
 * browser settings.  Exported for use by the root-redirect component in App.tsx.
 */
export function detectLanguage(): Language {
  // 1. Path segment  (e.g. /pl/... or /en/...)
  const seg = window.location.pathname.split("/")[1];
  if (SUPPORTED_LANGUAGES.includes(seg as Language)) {
    return seg as Language;
  }

  // 2. localStorage (remembers last explicit user choice)
  const stored = localStorage.getItem("lang");
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }

  // 3. Browser language
  const nav = navigator.language?.slice(0, 2)?.toLowerCase();
  if (nav && SUPPORTED_LANGUAGES.includes(nav as Language)) {
    return nav as Language;
  }

  return FALLBACK_LANGUAGE;
}

interface LanguageProviderProps {
  /** The validated language code from the :lang URL segment. */
  lang: Language;
  children: ReactNode;
}

export const LanguageProvider = ({ lang, children }: LanguageProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang];

  const setLanguage = (newLang: Language) => {
    localStorage.setItem("lang", newLang);
    // Replace the first path segment (current lang) with the new lang,
    // preserving everything else (subpath, query string, hash).
    const rest = location.pathname.replace(/^\/[^/]*/, "") || "";
    navigate(`/${newLang}${rest}${location.search}${location.hash}`, { replace: true });
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ language: lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
