import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X, Upload } from "lucide-react";
import {
  ServiceRow,
  GuideRow,
  CategoryRow,
  SUPPORTED_LANGUAGES,
  Language,
  localizeCategory,
} from "@/types";
import type { Faq } from "@/content/types";
import * as api from "@/api";
import LanguageTabs from "../LanguageTabs";
import {
  MarkdownEditor,
  RelatedGuidesEditor,
  FaqEditor,
  FieldLabel,
  inputCls,
} from "./editorBits";

interface Props {
  service: ServiceRow | null;
  categories: CategoryRow[];
  guides: GuideRow[];
  onClose: () => void;
  onSaved: () => void;
}

interface TForm {
  title: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  markdown: string;
  faq: Faq[];
}

const emptyT = (): TForm => ({ title: "", h1: "", seoTitle: "", seoDescription: "", excerpt: "", markdown: "", faq: [] });

const ServiceForm = ({ service, categories, guides, onClose, onSaved }: Props) => {
  const { t, language } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [saving, setSaving] = useState(false);

  const initTranslations = () => {
    const map: Record<string, TForm> = {};
    for (const l of SUPPORTED_LANGUAGES) map[l] = emptyT();
    for (const tr of service?.translations ?? []) {
      map[tr.lang] = {
        title: tr.title || "",
        h1: tr.h1 || "",
        seoTitle: tr.seo_title || "",
        seoDescription: tr.seo_description || "",
        excerpt: tr.excerpt || "",
        markdown: tr.markdown || "",
        faq: Array.isArray(tr.faq) ? tr.faq : [],
      };
    }
    return map;
  };

  const [tr, setTr] = useState<Record<string, TForm>>(initTranslations);
  const [categoryId, setCategoryId] = useState(service?.category_id || "");
  const [imageUrl, setImageUrl] = useState(service?.image_url || "");
  const [heroImage, setHeroImage] = useState(service?.hero_image || "");
  const [slug, setSlug] = useState(service?.slug || "");
  const [featured, setFeatured] = useState(Boolean(service?.featured));
  const [published, setPublished] = useState(Boolean(service?.published));
  const [sortOrder, setSortOrder] = useState(Number(service?.sort_order) || 0);
  const [relatedGuides, setRelatedGuides] = useState<string[]>(service?.related_guides ?? []);

  const c = tr[activeLang];
  const patch = (p: Partial<TForm>) => setTr({ ...tr, [activeLang]: { ...tr[activeLang], ...p } });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, set: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      set(await api.uploadImage(file));
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
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
      }));
    const data: Record<string, unknown> = {
      category_id: categoryId || null,
      image_url: imageUrl,
      hero_image: heroImage || null,
      slug: slug.trim() || null,
      featured,
      published,
      sort_order: sortOrder,
      related_guides: relatedGuides,
      translations,
    };
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
          {/* Slug + flags + order */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
            <div>
              <FieldLabel>{t.adminUI.slugServiceLabel}</FieldLabel>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={t.adminUI.slugServicePlaceholder} className={inputCls} />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground py-2">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> {t.adminUI.featured}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground py-2">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> {t.adminUI.published}
            </label>
            <div>
              <FieldLabel>{t.adminUI.order}</FieldLabel>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value) || 0)} className={`${inputCls} w-20`} />
            </div>
          </div>

          {/* Category + tile image */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel>{t.admin.category}</FieldLabel>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputCls}>
                <option value="">-</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{localizeCategory(cat, language)}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel>{t.adminUI.tileImage}</FieldLabel>
              <div className="flex gap-2">
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputCls} />
                <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm cursor-pointer hover:bg-muted transition-colors shrink-0">
                  <Upload className="w-4 h-4" />
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(e, setImageUrl)} className="hidden" />
                </label>
              </div>
            </div>
          </div>
          {imageUrl && <img src={imageUrl} alt="" className="h-24 rounded-lg object-cover" />}

          <RelatedGuidesEditor value={relatedGuides} onChange={setRelatedGuides} guides={guides} lang={activeLang} />

          <div className="border-t border-border pt-5">
            <LanguageTabs
              activeLang={activeLang}
              onSelect={setActiveLang}
              hasContent={(l) => !!(tr[l]?.title || tr[l]?.markdown)}
              label={t.admin.languageTab}
            />
          </div>

          {/* Per-language content */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div><FieldLabel>{t.adminUI.fieldTitle} ({activeLang.toUpperCase()})</FieldLabel><input value={c.title} onChange={(e) => patch({ title: e.target.value })} className={inputCls} /></div>
            <div><FieldLabel>{t.adminUI.fieldExcerpt}</FieldLabel><input value={c.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} className={inputCls} /></div>
          </div>
          <div><FieldLabel>{t.adminUI.fieldH1}</FieldLabel><input value={c.h1} onChange={(e) => patch({ h1: e.target.value })} className={inputCls} /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><FieldLabel>{t.adminUI.seoTitle}</FieldLabel><input value={c.seoTitle} onChange={(e) => patch({ seoTitle: e.target.value })} className={inputCls} /></div>
            <div><FieldLabel>{t.adminUI.seoDescription}</FieldLabel><input value={c.seoDescription} onChange={(e) => patch({ seoDescription: e.target.value })} className={inputCls} /></div>
          </div>

          <MarkdownEditor value={c.markdown} onChange={(markdown) => patch({ markdown })} guides={guides} lang={activeLang} />
          <FaqEditor value={c.faq} onChange={(faq) => patch({ faq })} />
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
