<?php

namespace Tests\Unit;

use App\Models\Tour;
use App\Models\TourReview;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourRatingCacheTest extends TestCase
{
    use RefreshDatabase;

    public function test_rating_cache_updates_when_an_approved_review_is_added(): void
    {
        $tour = Tour::factory()->create();

        TourReview::factory()->create(['tour_id' => $tour->id, 'rating' => 5]);
        TourReview::factory()->create(['tour_id' => $tour->id, 'rating' => 3]);

        $tour->refresh();

        $this->assertSame('4.0', (string) $tour->rating_cache);
        $this->assertSame(2, $tour->review_count_cache);
    }

    public function test_unapproved_reviews_are_excluded_from_the_average(): void
    {
        $tour = Tour::factory()->create();

        TourReview::factory()->create(['tour_id' => $tour->id, 'rating' => 5]);
        TourReview::factory()->unapproved()->create(['tour_id' => $tour->id, 'rating' => 1]);

        $tour->refresh();

        $this->assertSame('5.0', (string) $tour->rating_cache);
        $this->assertSame(1, $tour->review_count_cache);
    }

    public function test_rating_cache_recalculates_when_a_review_is_deleted(): void
    {
        $tour = Tour::factory()->create();
        $review = TourReview::factory()->create(['tour_id' => $tour->id, 'rating' => 5]);
        TourReview::factory()->create(['tour_id' => $tour->id, 'rating' => 3]);

        $review->delete();
        $tour->refresh();

        $this->assertSame('3.0', (string) $tour->rating_cache);
        $this->assertSame(1, $tour->review_count_cache);
    }

    public function test_rating_cache_is_zero_with_no_reviews(): void
    {
        $tour = Tour::factory()->create();

        $this->assertSame('0.0', (string) $tour->rating_cache);
        $this->assertSame(0, $tour->review_count_cache);
    }
}
