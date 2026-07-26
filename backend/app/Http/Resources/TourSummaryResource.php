<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourSummaryResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'category' => $this->category?->type,
            'categoryName' => $this->category?->name,
            'durationLabel' => $this->duration_label,
            'priceFrom' => (float) $this->price_from,
            'currency' => $this->currency,
            'rating' => (float) $this->rating_cache,
            'reviewCount' => $this->review_count_cache,
            'image' => $this->getFirstMediaUrl('gallery', 'thumb') ?: null,
            'imageLabel' => $this->getFirstMedia('gallery')?->name ?? $this->title,
            'highlights' => $this->highlights ?? [],
        ];
    }
}
