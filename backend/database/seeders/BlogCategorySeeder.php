<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ([
            ['name' => 'Reiseplanung', 'order' => 1],
            ['name' => 'Strände', 'order' => 2],
            ['name' => 'Kultur', 'order' => 3],
        ] as $category) {
            BlogCategory::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
