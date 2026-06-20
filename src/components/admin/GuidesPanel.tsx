import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Plus, Trash2, Pencil } from "lucide-react";
import { GuideRow, ServiceRow, pickTranslation } from "@/types";
import * as api from "@/api";
import GuideForm from "./GuideForm";

const GuidesPanel = () => {
  const { t } = useLanguage();
  const [guides, setGuides] = useState<GuideRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<GuideRow | null>(null);

  const load = useCallback(async () => {
    try {
      const [g, s] = await Promise.all([api.fetchGuides(), api.fetchServices()]);
      setGuides(g);
      setServices(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const guideTitle = (g: GuideRow) => pickTranslation(g.translations, "pl")?.title || g.slug;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">{t.adminUI.guides}</h3>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta text-paper text-sm font-medium hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4" /> {t.adminUI.addGuide}
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-3 font-medium text-muted-foreground">{t.adminUI.colTitle}</th>
              <th className="text-left px-6 py-3 font-medium text-muted-foreground">{t.adminUI.colSlug}</th>
              <th className="text-left px-6 py-3 font-medium text-muted-foreground w-28">{t.adminUI.colPublished}</th>
              <th className="text-right px-6 py-3 font-medium text-muted-foreground w-24"></th>
            </tr>
          </thead>
          <tbody>
            {guides.length === 0 ? (
              <tr><td className="px-6 py-4 text-muted-foreground" colSpan={4}>{t.adminUI.noGuides}</td></tr>
            ) : (
              guides.map((g) => (
                <tr key={g.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-foreground">{guideTitle(g)}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{g.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${g.published ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                      {g.published ? t.adminUI.yes : t.adminUI.draft}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditing(g); setFormOpen(true); }} className="text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                      <button onClick={async () => { await api.deleteGuide(g.id); load(); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <GuideForm
          guide={editing}
          guides={guides}
          services={services}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}
    </div>
  );
};

export default GuidesPanel;
