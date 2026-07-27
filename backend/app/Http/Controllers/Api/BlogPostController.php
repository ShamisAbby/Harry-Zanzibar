<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostDetailResource;
use App\Http\Resources\BlogPostSummaryResource;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BlogPostController extends Controller
{
    private const CACHE_SECONDS = 120;

    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $page = (int) $request->get('page', 1);
        $cacheKey = 'blog:index:' . md5(json_encode([$validated, $page]));

        $payload = Cache::remember($cacheKey, self::CACHE_SECONDS, function () use ($validated) {
            $posts = BlogPost::query()
                ->published()
                ->with('category')
                ->when($validated['q'] ?? null, fn ($q, $term) => $q->where(function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%")->orWhere('excerpt', 'like', "%{$term}%");
                }))
                ->when($validated['category'] ?? null, fn ($q, $slug) => $q->whereHas('category', fn ($q) => $q->where('slug', $slug)))
                ->orderByDesc('published_at')
                ->paginate($validated['per_page'] ?? 9);

            return [
                'data' => BlogPostSummaryResource::collection($posts->items())->resolve(),
                'meta' => [
                    'currentPage' => $posts->currentPage(),
                    'lastPage' => $posts->lastPage(),
                    'total' => $posts->total(),
                    'perPage' => $posts->perPage(),
                ],
            ];
        });

        return response()->json($payload);
    }

    public function show(string $slug): JsonResponse
    {
        $payload = Cache::remember("blog:show:{$slug}", self::CACHE_SECONDS, function () use ($slug) {
            $post = BlogPost::query()
                ->published()
                ->with('category')
                ->where('slug', $slug)
                ->firstOrFail();

            $post->setAttribute(
                'relatedPosts',
                BlogPost::query()
                    ->published()
                    ->with('category')
                    ->where('id', '!=', $post->id)
                    ->when($post->blog_category_id, fn ($q) => $q->where('blog_category_id', $post->blog_category_id))
                    ->orderByDesc('published_at')
                    ->limit(3)
                    ->get()
            );

            return ['data' => (new BlogPostDetailResource($post))->resolve()];
        });

        return response()->json($payload);
    }
}
