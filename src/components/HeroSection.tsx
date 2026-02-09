import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowDown, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  { gradient: "linear-gradient(135deg, hsl(222 60% 12%) 0%, hsl(222 60% 22%) 50%, hsl(222 40% 30%) 100%)" },
  { gradient: "linear-gradient(135deg, hsl(222 50% 16%) 0%, hsl(42 60% 30%) 50%, hsl(222 40% 25%) 100%)" },
  { gradient: "linear-gradient(135deg, hsl(200 60% 15%) 0%, hsl(222 60% 20%) 50%, hsl(250 40% 25%) 100%)" },
  { gradient: "linear-gradient(135deg, hsl(222 40% 18%) 0%, hsl(180 30% 25%) 50%, hsl(222 60% 15%) 100%)" },
];

const HeroSection = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Slideshow backgrounds */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ background: slide.gradient, opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Slide controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-accent w-8" : "bg-primary-foreground/40"}`}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-6 py-32 z-10">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-2">
            {t.hero.title}
          </h1>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold mb-6">
            {t.hero.titleAccent}
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("services")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gold-gradient text-accent-foreground font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              {t.hero.cta}
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {t.hero.chatCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
