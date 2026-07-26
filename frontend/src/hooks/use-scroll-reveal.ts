"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + rises a set of elements into view as the section scrolls into the
 * viewport. Pass a selector matching child elements inside the returned ref.
 */
export function useScrollReveal<T extends HTMLElement>(selector: string, options?: {
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: options?.y ?? 32,
        duration: 0.9,
        stagger: options?.stagger ?? 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: options?.start ?? "top 78%",
        },
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  return containerRef;
}
