<?php

namespace App\Http\Controllers\Wiki\Admin;

use App\Http\Controllers\Controller;
use App\Models\WikiArticle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class WikiAdminController extends Controller
{
    public function index()
    {
        $articles = WikiArticle::orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'description' => $article->description,
                    'category' => $article->category,
                    'author_name' => $article->author_name,
                    'published' => $article->published,
                    'views' => $article->views,
                    'order' => $article->order,
                    'created_at' => $article->created_at,
                    'updated_at' => $article->updated_at,
                ];
            })
            ->values();

        $pendingCount = \App\Models\WikiChangeRequest::pending()->count();

        return Inertia::render('Wiki/Admin/Index', [
            'articles' => $articles,
            'pendingCount' => $pendingCount,
        ]);
    }

    public function create()
    {
        return Inertia::render('Wiki/Admin/Editor', [
            'article' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:wiki_articles,slug',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'raw_content' => 'nullable|string',
            'tags' => 'nullable|array',
            'category' => 'nullable|string|max:255',
            'published' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        $user = $request->user();
        
        // Generiere Slug falls nicht vorhanden
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Stelle sicher, dass Slug eindeutig ist
        $baseSlug = $validated['slug'];
        $counter = 1;
        while (WikiArticle::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $baseSlug . '-' . $counter;
            $counter++;
        }

        // Hole Benutzername aus RedM
        $authorName = null;
        try {
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();
            
            if ($redmUser) {
                $character = DB::connection('redm')
                    ->table('characters')
                    ->where('identifier', $redmUser->identifier)
                    ->where('discordid', $user->discord_identifier)
                    ->first();
                
                if ($character) {
                    $authorName = ($character->firstname ?? '') . ' ' . ($character->lastname ?? '');
                }
            }
        } catch (\Exception $e) {
            // Ignoriere Fehler
        }

        $article = WikiArticle::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'content' => $validated['content'],
            'raw_content' => $validated['raw_content'] ?? $validated['content'],
            'tags' => $validated['tags'] ?? [],
            'category' => $validated['category'] ?? 'general',
            'author_discord_id' => $user->discord_identifier,
            'author_name' => $authorName ?? $user->name ?? 'Unbekannt',
            'published' => $validated['published'] ?? true,
            'order' => $validated['order'] ?? 0,
        ]);

        return redirect()->route('wiki.admin.index')
            ->with('success', 'Wiki-Artikel erfolgreich erstellt.');
    }

    public function edit(WikiArticle $article)
    {
        return Inertia::render('Wiki/Admin/Editor', [
            'article' => [
                'id' => $article->id,
                'slug' => $article->slug,
                'title' => $article->title,
                'description' => $article->description,
                'content' => $article->content,
                'raw_content' => $article->raw_content,
                'tags' => $article->tags,
                'category' => $article->category,
                'published' => $article->published,
                'order' => $article->order,
            ],
        ]);
    }

    public function update(Request $request, WikiArticle $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:wiki_articles,slug,' . $article->id,
            'description' => 'nullable|string',
            'content' => 'required|string',
            'raw_content' => 'nullable|string',
            'tags' => 'nullable|array',
            'category' => 'nullable|string|max:255',
            'published' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Generiere Slug falls nicht vorhanden
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Stelle sicher, dass Slug eindeutig ist (außer für aktuellen Artikel)
        if ($validated['slug'] !== $article->slug) {
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (WikiArticle::where('slug', $validated['slug'])->where('id', '!=', $article->id)->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        $article->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'content' => $validated['content'],
            'raw_content' => $validated['raw_content'] ?? $validated['content'],
            'tags' => $validated['tags'] ?? [],
            'category' => $validated['category'] ?? 'general',
            'published' => $validated['published'] ?? true,
            'order' => $validated['order'] ?? 0,
        ]);

        return redirect()->route('wiki.admin.index')
            ->with('success', 'Wiki-Artikel erfolgreich aktualisiert.');
    }

    public function destroy(WikiArticle $article)
    {
        $article->delete();

        return redirect()->route('wiki.admin.index')
            ->with('success', 'Wiki-Artikel erfolgreich gelöscht.');
    }

    public function togglePublish(WikiArticle $article)
    {
        $article->update([
            'published' => !$article->published,
        ]);

        return back()->with('success', 'Veröffentlichungsstatus geändert.');
    }
}
