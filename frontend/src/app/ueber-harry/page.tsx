import type { Metadata } from "next";
import { Languages, Heart, ShieldCheck, Compass } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const metadata: Metadata = {
  title: "Über Harry",
  description:
    "Lernen Sie Harry kennen: deutschsprachiger Reiseleiter auf Sansibar mit über 12 Jahren Erfahrung, persönlich und authentisch.",
  alternates: { canonical: "/ueber-harry" },
};

const timeline = [
  { year: "2014", text: "Harry zieht nach Sansibar und beginnt als lokaler Guide zu arbeiten." },
  { year: "2017", text: "Gründung des eigenen Tourenservices für deutschsprachige Reisende." },
  { year: "2020", text: "Erweiterung um Mehrtagesreisen und individuelle Reiseplanung." },
  { year: "2026", text: "Über 4.800 zufriedene Gäste und ein festes Team lokaler Guides." },
];

const values = [
  { icon: Languages, title: "Persönlich auf Deutsch", text: "Direkte Kommunikation ohne Übersetzung." },
  { icon: Compass, title: "Lokale Expertise", text: "12+ Jahre Erfahrung vor Ort auf Sansibar." },
  { icon: Heart, title: "Mit Leidenschaft", text: "Jede Tour wird mit echtem Herzblut geplant." },
  { icon: ShieldCheck, title: "Verlässlich", text: "Lizenzierte Guides und transparente Preise." },
];

export default function UeberHarryPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Über Harry
            </span>
            <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
              Meine Mission: Sansibar wirklich erlebbar machen
            </h1>
            <p className="mt-4 text-muted-foreground">
              Seit über 12 Jahren lebe und arbeite ich auf Sansibar. Was als Leidenschaft für
              die Insel begann, wurde zu meiner Berufung: deutschsprachigen Reisenden ein
              authentisches, persönliches und sicheres Sansibar-Erlebnis zu ermöglichen – ganz
              ohne Sprachbarriere.
            </p>
            <p className="mt-4 text-muted-foreground">
              Mein Ziel ist es, dass sich jeder Gast nicht wie ein Tourist, sondern wie ein
              Freund fühlt, der die Insel von einem Einheimischen gezeigt bekommt.
            </p>
          </div>
          <PlaceholderImage
            label="Harry auf Sansibar"
            tone="sunset"
            className="aspect-[4/5] rounded-2xl"
          />
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 rounded-2xl bg-[#083B66] p-10 text-white sm:grid-cols-4">
          {[
            { value: 12, suffix: "+", label: "Jahre Erfahrung" },
            { value: 4800, suffix: "+", label: "Zufriedene Gäste" },
            { value: 25, suffix: "+", label: "Touren im Angebot" },
            { value: 4.9, label: "Ø Bewertung" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-semibold text-[#F2C66D] sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-xs text-white/70 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-semibold">Meine Werte</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-heading font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-semibold">Mein Weg</h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-8 border-l border-border/60 pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[41px] flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  •
                </span>
                <p className="font-heading font-semibold text-primary">{item.year}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
