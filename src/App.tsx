import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { LanguageProvider, detectLanguage } from "@/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES, Language } from "@/types";
import { FALLBACK_LANGUAGE, BASE_DOMAIN } from "@/config";
import Index from "./pages/Index";
import AdminPage from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import InfoLanding from "./pages/InfoLanding";
import ZmianaDmcPage from "./pages/ZmianaDmc";

const queryClient = new QueryClient();

/** Redirects bare "/" to the user's preferred language path. */
function RootRedirect() {
  const lang = detectLanguage();
  const hostname = window.location.hostname;
  const isInfoSubdomain =
    hostname === `info.${BASE_DOMAIN}` || hostname.startsWith(`info.`);

  const targetPath = isInfoSubdomain ? `/${lang}/landing` : `/${lang}`;

  return <Navigate to={targetPath} replace />;
}

/**
 * Validates the :lang URL segment.
 * Valid lang  → renders LanguageProvider + child routes.
 * Invalid lang → redirects to /:fallback/rest-of-path.
 */
function LangGuard() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Language)) {
    const rest = location.pathname.replace(/^\/[^/]*/, "") || "";
    return (
      <Navigate
        to={`/${FALLBACK_LANGUAGE}${rest}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return (
    <LanguageProvider lang={lang as Language}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route index element={<Index />} />
          <Route path="landing" element={<InfoLanding />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="zmiana-dmc" element={<ZmianaDmcPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </LanguageProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang/*" element={<LangGuard />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
