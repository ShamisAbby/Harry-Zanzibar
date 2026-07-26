<?php

namespace Database\Seeders;

use App\Models\Tour;
use App\Models\TourCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dayTrip = TourCategory::where('type', 'day-trip')->firstOrFail();
        $multiDay = TourCategory::where('type', 'multi-day')->firstOrFail();

        $tours = [
            [
                'tour_category_id' => $dayTrip->id,
                'title' => 'Safari Blue',
                'excerpt' => 'Ein Tag auf dem traditionellen Dhau-Boot durch türkisfarbene Lagunen, Schnorcheln an Korallenriffen und ein Grillfest auf einer Sandbank.',
                'description' => '<p>Safari Blue ist das meistgebuchte Tagesabenteuer auf Sansibar – und das aus gutem Grund. An Bord einer traditionellen Dhau segeln wir durch die geschützte Menai Bay, schnorcheln an unberührten Korallenriffen und legen auf einer einsamen Sandbank an, wo ein frisches Meeresfrüchte-Grillfest auf Sie wartet.</p><p>Harry begleitet die Tour persönlich auf Deutsch und sorgt dafür, dass Sie die Highlights nicht verpassen – von verspielten Delfinen bis zu den Mangrovenwäldern von Kizimkazi.</p>',
                'duration_label' => 'Ganztägig (ca. 8 Stunden)',
                'duration_days' => 1,
                'price_from' => 85,
                'currency' => 'EUR',
                'highlights' => ['Traditionelle Dhau-Bootsfahrt', 'Schnorcheln an Korallenriffen', 'Sandbank-Picknick mit Meeresfrüchten', 'Mangrovenwälder von Kizimkazi'],
                'included' => ['Abholung vom Hotel', 'Deutschsprachiger Guide', 'Mittagessen & Getränke', 'Schnorchelausrüstung'],
                'excluded' => ['Trinkgelder', 'Alkoholische Getränke'],
                'faqs' => [
                    ['question' => 'Muss ich schwimmen können?', 'answer' => 'Grundkenntnisse im Schwimmen sind hilfreich, aber wir stellen Schwimmwesten für alle Gäste bereit.'],
                    ['question' => 'Ist die Tour für Kinder geeignet?', 'answer' => 'Ja, Safari Blue ist eine unserer familienfreundlichsten Touren.'],
                ],
                'available_days' => ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                'location_name' => 'Menai Bay, Sansibar',
                'latitude' => -6.2354,
                'longitude' => 39.2695,
                'is_featured' => true,
                'order' => 1,
                'meta_title' => 'Safari Blue Sansibar – Dhau-Tour, Schnorcheln & Sandbank | Harry Sansibar',
                'meta_description' => 'Erleben Sie Safari Blue auf Sansibar: Dhau-Bootsfahrt, Schnorcheln an Korallenriffen und Sandbank-Picknick – geführt von Ihrem deutschsprachigen Guide Harry.',
            ],
            [
                'tour_category_id' => $dayTrip->id,
                'title' => 'Mnemba Island Schnorcheltour',
                'excerpt' => 'Kristallklares Wasser rund um das private Mnemba-Atoll – eines der besten Riffe Ostafrikas, mit etwas Glück begegnen Sie Delfinen.',
                'description' => '<p>Das Mnemba-Atoll vor der Nordostküste Sansibars gilt als eines der schönsten Riffe Ostafrikas. Auf dieser Halbtagestour erkunden wir das kristallklare Wasser rund um die private Insel per Boot und Schnorchel.</p><p>Mit etwas Glück begegnen wir wilden Delfinen, die häufig in der Gegend anzutreffen sind.</p>',
                'duration_label' => 'Halbtägig (ca. 4 Stunden)',
                'duration_days' => 1,
                'price_from' => 70,
                'currency' => 'EUR',
                'highlights' => ['Privates Mnemba-Riff', 'Delfin-Sichtung möglich', 'Kleine Gruppen', 'Erfahrene Bootscrew'],
                'included' => ['Abholung vom Hotel', 'Deutschsprachiger Guide', 'Schnorchelausrüstung', 'Wasser & Snacks'],
                'excluded' => ['Trinkgelder', 'Unterwasserkamera-Miete'],
                'faqs' => [
                    ['question' => 'Sind Delfin-Sichtungen garantiert?', 'answer' => 'Nein, es handelt sich um wilde Tiere – die Sichtungswahrscheinlichkeit ist jedoch sehr hoch.'],
                ],
                'available_days' => ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                'location_name' => 'Mnemba Atoll, Nordost-Sansibar',
                'latitude' => -5.8258,
                'longitude' => 39.3853,
                'is_featured' => true,
                'order' => 2,
                'meta_title' => 'Mnemba Island Tour Sansibar – Schnorcheln & Delfine | Harry Sansibar',
                'meta_description' => 'Schnorcheln am Mnemba-Riff mit Ihrem deutschsprachigen Guide Harry – kristallklares Wasser, bunte Korallen und die Chance auf Delfin-Begegnungen.',
            ],
            [
                'tour_category_id' => $dayTrip->id,
                'title' => 'Stone Town Kulturtour',
                'excerpt' => 'Geführter Spaziergang durch die UNESCO-Weltkulturerbestadt: Gewürzmärkte, historische Sultanspaläste und die Geschichte des Sklavenhandels.',
                'description' => '<p>Stone Town ist das historische Herz Sansibars und UNESCO-Weltkulturerbe. Auf einem geführten Spaziergang durch die verwinkelten Gassen entdecken wir den Gewürzmarkt, die berühmten geschnitzten Türen, den Sultanspalast und die bewegende Geschichte des Sklavenhandels.</p>',
                'duration_label' => '3–4 Stunden',
                'duration_days' => 1,
                'price_from' => 45,
                'currency' => 'EUR',
                'highlights' => ['UNESCO-Weltkulturerbe', 'Historischer Sklavenmarkt', 'Gewürzmarkt Darajani', 'Geschnitzte Haustüren'],
                'included' => ['Deutschsprachiger Guide', 'Eintritte', 'Wasser'],
                'excluded' => ['Mittagessen', 'Trinkgelder'],
                'faqs' => [
                    ['question' => 'Wie viel wird zu Fuß gegangen?', 'answer' => 'Etwa 3-4 km in gemütlichem Tempo mit vielen Pausen im Schatten.'],
                ],
                'available_days' => ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                'location_name' => 'Stone Town, Sansibar-Stadt',
                'latitude' => -6.1659,
                'longitude' => 39.1925,
                'is_featured' => false,
                'order' => 3,
                'meta_title' => 'Stone Town Tour Sansibar – Kultur & Geschichte | Harry Sansibar',
                'meta_description' => 'Entdecken Sie Stone Town mit einem deutschsprachigen Guide: Gewürzmarkt, Sultanspaläste und die Geschichte des Sklavenhandels hautnah erleben.',
            ],
            [
                'tour_category_id' => $dayTrip->id,
                'title' => 'Prison Island & Riesenschildkröten',
                'excerpt' => 'Kurze Bootsfahrt zur Gefängnisinsel, Begegnung mit über 100 Jahre alten Riesenschildkröten und feinem, weißem Sandstrand.',
                'description' => '<p>Changuu, besser bekannt als Prison Island, liegt nur eine kurze Bootsfahrt von Stone Town entfernt. Hier leben über 100 Jahre alte Aldabra-Riesenschildkröten, die Sie aus nächster Nähe erleben können. Im Anschluss lädt der feine, weiße Sandstrand zum Entspannen und Schnorcheln ein.</p>',
                'duration_label' => 'Halbtägig',
                'duration_days' => 1,
                'price_from' => 55,
                'currency' => 'EUR',
                'highlights' => ['Über 100 Jahre alte Riesenschildkröten', 'Historisches Gefängnisgebäude', 'Feiner weißer Sandstrand', 'Schnorcheln möglich'],
                'included' => ['Bootstransfer', 'Deutschsprachiger Guide', 'Eintritt Schildkrötenreservat'],
                'excluded' => ['Mittagessen', 'Trinkgelder'],
                'faqs' => [
                    ['question' => 'Kann ich die Schildkröten füttern?', 'answer' => 'Ja, vor Ort kann Schildkrötenfutter erworben werden.'],
                ],
                'available_days' => ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                'location_name' => 'Prison Island (Changuu), bei Stone Town',
                'latitude' => -6.1364,
                'longitude' => 39.1775,
                'is_featured' => false,
                'order' => 4,
                'meta_title' => 'Prison Island Tour Sansibar – Riesenschildkröten | Harry Sansibar',
                'meta_description' => 'Besuchen Sie Prison Island bei Sansibar: über 100 Jahre alte Riesenschildkröten, historisches Gefängnis und traumhafter Sandstrand.',
            ],
            [
                'tour_category_id' => $dayTrip->id,
                'title' => 'Jozani Forest & Gewürztour',
                'excerpt' => 'Die seltenen Sansibar-Stummelaffen im Jozani-Nationalpark erleben und danach die Aromen der Insel auf einer traditionellen Gewürzfarm entdecken.',
                'description' => '<p>Der Jozani-Nationalpark ist die letzte Heimat der seltenen roten Sansibar-Stummelaffen. Nach einer Wanderung durch den Regenwald besuchen wir eine traditionelle Gewürzfarm, auf der Vanille, Zimt, Muskatnuss und Nelken angebaut werden.</p>',
                'duration_label' => 'Ganztägig',
                'duration_days' => 1,
                'price_from' => 60,
                'currency' => 'EUR',
                'highlights' => ['Rote Stummelaffen hautnah', 'Mangroven-Spaziergang', 'Traditionelle Gewürzfarm', 'Verkostung frischer Gewürze'],
                'included' => ['Abholung vom Hotel', 'Deutschsprachiger Guide', 'Eintritte', 'Mittagessen'],
                'excluded' => ['Trinkgelder', 'Souvenirs'],
                'faqs' => [
                    ['question' => 'Ist die Wanderung anstrengend?', 'answer' => 'Nein, die Wege sind eben und für alle Fitnesslevel geeignet.'],
                ],
                'available_days' => ['mon', 'tue', 'wed', 'thu', 'fri'],
                'location_name' => 'Jozani-Chwaka-Bay-Nationalpark',
                'latitude' => -6.2685,
                'longitude' => 39.3931,
                'is_featured' => false,
                'order' => 5,
                'meta_title' => 'Jozani Forest & Gewürztour Sansibar | Harry Sansibar',
                'meta_description' => 'Rote Stummelaffen im Jozani-Nationalpark und traditionelle Gewürzfarmen entdecken – mit Ihrem deutschsprachigen Guide Harry.',
            ],
            [
                'tour_category_id' => $multiDay->id,
                'title' => 'Nord-Sansibar Kombireise',
                'excerpt' => 'Fünf Tage zwischen Nungwi und Kendwa: private Strandvillen, Sonnenuntergangs-Dhau-Fahrten und individuell abgestimmte Ausflüge.',
                'description' => '<p>Diese fünftägige Reise verbindet die schönsten Ecken Nord-Sansibars: private Strandvillen in Nungwi und Kendwa, Sonnenuntergangsfahrten auf der Dhau und individuell auf Sie abgestimmte Tagesausflüge.</p><p>Harry plant jeden Tag persönlich mit Ihnen und passt das Programm an Ihre Wünsche an – ideal für Flitterwöchner und Familien.</p>',
                'duration_label' => '5 Tage / 4 Nächte',
                'duration_days' => 5,
                'price_from' => 890,
                'currency' => 'EUR',
                'highlights' => ['Private Strandvilla', 'Sonnenuntergangs-Dhau-Fahrt', 'Individuelle Tagesausflüge', 'Persönliche Betreuung durch Harry'],
                'included' => ['4 Übernachtungen', 'Frühstück täglich', 'Alle Transfers', 'Deutschsprachige Begleitung'],
                'excluded' => ['Flüge', 'Mittag- & Abendessen', 'Persönliche Ausgaben'],
                'faqs' => [
                    ['question' => 'Kann das Programm individuell angepasst werden?', 'answer' => 'Ja, wir passen die Reise gerne an Ihre Interessen und Ihr Budget an.'],
                    ['question' => 'Ist die Reise für Flitterwöchner geeignet?', 'answer' => 'Absolut – wir bieten spezielle Romantik-Arrangements auf Anfrage.'],
                ],
                'available_days' => ['mon', 'wed', 'fri'],
                'availability_note' => 'Anreise an ausgewählten Wochentagen, individuelle Termine auf Anfrage.',
                'location_name' => 'Nungwi & Kendwa, Nord-Sansibar',
                'latitude' => -5.7269,
                'longitude' => 39.2925,
                'is_featured' => true,
                'order' => 6,
                'meta_title' => 'Nord-Sansibar Kombireise – 5 Tage | Harry Sansibar',
                'meta_description' => 'Fünf Tage Nord-Sansibar: private Strandvillen, Sonnenuntergangsfahrten und individuelle Ausflüge mit Ihrem deutschsprachigen Guide Harry.',
            ],
        ];

        foreach ($tours as $data) {
            $tour = Tour::updateOrCreate(['title' => $data['title']], $data);
            $this->seedReviews($tour);
        }
    }

    private function seedReviews(Tour $tour): void
    {
        if ($tour->reviews()->exists()) {
            return;
        }

        $reviewSets = [
            'Safari Blue' => [
                ['author_name' => 'Sabine & Markus', 'author_origin' => 'Wien, Österreich', 'rating' => 5, 'comment' => 'Harry hat uns Sansibar auf Deutsch so nahegebracht, wie es kein Reiseführer könnte. Safari Blue war der Höhepunkt unserer Flitterwochen.'],
                ['author_name' => 'Familie Weber', 'author_origin' => 'München, Deutschland', 'rating' => 5, 'comment' => 'Mit zwei Kindern war uns wichtig, dass alles reibungslos läuft. Perfekt organisiert!'],
            ],
            'Mnemba Island Schnorcheltour' => [
                ['author_name' => 'Thomas Keller', 'author_origin' => 'Zürich, Schweiz', 'rating' => 5, 'comment' => 'Die Mnemba-Tour war eines der eindrücklichsten Erlebnisse meines Lebens. Wir haben sogar Delfine gesehen!'],
            ],
            'Stone Town Kulturtour' => [
                ['author_name' => 'Julia Hoffmann', 'author_origin' => 'Berlin, Deutschland', 'rating' => 5, 'comment' => 'Sehr informativ und einfühlsam erzählt, auch die schwierigen Kapitel der Geschichte.'],
            ],
            'Nord-Sansibar Kombireise' => [
                ['author_name' => 'Anna & Felix', 'author_origin' => 'Hamburg, Deutschland', 'rating' => 5, 'comment' => 'Die perfekte Flitterwochenreise – jedes Detail war durchdacht.'],
            ],
        ];

        foreach ($reviewSets[$tour->title] ?? [] as $review) {
            $tour->reviews()->create([
                ...$review,
                'source' => 'website',
                'is_approved' => true,
            ]);
        }

        // DatabaseSeeder disables model events (WithoutModelEvents), so the
        // TourReview::saved hook that normally keeps this in sync won't fire here.
        $tour->refreshRatingCache();
    }
}
