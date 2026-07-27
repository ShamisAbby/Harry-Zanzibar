import { siteConfig } from "@/config/site";

/** Site-wide Organization + LocalBusiness schema, injected once in the root layout. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: `+${siteConfig.whatsappNumber}`,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nungwi",
    addressRegion: "Sansibar",
    addressCountry: "TZ",
  },
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook].filter(Boolean),
  areaServed: {
    "@type": "Place",
    name: "Sansibar, Tansania",
  },
};

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
