<?php

namespace Tests\Feature\Api;

use App\Models\Tour;
use App\Models\TourCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_active_tours(): void
    {
        Tour::factory()->count(3)->create();
        Tour::factory()->inactive()->create();

        $response = $this->getJson('/api/v1/tours');

        $response->assertOk();
        $this->assertCount(3, $response->json('data'));
    }

    public function test_it_filters_by_category_type(): void
    {
        $dayTrip = TourCategory::factory()->create(['type' => 'day-trip']);
        $multiDay = TourCategory::factory()->create(['type' => 'multi-day']);

        Tour::factory()->count(2)->create(['tour_category_id' => $dayTrip->id]);
        Tour::factory()->create(['tour_category_id' => $multiDay->id]);

        $response = $this->getJson('/api/v1/tours?type=day-trip');

        $response->assertOk();
        $this->assertCount(2, $response->json('data'));
    }

    public function test_it_searches_by_keyword(): void
    {
        Tour::factory()->create(['title' => 'Safari Blue Abenteuer']);
        Tour::factory()->create(['title' => 'Stone Town Rundgang']);

        $response = $this->getJson('/api/v1/tours?q=Safari');

        $response->assertOk();
        $this->assertCount(1, $response->json('data'));
        $this->assertSame('Safari Blue Abenteuer', $response->json('data.0.title'));
    }

    public function test_it_shows_a_single_tour_with_related_tours(): void
    {
        $category = TourCategory::factory()->create();
        $tour = Tour::factory()->create(['tour_category_id' => $category->id]);
        Tour::factory()->count(2)->create(['tour_category_id' => $category->id]);

        $response = $this->getJson("/api/v1/tours/{$tour->slug}");

        $response->assertOk()
            ->assertJsonPath('data.slug', $tour->slug)
            ->assertJsonCount(2, 'data.relatedTours');
    }

    public function test_it_returns_404_for_inactive_tour(): void
    {
        $tour = Tour::factory()->inactive()->create();

        $this->getJson("/api/v1/tours/{$tour->slug}")->assertNotFound();
    }

    public function test_it_returns_404_for_unknown_slug(): void
    {
        $this->getJson('/api/v1/tours/does-not-exist')->assertNotFound();
    }
}
