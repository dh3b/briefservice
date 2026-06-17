import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/types";
import ContactSection from "@/components/ContactSection";

/** Contact section island (interactive form + conversion tracking). */
export default function ContactIsland({ lang }: { lang: Language }) {
  return (
    <LanguageProvider lang={lang}>
      <ContactSection />
    </LanguageProvider>
  );
}
