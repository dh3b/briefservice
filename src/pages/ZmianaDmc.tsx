import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown, Menu, X } from "lucide-react";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, LANGUAGE_FLAGS, Language } from "@/types";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const ZmianaDmcPage = () => {
  const { t, language } = useLanguage();
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

  const d = t.zmianaDmc;

  return (
    <div className="min-h-screen bg-background">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={`/${language}`} className="font-display text-xl font-bold text-foreground tracking-tight">
            <span className="text-gradient-gold">Brief</span>Service
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to={`/${language}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {d.nav.home}
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
              {d.nav.home}
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
        {/* ===== INTRO ===== */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {d.intro.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {d.intro.subtitle}
            </p>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="px-6 pb-16">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-8">

            {/* CARD 1: DMC 2500 */}
            <article className="bg-card rounded-xl border border-border overflow-hidden flex flex-col">
              <div className="bg-[#1e3a5f] p-8 pb-7">
                <span className="inline-block px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] rounded bg-[#d4a94c]/15 text-[#d4a94c] mb-3.5">
                  {d.service2500.tag}
                </span>
                <h2 className="font-display text-2xl font-bold text-white mb-1.5 leading-tight">
                  {d.service2500.title}
                </h2>
                <p className="text-sm text-slate-300">{d.service2500.subtitle}</p>
              </div>
              <div className="px-8 py-7 space-y-6 flex-1 flex flex-col">
                <div className="space-y-3 text-[0.95rem] text-foreground/80 leading-relaxed">
                  {d.service2500.lead.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div>
                  <h3 className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-[#1e3a5f] mb-3">{d.service2500.scopeTitle}</h3>
                  <div className="space-y-3 text-[0.92rem] text-foreground/80 leading-relaxed">
                    {d.service2500.scopeText.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className="mt-4 border-l-[3px] border-[#d4a94c] pl-3.5 text-[0.92rem] font-semibold text-[#1e3a5f]">
                    {d.service2500.scopeNote}
                  </p>
                </div>

                <div>
                  <h3 className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-[#1e3a5f] mb-3">{d.service2500.getTitle}</h3>
                  <ul className="space-y-2.5">
                    {d.service2500.getList.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[0.92rem] text-foreground/90">
                        <span className="mt-[0.5rem] h-1.5 w-1.5 rounded-[2px] bg-[#d4a94c] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-1">
                  <h3 className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-[#1e3a5f] mb-2">{d.service2500.verifyTitle}</h3>
                  <p className="text-[0.92rem] text-foreground/80 leading-relaxed">{d.service2500.verifyText}</p>
                  <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground leading-relaxed">{d.service2500.verifyPhotos}</p>
                </div>
              </div>
            </article>

            {/* CARD 2: DMC 3500 */}
            <article className="bg-card rounded-xl border border-border overflow-hidden flex flex-col">
              <div className="bg-[#1e3a5f] p-8 pb-7">
                <span className="inline-block px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] rounded bg-[#d4a94c]/15 text-[#d4a94c] mb-3.5">
                  {d.service3500.tag}
                </span>
                <h2 className="font-display text-2xl font-bold text-white mb-1.5 leading-tight">
                  {d.service3500.title}
                </h2>
                <p className="text-sm text-slate-300">{d.service3500.subtitle}</p>
              </div>
              <div className="px-8 py-7 space-y-6 flex-1 flex flex-col">
                <div className="space-y-3 text-[0.95rem] text-foreground/80 leading-relaxed">
                  {d.service3500.lead.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div>
                  <h3 className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-[#1e3a5f] mb-3">{d.service3500.scopeTitle}</h3>
                  <div className="space-y-3 text-[0.92rem] text-foreground/80 leading-relaxed">
                    {d.service3500.scopeText.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className="mt-4 border-l-[3px] border-[#d4a94c] pl-3.5 text-[0.92rem] font-semibold text-[#1e3a5f]">
                    {d.service3500.scopeNote}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how" className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
              {d.howItWorks.title}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-[#1e3a5f] mb-2">01</div>
                <h4 className="font-semibold text-foreground mb-2">{d.howItWorks.step1}</h4>
                <p className="text-sm text-muted-foreground">{d.howItWorks.step1Desc}</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-[#1e3a5f] mb-2">02</div>
                <h4 className="font-semibold text-foreground mb-2">{d.howItWorks.step2}</h4>
                <p className="text-sm text-muted-foreground">{d.howItWorks.step2Desc}</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-[#1e3a5f] mb-2">03</div>
                <h4 className="font-semibold text-foreground mb-2">{d.howItWorks.step3}</h4>
                <p className="text-sm text-muted-foreground">{d.howItWorks.step3Desc}</p>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-[#1e3a5f] mb-2">04</div>
                <h4 className="font-semibold text-foreground mb-2">{d.howItWorks.step4}</h4>
                <p className="text-sm text-muted-foreground">{d.howItWorks.step4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== NOTE ===== */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-card border border-[#1e3a5f] rounded-xl p-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#1e3a5f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {d.note.description}
              </p>
            </div>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <ContactSection />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ZmianaDmcPage;
