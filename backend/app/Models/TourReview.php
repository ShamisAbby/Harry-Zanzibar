<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourReview extends Model
{
    protected $fillable = [
        'tour_id',
        'author_name',
        'author_origin',
        'rating',
        'comment',
        'source',
        'is_approved',
    ];

    protected function casts(): array
    {
        return [
            'is_approved' => 'boolean',
            'rating' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saved(fn (self $review) => $review->tour?->refreshRatingCache());
        static::deleted(fn (self $review) => $review->tour?->refreshRatingCache());
    }

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
