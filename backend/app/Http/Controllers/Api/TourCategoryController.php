<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourCategoryResource;
use App\Models\TourCategory;
use Illuminate\Http\JsonResponse;

class TourCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = TourCategory::query()
            ->withCount('tours')
            ->orderBy('order')
            ->get();

        return response()->json([
            'data' => TourCategoryResource::collection($categories),
        ]);
    }
}
