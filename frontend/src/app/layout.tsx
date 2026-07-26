import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";

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

export const metadata: Metadata = {
  title: {
    default: "Harry – Deutscher Reiseleiter Sansibar | Sansibar Touren & Ausflüge",
    template: "%s | Harry Sansibar",
  },
  description:
    "Harry, Ihr deutschsprachiger Reiseleiter auf Sansibar. Individuelle Sansibar Touren, Tagesausflüge und Safari-Erlebnisse – persönlich, authentisch, auf Deutsch.",
};

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
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
