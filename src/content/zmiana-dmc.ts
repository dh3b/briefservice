/**
 * The DMC/GVW-change service. It used to be a hardcoded page; it is now a
 * regular (featured) service. Its content already exists in `translations.ts`
 * for all 10 languages, so we assemble its per-language Markdown from there —
 * keeping every locale that the old `/[lang]/zmiana-dmc` page served.
 */
import { translations } from "@/i18n/translations";
import { SUPPORTED_LANGUAGES, type Language } from "@/seo/site";
import type { ServiceEntry, Translation, Translations } from "./types";

type ZmianaDmc = (typeof translations)[Language]["zmianaDmc"];

function buildMarkdown(d: ZmianaDmc): string {
  const parts: string[] = [];
  const push = (s?: string) => {
    if (s && s.trim()) parts.push(s.trim());
  };
  const paras = (items?: string[]) => {
    for (const x of items ?? []) push(x);
  };
  const bullets = (items?: string[]) => {
    const xs = (items ?? []).filter((x) => x && x.trim());
    if (xs.length) parts.push(xs.map((x) => `- ${x.trim()}`).join("\n"));
  };

  push(d.intro?.subtitle);

  const s = d.service2500;
  if (s?.title) {
    parts.push(`## ${s.title.trim()}`);
    push(s.subtitle);
    paras(s.lead);
    if (s.scopeTitle) parts.push(`### ${s.scopeTitle.trim()}`);
    paras(s.scopeText);
    if (s.scopeNote?.trim()) push(`**${s.scopeNote.trim()}**`);
    if (s.getTitle) parts.push(`### ${s.getTitle.trim()}`);
    bullets(s.getList);
    if (s.verifyTitle) parts.push(`### ${s.verifyTitle.trim()}`);
    push(s.verifyText);
    push(s.verifyPhotos);
  }

  const s2 = d.service3500;
  if (s2?.title) {
    parts.push(`## ${s2.title.trim()}`);
    push(s2.subtitle);
    paras(s2.lead);
    if (s2.scopeTitle) parts.push(`### ${s2.scopeTitle.trim()}`);
    paras(s2.scopeText);
    if (s2.scopeNote?.trim()) push(`**${s2.scopeNote.trim()}**`);
  }

  const h = d.howItWorks;
  if (h?.title) {
    parts.push(`## ${h.title.trim()}`);
    const steps: [string, string][] = [
      [h.step1, h.step1Desc],
      [h.step2, h.step2Desc],
      [h.step3, h.step3Desc],
      [h.step4, h.step4Desc],
    ];
    const lines = steps
      .filter(([t]) => t && t.trim())
      .map(([t, desc]) => `1. **${t.trim()}** — ${(desc ?? "").trim()}`.replace(/ — $/, ""));
    if (lines.length) parts.push(lines.join("\n"));
  }

  const n = d.note;
  if (n?.description?.trim()) {
    if (n.title?.trim()) parts.push(`## ${n.title.trim()}`);
    push(n.description);
  }

  return parts.join("\n\n");
}

function buildTranslations(): Translations {
  const out: Translations = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    const d = translations[lang].zmianaDmc;
    const fc = translations[lang].services.featured_card;
    const h1 = d?.intro?.title?.trim();
    if (!h1) continue;
    const t: Translation = {
      title: fc?.title?.trim() || h1,
      h1,
      seoTitle: d.seo?.title?.trim() || h1,
      seoDescription: d.seo?.description?.trim() || fc?.description?.trim() || "",
      excerpt: fc?.description?.trim() || d.seo?.description?.trim() || "",
      markdown: buildMarkdown(d),
    };
    out[lang] = t;
  }
  return out;
}

/** The featured DMC-change service, available in every authored language. */
export const ZMIANA_DMC_SERVICE: ServiceEntry = {
  slug: "zmiana-dmc",
  featured: true,
  sortOrder: 0,
  relatedGuides: ["zmiana-dmc-jak-dziala"],
  translations: buildTranslations(),
};
