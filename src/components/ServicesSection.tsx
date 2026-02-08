import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Service } from "@/types";
import ServiceCard from "./ServiceCard";

// Placeholder services until DB is connected
const PLACEHOLDER_SERVICES: Service[] = [
  { id: "1", title: "Konsulting Strategiczny", description: "Kompleksowa analiza i strategia rozwoju Twojego biznesu z doświadczonym zespołem.", price_range: "2 000 PLN", image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", category: "Consulting" },
  { id: "2", title: "Tworzenie Stron WWW", description: "Nowoczesne, responsywne strony internetowe dopasowane do Twojej marki.", price_range: "5 000 PLN", image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", category: "Development" },
  { id: "3", title: "Projektowanie UI/UX", description: "Intuicyjne i piękne interfejsy, które zachwycą Twoich klientów.", price_range: "3 500 PLN", image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", category: "Design" },
  { id: "4", title: "Marketing Cyfrowy", description: "Skuteczne kampanie online, SEO i social media dla Twojej firmy.", price_range: "1 500 PLN", image_url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop", category: "Marketing" },
  { id: "5", title: "Aplikacje Mobilne", description: "Natywne i cross-platform aplikacje mobilne najwyższej jakości.", price_range: "10 000 PLN", image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop", category: "Development" },
  { id: "6", title: "Branding & Identyfikacja", description: "Budowanie silnej marki z spójną identyfikacją wizualną.", price_range: "4 000 PLN", image_url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop", category: "Design" },
];

const CATEGORIES = ["all", "Consulting", "Development", "Design", "Marketing"] as const;

interface ServicesSectionProps {
  onChatAbout: (serviceId: string) => void;
}

const ServicesSection = ({ onChatAbout }: ServicesSectionProps) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryLabels: Record<string, string> = {
    all: t.services.categories.all,
    Consulting: t.services.categories.consulting,
    Development: t.services.categories.development,
    Design: t.services.categories.design,
    Marketing: t.services.categories.marketing,
  };

  const filtered = activeCategory === "all"
    ? PLACEHOLDER_SERVICES
    : PLACEHOLDER_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t.services.subtitle}</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} onChatAbout={onChatAbout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
