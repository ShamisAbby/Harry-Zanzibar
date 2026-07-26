const partners = [
  "TripAdvisor",
  "Google Reviews",
  "Safari Blue Partner",
  "Zanzibar Tourism Board",
  "TUI Partner Network",
  "GetYourGuide",
];

export function Partners() {
  return (
    <section className="border-y border-border/60 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Vertraut von Reisenden & Partnern
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((partner) => (
            <span
              key={partner}
              className="font-heading text-lg font-medium text-muted-foreground/70 grayscale transition-all hover:text-foreground hover:grayscale-0"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
