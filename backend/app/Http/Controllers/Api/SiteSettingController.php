<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class SiteSettingController extends Controller
{
    /**
     * Only publicly-safe fields (no admin-only config) are exposed here.
     */
    public function analytics(): JsonResponse
    {
        $payload = Cache::remember('site-settings:public', 300, function () {
            $settings = SiteSetting::current();

            return [
                'data' => [
                    'ga4Id' => $settings->ga4_id,
                    'gtmId' => $settings->gtm_id,
                    'googleAdsId' => $settings->google_ads_id,
                    'metaPixelId' => $settings->meta_pixel_id,
                    'msClarityId' => $settings->ms_clarity_id,
                    'tiktokPixelId' => $settings->tiktok_pixel_id,
                    'pinterestTagId' => $settings->pinterest_tag_id,
                    'googleSiteVerification' => $settings->google_site_verification,
                    'whatsappNumber' => $settings->whatsapp_number,
                    'maintenanceMode' => $settings->maintenance_mode,
                ],
            ];
        });

        return response()->json($payload);
    }
}
