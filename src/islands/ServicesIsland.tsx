import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/types";
import ServicesSection from "@/components/ServicesSection";

/** Notify the (separate) chat island to open with a service context. */
function openChat(serviceId: string, serviceName: string) {
  window.dispatchEvent(
    new CustomEvent("briefservice:open-chat", { detail: { serviceId, serviceName } }),
  );
}

/** Services grid island (API-driven categories/services, filter, details). */
export default function ServicesIsland({ lang }: { lang: Language }) {
  return (
    <LanguageProvider lang={lang}>
      <ServicesSection onChatAbout={openChat} />
    </LanguageProvider>
  );
}
