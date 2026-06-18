import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X, Upload } from "lucide-react";
import { ServiceRow, CategoryRow, SUPPORTED_LANGUAGES, Language, localizeCategory } from "@/types";
import type { ContentSection, Faq } from "@/content/types";
import * as api from "@/api";
import LanguageTabs from "../LanguageTabs";
import { StringListEditor, SectionsEditor, FaqEditor, FieldLabel, inputCls } from "./editorBits";

interface Props {
  service: ServiceRow | null;
  categories: CategoryRow[];
  onClose: () => void;
  onSaved: () => void;
}

/** Per-language rich content for the dedicated service page. */
interface SvcContent {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  sections: ContentSection[];
  highlights: string[];
  faq: Faq[];
  relatedGuides: string[];
}

function emptyContent(): SvcContent {
  return { seoTitle: "", seoDescription: "", h1: "", lead: "", sections: [], highlights: [], faq: [], relatedGuides: [] };
}

const ServiceForm = ({ service, categories, onClose, onSaved }: Props) => {
  const { t, language } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [saving, setSaving] = useState(false);

  const initLangMap = (prefix: string) => {
    const map: Record<string, string> = {};
    for (const l of SUPPORTED_LANGUAGES) map[l] = (service?.[`${prefix}_${l}`] as string) || "";
    return map;
  };

  const initContent = () => {
    const raw = (service?.content as unknown as Record<string, Partial<SvcContent>>) || {};
    const map: Record<string, SvcContent> = {};
    for (const l of SUPPORTED_LANGUAGES) {
      const c = raw[l] || {};
      map[l] = {
        ...emptyContent(),
        ...c,
        sections: Array.isArray(c.sections) ? c.sections : [],
        highlights: Array.isArray(c.highlights) ? c.highlights : [],
        faq: Array.isArray(c.faq) ? c.faq : [],
        relatedGuides: Array.isArray(c.relatedGuides) ? c.relatedGuides : [],
      };
    }
    return map;
  };

  const [titles, setTitles] = useState<Record<string, string>>(initLangMap("title"));
  const [descriptions, setDescriptions] = useState<Record<string, string>>(initLangMap("description"));
  const [content, setContent] = useState<Record<string, SvcContent>>(initContent);
  const [categoryId, setCategoryId] = useState(service?.category_id || "");
  const [imageUrl, setImageUrl] = useState(service?.image_url || "");
  const [slug, setSlug] = useState((service?.slug as string) || "");
  const [published, setPublished] = useState(Boolean(service?.published));
  const [sortOrder, setSortOrder] = useState(Number(service?.sort_order) || 0);

  const c = content[activeLang];
  const patchContent = (patch: Partial<SvcContent>) =>
    setContent({ ...content, [activeLang]: { ...content[activeLang], ...patch } });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImageUrl(await api.uploadImage(file));
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const data: Record<string, unknown> = {
      category_id: categoryId || null,
      image_url: imageUrl,
      slug: slug.trim() || null,
      published,
      sort_order: sortOrder,
      content,
    };
    for (const l of SUPPORTED_LANGUAGES) {
      data[`title_${l}`] = titles[l] || null;
      data[`description_${l}`] = descriptions[l] || null;
    }
    try {
      if (service) await api.updateService(service.id, data);
      else await api.createService(data);
      onSaved();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h3 className="font-display text-lg font-bold text-foreground">{service ? t.admin.editService : t.admin.addService}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Slug + publish + order */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
            <div>
              <FieldLabel>Slug (URL — leave empty for a tile without a page)</FieldLabel>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="np. odzyskanie-briefu" className={inputCls} />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground py-2">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Published
            </label>
            <div>
              <FieldLabel>Order</FieldLabel>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value) || 0)} className={`${inputCls} w-20`} />
            </div>
          </div>

          {/* Category + image */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel>{t.admin.category}</FieldLabel>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputCls}>
                <option value="">-</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{localizeCategory(cat, language)}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel>{t.admin.imageUrl}</FieldLabel>
              <div className="flex gap-2">
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputCls} />
                <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm cursor-pointer hover:bg-muted transition-colors shrink-0">
                  <Upload className="w-4 h-4" />
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {imageUrl && <img src={imageUrl} alt="" className="h-24 rounded-lg object-cover" />}

          <div className="border-t border-border pt-5">
            <LanguageTabs
              activeLang={activeLang}
              onSelect={setActiveLang}
              hasContent={(l) => !!(titles[l] || content[l]?.h1)}
              label={t.admin.languageTab}
            />
          </div>

          {/* Tile fields */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel>Tile title ({activeLang.toUpperCase()})</FieldLabel>
              <input value={titles[activeLang] || ""} onChange={(e) => setTitles({ ...titles, [activeLang]: e.target.value })} className={inputCls} />
            </div>
            <div>
              <FieldLabel>Tile summary ({activeLang.toUpperCase()})</FieldLabel>
              <input value={descriptions[activeLang] || ""} onChange={(e) => setDescriptions({ ...descriptions, [activeLang]: e.target.value })} className={inputCls} />
            </div>
          </div>

          {/* Page content (only meaningful when a slug is set) */}
          <div className="space-y-4 rounded-lg bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Page content — used for the dedicated /uslugi/{slug || "<slug>"} page.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><FieldLabel>SEO title</FieldLabel><input value={c.seoTitle} onChange={(e) => patchContent({ seoTitle: e.target.value })} className={inputCls} /></div>
              <div><FieldLabel>SEO description</FieldLabel><input value={c.seoDescription} onChange={(e) => patchContent({ seoDescription: e.target.value })} className={inputCls} /></div>
            </div>
            <div><FieldLabel>H1</FieldLabel><input value={c.h1} onChange={(e) => patchContent({ h1: e.target.value })} className={inputCls} /></div>
            <div><FieldLabel>Lead paragraph</FieldLabel><textarea value={c.lead} onChange={(e) => patchContent({ lead: e.target.value })} rows={3} className={`${inputCls} resize-y`} /></div>
            <SectionsEditor value={c.sections} onChange={(sections) => patchContent({ sections })} />
            <StringListEditor label="Highlights (what you get)" value={c.highlights} onChange={(highlights) => patchContent({ highlights })} />
            <FaqEditor value={c.faq} onChange={(faq) => patchContent({ faq })} />
            <StringListEditor label="Related guide slugs" value={c.relatedGuides} onChange={(relatedGuides) => patchContent({ relatedGuides })} placeholder="np. co-to-jest-niemiecki-brief" />
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border sticky bottom-0 bg-card">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted">{t.admin.cancel}</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-terracotta-deep disabled:opacity-50">{t.admin.save}</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
