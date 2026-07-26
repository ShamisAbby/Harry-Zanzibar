export const siteConfig = {
  name: "Harry – Deutscher Reiseleiter Sansibar",
  shortName: "Harry Sansibar",
  description:
    "Individuelle Sansibar Touren, Tagesausflüge und Safari-Erlebnisse mit einem deutschsprachigen Reiseleiter vor Ort.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: "255700000000",
  phoneDisplay: "+255 700 000 000",
  email: "info@harry-zanzibar.test",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tripadvisor: "https://tripadvisor.com",
  },
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Über Harry", href: "/ueber-harry" },
  {
    label: "Sansibar Touren",
    href: "/sansibar-touren",
    children: [
      { label: "Alle Touren", href: "/sansibar-touren" },
      { label: "Tagesausflüge", href: "/sansibar-touren/tagesausfluege" },
      { label: "Mehrtagestouren", href: "/sansibar-touren/mehrtagestouren" },
    ],
  },
  { label: "Tansania Safaris", href: "/tansania-safaris", external: true },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
] as const;
