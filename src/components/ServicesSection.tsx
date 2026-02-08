import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ServiceRow, Service, localizeService } from "@/types";
import { fetchServices } from "@/api";
import ServiceCard from "./ServiceCard";

interface ServicesSectionProps {
  onChatAbout: (serviceId: string) => void;
}

const ServicesSection = ({ onChatAbout }: ServicesSectionProps) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [allRows, setAllRows] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all services once, localize on language/category change
  useEffect(() => {
    setLoading(true);
    fetchServices(undefined, language)
      .then((rows) => {
        setAllRows(rows);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setLoading(false);
      });
  }, [language]);

  useEffect(() => {
    const localized = allRows.map((r) => localizeService(r, language));
    if (activeCategory === "all") {
      setServices(localized);
    } else {
      setServices(localized.filter((s) => s.category === activeCategory));
    }
  }, [allRows, activeCategory, language]);

  // Build unique categories from current data
  const categories = ["all", ...Array.from(new Set(allRows.map((r) => (language === "en" ? r.category_en : r.category_pl))))];

  const categoryLabels: Record<string, string> = {
    all: t.services.categories.all,
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t.services.subtitle}</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onChatAbout={onChatAbout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
