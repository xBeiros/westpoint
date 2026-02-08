<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PlayerInfoController extends Controller
{
    /**
     * Zeige die Spielerinformationen
     */
    public function index()
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return redirect('/ucp/dashboard')->withErrors([
                'message' => 'Keine Discord-Verbindung gefunden. Bitte melde dich mit Discord an.',
            ]);
        }

        try {
            // Hole Spielerdaten aus der RedM-Datenbank
            // Suche direkt in der users Tabelle nach discord_identifier
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser) {
                return Inertia::render('UCP/PlayerInfo/Index', [
                    'characters' => [],
                    'selectedCharacter' => null,
                    'error' => 'Keine Spielerdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Hole ALLE Character-Daten für diesen User
            $characters = DB::connection('redm')
                ->table('characters')
                ->where('identifier', $redmUser->identifier)
                ->orderBy('charidentifier', 'asc')
                ->get();

            if ($characters->isEmpty()) {
                return Inertia::render('UCP/PlayerInfo/Index', [
                    'characters' => [],
                    'selectedCharacter' => null,
                    'error' => 'Keine Charakterdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Verarbeite alle Charaktere
            $charactersData = $characters->map(function ($character) {
                return [
                    'charidentifier' => $character->charidentifier ?? null,
                    'identifier' => $character->identifier ?? null,
                    'discordid' => $character->discordid ?? null,
                    'firstname' => $character->firstname ?? null,
                    'lastname' => $character->lastname ?? null,
                    'gender' => $character->gender ?? null,
                    'age' => $character->age ?? null,
                    'nickname' => $character->nickname ?? null,
                    'job' => $character->job ?? null,
                    'joblabel' => $character->joblabel ?? null,
                    'jobgrade' => $character->jobgrade ?? null,
                    'group' => $character->group ?? null,
                    'money' => $character->money ?? 0,
                    'gold' => $character->gold ?? 0,
                    'rol' => $character->rol ?? 0,
                    'xp' => $character->xp ?? 0,
                    'hours' => $character->hours ?? 0,
                    'LastLogin' => $character->LastLogin ?? null,
                    'inventory' => $this->decodeJson($character->inventory),
                    'slots' => $character->slots ?? null,
                    'meta' => $this->decodeJson($character->meta),
                    'character_desc' => $character->character_desc ?? null,
                    'skinPlayer' => $this->decodeJson($character->skinPlayer),
                    'compPlayer' => $this->decodeJson($character->compPlayer),
                    'compTints' => $this->decodeJson($character->compTints),
                    'coords' => $this->decodeJson($character->coords),
                    'status' => $this->decodeJson($character->status),
                    'isdead' => $character->isdead ?? false,
                    'skills' => $this->decodeJson($character->skills),
                    'walk' => $character->walk ?? null,
                    'gunsmith' => $character->gunsmith ?? 0,
                    'ammo' => $this->decodeJson($character->ammo),
                    'lastjoined' => $this->decodeJson($character->lastjoined),
                    'ranchid' => $character->ranchid ?? 0,
                ];
            })->toArray();

            // Standardmäßig den ersten Charakter auswählen
            $selectedCharacter = !empty($charactersData) ? $charactersData[0] : null;

            return Inertia::render('UCP/PlayerInfo/Index', [
                'characters' => $charactersData,
                'selectedCharacter' => $selectedCharacter,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Spielerdaten', [
                'message' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return Inertia::render('UCP/PlayerInfo/Index', [
                'characters' => [],
                'selectedCharacter' => null,
                'error' => config('app.debug') 
                    ? $e->getMessage() 
                    : 'Fehler beim Abrufen der Spielerdaten.',
            ]);
        }
    }

    /**
     * Dekodiere JSON-String sicher
     */
    private function decodeJson($jsonString)
    {
        if (empty($jsonString)) {
            return null;
        }

        $decoded = json_decode($jsonString, true);
        return json_last_error() === JSON_ERROR_NONE ? $decoded : null;
    }
}

