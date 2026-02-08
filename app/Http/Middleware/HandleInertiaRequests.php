<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $userGroup = 'user';
        
        $playerData = null;
        
        // Hole Benutzergruppe und Spielerdaten aus RedM-Datenbank, falls vorhanden
        if ($user && $user->discord_identifier) {
            try {
                // Suche direkt in der users Tabelle nach discord_identifier
                $redmUser = \Illuminate\Support\Facades\DB::connection('redm')
                    ->table('users')
                    ->where('discord_identifier', $user->discord_identifier)
                    ->first();
                
                if ($redmUser) {
                    $userGroup = $redmUser->group ?? 'user';
                    
                    // Suche dann in der characters Tabelle nach firstname/lastname
                    // Nimm den ersten Charakter (oder den mit passendem discordid)
                    $character = \Illuminate\Support\Facades\DB::connection('redm')
                        ->table('characters')
                        ->where('identifier', $redmUser->identifier)
                        ->where('discordid', $user->discord_identifier)
                        ->first();
                    
                    // Fallback: Falls kein Charakter mit passendem discordid gefunden, nimm den ersten
                    if (!$character) {
                        $character = \Illuminate\Support\Facades\DB::connection('redm')
                            ->table('characters')
                            ->where('identifier', $redmUser->identifier)
                            ->first();
                    }
                    
                    if ($character) {
                        $playerData = [
                            'firstname' => $character->firstname ?? null,
                            'lastname' => $character->lastname ?? null,
                        ];
                    }
                }
            } catch (\Exception $e) {
                // Fehler beim Abrufen der Gruppe ignorieren
            }
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
                'group' => $userGroup,
                'player' => $playerData,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}

