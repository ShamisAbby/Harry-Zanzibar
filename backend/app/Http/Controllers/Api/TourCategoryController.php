<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourCategoryResource;
use App\Models\TourCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class TourCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $payload = Cache::remember('tour-categories:index', 300, function () {
            $categories = TourCategory::query()
                ->withCount('tours')
                ->orderBy('order')
                ->get();

            return ['data' => TourCategoryResource::collection($categories)->resolve()];
        });

        return response()->json($payload);
    }
}
