import { describe, it, expect } from "vitest";
import {
  getServices,
  getGuides,
  resolveTranslation,
  availableLangs,
  makeGuideLinkResolver,
} from "./content-source";

describe("content source (committed-seed fallback)", () => {
  it("returns the featured DMC service first, in every authored language", async () => {
    const services = await getServices();
    expect(services[0].slug).toBe("zmiana-dmc");
    expect(services[0].featured).toBe(true);
    expect(availableLangs(services[0]).length).toBe(10);
  });

  it("keeps the other services Polish-only and falls back to pl", async () => {
    const services = await getServices();
    const modyf = services.find((s) => s.slug === "modyfikacje-konstrukcyjne")!;
    expect(availableLangs(modyf)).toEqual(["pl"]);
    expect(resolveTranslation(modyf, "en")?.resolvedLang).toBe("pl");
    expect(resolveTranslation(modyf, "ru")?.resolvedLang).toBe("pl");
  });

  it("resolves a language that exists directly", async () => {
    const services = await getServices();
    expect(resolveTranslation(services[0], "ru")?.resolvedLang).toBe("ru");
  });

  it("exposes guides with Markdown bodies", async () => {
    const guides = await getGuides();
    expect(guides.length).toBeGreaterThanOrEqual(6);
    expect(guides[0].translations.pl?.markdown).toBeTruthy();
  });

  it("guide-link resolver points at an existing language and rejects unknowns", async () => {
    const guides = await getGuides();
    const resolve = makeGuideLinkResolver(guides, "en"); // guides are pl-only
    expect(resolve("co-to-jest-niemiecki-brief")?.href).toBe(
      "/pl/guides/co-to-jest-niemiecki-brief",
    );
    expect(resolve("does-not-exist")).toBeNull();
  });
});
