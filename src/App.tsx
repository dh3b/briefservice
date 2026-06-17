import { useEffect } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Outlet, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, detectLanguage } from "@/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES, Language } from "@/types";
import { FALLBACK_LANGUAGE, BASE_DOMAIN } from "@/config";
import OrganizationJsonLd from "@/seo/OrganizationJsonLd";
import Index from "./pages/Index";
import AdminPage from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import InfoLanding from "./pages/InfoLanding";
import ZmianaDmcPage from "./pages/ZmianaDmc";

const queryClient = new QueryClient();

/** App-wide providers; rendered once around every route. */
function RootProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

/**
 * Client-side redirect for the bare "/" route. In production Caddy issues a
 * server redirect before this ever renders; this is the JS fallback for the
 * SPA shell. Renders nothing during prerender (no window).
 */
function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const lang = detectLanguage();
    const host = window.location.hostname;
    const isInfo = host === `info.${BASE_DOMAIN}` || host.startsWith("info.");
    navigate(isInfo ? `/${lang}/landing` : `/${lang}`, { replace: true });
  }, [navigate]);
  return null;
}

/**
 * Validates the :lang segment. Invalid → redirect to the fallback language
 * (client-side; only valid languages are prerendered). Valid → provides the
 * language context and sitewide Organization schema to child routes.
 */
function LangLayout() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Language)) {
    const rest = location.pathname.replace(/^\/[^/]*/, "") || "";
    return (
      <Navigate to={`/${FALLBACK_LANGUAGE}${rest}${location.search}${location.hash}`} replace />
    );
  }

  return (
    <LanguageProvider lang={lang as Language}>
      <OrganizationJsonLd />
      <Outlet />
    </LanguageProvider>
  );
}

/** react-router data routes consumed by vite-react-ssg (and by the client). */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <RootProviders />,
    children: [
      { index: true, element: <RootRedirect /> },
      {
        path: ":lang",
        element: <LangLayout />,
        children: [
          { index: true, element: <Index /> },
          { path: "landing", element: <InfoLanding /> },
          { path: "admin", element: <AdminPage /> },
          { path: "privacy-policy", element: <PrivacyPolicy /> },
          { path: "zmiana-dmc", element: <ZmianaDmcPage /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];
