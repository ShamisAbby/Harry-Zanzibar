<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Activitylog\Models\Concerns\LogsActivity;

class TourReview extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['is_approved'])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

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
