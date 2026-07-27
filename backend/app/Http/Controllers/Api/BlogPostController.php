<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostDetailResource;
use App\Http\Resources\BlogPostSummaryResource;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $posts = BlogPost::query()
            ->published()
            ->with('category')
            ->when($validated['q'] ?? null, fn ($q, $term) => $q->where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")->orWhere('excerpt', 'like', "%{$term}%");
            }))
            ->when($validated['category'] ?? null, fn ($q, $slug) => $q->whereHas('category', fn ($q) => $q->where('slug', $slug)))
            ->orderByDesc('published_at')
            ->paginate($validated['per_page'] ?? 9);

        return response()->json([
            'data' => BlogPostSummaryResource::collection($posts->items()),
            'meta' => [
                'currentPage' => $posts->currentPage(),
                'lastPage' => $posts->lastPage(),
                'total' => $posts->total(),
                'perPage' => $posts->perPage(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
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

        return response()->json([
            'data' => new BlogPostDetailResource($post),
        ]);
    }
}
