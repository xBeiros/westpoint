<?php

namespace App\Http\Controllers\Wiki\Admin;

use App\Http\Controllers\Controller;
use App\Models\WikiArticle;
use App\Models\WikiChangeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class WikiChangeRequestController extends Controller
{
    public function index()
    {
        $requests = WikiChangeRequest::with('article')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'wiki_article_id' => $request->wiki_article_id,
                    'request_type' => $request->request_type,
                    'title' => $request->title,
                    'slug' => $request->slug,
                    'description' => $request->description,
                    'requester_name' => $request->requester_name,
                    'requester_discord_id' => $request->requester_discord_id,
                    'status' => $request->status,
                    'reviewer_name' => $request->reviewer_name,
                    'review_notes' => $request->review_notes,
                    'reviewed_at' => $request->reviewed_at,
                    'created_at' => $request->created_at,
                    'updated_at' => $request->updated_at,
                    'article' => $request->article ? [
                        'id' => $request->article->id,
                        'slug' => $request->article->slug,
                        'title' => $request->article->title,
                    ] : null,
                ];
            })
            ->values();

        $pendingCount = WikiChangeRequest::pending()->count();

        return Inertia::render('Wiki/Admin/ChangeRequests/Index', [
            'requests' => $requests,
            'pendingCount' => $pendingCount,
        ]);
    }

    public function show(WikiChangeRequest $changeRequest)
    {
        $changeRequest->load('article');

        return Inertia::render('Wiki/Admin/ChangeRequests/Show', [
            'changeRequest' => [
                'id' => $changeRequest->id,
                'wiki_article_id' => $changeRequest->wiki_article_id,
                'request_type' => $changeRequest->request_type,
                'title' => $changeRequest->title,
                'slug' => $changeRequest->slug,
                'description' => $changeRequest->description,
                'content' => $changeRequest->content,
                'raw_content' => $changeRequest->raw_content,
                'tags' => $changeRequest->tags,
                'category' => $changeRequest->category,
                'requester_name' => $changeRequest->requester_name,
                'requester_discord_id' => $changeRequest->requester_discord_id,
                'status' => $changeRequest->status,
                'reviewer_name' => $changeRequest->reviewer_name,
                'reviewer_discord_id' => $changeRequest->reviewer_discord_id,
                'review_notes' => $changeRequest->review_notes,
                'reviewed_at' => $changeRequest->reviewed_at,
                'created_at' => $changeRequest->created_at,
                'updated_at' => $changeRequest->updated_at,
                'article' => $changeRequest->article ? [
                    'id' => $changeRequest->article->id,
                    'slug' => $changeRequest->article->slug,
                    'title' => $changeRequest->article->title,
                    'content' => $changeRequest->article->content,
                ] : null,
            ],
        ]);
    }

    public function approve(Request $request, WikiChangeRequest $changeRequest)
    {
        $validated = $request->validate([
            'review_notes' => 'nullable|string',
        ]);

        $user = $request->user();
        
        // Hole Reviewer-Name
        $reviewerName = null;
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
                    $reviewerName = ($character->firstname ?? '') . ' ' . ($character->lastname ?? '');
                }
            }
        } catch (\Exception $e) {
            // Ignoriere Fehler
        }

        DB::beginTransaction();
        try {
            if ($changeRequest->request_type === 'create') {
                // Neuen Artikel erstellen
                $article = WikiArticle::create([
                    'title' => $changeRequest->title,
                    'slug' => $changeRequest->slug ?? Str::slug($changeRequest->title),
                    'description' => $changeRequest->description,
                    'content' => $changeRequest->content,
                    'raw_content' => $changeRequest->raw_content ?? $changeRequest->content,
                    'tags' => $changeRequest->tags ?? [],
                    'category' => $changeRequest->category ?? 'general',
                    'author_discord_id' => $changeRequest->requester_discord_id,
                    'author_name' => $changeRequest->requester_name,
                    'published' => true,
                ]);
            } elseif ($changeRequest->request_type === 'edit' && $changeRequest->article) {
                // Artikel aktualisieren
                $changeRequest->article->update([
                    'title' => $changeRequest->title ?? $changeRequest->article->title,
                    'slug' => $changeRequest->slug ?? $changeRequest->article->slug,
                    'description' => $changeRequest->description ?? $changeRequest->article->description,
                    'content' => $changeRequest->content ?? $changeRequest->article->content,
                    'raw_content' => $changeRequest->raw_content ?? $changeRequest->article->raw_content,
                    'tags' => $changeRequest->tags ?? $changeRequest->article->tags,
                    'category' => $changeRequest->category ?? $changeRequest->article->category,
                ]);
            } elseif ($changeRequest->request_type === 'delete' && $changeRequest->article) {
                // Artikel löschen
                $changeRequest->article->delete();
            }

            // Antrag als genehmigt markieren
            $changeRequest->update([
                'status' => 'approved',
                'reviewer_discord_id' => $user->discord_identifier,
                'reviewer_name' => $reviewerName ?? $user->name ?? 'Unbekannt',
                'review_notes' => $validated['review_notes'] ?? null,
                'reviewed_at' => now(),
            ]);

            DB::commit();

            return redirect()->route('wiki.admin.change-requests.index')
                ->with('success', 'Änderungsantrag erfolgreich genehmigt.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Fehler beim Genehmigen des Antrags: ' . $e->getMessage());
        }
    }

    public function reject(Request $request, WikiChangeRequest $changeRequest)
    {
        $validated = $request->validate([
            'review_notes' => 'required|string|min:10',
        ]);

        $user = $request->user();
        
        // Hole Reviewer-Name
        $reviewerName = null;
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
                    $reviewerName = ($character->firstname ?? '') . ' ' . ($character->lastname ?? '');
                }
            }
        } catch (\Exception $e) {
            // Ignoriere Fehler
        }

        $changeRequest->update([
            'status' => 'rejected',
            'reviewer_discord_id' => $user->discord_identifier,
            'reviewer_name' => $reviewerName ?? $user->name ?? 'Unbekannt',
            'review_notes' => $validated['review_notes'],
            'reviewed_at' => now(),
        ]);

        return redirect()->route('wiki.admin.change-requests.index')
            ->with('success', 'Änderungsantrag abgelehnt.');
    }
}
