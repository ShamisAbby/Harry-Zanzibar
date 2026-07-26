import type { SVGProps } from "react";

/**
 * lucide-react dropped brand/logo glyphs, so social icons used in the
 * header/footer are hand-drawn minimal outlines instead of a brand-icon
 * package dependency for just two icons.
 */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.59-1.56h1.7V3.1C15.98 3.07 15.06 3 13.98 3 11.73 3 10.19 4.37 10.19 6.9v2.7H7.43v3.2h2.76V21h3.31Z" />
    </svg>
  );
}
