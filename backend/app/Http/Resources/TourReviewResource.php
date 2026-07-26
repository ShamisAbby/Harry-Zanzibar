<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourReviewResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->author_name,
            'origin' => $this->author_origin,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'source' => $this->source,
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
