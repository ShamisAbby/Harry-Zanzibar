import Link from "next/link";
import { Mail, MapPin, Phone, Star, Waves } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/config/site";

const footerLinks = [
  {
    title: "Sansibar Touren",
    links: [
      { label: "Tagesausflüge", href: "/sansibar-touren/tagesausfluege" },
      { label: "Mehrtagestouren", href: "/sansibar-touren/mehrtagestouren" },
      { label: "Safari Blue", href: "/sansibar-touren/safari-blue-sansibar" },
      { label: "Stone Town Tour", href: "/sansibar-touren/stone-town-kulturtour" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über Harry", href: "/ueber-harry" },
      { label: "Blog", href: "/blog" },
      { label: "Galerie", href: "/galerie" },
      { label: "Bewertungen", href: "/bewertungen" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Cookie-Richtlinie", href: "/cookie-richtlinie" },
      { label: "AGB", href: "/agb" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#083B66] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-heading text-xl font-semibold text-white">
              <Waves className="size-6 text-[#00C2C7]" />
              {siteConfig.shortName}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-1 text-[#F2C66D]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
              ))}
              <span className="ml-2 text-sm text-white/60">4.9/5 · 500+ Bewertungen</span>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#0096D6]"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#0096D6]"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#00C2C7]" />
                Nungwi, Sansibar, Tansania
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-[#00C2C7]" />
                <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-[#00C2C7]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.</p>
          <p>Handgefertigt für Reisende, die Sansibar wirklich erleben möchten.</p>
        </div>
      </div>
    </footer>
  );
}
