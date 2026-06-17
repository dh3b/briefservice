import { describe, it, expect } from "vitest";
import {
  SUPPORTED_LANGUAGES,
  FALLBACK_LANGUAGE,
  PAGES,
  canonicalUrl,
  hreflangAlternates,
  staticRenderPaths,
  buildSitemapXml,
} from "./site";

describe("canonicalUrl", () => {
  it("keeps a trailing slash for the language home", () => {
    expect(canonicalUrl("pl", "")).toBe("https://brief-service.com/pl/");
  });

  it("has no trailing slash for sub-pages", () => {
    expect(canonicalUrl("ru", "zmiana-dmc")).toBe("https://brief-service.com/ru/zmiana-dmc");
  });

  it("normalises stray slashes in the sub-path", () => {
    expect(canonicalUrl("es", "/zmiana-dmc/")).toBe("https://brief-service.com/es/zmiana-dmc");
  });
});

describe("hreflangAlternates", () => {
  it("lists one alternate per language plus x-default", () => {
    const alts = hreflangAlternates("");
    expect(alts).toHaveLength(SUPPORTED_LANGUAGES.length + 1);
    const xDefault = alts.find((a) => a.hreflang === "x-default");
    expect(xDefault?.href).toBe(canonicalUrl(FALLBACK_LANGUAGE, ""));
  });

  it("points each alternate at its own language-prefixed URL", () => {
    const alts = hreflangAlternates("zmiana-dmc");
    expect(alts.find((a) => a.hreflang === "pl")?.href).toBe(
      "https://brief-service.com/pl/zmiana-dmc",
    );
  });
});

describe("staticRenderPaths", () => {
  it("includes the root plus every language × page", () => {
    const paths = staticRenderPaths();
    expect(paths).toContain("/");
    expect(paths).toContain("/pl");
    expect(paths).toContain("/pl/zmiana-dmc");
    expect(paths).toContain("/pl/admin");
    expect(paths).toHaveLength(1 + SUPPORTED_LANGUAGES.length * PAGES.length);
  });
});

describe("buildSitemapXml", () => {
  const xml = buildSitemapXml();

  it("includes indexable pages with self-referential locs", () => {
    expect(xml).toContain("<loc>https://brief-service.com/pl/</loc>");
    expect(xml).toContain("<loc>https://brief-service.com/pl/zmiana-dmc</loc>");
    expect(xml).toContain('hreflang="x-default"');
  });

  it("excludes the noindex admin route", () => {
    expect(xml).not.toContain("/admin");
  });
});
