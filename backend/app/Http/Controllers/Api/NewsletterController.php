<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        $subscriber = NewsletterSubscriber::firstOrNew(['email' => $validated['email']]);

        $subscriber->fill([
            'name' => $validated['name'] ?? $subscriber->name,
            'locale' => 'de',
            'subscribed_at' => now(),
            'unsubscribed_at' => null,
        ])->save();

        return response()->json([
            'message' => 'Vielen Dank! Sie erhalten künftig unsere besten Sansibar-Tipps direkt per E-Mail.',
        ], 201);
    }
}
