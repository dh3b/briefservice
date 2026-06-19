import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ServiceRow, Service, CategoryRow, localizeService, localizeCategory } from "@/types";
import { fetchServices, fetchCategories } from "@/api";
import ServiceCard from "./ServiceCard";
import FeaturedServiceCard from "./FeaturedServiceCard";
import { X } from "lucide-react";
import { getCategoryName } from "@/lib/localize";

interface ServicesSectionProps {
  onChatAbout: (serviceId: string, serviceName: string) => void;
}

const ServicesSection = ({ onChatAbout }: ServicesSectionProps) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
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

  const localized = allRows.filter((r) => r.published).map((r) => localizeService(r, language));
  const filtered = (activeCategory === "all"
    ? localized
    : localized.filter((s) => s.category_id === activeCategory)
  ).slice().sort((a, b) => Number(b.featured) - Number(a.featured));

  const expandedService = expandedId ? localized.find((s) => s.id === expandedId) : null;
  const expandedRow = expandedId ? allRows.find((r) => r.id === expandedId) : null;

  const handleDetails = (serviceId: string) => {
    const svc = localized.find((s) => s.id === serviceId);
    if (svc?.slug) {
      window.location.href = `/${language}/services/${svc.slug}`;
    } else {
      setExpandedId(serviceId);
    }
  };

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? "bg-ink text-paper" : "border border-border bg-paper text-ink/70 hover:text-ink"
    }`;

  return (
    <section id="services" className="section bg-cream">
      <div className="container-editorial">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">{language === "pl" ? "Usługi" : "Services"}</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] text-ink">{t.services.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{t.services.subtitle}</p>
        </div>

        {!expandedId && categories.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2" data-reveal>
            <button onClick={() => setActiveCategory("all")} className={pill(activeCategory === "all")}>
              {t.services.allCategories}
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={pill(activeCategory === cat.id)}>
                {localizeCategory(cat, language)}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-border bg-paper/60" />
            ))}
          </div>
        ) : expandedService && expandedRow ? (
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-paper shadow-float">
            <div className="relative grid md:grid-cols-2">
              <button
                onClick={() => setExpandedId(null)}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink hover:bg-paper"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-[16/11] md:aspect-auto md:min-h-[380px]">
                <img src={expandedService.image_url} alt={expandedService.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow">{getCategoryName(categories, expandedService.category_id, language)}</p>
                <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">{expandedService.title}</h3>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{expandedService.description}</p>
                <button
                  onClick={() => { setExpandedId(null); onChatAbout(expandedService.id, expandedService.title); }}
                  className="btn-primary mt-7 self-start"
                >
                  {t.services.chatAbout}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {filtered.map((service) =>
              service.featured && service.slug ? (
                <FeaturedServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  href={`/${language}/services/${service.slug}`}
                  categoryName={t.services.featured}
                />
              ) : (
                <ServiceCard
                  key={service.id}
                  service={service}
                  categoryName={getCategoryName(categories, service.category_id, language)}
                  onChatAbout={onChatAbout}
                  onDetails={handleDetails}
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
