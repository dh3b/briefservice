import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X } from "lucide-react";
import { GuideRow, SUPPORTED_LANGUAGES, Language } from "@/types";
import type { ContentSection, Faq } from "@/content/types";
import * as api from "@/api";
import LanguageTabs from "../LanguageTabs";
import { StringListEditor, SectionsEditor, FaqEditor, FieldLabel, inputCls } from "./editorBits";

interface Props {
  guide: GuideRow | null;
  onClose: () => void;
  onSaved: () => void;
}

interface GuideContent {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  summary: string;
  lead: string;
  sections: ContentSection[];
  faq: Faq[];
  cta: { href: string; label: string; text: string };
}

function emptyContent(): GuideContent {
  return { seoTitle: "", seoDescription: "", h1: "", summary: "", lead: "", sections: [], faq: [], cta: { href: "", label: "", text: "" } };
}

const GuideForm = ({ guide, onClose, onSaved }: Props) => {
  const { t, language } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const initContent = () => {
    const raw = (guide?.content as unknown as Record<string, Partial<GuideContent>>) || {};
    const map: Record<string, GuideContent> = {};
    for (const l of SUPPORTED_LANGUAGES) {
      const cc = raw[l] || {};
      map[l] = {
        ...emptyContent(),
        ...cc,
        sections: Array.isArray(cc.sections) ? cc.sections : [],
        faq: Array.isArray(cc.faq) ? cc.faq : [],
        cta: { ...emptyContent().cta, ...(cc.cta || {}) },
      };
    }
    return map;
  };

  const [content, setContent] = useState<Record<string, GuideContent>>(initContent);
  const [slug, setSlug] = useState(guide?.slug || "");
  const [published, setPublished] = useState(Boolean(guide?.published));
  const [sortOrder, setSortOrder] = useState(Number(guide?.sort_order) || 0);

  const c = content[activeLang];
  const patchContent = (patch: Partial<GuideContent>) =>
    setContent({ ...content, [activeLang]: { ...content[activeLang], ...patch } });

  const handleSave = async () => {
    if (!slug.trim()) {
      setError("Slug is required for a guide.");
      return;
    }
    setSaving(true);
    setError("");
    const data: Record<string, unknown> = { slug: slug.trim(), published, sort_order: sortOrder, content };
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
              <FieldLabel>Slug (URL — /poradnik/&lt;slug&gt;)</FieldLabel>
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
            <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} hasContent={(l) => !!content[l]?.h1} label={t.admin.languageTab} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div><FieldLabel>SEO title</FieldLabel><input value={c.seoTitle} onChange={(e) => patchContent({ seoTitle: e.target.value })} className={inputCls} /></div>
            <div><FieldLabel>SEO description</FieldLabel><input value={c.seoDescription} onChange={(e) => patchContent({ seoDescription: e.target.value })} className={inputCls} /></div>
          </div>
          <div><FieldLabel>H1</FieldLabel><input value={c.h1} onChange={(e) => patchContent({ h1: e.target.value })} className={inputCls} /></div>
          <div><FieldLabel>Card summary (guides hub)</FieldLabel><input value={c.summary} onChange={(e) => patchContent({ summary: e.target.value })} className={inputCls} /></div>
          <div><FieldLabel>Lead paragraph</FieldLabel><textarea value={c.lead} onChange={(e) => patchContent({ lead: e.target.value })} rows={3} className={`${inputCls} resize-y`} /></div>

          <SectionsEditor value={c.sections} onChange={(sections) => patchContent({ sections })} />
          <FaqEditor value={c.faq} onChange={(faq) => patchContent({ faq })} />

          <div className="space-y-3 rounded-lg bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">CTA (links the guide to a service)</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><FieldLabel>Href</FieldLabel><input value={c.cta.href} onChange={(e) => patchContent({ cta: { ...c.cta, href: e.target.value } })} placeholder="/pl/uslugi/odzyskanie-briefu" className={inputCls} /></div>
              <div><FieldLabel>Button label</FieldLabel><input value={c.cta.label} onChange={(e) => patchContent({ cta: { ...c.cta, label: e.target.value } })} className={inputCls} /></div>
              <div><FieldLabel>CTA text</FieldLabel><input value={c.cta.text} onChange={(e) => patchContent({ cta: { ...c.cta, text: e.target.value } })} className={inputCls} /></div>
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
