import { MapPin } from "lucide-react";

export function TourMap({
  latitude,
  longitude,
  locationName,
}: {
  latitude: number;
  longitude: number;
  locationName: string | null;
}) {
  const delta = 0.06;
  const bbox = [longitude - delta, latitude - delta, longitude + delta, latitude + delta].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${latitude},${longitude}&layer=mapnik`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      {locationName && (
        <div className="flex items-center gap-2 border-b border-border/60 bg-card px-4 py-3 text-sm font-medium">
          <MapPin className="size-4 text-primary" />
          {locationName}
        </div>
      )}
      <iframe
        title={`Karte: ${locationName ?? "Tourstandort"}`}
        src={src}
        className="h-72 w-full"
        loading="lazy"
      />
    </div>
  );
}
