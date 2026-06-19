import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X } from "lucide-react";
import {
  GuideRow,
  ServiceRow,
  SUPPORTED_LANGUAGES,
  Language,
  pickTranslation,
} from "@/types";
import type { Faq } from "@/content/types";
import * as api from "@/api";
import LanguageTabs from "../LanguageTabs";
import { MarkdownEditor, FaqEditor, FieldLabel, inputCls } from "./editorBits";

interface Props {
  guide: GuideRow | null;
  guides: GuideRow[];
  services: ServiceRow[];
  onClose: () => void;
  onSaved: () => void;
}

interface Cta {
  serviceSlug: string;
  label: string;
  text: string;
}
interface TForm {
  title: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  markdown: string;
  faq: Faq[];
  cta: Cta;
}

const emptyCta = (): Cta => ({ serviceSlug: "", label: "", text: "" });
const emptyT = (): TForm => ({ title: "", h1: "", seoTitle: "", seoDescription: "", excerpt: "", markdown: "", faq: [], cta: emptyCta() });

const GuideForm = ({ guide, guides, services, onClose, onSaved }: Props) => {
  const { t, language } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const initTranslations = () => {
    const map: Record<string, TForm> = {};
    for (const l of SUPPORTED_LANGUAGES) map[l] = emptyT();
    for (const tr of guide?.translations ?? []) {
      map[tr.lang] = {
        title: tr.title || "",
        h1: tr.h1 || "",
        seoTitle: tr.seo_title || "",
        seoDescription: tr.seo_description || "",
        excerpt: tr.excerpt || "",
        markdown: tr.markdown || "",
        faq: Array.isArray(tr.faq) ? tr.faq : [],
        cta: { ...emptyCta(), ...(tr.cta || {}) },
      };
    }
    return map;
  };

  const [tr, setTr] = useState<Record<string, TForm>>(initTranslations);
  const [slug, setSlug] = useState(guide?.slug || "");
  const [published, setPublished] = useState(Boolean(guide?.published));
  const [sortOrder, setSortOrder] = useState(Number(guide?.sort_order) || 0);

  const c = tr[activeLang];
  const patch = (p: Partial<TForm>) => setTr({ ...tr, [activeLang]: { ...tr[activeLang], ...p } });

  const handleSave = async () => {
    if (!slug.trim()) {
      setError("Slug is required for a guide.");
      return;
    }
    setSaving(true);
    setError("");
    const translations = SUPPORTED_LANGUAGES
      .filter((l) => tr[l].title || tr[l].markdown || tr[l].excerpt)
      .map((l) => ({
        lang: l,
        title: tr[l].title,
        h1: tr[l].h1,
        seo_title: tr[l].seoTitle,
        seo_description: tr[l].seoDescription,
        excerpt: tr[l].excerpt,
        markdown: tr[l].markdown,
        faq: tr[l].faq,
        cta: tr[l].cta.serviceSlug || tr[l].cta.label || tr[l].cta.text ? tr[l].cta : null,
      }));
    const data: Record<string, unknown> = { slug: slug.trim(), published, sort_order: sortOrder, translations };
    try {
      if (guide) await api.updateGuide(guide.id, data);
      else await api.createGuide(data);
      onSaved();
    } catch (err) {
      setError((err as Error).message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h3 className="font-display text-lg font-bold text-foreground">{guide ? "Edit guide" : "Add guide"}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
            <div>
              <FieldLabel>Slug (URL — /&lt;lang&gt;/guides/&lt;slug&gt;)</FieldLabel>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="np. co-to-jest-niemiecki-brief" className={inputCls} />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground py-2">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Published
            </label>
            <div>
              <FieldLabel>Order</FieldLabel>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value) || 0)} className={`${inputCls} w-20`} />
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} hasContent={(l) => !!(tr[l]?.title || tr[l]?.markdown)} label={t.admin.languageTab} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div><FieldLabel>Title ({activeLang.toUpperCase()}) — card / listing</FieldLabel><input value={c.title} onChange={(e) => patch({ title: e.target.value })} className={inputCls} /></div>
            <div><FieldLabel>Excerpt — card summary + meta</FieldLabel><input value={c.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} className={inputCls} /></div>
          </div>
          <div><FieldLabel>H1 (page heading)</FieldLabel><input value={c.h1} onChange={(e) => patch({ h1: e.target.value })} className={inputCls} /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><FieldLabel>SEO title (defaults to Title)</FieldLabel><input value={c.seoTitle} onChange={(e) => patch({ seoTitle: e.target.value })} className={inputCls} /></div>
            <div><FieldLabel>SEO description (defaults to Excerpt)</FieldLabel><input value={c.seoDescription} onChange={(e) => patch({ seoDescription: e.target.value })} className={inputCls} /></div>
          </div>

          <MarkdownEditor value={c.markdown} onChange={(markdown) => patch({ markdown })} guides={guides} lang={activeLang} />
          <FaqEditor value={c.faq} onChange={(faq) => patch({ faq })} />

          <div className="space-y-3 rounded-lg bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">CTA — links the guide to a service ({activeLang.toUpperCase()})</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <FieldLabel>Service</FieldLabel>
                <select value={c.cta.serviceSlug} onChange={(e) => patch({ cta: { ...c.cta, serviceSlug: e.target.value } })} className={inputCls}>
                  <option value="">-</option>
                  {services.filter((s) => s.slug).map((s) => (
                    <option key={s.id} value={s.slug!}>{pickTranslation(s.translations, activeLang)?.title || s.slug}</option>
                  ))}
                </select>
              </div>
              <div><FieldLabel>Button label</FieldLabel><input value={c.cta.label} onChange={(e) => patch({ cta: { ...c.cta, label: e.target.value } })} className={inputCls} /></div>
              <div><FieldLabel>CTA text</FieldLabel><input value={c.cta.text} onChange={(e) => patch({ cta: { ...c.cta, text: e.target.value } })} className={inputCls} /></div>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border sticky bottom-0 bg-card">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted">{t.admin.cancel}</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-terracotta-deep disabled:opacity-50">{t.admin.save}</button>
        </div>
      </div>
    </div>
  );
};

export default GuideForm;
