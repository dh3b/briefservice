import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowDown, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import herobg1 from "@/assets/herobg1.jpg";
import herobg2 from "@/assets/herobg2.jpg";
import herobg3 from "@/assets/herobg3.jpg";
import herobg4 from "@/assets/herobg4.jpg";

const SLIDES = [herobg1, herobg2, herobg3, herobg4];

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
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden -mb-24 z-[1]">
      {/* Slideshow backgrounds */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${slide})`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Bottom gradient fade into services section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none bg-gradient-to-b from-transparent to-background" />

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
        <div className="max-w-2xl animate-fade-in-up bg-card/40 backdrop-blur-lg border border-border rounded-xl p-8 shadow-lg">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 leading-tight mb-2">
            {t.hero.title}
          </h1>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold mb-6">
            {t.hero.titleAccent}
          </p>
          <p className="md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed">
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-gray-300 text-gray-100 font-semibold text-sm hover:bg-white/10 transition-all"
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
