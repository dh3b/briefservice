import { useLanguage } from "@/i18n/LanguageContext";
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/api";

const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      await submitContact(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
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
                <p className="text-muted-foreground text-sm">+48 123 456 789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground text-sm">kontakt@proservices.pl</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t.contact.address}</h4>
                <p className="text-muted-foreground text-sm">ul. Przykładowa 10, 00-001 Warszawa</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {sent && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent/20 text-accent-foreground text-sm">
                <CheckCircle className="w-4 h-4" /> {t.contact.sent}
              </div>
            )}
            <input type="text" placeholder={t.contact.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            <input type="email" placeholder={t.contact.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            <textarea placeholder={t.contact.message} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all resize-none" />
            <button type="submit" disabled={sending}
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
