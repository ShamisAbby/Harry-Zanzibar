<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Roles requested by the project brief. Super Admin bypasses all
     * Filament Shield permission checks; the others are granted specific
     * resource permissions as those resources are built out in later phases.
     */
    public function run(): void
    {
        foreach ([
            'super_admin',
            'admin',
            'editor',
            'content_manager',
            'seo_manager',
        ] as $role) {
            Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
        }
    }
}
