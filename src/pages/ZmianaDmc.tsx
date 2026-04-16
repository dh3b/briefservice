import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown, Menu, X } from "lucide-react";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, LANGUAGE_FLAGS, Language } from "@/types";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const ZmianaDmcPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: t.zmianaDmc.seo.title,
    description: t.zmianaDmc.seo.description,
    keywords: t.zmianaDmc.seo.keywords,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={`/${language}`} className="font-display text-xl font-bold text-foreground tracking-tight">
            <span className="text-gradient-gold">Brief</span>Service
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to={`/${language}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t.zmianaDmc.nav.home}
            </Link>

            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>{LANGUAGE_FLAGS[language]}</span>
                <span>{LANGUAGE_LABELS[language]}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((code) => (
                    <a
                      key={code}
                      href={`/${code}/zmiana-dmc`}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${language === code ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      <span>{LANGUAGE_FLAGS[code as Language]}</span>
                      <span>{LANGUAGE_LABELS[code as Language]}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-card border-b border-border px-6 py-4 space-y-3">
            <Link to={`/${language}`} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground">
              {t.zmianaDmc.nav.home}
            </Link>

            <div className="border-t border-border pt-3 grid grid-cols-4 gap-1">
              {SUPPORTED_LANGUAGES.map((code) => (
                <a
                  key={code}
                  href={`/${code}/zmiana-dmc`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-2 py-1.5 text-xs rounded-md text-center ${language === code ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  {LANGUAGE_FLAGS[code as Language]} {code.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
              {t.zmianaDmc.intro.title}
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              {t.zmianaDmc.intro.subtitle}
            </p>
          </div>
        </section>

        <section className="py-16 px-6 bg-secondary/30">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <article className="bg-card rounded-xl border border-border p-8">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                    {t.zmianaDmc.service2500.tag}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {t.zmianaDmc.service2500.title}
                  </h2>
                  <p className="text-muted-foreground">{t.zmianaDmc.service2500.subtitle}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-foreground/80">{t.zmianaDmc.service2500.description}</p>
                  <h3 className="font-semibold text-foreground">{t.zmianaDmc.service2500.whatYouGet}</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Komplet nowych dowodów rejestracyjnych (Brief Teil I i II) z DMC = 2500 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Nową tabliczkę znamionową z aktualnymi masami</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Dokumentację techniczną honorowaną w całej UE</span>
                    </li>
                  </ul>
                  <h3 className="font-semibold text-foreground">{t.zmianaDmc.service2500.forWho}</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Pojazdy, które nie potrzebują ładowności 2,5–3,5 t</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Lekkie, pilne i wrażliwe ładunki</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Firmy ceniące elastyczność i czas</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="bg-card rounded-xl border border-border p-8">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gold-gradient text-accent-foreground mb-3">
                    {t.zmianaDmc.service3500.tag}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {t.zmianaDmc.service3500.title}
                  </h2>
                  <p className="text-muted-foreground">{t.zmianaDmc.service3500.subtitle}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-foreground/80">{t.zmianaDmc.service3500.description}</p>
                  <h3 className="font-semibold text-foreground">{t.zmianaDmc.service3500.benefits}</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Prowadzisz pojazd na prawo jazdy kategorii B</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Brak konieczności posiadania karty kierowcy i tachografu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Mniejsze koszty eksploatacji i ubezpieczenia</span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
              {t.zmianaDmc.howItWorks.title}
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-primary/20 mb-2">01</div>
                <h4 className="font-semibold text-foreground mb-2">{t.zmianaDmc.howItWorks.step1}</h4>
                <p className="text-sm text-muted-foreground">{t.zmianaDmc.howItWorks.step1Desc}</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-primary/20 mb-2">02</div>
                <h4 className="font-semibold text-foreground mb-2">{t.zmianaDmc.howItWorks.step2}</h4>
                <p className="text-sm text-muted-foreground">{t.zmianaDmc.howItWorks.step2Desc}</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-primary/20 mb-2">03</div>
                <h4 className="font-semibold text-foreground mb-2">{t.zmianaDmc.howItWorks.step3}</h4>
                <p className="text-sm text-muted-foreground">{t.zmianaDmc.howItWorks.step3Desc}</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-primary/20 mb-2">04</div>
                <h4 className="font-semibold text-foreground mb-2">{t.zmianaDmc.howItWorks.step4}</h4>
                <p className="text-sm text-muted-foreground">{t.zmianaDmc.howItWorks.step4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-card border border-border rounded-xl p-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div>
                <p className="text-foreground/80">{t.zmianaDmc.note.description}</p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default ZmianaDmcPage;
