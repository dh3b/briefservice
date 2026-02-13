import { LIBRETRANSLATE_URL, LANG_TO_LT } from "@/config";

/**
 * Translate text via LibreTranslate.
 * Returns original text on failure (graceful fallback).
 */
export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const res = await fetch(LIBRETRANSLATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: LANG_TO_LT[targetLang] || "en",
        format: "text",
      }),
    });
    if (!res.ok) return text;
    const data = await res.json();
    return data.translatedText || text;
  } catch {
    return text;
  }
}
