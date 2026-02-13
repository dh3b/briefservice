import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, Language } from "@/types";

interface LanguageTabsProps {
  activeLang: Language;
  onSelect: (lang: Language) => void;
  /** Function to determine if a language has content (shows ✓) */
  hasContent?: (lang: Language) => boolean;
  label?: string;
}

const LanguageTabs = ({ activeLang, onSelect, hasContent, label }: LanguageTabsProps) => (
  <div>
    {label && <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>}
    <div className="flex flex-wrap gap-1">
      {SUPPORTED_LANGUAGES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onSelect(l as Language)}
          className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
            activeLang === l
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {LANGUAGE_LABELS[l as Language]} {hasContent?.(l as Language) ? "✓" : ""}
        </button>
      ))}
    </div>
  </div>
);

export default LanguageTabs;
