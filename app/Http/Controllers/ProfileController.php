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

            // Hole alle aktiven Sessions für diesen User
            $sessions = $this->getUserSessions($user->id);

            return Inertia::render('UCP/Profile/Index', [
                'userData' => $userData,
                'twoFactorEnabled' => $twoFactorEnabled,
                'twoFactorConfirmed' => $twoFactorConfirmed,
                'sessions' => $sessions,
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

    /**
     * Hole alle aktiven Sessions für den User
     */
    private function getUserSessions($userId)
    {
        try {
            $currentSessionId = session()->getId();
            $sessions = DB::table('sessions')
                ->where('user_id', $userId)
                ->where('last_activity', '>', now()->subMinutes(config('session.lifetime', 120))->timestamp)
                ->orderBy('last_activity', 'desc')
                ->get()
                ->map(function ($session) use ($currentSessionId) {
                    return [
                        'id' => $session->id,
                        'ip_address' => $session->ip_address ?? 'Unbekannt',
                        'user_agent' => $this->parseUserAgent($session->user_agent ?? ''),
                        'last_activity' => date('Y-m-d H:i:s', $session->last_activity),
                        'last_activity_timestamp' => $session->last_activity,
                        'is_current_device' => $session->id === $currentSessionId,
                    ];
                })
                ->values();

            return $sessions;
        } catch (\Exception $e) {
            Log::error('Fehler beim Laden der Sessions: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Parse User Agent String zu lesbarem Format
     */
    private function parseUserAgent($userAgent)
    {
        if (empty($userAgent)) {
            return 'Unbekannt';
        }

        // Versuche Browser und OS zu erkennen
        $browser = 'Unbekannt';
        $os = 'Unbekannt';

        // Browser-Erkennung
        if (strpos($userAgent, 'Chrome') !== false && strpos($userAgent, 'Edg') === false) {
            $browser = 'Chrome';
        } elseif (strpos($userAgent, 'Firefox') !== false) {
            $browser = 'Firefox';
        } elseif (strpos($userAgent, 'Safari') !== false && strpos($userAgent, 'Chrome') === false) {
            $browser = 'Safari';
        } elseif (strpos($userAgent, 'Edg') !== false) {
            $browser = 'Edge';
        } elseif (strpos($userAgent, 'Opera') !== false) {
            $browser = 'Opera';
        }

        // OS-Erkennung
        if (strpos($userAgent, 'Windows') !== false) {
            $os = 'Windows';
        } elseif (strpos($userAgent, 'Mac') !== false) {
            $os = 'macOS';
        } elseif (strpos($userAgent, 'Linux') !== false) {
            $os = 'Linux';
        } elseif (strpos($userAgent, 'Android') !== false) {
            $os = 'Android';
        } elseif (strpos($userAgent, 'iOS') !== false || strpos($userAgent, 'iPhone') !== false || strpos($userAgent, 'iPad') !== false) {
            $os = 'iOS';
        }

        return $browser . ' auf ' . $os;
    }

    /**
     * Lösche alle anderen Sessions (ausloggen von allen anderen Geräten)
     */
    public function logoutOtherDevices(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return back()->withErrors([
                'message' => 'Nicht authentifiziert.',
            ]);
        }

        try {
            $currentSessionId = session()->getId();
            
            // Lösche alle Sessions außer der aktuellen
            DB::table('sessions')
                ->where('user_id', $user->id)
                ->where('id', '!=', $currentSessionId)
                ->delete();

            return back()->with('success', 'Alle anderen Sitzungen wurden erfolgreich beendet.');
        } catch (\Exception $e) {
            Log::error('Fehler beim Löschen der Sessions: ' . $e->getMessage());
            
            return back()->withErrors([
                'message' => 'Fehler beim Beenden der Sitzungen: ' . $e->getMessage(),
            ]);
        }
    }
}

