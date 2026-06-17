import { createContext, useContext, ReactNode, useEffect } from "react";
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
 * browser settings. SSR-safe (returns the fallback when there is no window).
 */
export function detectLanguage(): Language {
  if (typeof window === "undefined") return FALLBACK_LANGUAGE;

  // 1. Path segment (e.g. /pl/... or /en/...)
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
  /** The validated language code for this island/page. */
  lang: Language;
  children: ReactNode;
}

/**
 * Provides translations + language to a React island. Router-free: switching
 * language is a full navigation (each language is its own prerendered page),
 * so `setLanguage` simply updates the URL.
 */
export const LanguageProvider = ({ lang, children }: LanguageProviderProps) => {
  const t = translations[lang];

  const setLanguage = (newLang: Language) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("lang", newLang);
    // Replace the first path segment (current lang) with the new lang.
    const rest = window.location.pathname.replace(/^\/[^/]*/, "") || "";
    window.location.href = `/${newLang}${rest}${window.location.search}${window.location.hash}`;
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
