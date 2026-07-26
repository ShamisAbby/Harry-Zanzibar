"use client";

import { Languages, Heart, ShieldCheck, Compass } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const reasons = [
  {
    icon: Languages,
    title: "Wirklich auf Deutsch",
    description:
      "Keine Übersetzung, keine Missverständnisse – Harry und sein Team führen jede Tour persönlich auf Deutsch durch.",
  },
  {
    icon: Compass,
    title: "12+ Jahre vor Ort",
    description:
      "Über ein Jahrzehnt Erfahrung auf Sansibar bedeutet: die richtigen Orte, zur richtigen Zeit, abseits der Touristenmassen.",
  },
  {
    icon: Heart,
    title: "Persönlich geplant",
    description:
      "Jede Reise wird individuell auf Sie abgestimmt – für Familien, Flitterwöchner und Abenteurer gleichermaßen.",
  },
  {
    icon: ShieldCheck,
    title: "Verlässlich & sicher",
    description:
      "Lizenzierte Guides, geprüfte Boote und Fahrzeuge, transparente Preise – Ihre Sicherheit hat Priorität.",
  },
];

export function WhyHarry() {
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]");

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Warum Harry
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Ihr persönlicher Zugang zu Sansibar
          </h2>
        </div>

        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason) => (
            <div
              key={reason.title}
              data-reveal
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <reason.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
