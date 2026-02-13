import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X, Upload } from "lucide-react";
import { ServiceRow, CategoryRow, SUPPORTED_LANGUAGES, Language, localizeCategory } from "@/types";
import * as api from "@/api";
import LanguageTabs from "../LanguageTabs";

interface Props {
  service: ServiceRow | null;
  categories: CategoryRow[];
  onClose: () => void;
  onSaved: () => void;
}

const ServiceForm = ({ service, categories, onClose, onSaved }: Props) => {
  const { t, language } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [saving, setSaving] = useState(false);

  // Initialize titles/descriptions from existing service or empty
  const initLangMap = (prefix: string) => {
    const map: Record<string, string> = {};
    for (const l of SUPPORTED_LANGUAGES) {
      map[l] = (service?.[`${prefix}_${l}`] as string) || "";
    }
    return map;
  };

  const [titles, setTitles] = useState<Record<string, string>>(initLangMap("title"));
  const [descriptions, setDescriptions] = useState<Record<string, string>>(initLangMap("description"));
  const [categoryId, setCategoryId] = useState(service?.category_id || "");
  const [priceRange, setPriceRange] = useState(service?.price_range || "");
  const [imageUrl, setImageUrl] = useState(service?.image_url || "");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await api.uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const data: Record<string, unknown> = { category_id: categoryId || null, price_range: priceRange, image_url: imageUrl };
    for (const l of SUPPORTED_LANGUAGES) {
      data[`title_${l}`] = titles[l] || null;
      data[`description_${l}`] = descriptions[l] || null;
    }
    try {
      if (service) {
        await api.updateService(service.id, data);
      } else {
        await api.createService(data);
      }
      onSaved();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">
            {service ? t.admin.editService : t.admin.addService}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Language tabs */}
          <LanguageTabs
            activeLang={activeLang}
            onSelect={setActiveLang}
            hasContent={(l) => !!(titles[l] || descriptions[l])}
            label={t.admin.languageTab}
          />

          {/* Title */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.admin.titleField} ({activeLang.toUpperCase()})</label>
            <input value={titles[activeLang] || ""} onChange={(e) => setTitles({ ...titles, [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.admin.descriptionField} ({activeLang.toUpperCase()})</label>
            <textarea value={descriptions[activeLang] || ""} onChange={(e) => setDescriptions({ ...descriptions, [activeLang]: e.target.value })} rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.admin.category}</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring">
              <option value="">—</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{localizeCategory(cat, language)}</option>
              ))}
            </select>
          </div>

          {/* Price range */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.admin.priceRange}</label>
            <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* Image */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.admin.imageUrl}</label>
            <div className="flex gap-2">
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
              <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm cursor-pointer hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
            {imageUrl && <img src={imageUrl} alt="" className="mt-2 h-24 rounded-lg object-cover" />}
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted">{t.admin.cancel}</button>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-navy-light disabled:opacity-50">{t.admin.save}</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
