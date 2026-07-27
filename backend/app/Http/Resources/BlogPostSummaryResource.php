<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostSummaryResource extends JsonResource
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
            'category' => $this->category?->name,
            'categorySlug' => $this->category?->slug,
            'readingMinutes' => $this->reading_minutes,
            'publishedAt' => $this->published_at?->toIso8601String(),
            'image' => $this->getFirstMediaUrl('featured', 'card') ?: null,
            'imageLabel' => $this->getFirstMedia('featured')?->name ?? $this->title,
        ];
    }
}
