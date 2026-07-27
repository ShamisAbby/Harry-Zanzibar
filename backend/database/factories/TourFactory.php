<?php

namespace Database\Factories;

use App\Models\Tour;
use App\Models\TourCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tour>
 */
class TourFactory extends Factory
{
    protected $model = Tour::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tour_category_id' => TourCategory::factory(),
            'title' => $this->faker->unique()->sentence(3),
            'excerpt' => $this->faker->sentence(),
            'description' => '<p>' . $this->faker->paragraph() . '</p>',
            'duration_label' => 'Ganztägig',
            'duration_days' => 1,
            'price_from' => $this->faker->numberBetween(40, 900),
            'currency' => 'EUR',
            'highlights' => [$this->faker->word(), $this->faker->word()],
            'included' => [$this->faker->word()],
            'excluded' => [$this->faker->word()],
            'faqs' => [],
            'available_days' => ['mon', 'tue', 'wed'],
            'location_name' => $this->faker->city(),
            'latitude' => $this->faker->latitude(-7, -5),
            'longitude' => $this->faker->longitude(38, 40),
            'is_featured' => false,
            'is_active' => true,
            'order' => 0,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }

    public function featured(): static
    {
        return $this->state(['is_featured' => true]);
    }
}
