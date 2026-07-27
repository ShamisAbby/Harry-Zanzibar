<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('ga4_id')->nullable();
            $table->string('gtm_id')->nullable();
            $table->string('google_ads_id')->nullable();
            $table->string('meta_pixel_id')->nullable();
            $table->string('ms_clarity_id')->nullable();
            $table->string('bing_webmaster_id')->nullable();
            $table->string('tiktok_pixel_id')->nullable();
            $table->string('pinterest_tag_id')->nullable();
            $table->string('google_site_verification')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->boolean('maintenance_mode')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
