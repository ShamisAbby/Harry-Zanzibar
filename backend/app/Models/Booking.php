<?php

namespace App\Models;

use App\Mail\BookingConfirmedMail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Activitylog\Models\Concerns\LogsActivity;

class Booking extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['status', 'total_price', 'admin_notes'])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

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

        static::updated(function (self $booking) {
            if ($booking->wasChanged('status') && $booking->status === 'confirmed') {
                Mail::to($booking->customer_email)->send(new BookingConfirmedMail($booking));
            }
        });
    }

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
