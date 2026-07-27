<?php

namespace Tests\Feature\Api;

use App\Mail\ContactMessageReceivedMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactAndNewsletterApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_a_contact_message_and_notifies_admin(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/contact', [
            'name' => 'Julia Hoffmann',
            'email' => 'julia@example.com',
            'message' => 'Ich interessiere mich für eine Sansibar Tour im Oktober.',
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas('contact_messages', ['email' => 'julia@example.com']);
        Mail::assertQueued(ContactMessageReceivedMail::class);
    }

    public function test_contact_message_requires_a_message(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'name' => 'Julia Hoffmann',
            'email' => 'julia@example.com',
        ]);

        $response->assertUnprocessable()->assertJsonValidationErrors(['message']);
    }

    public function test_it_subscribes_to_the_newsletter(): void
    {
        $response = $this->postJson('/api/v1/newsletter', [
            'email' => 'reader@example.com',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('newsletter_subscribers', ['email' => 'reader@example.com']);
    }

    public function test_resubscribing_updates_the_existing_record_instead_of_duplicating(): void
    {
        $this->postJson('/api/v1/newsletter', ['email' => 'reader@example.com'])->assertCreated();
        $this->postJson('/api/v1/newsletter', ['email' => 'reader@example.com'])->assertCreated();

        $this->assertDatabaseCount('newsletter_subscribers', 1);
    }

    public function test_newsletter_requires_a_valid_email(): void
    {
        $this->postJson('/api/v1/newsletter', ['email' => 'not-an-email'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }
}
