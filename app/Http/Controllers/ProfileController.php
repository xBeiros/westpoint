<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Zeige die Profil-Bearbeitungsseite
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return redirect('/ucp/dashboard')->withErrors([
                'message' => 'Keine Discord-Verbindung gefunden. Bitte melde dich mit Discord an.',
            ]);
        }

        try {
            // Hole Spielerdaten aus der RedM-Datenbank
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser) {
                return Inertia::render('UCP/Profile/Index', [
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
                return Inertia::render('UCP/Profile/Index', [
                    'characters' => [],
                    'selectedCharacter' => null,
                    'error' => 'Keine Charakterdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Verarbeite alle Charaktere
            $charactersData = $characters->map(function ($character) {
                return [
                    'charidentifier' => $character->charidentifier ?? null,
                    'firstname' => $character->firstname ?? null,
                    'lastname' => $character->lastname ?? null,
                    'email' => $character->email ?? null,
                    'birthdate' => $character->birthdate ?? null,
                ];
            });

            // Wähle den ersten Charakter als Standard
            $selectedCharacter = $charactersData->first();

            return Inertia::render('UCP/Profile/Index', [
                'characters' => $charactersData,
                'selectedCharacter' => $selectedCharacter,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Laden der Profil-Daten: ' . $e->getMessage());
            
            return Inertia::render('UCP/Profile/Index', [
                'characters' => [],
                'selectedCharacter' => null,
                'error' => 'Fehler beim Laden der Profil-Daten: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Aktualisiere die Profil-Daten
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return back()->withErrors([
                'message' => 'Keine Discord-Verbindung gefunden.',
            ]);
        }

        $validated = $request->validate([
            'charidentifier' => ['required', 'integer'],
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'birthdate' => ['nullable', 'date'],
        ]);

        try {
            // Hole Spielerdaten aus der RedM-Datenbank
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser) {
                return back()->withErrors([
                    'message' => 'Keine Spielerdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Prüfe ob der Charakter dem User gehört
            $character = DB::connection('redm')
                ->table('characters')
                ->where('charidentifier', $validated['charidentifier'])
                ->where('identifier', $redmUser->identifier)
                ->first();

            if (!$character) {
                return back()->withErrors([
                    'message' => 'Charakter nicht gefunden oder gehört nicht zu deinem Account.',
                ]);
            }

            // Aktualisiere die Daten in der RedM-Datenbank
            DB::connection('redm')
                ->table('characters')
                ->where('charidentifier', $validated['charidentifier'])
                ->update([
                    'firstname' => $validated['firstname'],
                    'lastname' => $validated['lastname'],
                    'email' => $validated['email'],
                    'birthdate' => $validated['birthdate'] ?? null,
                ]);

            return back()->with('success', 'Profil erfolgreich aktualisiert.');
        } catch (\Exception $e) {
            Log::error('Fehler beim Aktualisieren der Profil-Daten: ' . $e->getMessage());
            
            return back()->withErrors([
                'message' => 'Fehler beim Aktualisieren der Profil-Daten: ' . $e->getMessage(),
            ]);
        }
    }
}

