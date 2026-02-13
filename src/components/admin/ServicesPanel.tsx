import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Plus, Trash2, Pencil } from "lucide-react";
import { ServiceRow, CategoryRow, localizeService, localizeCategory } from "@/types";
import * as api from "@/api";
import ServiceForm from "./ServiceForm";
import CategoryForm from "./CategoryForm";
import { getCategoryName } from "@/lib/localize";

const ServicesPanel = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null);

  const load = useCallback(async () => {
    try {
      const [s, c] = await Promise.all([api.fetchServices(), api.fetchCategories()]);
      setServices(s);
      setCategories(c);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-8">
      {/* Categories section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t.admin.categories}</h3>
          <button onClick={() => { setEditingCategory(null); setCategoryFormOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-all">
            <Plus className="w-4 h-4" /> {t.admin.addCategory}
          </button>
        </div>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">{t.admin.titleField}</th>
                <th className="text-right px-6 py-3 font-medium text-muted-foreground w-24"></th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td className="px-6 py-4 text-muted-foreground" colSpan={2}>{t.admin.noCategories}</td></tr>
              ) : categories.map((cat) => (
                <tr key={cat.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-foreground">{localizeCategory(cat, language)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditingCategory(cat); setCategoryFormOpen(true); }} className="text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                      <button onClick={async () => { await api.deleteCategory(cat.id); load(); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t.admin.servicesManage}</h3>
          <button onClick={() => { setEditingService(null); setServiceFormOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-gradient text-accent-foreground text-sm font-medium hover:shadow-md transition-all">
            <Plus className="w-4 h-4" /> {t.admin.addService}
          </button>
        </div>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">{t.admin.titleField}</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">{t.admin.category}</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">{t.admin.priceRange}</th>
                <th className="text-right px-6 py-3 font-medium text-muted-foreground w-24"></th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr><td className="px-6 py-4 text-muted-foreground" colSpan={4}>{t.admin.noServices}</td></tr>
              ) : services.map((s) => {
                const loc = localizeService(s, language);
                return (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 text-foreground">{loc.title}</td>
                    <td className="px-6 py-4 text-foreground">{getCategoryName(categories, s.category_id, language, "\u2014")}</td>
                    <td className="px-6 py-4 text-foreground">{s.price_range}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditingService(s); setServiceFormOpen(true); }} className="text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                        <button onClick={async () => { await api.deleteService(s.id); load(); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {serviceFormOpen && (
        <ServiceForm
          service={editingService}
          categories={categories}
          onClose={() => setServiceFormOpen(false)}
          onSaved={() => { setServiceFormOpen(false); load(); }}
        />
      )}

      {categoryFormOpen && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setCategoryFormOpen(false)}
          onSaved={() => { setCategoryFormOpen(false); load(); }}
        />
      )}
    </div>
  );
};

export default ServicesPanel;
