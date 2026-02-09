import { Service } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, Eye } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  categoryName?: string;
  onChatAbout: (serviceId: string, serviceName: string) => void;
  onDetails: (serviceId: string) => void;
}

const ServiceCard = ({ service, categoryName, onChatAbout, onDetails }: ServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <div className="group bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={service.image_url}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        {categoryName && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground mb-3">
            {categoryName}
          </span>
        )}
        <h3 className="font-display text-xl font-bold text-card-foreground mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground">
            {t.services.priceFrom} {service.price_range}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onDetails(service.id)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              {t.services.details}
            </button>
            <button
              onClick={() => onChatAbout(service.id, service.title)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-navy-light transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {t.services.chatAbout}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
