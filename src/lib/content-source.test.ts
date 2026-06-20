import { describe, it, expect } from "vitest";
import {
  getServices,
  getGuides,
  resolveTranslation,
  availableLangs,
  listingLangs,
  makeGuideLinkResolver,
} from "./content-source";
import type { ServiceEntry, GuideEntry } from "@/content/types";

// Inline fixtures so the helper tests don't depend on seed/DB content.
const svc: ServiceEntry = {
  slug: "demo",
  featured: false,
  sortOrder: 0,
  relatedGuides: [],
  translations: { pl: { title: "Demo", excerpt: "PL", markdown: "x" } },
};
const guide: GuideEntry = {
  slug: "g1",
  sortOrder: 0,
  translations: { pl: { title: "Poradnik 1", excerpt: "PL", markdown: "x" } },
};

describe("language helpers", () => {
  it("availableLangs lists only authored locales", () => {
    expect(availableLangs(svc)).toEqual(["pl"]);
  });

  it("resolveTranslation falls back to pl for an untranslated locale", () => {
    expect(resolveTranslation(svc, "en")?.resolvedLang).toBe("pl");
    expect(resolveTranslation(svc, "pl")?.resolvedLang).toBe("pl");
  });

  it("listingLangs unions across entries", () => {
    expect(listingLangs([svc, guide])).toEqual(["pl"]);
  });

  it("makeGuideLinkResolver targets an existing language and rejects unknowns", () => {
    const resolve = makeGuideLinkResolver([guide], "en"); // guide is pl-only
    expect(resolve("g1")?.href).toBe("/pl/guides/g1");
    expect(resolve("g1")?.label).toBe("Poradnik 1");
    expect(resolve("missing")).toBeNull();
  });
});

describe("build fallback (no CONTENT_API)", () => {
  it("keeps the featured zmiana-dmc service in every authored language", async () => {
    const services = await getServices();
    expect(services[0].slug).toBe("zmiana-dmc");
    expect(services[0].featured).toBe(true);
    expect(availableLangs(services[0]).length).toBe(10);
    expect(resolveTranslation(services[0], "ru")?.resolvedLang).toBe("ru");
  });

  it("has no committed guide fallback (guides are DB-only)", async () => {
    expect(await getGuides()).toEqual([]);
  });
});
