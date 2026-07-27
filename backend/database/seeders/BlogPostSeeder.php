<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reiseplanung = BlogCategory::where('name', 'Reiseplanung')->firstOrFail();
        $straende = BlogCategory::where('name', 'Strände')->firstOrFail();
        $kultur = BlogCategory::where('name', 'Kultur')->firstOrFail();

        $posts = [
            [
                'blog_category_id' => $reiseplanung->id,
                'title' => 'Die beste Reisezeit für Sansibar',
                'excerpt' => 'Wann sich ein Besuch auf der Gewürzinsel wirklich lohnt – Klima, Regenzeiten und Insider-Monate für Sonnenanbeter.',
                'content' => '<p>Sansibar liegt nahe am Äquator und bietet ganzjährig tropische Temperaturen zwischen 25 und 32 Grad. Dennoch gibt es deutliche Unterschiede zwischen den Jahreszeiten, die Ihre Reiseplanung beeinflussen sollten.</p><h2>Trockenzeit: Juni bis Oktober</h2><p>Die beliebteste Reisezeit mit wenig Niederschlag, angenehmer Luftfeuchtigkeit und exzellenter Sicht zum Schnorcheln und Tauchen. Auch die Wal- und Delfinbeobachtung ist in diesen Monaten besonders ergiebig.</p><h2>Kurze Regenzeit: November bis Dezember</h2><p>Kurze, kräftige Schauer am Nachmittag, aber weiterhin viel Sonne – eine unterschätzte, günstigere Alternative.</p><h2>Lange Regenzeit: März bis Mai</h2><p>Die ruhigste Reisezeit mit den niedrigsten Preisen, aber auch der höchsten Niederschlagsmenge. Für Sparfüchse, die Regenschauer in Kauf nehmen, dennoch eine Option.</p>',
                'faqs' => [
                    ['question' => 'Ist Sansibar auch in der Regenzeit einen Besuch wert?', 'answer' => 'Ja, besonders die kurze Regenzeit im November ist mit kurzen Schauern und viel Sonne gut bereisbar.'],
                    ['question' => 'Wann ist die beste Zeit für Wal- und Delfinbeobachtungen?', 'answer' => 'Zwischen Juli und September sind die Sichtungschancen am höchsten.'],
                ],
                'reading_minutes' => 6,
                'is_published' => true,
                'published_at' => now()->subDays(40),
                'meta_title' => 'Beste Reisezeit Sansibar – Klima, Regenzeit & Insider-Tipps',
                'meta_description' => 'Erfahren Sie, wann die beste Reisezeit für Sansibar ist: Trockenzeit, Regenzeiten und die idealen Monate für Ihren Traumurlaub.',
            ],
            [
                'blog_category_id' => $straende->id,
                'title' => 'Die schönsten Strände Sansibars',
                'excerpt' => 'Von Nungwi bis Paje: unsere persönliche Rangliste der traumhaftesten Strandabschnitte der Insel.',
                'content' => '<p>Sansibar ist berühmt für seine puderweißen Strände und das türkisfarbene Wasser des Indischen Ozeans. Hier sind unsere persönlichen Favoriten.</p><h2>Nungwi – Der Klassiker im Norden</h2><p>Feiner Sand, lebendige Beach-Bar-Szene und spektakuläre Sonnenuntergänge machen Nungwi zum beliebtesten Strand der Insel.</p><h2>Kendwa – Ruhiger Nachbar</h2><p>Etwas ruhiger als Nungwi, mit einem der schönsten Sonnenuntergänge Sansibars und kaum Gezeiteneinfluss.</p><h2>Paje – Paradies für Kitesurfer</h2><p>An der Ostküste gelegen, ist Paje das Zentrum der Kitesurf-Szene mit konstantem Wind und einer entspannten Atmosphäre.</p><h2>Jambiani – Authentisch und ruhig</h2><p>Ein traditionelles Fischerdorf mit langen, menschenleeren Sandstränden – ideal zum Abschalten.</p>',
                'faqs' => [
                    ['question' => 'Welcher Strand eignet sich am besten für Familien?', 'answer' => 'Kendwa und Nungwi bieten flaches Wasser und gute Infrastruktur für Familien mit Kindern.'],
                    ['question' => 'Wo kann man am besten kitesurfen?', 'answer' => 'Paje und Jambiani an der Ostküste bieten die zuverlässigsten Windbedingungen.'],
                ],
                'reading_minutes' => 8,
                'is_published' => true,
                'published_at' => now()->subDays(25),
                'meta_title' => 'Die schönsten Strände Sansibars – Nungwi, Kendwa, Paje & mehr',
                'meta_description' => 'Unsere Top-Strände auf Sansibar: Nungwi, Kendwa, Paje und Jambiani im Vergleich – für jeden Reisetyp der passende Strand.',
            ],
            [
                'blog_category_id' => $kultur->id,
                'title' => 'Stone Town: Der komplette Reiseführer',
                'excerpt' => 'Gassen, Gewürzmärkte und Geschichte – so erleben Sie die UNESCO-Altstadt wie ein Einheimischer.',
                'content' => '<p>Stone Town, das historische Herz Sansibars, ist seit 2000 UNESCO-Weltkulturerbe. Die verwinkelten Gassen erzählen Geschichten aus über 200 Jahren Handelsgeschichte zwischen Afrika, Arabien und Indien.</p><h2>Die geschnitzten Türen</h2><p>Über 500 kunstvoll geschnitzte Holztüren zieren die Gebäude Stone Towns – jede erzählt etwas über den Wohlstand und die Herkunft ihrer einstigen Besitzer.</p><h2>Der Gewürzmarkt Darajani</h2><p>Ein Sinnesrausch aus Farben und Düften: Von Vanille über Zimt bis Kardamom finden Sie hier die berühmten Gewürze der Insel.</p><h2>Die Geschichte des Sklavenhandels</h2><p>Das ehemalige Sklavenmarkt-Gelände und die Anglican Cathedral erinnern eindrücklich an die dunkle Vergangenheit der Insel als Zentrum des ostafrikanischen Sklavenhandels.</p>',
                'faqs' => [
                    ['question' => 'Wie viel Zeit sollte ich für Stone Town einplanen?', 'answer' => 'Für die wichtigsten Sehenswürdigkeiten empfehlen wir mindestens einen halben Tag, besser einen ganzen.'],
                    ['question' => 'Ist Stone Town zu Fuß erkundbar?', 'answer' => 'Ja, die Altstadt ist kompakt und lässt sich hervorragend zu Fuß erkunden.'],
                ],
                'reading_minutes' => 10,
                'is_published' => true,
                'published_at' => now()->subDays(12),
                'meta_title' => 'Stone Town Reiseführer – Sehenswürdigkeiten & Geschichte',
                'meta_description' => 'Der komplette Reiseführer für Stone Town auf Sansibar: Geschnitzte Türen, Gewürzmarkt und die Geschichte des Sklavenhandels.',
            ],
            [
                'blog_category_id' => $reiseplanung->id,
                'title' => 'Visum & Einreise nach Sansibar: Das müssen Sie wissen',
                'excerpt' => 'Alles zu Visabestimmungen, Einreisebedingungen und wichtigen Dokumenten für Ihre Sansibar-Reise.',
                'content' => '<p>Die Einreise nach Sansibar (Teil von Tansania) erfordert für die meisten europäischen Staatsangehörigen ein Visum, das unkompliziert online oder bei Ankunft beantragt werden kann.</p><h2>Das eVisa-Verfahren</h2><p>Wir empfehlen, das Visum vorab online über das offizielle tansanische eVisa-Portal zu beantragen – das spart Zeit bei der Ankunft.</p><h2>Erforderliche Dokumente</h2><p>Ein Reisepass mit mindestens sechs Monaten Restgültigkeit, ein Rückflugticket und teilweise ein Nachweis der Gelbfieberimpfung (bei Einreise aus Risikogebieten) werden benötigt.</p>',
                'faqs' => [
                    ['question' => 'Brauche ich eine Gelbfieberimpfung?', 'answer' => 'Nur bei Einreise aus einem Gelbfieber-Risikogebiet. Bei Direktflug aus Deutschland, Österreich oder der Schweiz in der Regel nicht erforderlich.'],
                    ['question' => 'Wie lange ist das Touristenvisum gültig?', 'answer' => 'Das Standard-Touristenvisum gilt in der Regel für 90 Tage.'],
                ],
                'reading_minutes' => 5,
                'is_published' => true,
                'published_at' => now()->subDays(5),
                'meta_title' => 'Visum Sansibar – Einreisebestimmungen im Überblick',
                'meta_description' => 'Alles zum Sansibar-Visum: eVisa-Verfahren, benötigte Dokumente und Einreisebestimmungen für Ihre Reise.',
            ],
        ];

        foreach ($posts as $data) {
            BlogPost::updateOrCreate(['title' => $data['title']], $data);
        }
    }
}
