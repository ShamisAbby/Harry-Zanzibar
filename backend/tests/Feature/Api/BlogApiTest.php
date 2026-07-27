<?php

namespace Tests\Feature\Api;

use App\Models\BlogPost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_only_published_posts(): void
    {
        BlogPost::factory()->count(2)->create();
        BlogPost::factory()->unpublished()->create();

        $response = $this->getJson('/api/v1/blog');

        $response->assertOk();
        $this->assertCount(2, $response->json('data'));
    }

    public function test_it_shows_a_published_post_with_faqs(): void
    {
        $post = BlogPost::factory()->create([
            'faqs' => [['question' => 'Frage?', 'answer' => 'Antwort.']],
        ]);

        $response = $this->getJson("/api/v1/blog/{$post->slug}");

        $response->assertOk()
            ->assertJsonPath('data.slug', $post->slug)
            ->assertJsonPath('data.faqs.0.question', 'Frage?');
    }

    public function test_it_returns_404_for_unpublished_post(): void
    {
        $post = BlogPost::factory()->unpublished()->create();

        $this->getJson("/api/v1/blog/{$post->slug}")->assertNotFound();
    }
}
