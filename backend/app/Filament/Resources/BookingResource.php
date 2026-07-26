<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Tours & Bookings';

    protected static ?string $navigationLabel = 'Buchungen';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('reference')
                    ->label('Referenz')
                    ->disabled()
                    ->dehydrated()
                    ->maxLength(255),
                Forms\Components\Select::make('tour_id')
                    ->label('Tour')
                    ->relationship('tour', 'title')
                    ->searchable()
                    ->default(null),
                Forms\Components\TextInput::make('customer_name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('customer_email')
                    ->label('E-Mail')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('customer_phone')
                    ->label('Telefon')
                    ->tel()
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\DatePicker::make('preferred_date')
                    ->label('Wunschdatum'),
                Forms\Components\TextInput::make('travelers_count')
                    ->label('Personen')
                    ->numeric()
                    ->default(null),
                Forms\Components\Textarea::make('message')
                    ->label('Nachricht')
                    ->columnSpanFull(),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Ausstehend',
                        'confirmed' => 'Bestätigt',
                        'cancelled' => 'Storniert',
                        'completed' => 'Abgeschlossen',
                    ])
                    ->required(),
                Forms\Components\Select::make('source')
                    ->options([
                        'website' => 'Website',
                        'whatsapp' => 'WhatsApp',
                        'phone' => 'Telefon',
                        'email' => 'E-Mail',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('coupon_code')
                    ->label('Gutscheincode')
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\TextInput::make('total_price')
                    ->label('Gesamtpreis')
                    ->numeric()
                    ->prefix('€')
                    ->default(null),
                Forms\Components\Textarea::make('admin_notes')
                    ->label('Interne Notizen')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')
                    ->label('Referenz')
                    ->searchable()
                    ->weight('semibold'),
                Tables\Columns\TextColumn::make('tour.title')
                    ->label('Tour')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('customer_name')
                    ->label('Kunde')
                    ->searchable(),
                Tables\Columns\TextColumn::make('customer_email')
                    ->label('E-Mail')
                    ->searchable(),
                Tables\Columns\TextColumn::make('preferred_date')
                    ->label('Wunschdatum')
                    ->date('d.m.Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('travelers_count')
                    ->label('Personen')
                    ->numeric(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'confirmed' => 'success',
                        'cancelled' => 'danger',
                        'completed' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'Ausstehend',
                        'confirmed' => 'Bestätigt',
                        'cancelled' => 'Storniert',
                        'completed' => 'Abgeschlossen',
                        default => $state,
                    }),
                Tables\Columns\TextColumn::make('source')
                    ->label('Quelle')
                    ->badge(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Eingegangen')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Ausstehend',
                        'confirmed' => 'Bestätigt',
                        'cancelled' => 'Storniert',
                        'completed' => 'Abgeschlossen',
                    ]),
                Tables\Filters\SelectFilter::make('tour_id')
                    ->label('Tour')
                    ->relationship('tour', 'title'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
