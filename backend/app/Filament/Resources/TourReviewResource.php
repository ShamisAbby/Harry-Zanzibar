<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TourReviewResource\Pages;
use App\Filament\Resources\TourReviewResource\RelationManagers;
use App\Models\TourReview;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TourReviewResource extends Resource
{
    protected static ?string $model = TourReview::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    protected static ?string $navigationGroup = 'Tours & Bookings';

    protected static ?string $navigationLabel = 'Bewertungen';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('tour_id')
                    ->relationship('tour', 'title')
                    ->searchable()
                    ->required(),
                Forms\Components\TextInput::make('author_name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('author_origin')
                    ->label('Herkunft')
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\Select::make('rating')
                    ->options(['1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5'])
                    ->required(),
                Forms\Components\Textarea::make('comment')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Select::make('source')
                    ->options(['website' => 'Website', 'google' => 'Google', 'tripadvisor' => 'TripAdvisor'])
                    ->default('website')
                    ->required(),
                Forms\Components\Toggle::make('is_approved')
                    ->label('Freigegeben'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tour.title')
                    ->label('Tour')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('author_name')
                    ->label('Name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('author_origin')
                    ->label('Herkunft')
                    ->searchable(),
                Tables\Columns\TextColumn::make('rating')
                    ->label('Bewertung')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('source')->badge(),
                Tables\Columns\IconColumn::make('is_approved')
                    ->label('Freigegeben')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Erstellt')
                    ->dateTime('d.m.Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_approved')->label('Freigegeben'),
                Tables\Filters\SelectFilter::make('tour_id')->relationship('tour', 'title')->label('Tour'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('approve')
                        ->label('Freigeben')
                        ->icon('heroicon-o-check')
                        ->action(fn ($records) => $records->each->update(['is_approved' => true])),
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
            'index' => Pages\ListTourReviews::route('/'),
            'create' => Pages\CreateTourReview::route('/create'),
            'edit' => Pages\EditTourReview::route('/{record}/edit'),
        ];
    }
}
