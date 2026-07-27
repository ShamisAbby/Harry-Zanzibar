<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Tour extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, LogsActivity, SoftDeletes;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['title', 'price_from', 'is_active', 'is_featured', 'tour_category_id'])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

    protected $fillable = [
        'tour_category_id',
        'title',
        'slug',
        'excerpt',
        'description',
        'duration_label',
        'duration_days',
        'price_from',
        'currency',
        'highlights',
        'included',
        'excluded',
        'faqs',
        'available_days',
        'availability_note',
        'location_name',
        'latitude',
        'longitude',
        'is_featured',
        'is_active',
        'order',
        'meta_title',
        'meta_description',
    ];

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'included' => 'array',
            'excluded' => 'array',
            'faqs' => 'array',
            'available_days' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'price_from' => 'decimal:2',
            'rating_cache' => 'decimal:1',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('gallery')->useFallbackUrl('');
        $this->addMediaCollection('videos')->useFallbackUrl('');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(400)
            ->height(300)
            ->nonQueued();

        $this->addMediaConversion('large')
            ->width(1600)
            ->nonQueued();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(TourCategory::class, 'tour_category_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(TourReview::class);
    }

    public function approvedReviews(): HasMany
    {
        return $this->reviews()->where('is_approved', true)->latest();
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('is_featured', true);
    }

    public function refreshRatingCache(): void
    {
        $approved = $this->approvedReviews()->get();

        $this->update([
            'rating_cache' => $approved->count() ? round($approved->avg('rating'), 1) : 0,
            'review_count_cache' => $approved->count(),
        ]);
    }
}
