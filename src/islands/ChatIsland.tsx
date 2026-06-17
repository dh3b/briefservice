import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/types";
import ChatWidget from "@/components/ChatWidget";

/** Floating chat widget island. Listens for `briefservice:open-chat` events. */
export default function ChatIsland({ lang }: { lang: Language }) {
  return (
    <LanguageProvider lang={lang}>
      <ChatWidget />
    </LanguageProvider>
  );
}
