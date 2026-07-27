<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Roles requested by the project brief.
     *
     * Important: Filament Shield's super_admin is NOT a Gate::before bypass
     * here - this project's config/filament-shield.php has
     * super_admin.define_via_gate = false, which means "before"/"after"
     * hooks are never registered (see FilamentShieldServiceProvider::
     * packageBooted()). Instead, super_admin only works because it has
     * every generated permission directly assigned to it in the DB. So:
     * run `php artisan shield:generate --all --panel=admin` BEFORE this
     * seeder (permissions must already exist to be synced), otherwise
     * super_admin ends up with zero permissions and can't access anything.
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

        $superAdmin = Role::where('name', 'super_admin')->first();
        $allPermissions = Permission::where('guard_name', 'web')->pluck('name');

        if ($superAdmin && $allPermissions->isNotEmpty()) {
            $superAdmin->syncPermissions($allPermissions);
        }
    }
}
