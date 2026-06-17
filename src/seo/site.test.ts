import { describe, it, expect } from "vitest";
import {
  SUPPORTED_LANGUAGES,
  FALLBACK_LANGUAGE,
  canonicalUrl,
  hreflangAlternates,
  baseSitemapEntries,
  buildSitemapXml,
  organizationSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "./site";

describe("canonicalUrl", () => {
  it("keeps a trailing slash for the language home", () => {
    expect(canonicalUrl("pl", "")).toBe("https://brief-service.com/pl/");
  });

  it("has no trailing slash for sub-pages", () => {
    expect(canonicalUrl("ru", "zmiana-dmc")).toBe("https://brief-service.com/ru/zmiana-dmc");
  });

  it("normalises stray slashes in the sub-path", () => {
    expect(canonicalUrl("pl", "/uslugi/odzyskanie-briefu/")).toBe(
      "https://brief-service.com/pl/uslugi/odzyskanie-briefu",
    );
  });
});

describe("hreflangAlternates", () => {
  it("lists one alternate per language plus x-default by default", () => {
    const alts = hreflangAlternates("");
    expect(alts).toHaveLength(SUPPORTED_LANGUAGES.length + 1);
    expect(alts.find((a) => a.hreflang === "x-default")?.href).toBe(
      canonicalUrl(FALLBACK_LANGUAGE, ""),
    );
  });

  it("restricts to a language subset and points x-default within it", () => {
    const alts = hreflangAlternates("poradnik/koszt-wyrobienia-briefu", ["pl"]);
    expect(alts).toHaveLength(2); // pl + x-default
    expect(alts.find((a) => a.hreflang === "pl")?.href).toBe(
      "https://brief-service.com/pl/poradnik/koszt-wyrobienia-briefu",
    );
    expect(alts.find((a) => a.hreflang === "x-default")?.href).toBe(
      "https://brief-service.com/pl/poradnik/koszt-wyrobienia-briefu",
    );
  });
});

describe("buildSitemapXml", () => {
  const xml = buildSitemapXml([
    ...baseSitemapEntries(),
    { subPath: "poradnik/co-to-jest-niemiecki-brief", langs: ["pl"] },
  ]);

  it("includes base pages with self-referential locs", () => {
    expect(xml).toContain("<loc>https://brief-service.com/pl/</loc>");
    expect(xml).toContain("<loc>https://brief-service.com/pl/zmiana-dmc</loc>");
    expect(xml).toContain('hreflang="x-default"');
  });

  it("includes Polish-only content pages", () => {
    expect(xml).toContain("<loc>https://brief-service.com/pl/poradnik/co-to-jest-niemiecki-brief</loc>");
  });

  it("excludes the noindex admin route", () => {
    expect(xml).not.toContain("/admin");
  });
});

describe("JSON-LD builders", () => {
  it("organizationSchema is a private Organization serving DE", () => {
    const org = organizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect((org.areaServed as { name: string }).name).toBe("DE");
  });

  it("serviceSchema carries provider + areaServed", () => {
    const s = serviceSchema({ name: "Test", description: "d", url: "https://x/" });
    expect(s["@type"]).toBe("Service");
    expect((s.provider as { name: string }).name).toBe("BriefService");
  });

  it("faqSchema maps Q&A into mainEntity", () => {
    const f = faqSchema([{ q: "Q?", a: "A." }]);
    expect(f["@type"]).toBe("FAQPage");
    expect((f.mainEntity as unknown[]).length).toBe(1);
  });

  it("breadcrumbSchema positions items in order", () => {
    const b = breadcrumbSchema([
      { name: "Home", url: "https://x/" },
      { name: "Guide", url: "https://x/g" },
    ]);
    const items = b.itemListElement as { position: number }[];
    expect(items.map((i) => i.position)).toEqual([1, 2]);
  });
});
