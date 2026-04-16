import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import featured_service_image from "@/assets/featured_service.jpg";

interface FeaturedServiceCardProps {
  href: string;
  categoryName?: string;
}

const FeaturedServiceCard = ({ href, categoryName = "Featured" }: FeaturedServiceCardProps) => {
  const { t, language } = useLanguage();

  return (
    <Link
      to={`/${language}/zmiana-dmc`}
      className="group bg-card rounded-xl border-2 border-[#d4a94c] shadow-[0_0_20px_rgba(212,169,76,0.3)] hover:shadow-[0_0_30px_rgba(212,169,76,0.5)] transition-all duration-300 overflow-hidden hover:-translate-y-1 block animate-pulse-border"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={featured_service_image}
          alt={t.services.featured_card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#d4a94c]/20 text-[#d4a94c] mb-3">
          <Star className="w-3 h-3 inline mr-1" />
          {categoryName}
        </span>
        <h3 className="font-display text-xl font-bold text-card-foreground mb-2">{t.services.featured_card.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{t.services.featured_card.description}</p>
        <div className="flex items-center justify-end">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-[#f0e6d3] font-medium hover:bg-navy-light transition-colors">
            {t.services.featured_card.button}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedServiceCard;