import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, Translations } from "./translations";
import { Language, SUPPORTED_LANGUAGES } from "@/types";
import { FALLBACK_LANGUAGE, BASE_DOMAIN } from "@/config";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** The bare domain used to build subdomain URLs. */

function detectLanguage(): Language {
  // 1. Subdomain
  const host = window.location.hostname;
  const sub = host.split(".")[0];
  if (SUPPORTED_LANGUAGES.includes(sub as Language)) {
    return sub as Language;
  }

  // 2. localStorage
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

function isProductionDomain(): boolean {
  return window.location.hostname.endsWith(BASE_DOMAIN);
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLang] = useState<Language>(detectLanguage);
  const t = translations[language];

  const setLanguage = (lang: Language) => {
    localStorage.setItem("lang", lang);

    if (isProductionDomain()) {
      // Redirect to the language subdomain, preserving path & hash
      const { protocol, pathname, search, hash } = window.location;
      window.location.href = `${protocol}//${lang}.${BASE_DOMAIN}${pathname}${search}${hash}`;
    } else {
      // Local dev — just switch in-page
      setLang(lang);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
