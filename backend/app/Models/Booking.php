<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Booking extends Model
{
    protected $fillable = [
        'reference',
        'tour_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'preferred_date',
        'travelers_count',
        'message',
        'status',
        'source',
        'coupon_code',
        'total_price',
        'admin_notes',
    ];

    protected function casts(): array
    {
        return [
            'preferred_date' => 'date',
            'total_price' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $booking) {
            $booking->reference ??= 'HZ-' . now()->format('Y') . '-' . strtoupper(Str::random(6));
        });
    }

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
