import { Service } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onChatAbout: (serviceId: string) => void;
}

const ServiceCard = ({ service, onChatAbout }: ServiceCardProps) => {
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
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground mb-3">
          {service.category}
        </span>
        <h3 className="font-display text-xl font-bold text-card-foreground mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {t.services.priceFrom} {service.price_range}
          </span>
          <button
            onClick={() => onChatAbout(service.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-navy-light transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t.services.chatAbout}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
