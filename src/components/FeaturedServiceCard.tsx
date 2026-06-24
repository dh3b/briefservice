import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Star } from "lucide-react";

interface FeaturedServiceCardProps {
  title: string;
  description: string;
  href: string;
  categoryName?: string;
  buttonLabel?: string;
}

const FeaturedServiceCard = ({ title, description, href, categoryName = "Featured", buttonLabel }: FeaturedServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <a
      href={href}
      className="panel-dark group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      {/* faint terracotta glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-terracotta/25 blur-3xl" />
      <div className="relative">
        <span className="eyebrow inline-flex items-center gap-1.5 text-terracotta">
          <Star className="h-3 w-3 fill-current" />
          {categoryName}
        </span>
        <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-paper">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-paper/60">{description}</p>
      </div>
      <span className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
        {buttonLabel || t.services.details}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
};

export default FeaturedServiceCard;
