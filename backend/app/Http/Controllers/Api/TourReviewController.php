<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TourReviewController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $reviews = TourReview::query()
            ->where('is_approved', true)
            ->with('tour:id,title,slug')
            ->latest()
            ->paginate($validated['per_page'] ?? 20);

        return response()->json([
            'data' => $reviews->getCollection()->map(fn (TourReview $review) => [
                'id' => (string) $review->id,
                'name' => $review->author_name,
                'origin' => $review->author_origin,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'source' => $review->source,
                'tourTitle' => $review->tour?->title,
                'tourSlug' => $review->tour?->slug,
                'createdAt' => $review->created_at?->toIso8601String(),
            ]),
            'meta' => [
                'currentPage' => $reviews->currentPage(),
                'lastPage' => $reviews->lastPage(),
                'total' => $reviews->total(),
            ],
        ]);
    }
}
