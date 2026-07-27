<?php

namespace Tests\Feature\Api;

use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiteSettingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_exposes_only_public_analytics_fields(): void
    {
        SiteSetting::current()->update([
            'ga4_id' => 'G-ABC123',
            'whatsapp_number' => '255700000000',
        ]);

        $response = $this->getJson('/api/v1/settings/analytics');

        $response->assertOk()
            ->assertJsonPath('data.ga4Id', 'G-ABC123')
            ->assertJsonMissingPath('data.id');
    }

    public function test_it_creates_the_singleton_row_on_first_access(): void
    {
        $this->assertDatabaseCount('site_settings', 0);

        $this->getJson('/api/v1/settings/analytics')->assertOk();

        $this->assertDatabaseCount('site_settings', 1);
    }
}
