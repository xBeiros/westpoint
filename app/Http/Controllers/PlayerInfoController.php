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
            return redirect('/dashboard')->withErrors([
                'message' => 'Keine Discord-Verbindung gefunden. Bitte melde dich mit Discord an.',
            ]);
        }

        try {
            // Hole Spielerdaten aus der FiveM-Datenbank
            $player = DB::connection('fivem')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player) {
                return Inertia::render('PlayerInfo/Index', [
                    'player' => null,
                    'error' => 'Keine Spielerdaten in der FiveM-Datenbank gefunden.',
                ]);
            }

            // Dekodiere JSON-Felder
            $playerData = [
                'identifier' => $player->identifier ?? null,
                'discord_identifier' => $player->discord_identifier ?? null,
                'firstname' => $player->firstname ?? null,
                'lastname' => $player->lastname ?? null,
                'dateofbirth' => $player->dateofbirth ?? null,
                'sex' => $player->sex ?? null,
                'height' => $player->height ?? null,
                'job' => $player->job ?? null,
                'job_grade' => $player->job_grade ?? null,
                'group' => $player->group ?? null,
                'phone_number' => $player->phone_number ?? null,
                'isOnline' => $player->isOnline ?? false,
                'last_seen' => $player->last_seen ?? null,
                'created_at' => $player->created_at ?? null,
                'accounts' => $this->decodeJson($player->accounts),
                'inventory' => $this->decodeJson($player->inventory),
                'loadout' => $this->decodeJson($player->loadout),
                'metadata' => $this->decodeJson($player->metadata),
                'position' => $this->decodeJson($player->position),
                'skin' => $this->decodeJson($player->skin),
                'status' => $player->status ?? null,
                'is_dead' => $player->is_dead ?? false,
                'level_craft' => $player->level_craft ?? null,
                'cryptocurrency' => $player->cryptocurrency ?? null,
                'crypto_wallet' => $player->crypto_wallet ?? null,
                'c_coins' => $player->c_coins ?? null,
                'b_coins' => $player->b_coins ?? null,
                'trucker_xp' => $player->trucker_xp ?? null,
                'trucker_level' => $player->trucker_level ?? null,
                'coins_spent' => $player->coins_spent ?? null,
            ];

            // Debug: Log die Daten
            Log::info('Player Data für Inertia', [
                'player_data' => $playerData,
                'firstname' => $playerData['firstname'],
                'lastname' => $playerData['lastname'],
            ]);

            return Inertia::render('PlayerInfo/Index', [
                'player' => $playerData,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Spielerdaten', [
                'message' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return Inertia::render('PlayerInfo/Index', [
                'player' => null,
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

