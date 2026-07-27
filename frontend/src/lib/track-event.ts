declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackedEvent =
  | "whatsapp_click"
  | "phone_click"
  | "contact_form_submit"
  | "newsletter_signup"
  | "booking_submit";

/** Pushes a conversion-relevant event to GA4/GTM's dataLayer, if analytics scripts have loaded. */
export function trackEvent(event: TrackedEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });

  window.gtag?.("event", event, params);
}
