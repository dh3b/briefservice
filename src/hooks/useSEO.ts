import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BASE_DOMAIN, FALLBACK_LANGUAGE } from "@/config";
import { SUPPORTED_LANGUAGES } from "@/types";

/**
 * Updates <head> meta tags (description, keywords, canonical, og:url, hreflang)
 * based on the current language.  Call once per page component.
 */
export function useSEO(overrides?: { title?: string; description?: string; keywords?: string }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    const title = overrides?.title ?? t.seo.title;
    const description = overrides?.description ?? t.seo.description;
    const keywords = overrides?.keywords ?? t.seo.keywords;

    // Derive the path without the lang prefix for hreflang cross-links
    const pathWithoutLang = window.location.pathname.replace(/^\/[^/]*/, "") || "/";
    const canonicalPath = pathWithoutLang === "/" ? "" : pathWithoutLang;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setCanonical(`https://${BASE_DOMAIN}/${language}${canonicalPath}`);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `https://${BASE_DOMAIN}/${language}${canonicalPath}`, "property");
    setHreflangAlternates(canonicalPath);
  }, [language, t, overrides]);
}

/* ---- helpers ---- */

function setHreflangAlternates(pathWithoutLang: string) {
  // Remove existing dynamically-managed hreflang links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  for (const lang of SUPPORTED_LANGUAGES) {
    const el = document.createElement("link");
    el.rel = "alternate";
    el.setAttribute("hreflang", lang);
    el.href = `https://${BASE_DOMAIN}/${lang}${pathWithoutLang}`;
    document.head.appendChild(el);
  }

  // x-default points to the fallback language
  const xDefault = document.createElement("link");
  xDefault.rel = "alternate";
  xDefault.setAttribute("hreflang", "x-default");
  xDefault.href = `https://${BASE_DOMAIN}/${FALLBACK_LANGUAGE}${pathWithoutLang}`;
  document.head.appendChild(xDefault);
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}
