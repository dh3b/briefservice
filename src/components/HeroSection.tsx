import { useLanguage } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown, MessageCircle } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      </div>

      <div className="relative container mx-auto px-6 py-32">
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
