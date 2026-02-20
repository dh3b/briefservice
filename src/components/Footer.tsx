import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display text-xl font-bold text-primary-foreground">
              <span className="text-gradient-gold">Brief</span>Service
            </span>
            <p className="text-primary-foreground/60 text-sm mt-1">{t.footer.description}</p>
            <p className="text-primary-foreground/60 text-sm mt-1">
              {t.footer.cookieNotice.before}
              <Link to={`/${language}/privacy-policy`} className="underline hover:text-primary-foreground/80 transition-colors">
                {t.footer.cookieNotice.linkText}
              </Link>
              {t.footer.cookieNotice.after}
            </p>
          </div>
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} BriefService. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
