"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const SAFARI_REDIRECT_URL =
  process.env.NEXT_PUBLIC_SAFARI_REDIRECT_URL ?? "https://safarimitharry.com";

interface SafariRedirectLinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Tanzania Safaris is handled by our sister site to avoid duplicate content
 * between the two domains. Instead of a thin local landing page, this plays
 * a short branded transition and then hands off to safarimitharry.com.
 */
export function SafariRedirectLink({ children, className }: SafariRedirectLinkProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      window.location.href = SAFARI_REDIRECT_URL;
    }, 900);
  };

  return (
    <>
      <a href={SAFARI_REDIRECT_URL} onClick={handleClick} className={className}>
        {children}
      </a>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-[#083B66] text-white"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="size-12 text-[#F2C66D]" strokeWidth={1.25} />
            </motion.div>
            <p className={cn("font-heading text-lg tracking-wide text-white/90")}>
              Sie werden zu unseren Tansania Safaris weitergeleitet …
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
