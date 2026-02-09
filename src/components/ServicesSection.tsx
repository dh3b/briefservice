import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ServiceRow, Service, CategoryRow, localizeService, localizeCategory } from "@/types";
import { fetchServices, fetchCategories } from "@/api";
import ServiceCard from "./ServiceCard";
import { X } from "lucide-react";

interface ServicesSectionProps {
  onChatAbout: (serviceId: string, serviceName: string) => void;
}

const ServicesSection = ({ onChatAbout }: ServicesSectionProps) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [allRows, setAllRows] = useState<ServiceRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchServices(), fetchCategories()])
      .then(([sRows, cats]) => {
        setAllRows(sRows);
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const localized = allRows.map((r) => localizeService(r, language));
  const filtered = activeCategory === "all"
    ? localized
    : localized.filter((s) => s.category_id === activeCategory);

  const getCategoryName = (catId: string | null) => {
    if (!catId) return "";
    const cat = categories.find((c) => c.id === catId);
    return cat ? localizeCategory(cat, language) : "";
  };

  const expandedService = expandedId ? localized.find((s) => s.id === expandedId) : null;
  const expandedRow = expandedId ? allRows.find((r) => r.id === expandedId) : null;

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t.services.subtitle}</p>
        </div>

        {/* Category filter */}
        {!expandedId && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {t.services.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {localizeCategory(cat, language)}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading...</div>
        ) : expandedService && expandedRow ? (
          /* Expanded detail view */
          <div className="bg-card rounded-xl border border-border shadow-card-hover overflow-hidden animate-fade-in-up">
            <div className="relative">
              <button
                onClick={() => setExpandedId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid md:grid-cols-2">
                <div className="aspect-[16/10] md:aspect-auto md:min-h-[400px]">
                  <img src={expandedService.image_url} alt={expandedService.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground mb-4 self-start">
                    {getCategoryName(expandedService.category_id)}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-4">{expandedService.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{expandedService.description}</p>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    {t.services.priceFrom} {expandedService.price_range}
                  </p>
                  <button
                    onClick={() => { setExpandedId(null); onChatAbout(expandedService.id, expandedService.title); }}
                    className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-navy-light transition-colors"
                  >
                    {t.services.chatAbout}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                categoryName={getCategoryName(service.category_id)}
                onChatAbout={onChatAbout}
                onDetails={setExpandedId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
