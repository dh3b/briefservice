import { useLanguage } from "@/i18n/LanguageContext";
import { Mail, MapPin, Phone, CheckCircle, MessageCircle, Languages } from "lucide-react";
import { useState, useRef } from "react";
import { submitContact } from "@/api";
import { reportConversion } from "@/lib/conversions";

const CONTACT_PHONE = "+48 696 513 109";

const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const cooldownUntilRef = useRef<number>(0);

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
      
      // Google Ads conversion tracking (Contact form submission)
      reportConversion("contactForm", { value: 2.5, currency: "PLN" });
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t.contact.phone}</h4>
                <p className="text-muted-foreground text-sm">
                  <a 
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} 
                    onClick={handlePhoneClick}
                    className="hover:text-primary/20 hover:underline"
                  >
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground text-sm"><a href="mailto:audicarforme@op.pl" onClick={() => reportConversion("emailClick")} className="hover:text-primary/20 hover:underline">audicarforme@op.pl</a></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t.contact.address}</h4>
                <p className="text-muted-foreground text-sm">ul. Sosnowa 10/7, 68-100, Żagań</p>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-5">
              <h4 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
                <Languages className="w-4 h-4 text-accent-foreground" />
                {t.contact.languageAccessibility.title}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.chat.title}</p>
                    <p className="text-xs text-muted-foreground">{t.contact.languageAccessibility.chat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-xs text-muted-foreground">{t.contact.languageAccessibility.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.contact.phone}</p>
                    <p className="text-xs text-muted-foreground">{t.contact.languageAccessibility.phone} <span className="text-xs leading-none" title="Polski">🇵🇱</span> <span className="text-xs leading-none" title="Deutsch">🇩🇪</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
            {sent && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent/20 text-accent-foreground text-sm">
                <CheckCircle className="w-4 h-4" /> {t.contact.sent}
              </div>
            )}
            <input type="text" placeholder={t.contact.name} value={form.name} maxLength={255} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            <input type="email" placeholder={t.contact.email} value={form.email} maxLength={255} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            <textarea placeholder={t.contact.message} value={form.message} maxLength={500} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all resize-none flex-1" />
            <button type="submit" disabled={sending || isCoolingDown()}
              className="w-full py-3.5 rounded-lg bg-gold-gradient text-accent-foreground font-semibold text-sm hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50">
              {t.contact.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
