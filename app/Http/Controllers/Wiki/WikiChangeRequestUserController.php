<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Models\WikiArticle;
use App\Models\WikiChangeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class WikiChangeRequestUserController extends Controller
{
    public function create(Request $request, $slug = null)
    {
        $article = null;
        if ($slug) {
            $articleModel = WikiArticle::where('slug', $slug)->firstOrFail();
            $article = [
                'id' => $articleModel->id,
                'slug' => $articleModel->slug,
                'title' => $articleModel->title,
                'description' => $articleModel->description,
                'content' => $articleModel->content,
                'raw_content' => $articleModel->raw_content,
                'tags' => $articleModel->tags,
                'category' => $articleModel->category,
            ];
        }

        return Inertia::render('Wiki/ChangeRequest/Create', [
            'article' => $article,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'article_id' => 'nullable|exists:wiki_articles,id',
            'request_type' => 'required|in:create,edit,delete',
            'title' => 'required_if:request_type,create|nullable|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required_if:request_type,create,edit|nullable|string',
            'raw_content' => 'nullable|string',
            'tags' => 'nullable|array',
            'category' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        
        if (!$user || !$user->discord_identifier) {
            return back()->withErrors(['error' => 'Du musst eingeloggt sein.']);
        }

        // Prüfe ob Benutzer "wiki" Gruppe hat
        try {
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser || ($redmUser->group !== 'wiki' && $redmUser->group !== 'wikiadmin' && $redmUser->group !== 'admin')) {
                return back()->withErrors(['error' => 'Du benötigst die "wiki" Gruppe, um Änderungsanträge zu stellen.']);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Fehler beim Prüfen der Berechtigung.']);
        }

        // Hole Requester-Name
        $requesterName = null;
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
                    $requesterName = ($character->firstname ?? '') . ' ' . ($character->lastname ?? '');
                }
            }
        } catch (\Exception $e) {
            // Ignoriere Fehler
        }

        $article = null;
        if ($validated['article_id']) {
            $article = WikiArticle::findOrFail($validated['article_id']);
        }

        // Generiere Slug für neue Artikel
        if ($validated['request_type'] === 'create' && empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $changeRequest = WikiChangeRequest::create([
            'wiki_article_id' => $article?->id,
            'request_type' => $validated['request_type'],
            'title' => $validated['title'] ?? $article?->title,
            'slug' => $validated['slug'] ?? $article?->slug,
            'description' => $validated['description'] ?? $article?->description,
            'content' => $validated['content'] ?? $article?->content,
            'raw_content' => $validated['raw_content'] ?? $validated['content'] ?? $article?->raw_content,
            'tags' => $validated['tags'] ?? $article?->tags ?? [],
            'category' => $validated['category'] ?? $article?->category ?? 'general',
            'requester_discord_id' => $user->discord_identifier,
            'requester_name' => $requesterName ?? $user->name ?? 'Unbekannt',
            'status' => 'pending',
        ]);

        return redirect()->route('wiki.index')
            ->with('success', 'Dein Änderungsantrag wurde erfolgreich eingereicht und wartet auf Überprüfung.');
    }
}
