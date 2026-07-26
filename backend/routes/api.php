<?php

use App\Http\Controllers\Api\NewsletterController;
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
