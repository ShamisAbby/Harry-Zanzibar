<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourDetailResource extends JsonResource
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
            'description' => $this->description,
            'category' => $this->category?->type,
            'categoryName' => $this->category?->name,
            'categorySlug' => $this->category?->slug,
            'durationLabel' => $this->duration_label,
            'durationDays' => $this->duration_days,
            'priceFrom' => (float) $this->price_from,
            'currency' => $this->currency,
            'rating' => (float) $this->rating_cache,
            'reviewCount' => $this->review_count_cache,
            'highlights' => $this->highlights ?? [],
            'included' => $this->included ?? [],
            'excluded' => $this->excluded ?? [],
            'faqs' => $this->faqs ?? [],
            'availableDays' => $this->available_days ?? [],
            'availabilityNote' => $this->availability_note,
            'location' => [
                'name' => $this->location_name,
                'latitude' => $this->latitude ? (float) $this->latitude : null,
                'longitude' => $this->longitude ? (float) $this->longitude : null,
            ],
            'gallery' => $this->getMedia('gallery')->map(fn ($media) => [
                'url' => $media->getUrl(),
                'thumbUrl' => $media->getUrl('thumb'),
                'label' => $media->name,
            ])->values(),
            'videos' => $this->getMedia('videos')->map(fn ($media) => [
                'url' => $media->getUrl(),
                'label' => $media->name,
            ])->values(),
            'reviews' => TourReviewResource::collection($this->whenLoaded('approvedReviews')),
            'relatedTours' => TourSummaryResource::collection($this->relatedTours ?? collect()),
        ];
    }
}
