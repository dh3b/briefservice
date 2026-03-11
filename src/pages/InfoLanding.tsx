import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageTabs from "@/components/LanguageTabs";
import { BASE_DOMAIN } from "@/config";

const InfoLanding = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleEnterSite = () => {
    window.location.href = `https://${BASE_DOMAIN}/${language}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              BriefService
            </div>
            <div className="text-xs text-muted-foreground">
              {t.seo.title || "Guidance for everyday formalities in Germany"}
            </div>
          </div>
          <LanguageTabs activeLang={language} onSelect={setLanguage} />
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              {t.landing.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              {t.landing.subtitle}
            </p>

            <ul className="space-y-3 mb-10 text-sm sm:text-base text-muted-foreground">
              <li>• {t.landing.bullet1}</li>
              <li>• {t.landing.bullet2}</li>
              <li>• {t.landing.bullet3}</li>
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Button size="lg" onClick={handleEnterSite}>
                {t.landing.cta}
              </Button>
              <p className="text-xs text-muted-foreground max-w-md">
                {t.landing.disclaimer}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InfoLanding;

