<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Support\Enums\FontWeight;
use Filament\Tables;
use Filament\Tables\Table;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Content';

    protected static ?string $navigationLabel = 'Blog';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Tabs::make('Beitrag')
                ->columnSpanFull()
                ->tabs([
                    Tab::make('Inhalt')
                        ->schema([
                            Forms\Components\Select::make('blog_category_id')
                                ->label('Kategorie')
                                ->options(fn () => BlogCategory::orderBy('order')->pluck('name', 'id'))
                                ->searchable(),
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
                            Forms\Components\RichEditor::make('content')
                                ->label('Inhalt')
                                ->required()
                                ->columnSpanFull(),
                            Forms\Components\Repeater::make('faqs')
                                ->label('Häufige Fragen')
                                ->schema([
                                    Forms\Components\TextInput::make('question')->label('Frage')->required(),
                                    Forms\Components\Textarea::make('answer')->label('Antwort')->required()->rows(2),
                                ])
                                ->collapsed()
                                ->itemLabel(fn (array $state): ?string => $state['question'] ?? null)
                                ->columnSpanFull(),
                        ]),
                    Tab::make('Medien')
                        ->schema([
                            \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('featured')
                                ->label('Titelbild')
                                ->collection('featured')
                                ->image()
                                ->columnSpanFull(),
                        ]),
                    Tab::make('Veröffentlichung & SEO')
                        ->schema([
                            Forms\Components\Toggle::make('is_published')
                                ->label('Veröffentlicht'),
                            Forms\Components\DateTimePicker::make('published_at')
                                ->label('Veröffentlichungsdatum')
                                ->default(now()),
                            Forms\Components\TextInput::make('reading_minutes')
                                ->label('Lesezeit (Minuten)')
                                ->required()
                                ->numeric()
                                ->default(5),
                            Forms\Components\TextInput::make('meta_title')
                                ->label('Meta-Titel')
                                ->columnSpanFull(),
                            Forms\Components\Textarea::make('meta_description')
                                ->label('Meta-Beschreibung')
                                ->rows(2)
                                ->columnSpanFull(),
                        ])->columns(3),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\SpatieMediaLibraryImageColumn::make('featured')
                    ->collection('featured')
                    ->conversion('card')
                    ->label(''),
                Tables\Columns\TextColumn::make('title')
                    ->label('Titel')
                    ->weight(FontWeight::SemiBold)
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Kategorie')
                    ->badge(),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Veröffentlicht')
                    ->boolean(),
                Tables\Columns\TextColumn::make('published_at')
                    ->label('Datum')
                    ->dateTime('d.m.Y')
                    ->sortable(),
            ])
            ->defaultSort('published_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')->label('Veröffentlicht'),
                Tables\Filters\SelectFilter::make('blog_category_id')->relationship('category', 'name')->label('Kategorie'),
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
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
