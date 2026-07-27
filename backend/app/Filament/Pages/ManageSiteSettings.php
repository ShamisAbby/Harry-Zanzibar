<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Cache;

class ManageSiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $navigationLabel = 'Website-Einstellungen';

    protected static ?string $title = 'Website-Einstellungen';

    protected static string $view = 'filament.pages.manage-site-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(SiteSetting::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Analytics & Tracking')
                    ->description('IDs werden nur geladen, wenn Besucher der jeweiligen Cookie-Kategorie zugestimmt haben.')
                    ->schema([
                        Forms\Components\TextInput::make('ga4_id')->label('Google Analytics 4 ID')->placeholder('G-XXXXXXXXXX'),
                        Forms\Components\TextInput::make('gtm_id')->label('Google Tag Manager ID')->placeholder('GTM-XXXXXXX'),
                        Forms\Components\TextInput::make('google_ads_id')->label('Google Ads ID')->placeholder('AW-XXXXXXXXX'),
                        Forms\Components\TextInput::make('meta_pixel_id')->label('Meta Pixel ID'),
                        Forms\Components\TextInput::make('ms_clarity_id')->label('Microsoft Clarity ID'),
                        Forms\Components\TextInput::make('tiktok_pixel_id')->label('TikTok Pixel ID'),
                        Forms\Components\TextInput::make('pinterest_tag_id')->label('Pinterest Tag ID'),
                    ])->columns(2),
                Forms\Components\Section::make('Suchmaschinen-Verifizierung')
                    ->schema([
                        Forms\Components\TextInput::make('google_site_verification')->label('Google Search Console Verifizierungscode'),
                        Forms\Components\TextInput::make('bing_webmaster_id')->label('Bing Webmaster Verifizierungscode'),
                    ])->columns(2),
                Forms\Components\Section::make('Allgemein')
                    ->schema([
                        Forms\Components\TextInput::make('whatsapp_number')->label('WhatsApp-Nummer')->placeholder('255700000000'),
                        Forms\Components\Toggle::make('maintenance_mode')->label('Wartungsmodus aktivieren'),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();
        SiteSetting::current()->update($data);
        Cache::forget('site-settings:public');

        Notification::make()
            ->title('Einstellungen gespeichert')
            ->success()
            ->send();
    }
}
