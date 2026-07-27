import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Compass className="size-16 text-primary/40" strokeWidth={1} />
      <h1 className="mt-6 font-heading text-4xl font-semibold">404</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Diese Seite konnten wir leider nicht finden – vielleicht wurde sie verschoben oder
        existiert nicht mehr. Entdecken Sie stattdessen unsere Touren.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/" />} nativeButton={false} className="rounded-full px-8">
          Zur Startseite
        </Button>
        <Button
          render={<Link href="/sansibar-touren" />}
          nativeButton={false}
          variant="outline"
          className="rounded-full px-8"
        >
          Touren entdecken
        </Button>
      </div>
    </div>
  );
}
