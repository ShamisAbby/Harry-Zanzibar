<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostDetailResource extends JsonResource
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
            'content' => $this->content,
            'category' => $this->category?->name,
            'categorySlug' => $this->category?->slug,
            'faqs' => $this->faqs ?? [],
            'readingMinutes' => $this->reading_minutes,
            'publishedAt' => $this->published_at?->toIso8601String(),
            'metaTitle' => $this->meta_title,
            'metaDescription' => $this->meta_description,
            'image' => $this->getFirstMediaUrl('featured', 'card') ?: null,
            'imageLabel' => $this->getFirstMedia('featured')?->name ?? $this->title,
            'relatedPosts' => BlogPostSummaryResource::collection($this->relatedPosts ?? collect()),
        ];
    }
}
