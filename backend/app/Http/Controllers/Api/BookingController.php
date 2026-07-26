<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tour_id' => ['nullable', 'exists:tours,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:50'],
            'preferred_date' => ['nullable', 'date', 'after_or_equal:today'],
            'travelers_count' => ['nullable', 'integer', 'min:1', 'max:50'],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        $booking = Booking::create([
            ...$validated,
            'status' => 'pending',
            'source' => 'website',
        ]);

        return response()->json([
            'message' => 'Vielen Dank für Ihre Anfrage! Harry meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.',
            'reference' => $booking->reference,
        ], 201);
    }
}
