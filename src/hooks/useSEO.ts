import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BASE_DOMAIN } from "@/config";

/**
 * Updates <head> meta tags (description, keywords, title, canonical, hreflang)
 * based on the current language.  Call once per page component.
 */
export function useSEO(overrides?: { description?: string; keywords?: string }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    const description = overrides?.description ?? t.seo.description;
    const keywords = overrides?.keywords ?? t.seo.keywords;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setLink("canonical", `https://${language}.${BASE_DOMAIN}/`);
    setMeta("og:description", description, "property");
    setMeta("og:url", `https://${language}.${BASE_DOMAIN}/`, "property");
  }, [language, t, overrides]);
}

/* ---- helpers ---- */

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(selector: string, href: string, hreflang?: string) {
  // For canonical links
  if (selector === "canonical") {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.rel = "canonical";
      document.head.appendChild(el);
    }
    el.href = href;
    return;
  }
}
