<?php

namespace App\Filament\Resources\TourResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ReviewsRelationManager extends RelationManager
{
    protected static string $relationship = 'reviews';

    protected static ?string $title = 'Bewertungen';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('author_name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('author_origin')
                    ->label('Herkunft')
                    ->maxLength(255),
                Forms\Components\Select::make('rating')
                    ->options(['1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5'])
                    ->required(),
                Forms\Components\Select::make('source')
                    ->options(['website' => 'Website', 'google' => 'Google', 'tripadvisor' => 'TripAdvisor'])
                    ->default('website')
                    ->required(),
                Forms\Components\Textarea::make('comment')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_approved')
                    ->label('Freigegeben'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('author_name')
            ->columns([
                Tables\Columns\TextColumn::make('author_name')->label('Name'),
                Tables\Columns\TextColumn::make('rating')->label('Bewertung')->badge(),
                Tables\Columns\TextColumn::make('comment')->limit(50),
                Tables\Columns\TextColumn::make('source')->badge(),
                Tables\Columns\IconColumn::make('is_approved')->label('Freigegeben')->boolean(),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d.m.Y')->label('Erstellt'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_approved')->label('Freigegeben'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
