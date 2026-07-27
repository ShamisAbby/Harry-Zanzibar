<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Deliberately does NOT use WithoutModelEvents: Tour/TourCategory rely on
     * model events (via HasSlug) to generate slugs, and TourReview relies on
     * a saved-event hook to keep Tour::rating_cache in sync.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        // Local-dev-only super admin. Change this password before deploying
        // anywhere beyond your own machine.
        $admin = User::firstOrCreate(
            ['email' => 'admin@harry-zanzibar.test'],
            [
                'name' => 'Harry Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('super_admin');

        $this->call([
            TourCategorySeeder::class,
            TourSeeder::class,
            BlogCategorySeeder::class,
            BlogPostSeeder::class,
        ]);
    }
}
