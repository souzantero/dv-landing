import { siteConfig } from "@/lib/site";
import { faqData } from "@/lib/faq-data";

/**
 * Structured data (JSON-LD) para SEO/GEO.
 * Combina Organization/LocalBusiness e FAQPage em um único grafo (@graph).
 */
export function buildJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;

  const organization = {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    image: `${siteConfig.url}${siteConfig.logo}`,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    priceRange: "$$",
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contact.phoneE164,
      email: siteConfig.contact.email,
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.locale,
    publisher: { "@id": orgId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, faqPage],
  };
}
