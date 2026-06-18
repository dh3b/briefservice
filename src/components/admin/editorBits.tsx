import { Plus, Trash2 } from "lucide-react";
import type { ContentSection, Faq } from "@/content/types";

const inputCls =
  "w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring";
const addBtnCls =
  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted transition-colors";
const delBtnCls = "text-muted-foreground hover:text-destructive p-1.5 shrink-0";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{children}</label>;
}

/** Edit a flat list of strings (highlights, bullets, related slugs, …). */
export function StringListEditor({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const set = (i: number, v: string) => onChange(value.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            {multiline ? (
              <textarea value={item} onChange={(e) => set(i, e.target.value)} rows={2} placeholder={placeholder} className={`${inputCls} resize-y`} />
            ) : (
              <input value={item} onChange={(e) => set(i, e.target.value)} placeholder={placeholder} className={inputCls} />
            )}
            <button type="button" onClick={() => remove(i)} className={delBtnCls} aria-label="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, ""])} className={addBtnCls}>
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

/** Edit a list of content sections: heading + paragraphs + bullets. */
export function SectionsEditor({
  value,
  onChange,
}: {
  value: ContentSection[];
  onChange: (next: ContentSection[]) => void;
}) {
  const setSection = (i: number, patch: Partial<ContentSection>) =>
    onChange(value.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  return (
    <div>
      <FieldLabel>Sections</FieldLabel>
      <div className="space-y-4">
        {value.map((sec, i) => (
          <div key={i} className="rounded-lg border border-border p-3 space-y-3 bg-background/50">
            <div className="flex gap-2 items-center">
              <input
                value={sec.heading}
                onChange={(e) => setSection(i, { heading: e.target.value })}
                placeholder="Section heading"
                className={`${inputCls} font-medium`}
              />
              <button type="button" onClick={() => remove(i)} className={delBtnCls} aria-label="Remove section">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <StringListEditor
              label="Paragraphs"
              value={sec.body ?? []}
              onChange={(body) => setSection(i, { body })}
              multiline
            />
            <StringListEditor
              label="Bullets"
              value={sec.bullets ?? []}
              onChange={(bullets) => setSection(i, { bullets })}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { heading: "", body: [], bullets: [] }])}
          className={addBtnCls}
        >
          <Plus className="w-3.5 h-3.5" /> Add section
        </button>
      </div>
    </div>
  );
}

/** Edit a list of FAQ question/answer pairs (drives FAQPage schema). */
export function FaqEditor({ value, onChange }: { value: Faq[]; onChange: (next: Faq[]) => void }) {
  const set = (i: number, patch: Partial<Faq>) => onChange(value.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  return (
    <div>
      <FieldLabel>FAQ</FieldLabel>
      <div className="space-y-3">
        {value.map((f, i) => (
          <div key={i} className="rounded-lg border border-border p-3 space-y-2 bg-background/50">
            <div className="flex gap-2 items-center">
              <input value={f.q} onChange={(e) => set(i, { q: e.target.value })} placeholder="Question" className={`${inputCls} font-medium`} />
              <button type="button" onClick={() => remove(i)} className={delBtnCls} aria-label="Remove FAQ">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea value={f.a} onChange={(e) => set(i, { a: e.target.value })} rows={2} placeholder="Answer" className={`${inputCls} resize-y`} />
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, { q: "", a: "" }])} className={addBtnCls}>
          <Plus className="w-3.5 h-3.5" /> Add FAQ
        </button>
      </div>
    </div>
  );
}

export { inputCls };
