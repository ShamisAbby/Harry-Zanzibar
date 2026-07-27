"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStoredConsent, saveConsent } from "@/lib/consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
    setVisible(false);
  };

  const rejectAll = () => {
    saveConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-border/60 bg-card/95 p-4 backdrop-blur-sm sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Wir verwenden Cookies, um unsere Website zu verbessern und die Nutzung zu
            analysieren. Details finden Sie in unserer{" "}
            <Link href="/cookie-richtlinie" className="underline underline-offset-2 hover:text-primary">
              Cookie-Richtlinie
            </Link>
            .
          </p>
        </div>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <Button variant="outline" onClick={rejectAll} className="flex-1 rounded-full sm:flex-none">
            Nur notwendige
          </Button>
          <Button onClick={acceptAll} className="flex-1 rounded-full sm:flex-none">
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
