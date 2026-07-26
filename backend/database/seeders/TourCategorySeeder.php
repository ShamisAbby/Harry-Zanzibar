<?php

namespace Database\Seeders;

use App\Models\TourCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TourCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Tagesausflüge',
                'type' => 'day-trip',
                'description' => 'Kompakte Erlebnisse für einen unvergesslichen Tag auf Sansibar.',
                'order' => 1,
            ],
            [
                'name' => 'Mehrtagestouren',
                'type' => 'multi-day',
                'description' => 'Individuell geplante Reisen über mehrere Tage, für alle die tiefer eintauchen möchten.',
                'order' => 2,
            ],
        ];

        foreach ($categories as $category) {
            TourCategory::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
