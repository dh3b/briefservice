import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, Translations } from "./translations";
import { Language, SUPPORTED_LANGUAGES } from "@/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  const stored = localStorage.getItem("lang");
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }
  const nav = navigator.language?.slice(0, 2)?.toLowerCase();
  if (nav && SUPPORTED_LANGUAGES.includes(nav as Language)) {
    return nav as Language;
  }
  return "pl";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLang] = useState<Language>(detectBrowserLanguage);
  const t = translations[language];

  const setLanguage = (lang: Language) => {
    setLang(lang);
    localStorage.setItem("lang", lang);
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
