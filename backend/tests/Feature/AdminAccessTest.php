<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // RefreshDatabase resets tables but not Spatie Permission's role/permission
        // cache, which otherwise leaks stale (or empty) state between test methods
        // sharing the same process.
        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/admin/tours')->assertRedirect('/admin/login');
    }

    public function test_login_page_is_reachable(): void
    {
        $this->get('/admin/login')->assertOk();
    }

    public function test_super_admin_can_access_the_dashboard(): void
    {
        Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');

        $this->actingAs($admin)->get('/admin')->assertOk();
    }

    public function test_a_user_without_a_role_cannot_access_the_tours_resource(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/tours')->assertForbidden();
    }
}
