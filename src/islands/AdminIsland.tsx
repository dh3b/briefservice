import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/types";
import AdminApp from "@/components/admin/AdminApp";

/** Client-only admin panel island (auth-gated, talks to the Express API). */
export default function AdminIsland({ lang }: { lang: Language }) {
  return (
    <LanguageProvider lang={lang}>
      <AdminApp />
    </LanguageProvider>
  );
}
