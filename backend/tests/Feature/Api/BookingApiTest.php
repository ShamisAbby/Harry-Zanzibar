<?php

namespace Tests\Feature\Api;

use App\Mail\BookingConfirmedMail;
use App\Mail\BookingReceivedAdminMail;
use App\Mail\BookingReceivedMail;
use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class BookingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_booking_and_sends_emails(): void
    {
        Mail::fake();
        $tour = Tour::factory()->create();

        $response = $this->postJson('/api/v1/bookings', [
            'tour_id' => $tour->id,
            'customer_name' => 'Anna Schmidt',
            'customer_email' => 'anna@example.com',
            'travelers_count' => 2,
        ]);

        $response->assertCreated()->assertJsonStructure(['message', 'reference']);

        $this->assertDatabaseHas('bookings', [
            'customer_email' => 'anna@example.com',
            'status' => 'pending',
        ]);

        Mail::assertQueued(BookingReceivedMail::class);
        Mail::assertQueued(BookingReceivedAdminMail::class);
    }

    public function test_it_generates_a_unique_reference(): void
    {
        Mail::fake();

        $first = Booking::factory()->create();
        $second = Booking::factory()->create();

        $this->assertNotSame($first->reference, $second->reference);
        $this->assertStringStartsWith('HZ-', $first->reference);
    }

    public function test_it_validates_required_fields(): void
    {
        $response = $this->postJson('/api/v1/bookings', []);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['customer_name', 'customer_email']);
    }

    public function test_it_rejects_a_past_preferred_date(): void
    {
        $response = $this->postJson('/api/v1/bookings', [
            'customer_name' => 'Anna Schmidt',
            'customer_email' => 'anna@example.com',
            'preferred_date' => now()->subDay()->toDateString(),
        ]);

        $response->assertUnprocessable()->assertJsonValidationErrors(['preferred_date']);
    }

    public function test_confirming_a_booking_sends_confirmation_email(): void
    {
        Mail::fake();
        $booking = Booking::factory()->create(['status' => 'pending']);

        $booking->update(['status' => 'confirmed']);

        Mail::assertQueued(BookingConfirmedMail::class);
    }

    public function test_it_looks_up_a_booking_by_reference(): void
    {
        $booking = Booking::factory()->create();

        $response = $this->getJson("/api/v1/bookings/{$booking->reference}");

        $response->assertOk()
            ->assertJsonPath('data.reference', $booking->reference)
            ->assertJsonMissing(['customer_email' => $booking->customer_email]);
    }

    public function test_it_returns_404_for_unknown_reference(): void
    {
        $this->getJson('/api/v1/bookings/HZ-0000-NOPE')->assertNotFound();
    }
}
