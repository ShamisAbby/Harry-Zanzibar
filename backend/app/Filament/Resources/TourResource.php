<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TourResource\Pages;
use App\Filament\Resources\TourResource\RelationManagers\ReviewsRelationManager;
use App\Models\Tour;
use App\Models\TourCategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Support\Enums\FontWeight;
use Filament\Forms\Get;

class TourResource extends Resource
{
    protected static ?string $model = Tour::class;

    protected static ?string $navigationIcon = 'heroicon-o-map';

    protected static ?string $navigationGroup = 'Tours & Bookings';

    protected static ?string $navigationLabel = 'Touren';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Tabs::make('Tour')
                ->columnSpanFull()
                ->tabs([
                    Tab::make('Inhalt')
                        ->schema([
                            Forms\Components\Select::make('tour_category_id')
                                ->label('Kategorie')
                                ->options(fn () => TourCategory::orderBy('order')->pluck('name', 'id'))
                                ->searchable()
                                ->required(),
                            Forms\Components\TextInput::make('title')
                                ->label('Titel')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => $set('slug', \Illuminate\Support\Str::slug($state))),
                            Forms\Components\TextInput::make('slug')
                                ->required()
                                ->maxLength(255)
                                ->unique(ignoreRecord: true),
                            Forms\Components\Textarea::make('excerpt')
                                ->label('Kurzbeschreibung')
                                ->required()
                                ->rows(2)
                                ->maxLength(255)
                                ->columnSpanFull(),
                            Forms\Components\RichEditor::make('description')
                                ->label('Beschreibung')
                                ->required()
                                ->columnSpanFull(),
                            Forms\Components\TagsInput::make('highlights')
                                ->label('Highlights')
                                ->placeholder('Highlight hinzufügen und Enter drücken')
                                ->columnSpanFull(),
                            Forms\Components\TagsInput::make('included')
                                ->label('Inklusive'),
                            Forms\Components\TagsInput::make('excluded')
                                ->label('Exklusive'),
                            Forms\Components\Repeater::make('faqs')
                                ->label('Häufige Fragen zu dieser Tour')
                                ->schema([
                                    Forms\Components\TextInput::make('question')->label('Frage')->required(),
                                    Forms\Components\Textarea::make('answer')->label('Antwort')->required()->rows(2),
                                ])
                                ->columns(1)
                                ->collapsed()
                                ->itemLabel(fn (array $state): ?string => $state['question'] ?? null)
                                ->columnSpanFull(),
                        ]),
                    Tab::make('Preis & Verfügbarkeit')
                        ->schema([
                            Forms\Components\TextInput::make('duration_label')
                                ->label('Dauer (Anzeige)')
                                ->placeholder('z.B. Ganztägig, 5 Tage')
                                ->required(),
                            Forms\Components\TextInput::make('duration_days')
                                ->label('Dauer in Tagen')
                                ->numeric(),
                            Forms\Components\TextInput::make('price_from')
                                ->label('Preis ab')
                                ->numeric()
                                ->prefix('€')
                                ->required(),
                            Forms\Components\Select::make('currency')
                                ->options(['EUR' => 'EUR', 'USD' => 'USD'])
                                ->default('EUR')
                                ->required(),
                            Forms\Components\CheckboxList::make('available_days')
                                ->label('Verfügbare Tage')
                                ->options([
                                    'mon' => 'Montag', 'tue' => 'Dienstag', 'wed' => 'Mittwoch',
                                    'thu' => 'Donnerstag', 'fri' => 'Freitag', 'sat' => 'Samstag', 'sun' => 'Sonntag',
                                ])
                                ->columns(4)
                                ->columnSpanFull(),
                            Forms\Components\TextInput::make('availability_note')
                                ->label('Verfügbarkeitshinweis')
                                ->columnSpanFull(),
                        ])->columns(2),
                    Tab::make('Ort & Karte')
                        ->schema([
                            Forms\Components\TextInput::make('location_name')
                                ->label('Ortsname'),
                            Forms\Components\TextInput::make('latitude')->numeric(),
                            Forms\Components\TextInput::make('longitude')->numeric(),
                        ])->columns(3),
                    Tab::make('Medien')
                        ->schema([
                            \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('gallery')
                                ->collection('gallery')
                                ->image()
                                ->multiple()
                                ->reorderable()
                                ->maxFiles(20)
                                ->columnSpanFull(),
                            \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('videos')
                                ->collection('videos')
                                ->acceptedFileTypes(['video/mp4', 'video/quicktime'])
                                ->multiple()
                                ->columnSpanFull(),
                        ]),
                    Tab::make('SEO & Status')
                        ->schema([
                            Forms\Components\Toggle::make('is_featured')->label('Featured'),
                            Forms\Components\Toggle::make('is_active')->label('Aktiv')->default(true),
                            Forms\Components\TextInput::make('order')->numeric()->default(0),
                            Forms\Components\TextInput::make('meta_title')->label('Meta-Titel')->columnSpanFull(),
                            Forms\Components\Textarea::make('meta_description')->label('Meta-Beschreibung')->rows(2)->columnSpanFull(),
                        ])->columns(3),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\SpatieMediaLibraryImageColumn::make('gallery')
                    ->collection('gallery')
                    ->conversion('thumb')
                    ->label(''),
                Tables\Columns\TextColumn::make('title')
                    ->weight(FontWeight::SemiBold)
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Kategorie')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price_from')
                    ->label('Preis ab')
                    ->money('EUR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('rating_cache')
                    ->label('Bewertung')
                    ->formatStateUsing(fn ($state, $record) => "{$state} ({$record->review_count_cache})")
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktiv')
                    ->boolean(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime('d.m.Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('order')
            ->reorderable('order')
            ->filters([
                Tables\Filters\SelectFilter::make('tour_category_id')
                    ->label('Kategorie')
                    ->relationship('category', 'name'),
                Tables\Filters\TernaryFilter::make('is_featured')->label('Featured'),
                Tables\Filters\TernaryFilter::make('is_active')->label('Aktiv'),
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
            ReviewsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTours::route('/'),
            'create' => Pages\CreateTour::route('/create'),
            'edit' => Pages\EditTour::route('/{record}/edit'),
        ];
    }
}
