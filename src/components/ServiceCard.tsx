import { Service } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  categoryName?: string;
  onChatAbout: (serviceId: string, serviceName: string) => void;
  onDetails: (serviceId: string) => void;
}

const ServiceCard = ({ service, categoryName, onChatAbout, onDetails }: ServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <div
      onClick={() => onDetails(service.id)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      {service.image_url && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={service.image_url}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {categoryName && <p className="eyebrow mb-2">{categoryName}</p>}
        <h3 className="font-display text-xl font-extrabold leading-snug text-ink transition-colors group-hover:text-terracotta">{service.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <div className="mt-auto flex items-center gap-3 pt-6">
          <button
            onClick={(e) => { e.stopPropagation(); onDetails(service.id); }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-terracotta"
          >
            {t.services.details}
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onChatAbout(service.id, service.title); }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {t.services.chatAbout}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
