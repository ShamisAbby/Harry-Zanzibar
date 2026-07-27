<?php

namespace Database\Factories;

use App\Models\TourCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TourCategory>
 */
class TourCategoryFactory extends Factory
{
    protected $model = TourCategory::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->words(2, true),
            'type' => $this->faker->randomElement(['day-trip', 'multi-day']),
            'description' => $this->faker->sentence(),
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}
