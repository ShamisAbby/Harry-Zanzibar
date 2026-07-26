<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingStatusResource;
use App\Mail\BookingReceivedAdminMail;
use App\Mail\BookingReceivedMail;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        Mail::to($booking->customer_email)->send(new BookingReceivedMail($booking));

        $adminEmail = config('mail.admin_notification_address');
        if ($adminEmail) {
            Mail::to($adminEmail)->send(new BookingReceivedAdminMail($booking));
        }

        return response()->json([
            'message' => 'Vielen Dank für Ihre Anfrage! Harry meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.',
            'reference' => $booking->reference,
        ], 201);
    }

    public function show(string $reference): JsonResponse
    {
        $booking = Booking::with('tour')
            ->where('reference', $reference)
            ->firstOrFail();

        return response()->json([
            'data' => new BookingStatusResource($booking),
        ]);
    }
}
