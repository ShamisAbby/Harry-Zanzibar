import type { BlogPostSummary, FaqItem, StatItem, Testimonial } from "@/types/content";

export const demoTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sabine & Markus, Wien",
    origin: "Österreich",
    quote:
      "Harry hat uns Sansibar auf Deutsch so nahegebracht, wie es kein Reiseführer könnte. Safari Blue war der Höhepunkt unserer Flitterwochen.",
    rating: 5,
    tourTitle: "Safari Blue & Nord-Sansibar Kombireise",
  },
  {
    id: "t2",
    name: "Familie Weber, München",
    origin: "Deutschland",
    quote:
      "Mit zwei Kindern war uns wichtig, dass alles reibungslos läuft. Harry hat jedes Detail durchdacht – von der Abholung bis zum letzten Sonnenuntergang.",
    rating: 5,
    tourTitle: "Jozani Forest & Gewürztour",
  },
  {
    id: "t3",
    name: "Thomas Keller, Zürich",
    origin: "Schweiz",
    quote:
      "Persönlicher, authentischer und professioneller geht es nicht. Die Mnemba-Tour war eines der eindrücklichsten Erlebnisse meines Lebens.",
    rating: 5,
    tourTitle: "Mnemba Island Schnorcheltour",
  },
];

export const demoBlogPosts: BlogPostSummary[] = [
  {
    id: "b1",
    slug: "beste-reisezeit-sansibar",
    title: "Die beste Reisezeit für Sansibar",
    excerpt:
      "Wann sich ein Besuch auf der Gewürzinsel wirklich lohnt – Klima, Regenzeiten und Insider-Monate für Sonnenanbeter.",
    image: "Sansibar Klima & Jahreszeiten",
    category: "Reiseplanung",
    readingTime: "6 Min.",
    publishedAt: "2026-06-02",
  },
  {
    id: "b2",
    slug: "top-straende-sansibar",
    title: "Die schönsten Strände Sansibars",
    excerpt:
      "Von Nungwi bis Paje: unsere persönliche Rangliste der traumhaftesten Strandabschnitte der Insel.",
    image: "Nungwi Strand",
    category: "Strände",
    readingTime: "8 Min.",
    publishedAt: "2026-05-18",
  },
  {
    id: "b3",
    slug: "stone-town-reisefuehrer",
    title: "Stone Town: Der komplette Reiseführer",
    excerpt:
      "Gassen, Gewürzmärkte und Geschichte – so erleben Sie die UNESCO-Altstadt wie ein Einheimischer.",
    image: "Stone Town Gassen",
    category: "Kultur",
    readingTime: "10 Min.",
    publishedAt: "2026-04-27",
  },
];

export const demoFaqs: FaqItem[] = [
  {
    id: "f1",
    question: "Sprechen die Reiseleiter wirklich Deutsch?",
    answer:
      "Ja. Harry und sein Team führen alle Touren persönlich auf Deutsch durch – keine Übersetzung, keine Missverständnisse, sondern echte Kommunikation auf Augenhöhe.",
  },
  {
    id: "f2",
    question: "Wie läuft die Buchung und Bezahlung ab?",
    answer:
      "Sie stellen eine Anfrage über das Buchungsformular oder WhatsApp, erhalten eine persönliche Bestätigung mit allen Details und bezahlen bequem vor Ort oder per Überweisung.",
  },
  {
    id: "f3",
    question: "Sind die Touren auch für Familien mit Kindern geeignet?",
    answer:
      "Absolut. Viele unserer Ausflüge, etwa Safari Blue oder Prison Island, sind bei Familien besonders beliebt. Wir passen Tempo und Programm gerne an Kinder an.",
  },
  {
    id: "f4",
    question: "Was ist, wenn ich auch eine Tansania-Safari machen möchte?",
    answer:
      "Unsere Safari-Erlebnisse auf dem Festland organisieren wir über unsere Schwesterseite Safari Mit Harry – wir verlinken Sie dorthin, sobald Sie Interesse haben.",
  },
];

export const demoStats: StatItem[] = [
  { id: "s1", value: 12, suffix: "+", label: "Jahre Erfahrung auf Sansibar" },
  { id: "s2", value: 4800, suffix: "+", label: "Zufriedene Reisende" },
  { id: "s3", value: 25, suffix: "+", label: "Einzigartige Touren & Ausflüge" },
  { id: "s4", value: 4.9, label: "Ø Bewertung (Google & TripAdvisor)" },
];
