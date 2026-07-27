<?php

use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\TourCategoryController;
use App\Http\Controllers\Api\TourController;
use App\Http\Controllers\Api\TourReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Public, versioned REST API consumed by the Next.js frontend. Tour,
| booking, blog, and CMS-content endpoints are added here phase by phase.
|
*/

Route::get('/v1/ping', function (Request $request) {
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
        'time' => now()->toIso8601String(),
    ]);
});

Route::post('/v1/newsletter', [NewsletterController::class, 'store'])
    ->middleware('throttle:6,1');

Route::get('/v1/tours', [TourController::class, 'index']);
Route::get('/v1/tours/{slug}', [TourController::class, 'show']);
Route::get('/v1/tour-categories', [TourCategoryController::class, 'index']);

Route::post('/v1/bookings', [BookingController::class, 'store'])
    ->middleware('throttle:10,1');

Route::get('/v1/bookings/{reference}', [BookingController::class, 'show'])
    ->middleware('throttle:20,1');

Route::get('/v1/blog', [BlogPostController::class, 'index']);
Route::get('/v1/blog/{slug}', [BlogPostController::class, 'show']);

Route::post('/v1/contact', [ContactMessageController::class, 'store'])
    ->middleware('throttle:6,1');

Route::get('/v1/reviews', [TourReviewController::class, 'index']);
