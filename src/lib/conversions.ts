/**
 * Centralized Google Ads conversion tracking.
 *
 * All conversions share the base tag AW-17997426374. Each named label maps to a
 * full `send_to` string (tag + conversion label). Fire a conversion via
 * {@link reportConversion}; it no-ops when gtag is unavailable.
 */

export const CONVERSIONS = {
  phone: "AW-17997426374/ZvyICPXqtZ0cEMbd64VD",
  contactForm: "AW-17997426374/blJuCIvOnJ0cEMbd64VD",
  emailClick: "AW-17997426374/LQfVCOXfzrscEMbd64VD",
  chatStart: "AW-17997426374/47d4COjfzrscEMbd64VD",
} as const;

export type ConversionLabel = keyof typeof CONVERSIONS;

export function reportConversion(
  label: ConversionLabel,
  params?: Record<string, unknown>,
): void {
  const gtag = typeof window !== "undefined" ? window.gtag : undefined;
  if (typeof gtag !== "function") return;
  gtag("event", "conversion", { send_to: CONVERSIONS[label], ...params });
}
