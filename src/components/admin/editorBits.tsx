import { useMemo, useRef, useState } from "react";
import { marked } from "marked";
import { Plus, Trash2, Eye, Pencil, Link2 } from "lucide-react";
import type { Faq } from "@/content/types";
import { type GuideRow, type Language, pickTranslation } from "@/types";
import { resolveGuideShortcodes } from "@/lib/guide-shortcodes";

const inputCls =
  "w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-ring";
const addBtnCls =
  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted transition-colors";
const delBtnCls = "text-muted-foreground hover:text-destructive p-1.5 shrink-0";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{children}</label>;
}

/** Short display title for a guide in a given admin language. */
function guideLabel(g: GuideRow, lang: Language): string {
  return pickTranslation(g.translations, lang)?.title || g.slug;
}

/** Edit a flat list of strings. */
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

/** Markdown body editor with an "Insert guide link" helper and a live preview. */
export function MarkdownEditor({
  value,
  onChange,
  guides,
  lang,
}: {
  value: string;
  onChange: (next: string) => void;
  guides: GuideRow[];
  lang: Language;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  const insertAtCursor = (snippet: string) => {
    const el = ref.current;
    const cur = value || "";
    if (!el) {
      onChange(cur + snippet);
      return;
    }
    const start = el.selectionStart ?? cur.length;
    const end = el.selectionEnd ?? cur.length;
    onChange(cur.slice(0, start) + snippet + cur.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      const caret = start + snippet.length;
      el.selectionStart = el.selectionEnd = caret;
    });
  };

  const html = useMemo(() => {
    const resolved = resolveGuideShortcodes(value || "", (slug) => {
      const g = guides.find((x) => x.slug === slug);
      return { href: `/${lang}/guides/${slug}`, label: g ? guideLabel(g, lang) : slug };
    });
    return marked.parse(resolved, { async: false }) as string;
  }, [value, guides, lang]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <FieldLabel>Body (Markdown)</FieldLabel>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) insertAtCursor(`[guide:${e.target.value}]`);
                e.target.value = "";
              }}
              className="appearance-none cursor-pointer pl-7 pr-3 py-1 rounded-md bg-secondary border border-border text-xs text-foreground"
              title="Insert a link to a guide"
            >
              <option value="">Insert guide link…</option>
              {guides.map((g) => (
                <option key={g.id} value={g.slug}>
                  {guideLabel(g, lang)}
                </option>
              ))}
            </select>
            <Link2 className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className={addBtnCls}
            aria-pressed={preview}
          >
            {preview ? <Pencil className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>
      {preview ? (
        <div
          className="prose-editorial min-h-[12rem] rounded-lg border border-border bg-background/50 p-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={14}
          placeholder={"## Heading\n\nParagraph text. Use [guide:slug] to link a guide."}
          className={`${inputCls} resize-y font-mono text-[13px] leading-relaxed`}
        />
      )}
    </div>
  );
}

/** Manage the curated, ordered list of related-guide slugs for a service. */
export function RelatedGuidesEditor({
  value,
  onChange,
  guides,
  lang,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  guides: GuideRow[];
  lang: Language;
}) {
  const available = guides.filter((g) => !value.includes(g.slug));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const labelFor = (slug: string) => {
    const g = guides.find((x) => x.slug === slug);
    return g ? guideLabel(g, lang) : slug;
  };
  return (
    <div>
      <FieldLabel>Related guides (curated, ordered)</FieldLabel>
      <div className="space-y-2">
        {value.map((slug, i) => (
          <div key={slug} className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2">
            <span className="flex-1 text-sm text-foreground truncate">{labelFor(slug)}</span>
            <span className="font-mono text-[11px] text-muted-foreground">{slug}</span>
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30 px-1" aria-label="Move up">↑</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30 px-1" aria-label="Move down">↓</button>
            <button type="button" onClick={() => onChange(value.filter((s) => s !== slug))} className={delBtnCls} aria-label="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {available.length > 0 && (
          <select
            value=""
            onChange={(e) => e.target.value && onChange([...value, e.target.value])}
            className={inputCls}
          >
            <option value="">Add a related guide…</option>
            {available.map((g) => (
              <option key={g.id} value={g.slug}>
                {guideLabel(g, lang)}
              </option>
            ))}
          </select>
        )}
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
