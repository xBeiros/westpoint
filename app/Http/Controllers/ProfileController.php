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
            // Hole private Benutzerdaten aus der RedM users-Tabelle
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser) {
                return Inertia::render('UCP/Profile/Index', [
                    'userData' => null,
                    'error' => 'Keine Benutzerdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Hole private Informationen aus der users-Tabelle
            $userData = [
                'firstname' => $redmUser->firstname ?? null,
                'lastname' => $redmUser->lastname ?? null,
                'email' => $redmUser->email ?? null,
                'birthdate' => $redmUser->birthdate ?? null,
            ];

            // Hole 2FA-Status aus RedM-Datenbank
            $twoFactorSecret = $redmUser->two_factor_secret ?? null;
            $twoFactorConfirmedAt = $redmUser->two_factor_confirmed_at ?? null;
            
            $twoFactorEnabled = !empty($twoFactorSecret);
            $twoFactorConfirmed = !empty($twoFactorConfirmedAt);

            return Inertia::render('UCP/Profile/Index', [
                'userData' => $userData,
                'twoFactorEnabled' => $twoFactorEnabled,
                'twoFactorConfirmed' => $twoFactorConfirmed,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Laden der Profil-Daten: ' . $e->getMessage());
            
            return Inertia::render('UCP/Profile/Index', [
                'userData' => null,
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
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'birthdate' => ['nullable', 'date'],
        ]);

        try {
            // Hole Benutzerdaten aus der RedM-Datenbank
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser) {
                return back()->withErrors([
                    'message' => 'Keine Benutzerdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Aktualisiere die privaten Daten in der users-Tabelle
            DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
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

