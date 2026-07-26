"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TourCard } from "@/components/tours/tour-card";
import { getTours } from "@/lib/tours";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { TourCategoryType, TourSummary } from "@/types/tour";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price_asc" | "price_desc" | "rating_desc";

interface TourListingProps {
  fixedType?: TourCategoryType;
}

const typeFilters: { key: TourCategoryType | "all"; label: string }[] = [
  { key: "all", label: "Alle Touren" },
  { key: "day-trip", label: "Tagesausflüge" },
  { key: "multi-day", label: "Mehrtagestouren" },
];

export function TourListing({ fixedType }: TourListingProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TourCategoryType | "all">(fixedType ?? "all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 350);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, type, sort]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(false);

    getTours({
      q: debouncedQuery || undefined,
      type: fixedType ?? (type === "all" ? undefined : type),
      sort,
      perPage: 9,
    })
      .then((res) => {
        if (cancelled) return;
        setTours((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
        setMeta(res.meta);
      })
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, type, sort, fixedType, page]);

  const hasMore = meta.currentPage < meta.lastPage;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tour, Ort oder Aktivität suchen…"
            className="pl-9"
            aria-label="Touren durchsuchen"
          />
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal className="hidden size-4 text-muted-foreground sm:block" />
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sortieren nach" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Empfehlung</SelectItem>
              <SelectItem value="price_asc">Preis aufsteigend</SelectItem>
              <SelectItem value="price_desc">Preis absteigend</SelectItem>
              <SelectItem value="rating_desc">Beste Bewertung</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!fixedType && (
        <div className="mt-6 flex flex-wrap gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setType(filter.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                type === filter.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        {isLoading && page === 1 ? "Touren werden geladen…" : `${meta.total} Touren gefunden`}
      </p>

      {error ? (
        <p className="mt-10 text-center text-muted-foreground">
          Touren konnten momentan nicht geladen werden. Bitte versuchen Sie es später erneut.
        </p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
            {isLoading &&
              Array.from({ length: page === 1 ? 6 : 3 }).map((_, i) => (
                <Skeleton key={`s-${i}`} className="aspect-[4/3] rounded-2xl" />
              ))}
          </div>

          {!isLoading && tours.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">
              Keine Touren gefunden. Versuchen Sie einen anderen Suchbegriff.
            </p>
          )}

          {hasMore && !isLoading && (
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg" className="rounded-full px-8" onClick={() => setPage((p) => p + 1)}>
                Mehr Touren laden
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
