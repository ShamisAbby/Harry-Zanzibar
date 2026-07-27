<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'ga4_id',
        'gtm_id',
        'google_ads_id',
        'meta_pixel_id',
        'ms_clarity_id',
        'bing_webmaster_id',
        'tiktok_pixel_id',
        'pinterest_tag_id',
        'google_site_verification',
        'whatsapp_number',
        'maintenance_mode',
    ];

    protected function casts(): array
    {
        return [
            'maintenance_mode' => 'boolean',
        ];
    }

    /** This is a singleton settings table: always work with the one row. */
    public static function current(): self
    {
        return static::query()->firstOrCreate([]);
    }
}
