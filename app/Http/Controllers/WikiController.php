<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WikiService;
use App\Models\WikiArticle;
use Inertia\Inertia;

class WikiController extends Controller
{
    public function index(Request $request)
    {
        $categoryFilter = $request->get('category');

        // Verwende Datenbank-Artikel, falls vorhanden, sonst Fallback zu Markdown
        $dbArticles = WikiArticle::where('published', true)
            ->when($categoryFilter, function ($query) use ($categoryFilter) {
                return $query->where('category', $categoryFilter);
            })
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) {
                return [
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'description' => $article->description,
                    'tags' => $article->tags ?? [],
                    'category' => $article->category,
                ];
            });

        // Fallback zu Markdown-Dateien für bestehende Artikel
        $wiki = new WikiService();
        $mdArticles = collect($wiki->all())
            ->when($categoryFilter, function ($collection) use ($categoryFilter) {
                return $collection->filter(function ($article) use ($categoryFilter) {
                    return ($article['category'] ?? 'general') === $categoryFilter;
                });
            })
            ->map(function ($article) {
                return [
                    'slug' => $article['slug'],
                    'title' => $article['title'],
                    'description' => $article['description'],
                    'tags' => $article['tags'] ?? [],
                    'category' => $article['category'] ?? 'general',
                ];
            });

        // Kombiniere beide, DB-Artikel haben Priorität
        $allSlugs = $dbArticles->pluck('slug')->toArray();
        $mdArticles = $mdArticles->filter(function ($article) use ($allSlugs) {
            return !in_array($article['slug'], $allSlugs);
        });

        // Kombiniere beide Collections
        $articles = $dbArticles->concat($mdArticles);

        // Gruppiere Artikel nach Kategorien
        $categories = $articles->groupBy('category')->map(function ($categoryArticles, $categoryName) {
            return [
                'name' => $categoryName ?: 'general',
                'display_name' => ucfirst($categoryName ?: 'Allgemein'),
                'articles' => $categoryArticles->values()->all(),
                'count' => $categoryArticles->count(),
            ];
        })->values();

        return Inertia::render('Wiki/Index', [
            'articles' => $articles->values()->all(),
            'categories' => $categories->all(),
            'selectedCategory' => $categoryFilter,
        ]);
    }

    public function show(Request $request, string $slug)
    {
        // Hole alle Artikel für Sidebar-Navigation
        $dbArticles = WikiArticle::where('published', true)
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) {
                return [
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'category' => $article->category,
                ];
            });

        $wiki = new WikiService();
        $mdArticles = collect($wiki->all())->map(function ($article) {
            return [
                'slug' => $article['slug'],
                'title' => $article['title'],
                'category' => 'general',
            ];
        });

        $allSlugs = $dbArticles->pluck('slug')->toArray();
        $mdArticles = $mdArticles->filter(function ($article) use ($allSlugs) {
            return !in_array($article['slug'], $allSlugs);
        });

        $allArticles = $dbArticles->concat($mdArticles);

        // Gruppiere Artikel nach Kategorien für Sidebar
        $categories = $allArticles->groupBy('category')->map(function ($categoryArticles, $categoryName) {
            return [
                'name' => $categoryName ?: 'general',
                'display_name' => ucfirst($categoryName ?: 'Allgemein'),
                'articles' => $categoryArticles->values()->all(),
            ];
        })->values();

        // Versuche zuerst Datenbank-Artikel
        $article = WikiArticle::where('slug', $slug)
            ->where('published', true)
            ->first();

        if ($article) {
            $article->increment('views');
            
            // Hole Like-Informationen
            $user = $request->user();
            $likesCount = \App\Models\WikiArticleLike::where('wiki_article_id', $article->id)->count();
            $isLiked = false;
            
            if ($user) {
                $isLiked = \App\Models\WikiArticleLike::where('wiki_article_id', $article->id)
                    ->where('user_id', $user->id)
                    ->exists();
            }
            
            return Inertia::render('Wiki/Show', [
                'article' => [
                    'id' => $article->id,
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'description' => $article->description,
                    'content' => $article->content,
                    'tags' => $article->tags ?? [],
                    'category' => $article->category,
                    'views' => $article->views,
                    'likes_count' => $likesCount,
                    'is_liked' => $isLiked,
                    'created_at' => $article->created_at,
                    'updated_at' => $article->updated_at,
                ],
                'categories' => $categories->all(),
            ]);
        }

        // Fallback zu Markdown
        $wiki = new WikiService();
        try {
            $article = $wiki->find($slug);
            return Inertia::render('Wiki/Show', [
                'article' => array_merge($article, [
                    'views' => 0,
                    'likes_count' => 0,
                    'is_liked' => false,
                    'created_at' => null,
                    'updated_at' => null,
                ]),
                'categories' => $categories->all(),
            ]);
        } catch (\Exception $e) {
            abort(404);
        }
    }

    public function search(Request $request)
    {
        $query = strtolower($request->get('q'));
        
        // Suche in Datenbank-Artikeln
        $dbResults = WikiArticle::where('published', true)
            ->where(function ($q) use ($query) {
                $q->whereRaw('LOWER(title) LIKE ?', ['%' . $query . '%'])
                  ->orWhereRaw('LOWER(description) LIKE ?', ['%' . $query . '%'])
                  ->orWhereRaw('LOWER(content) LIKE ?', ['%' . $query . '%']);
            })
            ->get()
            ->map(function ($article) {
                return [
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'description' => $article->description,
                    'tags' => $article->tags ?? [],
                ];
            });

        // Fallback zu Markdown
        $wiki = new WikiService();
        $mdResults = collect($wiki->all())->filter(function ($article) use ($query) {
            return str_contains(strtolower($article['title']), $query)
                || str_contains(strtolower($article['raw'] ?? ''), $query)
                || collect($article['tags'] ?? [])->contains(fn($tag) => str_contains(strtolower($tag), $query));
        })->map(function ($article) {
            return [
                'slug' => $article['slug'],
                'title' => $article['title'],
                'description' => $article['description'],
                'tags' => $article['tags'] ?? [],
            ];
        });

        $results = $dbResults->concat($mdResults);

        return Inertia::render('Wiki/Search', [
            'query' => $query,
            'results' => $results->values()->all(),
        ]);
    }

    public function toggleLike(Request $request, string $slug)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'Nicht autorisiert'], 401);
        }

        $article = WikiArticle::where('slug', $slug)->first();
        
        if (!$article) {
            return response()->json(['error' => 'Artikel nicht gefunden'], 404);
        }

        // Prüfe ob User bereits geliked hat
        $like = \App\Models\WikiArticleLike::where('wiki_article_id', $article->id)
            ->where('user_id', $user->id)
            ->first();

        if ($like) {
            // Unlike
            $like->delete();
            $isLiked = false;
        } else {
            // Like
            \App\Models\WikiArticleLike::create([
                'wiki_article_id' => $article->id,
                'user_id' => $user->id,
            ]);
            $isLiked = true;
        }

        // Zähle Likes neu
        $likesCount = \App\Models\WikiArticleLike::where('wiki_article_id', $article->id)->count();

        return response()->json([
            'is_liked' => $isLiked,
            'likes_count' => $likesCount,
        ]);
    }
}


