<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
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
    }
}
