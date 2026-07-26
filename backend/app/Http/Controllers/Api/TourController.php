<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourDetailResource;
use App\Http\Resources\TourSummaryResource;
use App\Models\Tour;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TourController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string'],
            'type' => ['nullable', 'in:day-trip,multi-day'],
            'price_min' => ['nullable', 'numeric', 'min:0'],
            'price_max' => ['nullable', 'numeric', 'min:0'],
            'rating_min' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'featured' => ['nullable', 'boolean'],
            'sort' => ['nullable', 'in:featured,price_asc,price_desc,rating_desc'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $query = Tour::query()
            ->active()
            ->with('category')
            ->when($validated['q'] ?? null, function ($q, $term) {
                $q->where(function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%")
                        ->orWhere('excerpt', 'like', "%{$term}%")
                        ->orWhere('location_name', 'like', "%{$term}%");
                });
            })
            ->when($validated['category'] ?? null, fn ($q, $slug) => $q->whereHas('category', fn ($q) => $q->where('slug', $slug)))
            ->when($validated['type'] ?? null, fn ($q, $type) => $q->whereHas('category', fn ($q) => $q->where('type', $type)))
            ->when($validated['price_min'] ?? null, fn ($q, $min) => $q->where('price_from', '>=', $min))
            ->when($validated['price_max'] ?? null, fn ($q, $max) => $q->where('price_from', '<=', $max))
            ->when($validated['rating_min'] ?? null, fn ($q, $min) => $q->where('rating_cache', '>=', $min))
            ->when($validated['featured'] ?? null, fn ($q) => $q->featured());

        $query = match ($validated['sort'] ?? 'featured') {
            'price_asc' => $query->orderBy('price_from'),
            'price_desc' => $query->orderByDesc('price_from'),
            'rating_desc' => $query->orderByDesc('rating_cache'),
            default => $query->orderByDesc('is_featured')->orderBy('order'),
        };

        $tours = $query->paginate($validated['per_page'] ?? 12);

        return response()->json([
            'data' => TourSummaryResource::collection($tours->items()),
            'meta' => [
                'currentPage' => $tours->currentPage(),
                'lastPage' => $tours->lastPage(),
                'total' => $tours->total(),
                'perPage' => $tours->perPage(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $tour = Tour::query()
            ->active()
            ->with(['category', 'approvedReviews'])
            ->where('slug', $slug)
            ->firstOrFail();

        $tour->setAttribute(
            'relatedTours',
            Tour::query()
                ->active()
                ->with('category')
                ->where('tour_category_id', $tour->tour_category_id)
                ->where('id', '!=', $tour->id)
                ->orderByDesc('is_featured')
                ->limit(3)
                ->get()
        );

        return response()->json([
            'data' => new TourDetailResource($tour),
        ]);
    }
}
