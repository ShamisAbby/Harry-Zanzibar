<?php

namespace Database\Factories;

use App\Models\Tour;
use App\Models\TourReview;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TourReview>
 */
class TourReviewFactory extends Factory
{
    protected $model = TourReview::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tour_id' => Tour::factory(),
            'author_name' => $this->faker->name(),
            'author_origin' => $this->faker->city(),
            'rating' => $this->faker->numberBetween(3, 5),
            'comment' => $this->faker->paragraph(),
            'source' => 'website',
            'is_approved' => true,
        ];
    }

    public function unapproved(): static
    {
        return $this->state(['is_approved' => false]);
    }
}
