<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMessageReceivedMail;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contactMessage = ContactMessage::create($validated);

        $adminEmail = config('mail.admin_notification_address');
        if ($adminEmail) {
            Mail::to($adminEmail)->send(new ContactMessageReceivedMail($contactMessage));
        }

        return response()->json([
            'message' => 'Vielen Dank für Ihre Nachricht! Wir melden uns so schnell wie möglich bei Ihnen.',
        ], 201);
    }
}
