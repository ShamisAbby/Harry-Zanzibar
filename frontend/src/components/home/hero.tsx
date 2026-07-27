"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/track-event";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, { type: "words,chars" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 40,
        rotateX: -40,
        stagger: 0.018,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.2,
      });

      if (bgRef.current && sectionRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => split.revert();
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <PlaceholderImage
          label="Nungwi, Sansibar – Sonnenuntergang über dem Indischen Ozean"
          tone="sunset"
          className="size-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

      {/* Floating ambient particles */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full bg-white/40"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pt-24 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
        >
          <span className="size-2 rounded-full bg-[#F2C66D]" />
          Deutschsprachiger Reiseleiter auf Sansibar
        </motion.p>

        <h1
          ref={headingRef}
          className="text-balance font-heading text-4xl font-semibold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
        >
          Sansibar. Auf Deutsch. Persönlich erlebt.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-white/85"
        >
          Individuelle Touren, Tagesausflüge und Reiseerlebnisse auf der Gewürzinsel –
          geplant und geführt von Harry, Ihrem deutschsprachigen Guide vor Ort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton>
            <Button
              render={<Link href="/sansibar-touren" />}
              nativeButton={false}
              size="lg"
              className="h-12 rounded-full px-8 text-base"
            >
              Touren entdecken
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              render={
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
                />
              }
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/40 bg-white/5 px-8 text-base text-white hover:bg-white/15 hover:text-white"
            >
              <MessageCircle className="size-4" />
              Direkt anfragen
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-white/80"
        >
          <div className="flex text-[#F2C66D]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-sm">4.9/5 aus über 500 Bewertungen</span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
