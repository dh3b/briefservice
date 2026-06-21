import { useLanguage } from "@/i18n/LanguageContext";
import { Mail, MapPin, Phone, CheckCircle, MessageCircle, Languages } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { submitContact } from "@/api";
import { reportConversion } from "@/lib/conversions";

const CONTACT_PHONE = "+48 696 513 109";

const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [shown, setShown] = useState(false);
  const cooldownUntilRef = useRef<number>(0);

  // React-owned reveal (see ServicesSection) - survives hydration.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isCoolingDown = () => Date.now() < cooldownUntilRef.current;

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    reportConversion("phone", { value: 4.0, currency: "PLN" });
    window.location.href = `tel:${CONTACT_PHONE.replace(/\s/g, "")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (isCoolingDown()) return;
    setSending(true);
    try {
      await submitContact(form);
      setSent(true);
      cooldownUntilRef.current = Date.now() + 60_000;
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
      reportConversion("contactForm", { value: 2.5, currency: "PLN" });
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-muted-foreground focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";

  const rv = shown ? "reveal-up in" : "reveal-up";

  return (
    <section id="contact" className="section">
      <div className="container-editorial">
        <div className={`max-w-2xl ${rv}`}>
          <p className="eyebrow">{t.nav.contact}</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] text-ink">{t.contact.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className={`mt-12 grid gap-10 md:grid-cols-2 ${rv}`}>
          {/* Contact details */}
          <div className="space-y-6">
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} onClick={handlePhoneClick} className="group flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-paper"><Phone className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-ink">{t.contact.phone}</span>
                <span className="block text-sm text-muted-foreground group-hover:text-terracotta transition-colors">{CONTACT_PHONE}</span>
              </span>
            </a>
            <a href="mailto:audicarforme@op.pl" onClick={() => reportConversion("emailClick")} className="group flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-paper"><Mail className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-ink">Email</span>
                <span className="block text-sm text-muted-foreground group-hover:text-terracotta transition-colors">audicarforme@op.pl</span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-paper"><MapPin className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-ink">{t.contact.address}</span>
                <span className="block text-sm text-muted-foreground">ul. Sosnowa 10/7, 68-100 Żagań</span>
              </span>
            </div>

            <div className="card-surface rounded-2xl p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Languages className="h-4 w-4 text-terracotta" />
                {t.contact.languageAccessibility.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5 text-terracotta" /> {t.contact.languageAccessibility.chat}</li>
                <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-terracotta" /> {t.contact.languageAccessibility.email}</li>
                <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-terracotta" /> {t.contact.languageAccessibility.phone} 🇵🇱 🇩🇪</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-4 rounded-2xl p-6 sm:p-8">
            {sent && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/12 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle className="h-4 w-4" /> {t.contact.sent}
              </div>
            )}
            <input type="text" placeholder={t.contact.name} value={form.name} maxLength={255} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            <input type="email" placeholder={t.contact.email} value={form.email} maxLength={255} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            <textarea placeholder={t.contact.message} value={form.message} maxLength={500} rows={5} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} />
            <button type="submit" disabled={sending || isCoolingDown()} className="btn-primary w-full disabled:opacity-50">
              {t.contact.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
