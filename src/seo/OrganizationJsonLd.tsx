import { Head } from "vite-react-ssg";
import { SITE_URL, SUPPORTED_LANGUAGES } from "@/seo/site";

/**
 * Sitewide Organization structured data. Rendered once per page (from the
 * language layout) so every prerendered URL carries it. States explicitly
 * that this is a private service, not a government authority.
 */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BriefService",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Private service company handling vehicle formalities and technical modifications in Germany (GVW/DMC changes, structural modifications, recovery of the German vehicle title/brief). Not affiliated with any government authority.",
  areaServed: { "@type": "Country", name: "DE" },
  availableLanguage: [...SUPPORTED_LANGUAGES],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+48696513109",
    email: "audicarforme@op.pl",
    availableLanguage: ["Polish", "German", "English"],
  },
} as const;

export default function OrganizationJsonLd() {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(ORGANIZATION)}</script>
    </Head>
  );
}
