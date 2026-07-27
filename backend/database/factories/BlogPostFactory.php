<?php

namespace Database\Factories;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BlogPost>
 */
class BlogPostFactory extends Factory
{
    protected $model = BlogPost::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'blog_category_id' => BlogCategory::factory(),
            'title' => $this->faker->unique()->sentence(4),
            'excerpt' => $this->faker->sentence(),
            'content' => '<p>' . $this->faker->paragraph() . '</p>',
            'faqs' => [],
            'reading_minutes' => $this->faker->numberBetween(3, 12),
            'is_published' => true,
            'published_at' => now()->subDay(),
        ];
    }

    public function unpublished(): static
    {
        return $this->state(['is_published' => false, 'published_at' => null]);
    }
}
