<?php

namespace App\Filament\Resources\ActivityLogResource\Pages;

use App\Filament\Resources\ActivityLogResource;
use Filament\Infolists\Components\KeyValueEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Pages\ViewRecord;

class ViewActivityLog extends ViewRecord
{
    protected static string $resource = ActivityLogResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist->schema([
            TextEntry::make('created_at')->label('Zeitpunkt')->dateTime('d.m.Y H:i:s'),
            TextEntry::make('causer.name')->label('Benutzer')->default('System'),
            TextEntry::make('description')->label('Aktion'),
            TextEntry::make('subject_type')->label('Modell')->formatStateUsing(fn (?string $state) => $state ? class_basename($state) : '—'),
            TextEntry::make('subject_id')->label('Datensatz-ID'),
            KeyValueEntry::make('attribute_changes.attributes')->label('Neue Werte'),
            KeyValueEntry::make('attribute_changes.old')->label('Vorherige Werte'),
        ]);
    }
}
