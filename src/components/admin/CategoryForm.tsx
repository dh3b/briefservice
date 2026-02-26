import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X } from "lucide-react";
import { CategoryRow, SUPPORTED_LANGUAGES, Language } from "@/types";
import * as api from "@/api";
import LanguageTabs from "../LanguageTabs";

interface Props {
  category: CategoryRow | null;
  onClose: () => void;
  onSaved: () => void;
}

const CategoryForm = ({ category, onClose, onSaved }: Props) => {
  const { t, language } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [saving, setSaving] = useState(false);

  const initNames = () => {
    const map: Record<string, string> = {};
    for (const l of SUPPORTED_LANGUAGES) {
      map[l] = (category?.[`name_${l}`] as string) || "";
    }
    return map;
  };

  const [names, setNames] = useState<Record<string, string>>(initNames);

  const handleSave = async () => {
    setSaving(true);
    const data: Record<string, unknown> = {};
    for (const l of SUPPORTED_LANGUAGES) {
      data[`name_${l}`] = names[l] || null;
    }
    try {
      if (category) {
        await api.updateCategory(category.id, data);
      } else {
        await api.createCategory(data);
      }
      onSaved();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-card rounded-xl border border-border w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">
            {category ? t.admin.editCategory : t.admin.addCategory}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-5">
          <LanguageTabs
            activeLang={activeLang}
            onSelect={setActiveLang}
            hasContent={(l) => !!names[l]}
            label={t.admin.languageTab}
          />

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.admin.titleField} ({activeLang.toUpperCase()})</label>
            <input value={names[activeLang] || ""} onChange={(e) => setNames({ ...names, [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
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

export default CategoryForm;
