import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { siteConfig } from "@/config/site";
import { organizationJsonLd } from "@/lib/schema";
import { getAnalyticsSettings } from "@/lib/analytics-settings";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = {
  default: "Harry – Deutscher Reiseleiter Sansibar | Sansibar Touren & Ausflüge",
  template: "%s | Harry Sansibar",
};
const description =
  "Harry, Ihr deutschsprachiger Reiseleiter auf Sansibar. Individuelle Sansibar Touren, Tagesausflüge und Safari-Erlebnisse – persönlich, authentisch, auf Deutsch.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAnalyticsSettings();

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: siteConfig.shortName,
      title: title.default,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: title.default,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: settings?.googleSiteVerification
      ? { google: settings.googleSiteVerification }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${playfairDisplay.variable} ${manrope.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
        <CookieConsentBanner />
        <AnalyticsScripts />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
