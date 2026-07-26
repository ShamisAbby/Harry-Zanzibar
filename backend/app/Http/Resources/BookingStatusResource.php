<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingStatusResource extends JsonResource
{
    /**
     * Public, reference-scoped view of a booking. Deliberately excludes
     * email/phone/admin_notes even though the record itself has them.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reference' => $this->reference,
            'status' => $this->status,
            'customerName' => $this->customer_name,
            'tourTitle' => $this->tour?->title,
            'tourSlug' => $this->tour?->slug,
            'preferredDate' => $this->preferred_date?->toDateString(),
            'travelersCount' => $this->travelers_count,
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
