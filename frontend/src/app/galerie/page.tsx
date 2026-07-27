import type { Metadata } from "next";
import {
  Palmtree,
  Sailboat,
  Shell,
  Sun,
  Fish,
  Building2,
  Waves,
  Camera,
  Sunset,
  Mountain,
} from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Impressionen von Sansibar: Strände, Dhau-Boote, Korallenriffe und die Farben der Gewürzinsel.",
  alternates: { canonical: "/galerie" },
};

const galleryItems = [
  { label: "Kendwa Sandbank", tone: "sand", icon: Sun },
  { label: "Traditionelle Dhau", tone: "ocean", icon: Sailboat },
  { label: "Korallenriff bei Mnemba", tone: "palm", icon: Fish },
  { label: "Stone Town Architektur", tone: "sunset", icon: Building2 },
  { label: "Palmen bei Paje", tone: "palm", icon: Palmtree },
  { label: "Muscheln am Strand", tone: "sand", icon: Shell },
  { label: "Sonnenuntergang Nungwi", tone: "sunset", icon: Sunset },
  { label: "Indischer Ozean", tone: "ocean", icon: Waves },
  { label: "Jozani Regenwald", tone: "palm", icon: Mountain },
  { label: "Gäste-Momente", tone: "sand", icon: Camera },
  { label: "Safari Blue Tour", tone: "ocean", icon: Sailboat },
  { label: "Prison Island", tone: "sunset", icon: Sun },
] as const;

export default function GaleriePage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Galerie
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Sansibar in Bildern
          </h1>
          <p className="mt-4 text-muted-foreground">
            Ein Vorgeschmack auf die Farben, Strände und Momente, die Sie auf Ihrer
            Sansibar-Reise erwarten.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <div key={item.label} className="group overflow-hidden rounded-2xl">
              <div className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-105">
                <PlaceholderImage
                  label={item.label}
                  tone={item.tone}
                  icon={item.icon}
                  className="size-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
