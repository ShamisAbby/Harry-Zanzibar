"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getAnalyticsSettings, type AnalyticsSettings } from "@/lib/analytics-settings";
import { CONSENT_CHANGE_EVENT, getStoredConsent, type ConsentState } from "@/lib/consent";

/**
 * Loads third-party tracking scripts based on IDs configured in the CMS
 * (Filament > Website-Einstellungen), gated behind cookie consent. Nothing
 * fires until the visitor has explicitly accepted the relevant category.
 */
export function AnalyticsScripts() {
  const [settings, setSettings] = useState<AnalyticsSettings | null>(null);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    getAnalyticsSettings().then(setSettings);
    setConsent(getStoredConsent());

    const onConsentChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentState>).detail);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  if (!settings || !consent) return null;

  const analyticsAllowed = consent.analytics;
  const marketingAllowed = consent.marketing;

  return (
    <>
      {analyticsAllowed && (settings.ga4Id || settings.googleAdsId) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id ?? settings.googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${settings.ga4Id ? `gtag('config', '${settings.ga4Id}');` : ""}
              ${settings.googleAdsId ? `gtag('config', '${settings.googleAdsId}');` : ""}
              window.gtag = gtag;
            `}
          </Script>
        </>
      )}

      {analyticsAllowed && settings.gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${settings.gtmId}');
          `}
        </Script>
      )}

      {marketingAllowed && settings.metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {analyticsAllowed && settings.msClarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window, document, "clarity", "script", "${settings.msClarityId}");
          `}
        </Script>
      )}

      {marketingAllowed && settings.tiktokPixelId && (
        <Script id="tiktok-pixel-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=i+"?sdkid="+e+"&lib="+t;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
              ttq.load('${settings.tiktokPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {marketingAllowed && settings.pinterestTagId && (
        <Script id="pinterest-tag-init" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '${settings.pinterestTagId}');
            pintrk('page');
          `}
        </Script>
      )}
    </>
  );
}
