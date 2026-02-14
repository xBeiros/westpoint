<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DiscordLoginController extends Controller
{
    /**
     * Zeige die Discord-Login-Seite
     */
    public function show(Request $request)
    {
        $clientId = config('services.discord.client_id') ?? env('DISCORD_CLIENT_ID', '');

        if (empty($clientId)) {
            return Inertia::render('auth/DiscordLogin', [
                'error' => 'Discord OAuth ist nicht konfiguriert. Bitte kontaktieren Sie einen Administrator.',
                'discordAuthUrl' => '#',
            ]);
        }

        // Speichere return_url in der Session, falls vorhanden
        $returnUrl = $request->input('return_url') ?? $request->query('return_url');
        if ($returnUrl) {
            session(['login_return_url' => $returnUrl]);
        }

        // Discord OAuth URL
        $discordAuthUrl = 'https://discord.com/api/oauth2/authorize?' . http_build_query([
            'client_id' => $clientId,
            'redirect_uri' => url('/auth/discord/callback'),
            'response_type' => 'code',
            'scope' => 'identify email',
        ]);

        return Inertia::render('auth/DiscordLogin', [
            'discordAuthUrl' => $discordAuthUrl,
        ]);
    }

    /**
     * Discord OAuth Callback
     */
    public function callback(Request $request)
    {
        $code = $request->input('code');

        if (!$code) {
            return redirect('/auth/discord')->withErrors([
                'discord_id' => 'Discord-Autorisierung fehlgeschlagen.',
            ]);
        }

        try {
            // Hole Discord Access Token
            $tokenResponse = $this->getDiscordToken($code);
            $accessToken = $tokenResponse['access_token'] ?? null;

            if (!$accessToken) {
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => 'Discord-Token konnte nicht abgerufen werden.',
                ]);
            }

            // Hole Discord User Info
            $discordUser = $this->getDiscordUser($accessToken);
            $discordId = $discordUser['id'] ?? null;

            if (!$discordId) {
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => 'Discord-Benutzerinformationen konnten nicht abgerufen werden.',
                ]);
            }

            // Prüfe, ob die Verbindung zur RedM-Datenbank besteht
            try {
                $redmConnection = DB::connection('redm');
                $redmPdo = $redmConnection->getPdo();
                
                Log::info('RedM Datenbankverbindung erfolgreich', [
                    'host' => config('database.connections.redm.host'),
                    'database' => config('database.connections.redm.database'),
                    'username' => config('database.connections.redm.username'),
                    'port' => config('database.connections.redm.port'),
                    'driver' => config('database.connections.redm.driver'),
                ]);
            } catch (\Exception $connectionException) {
                Log::error('RedM Datenbankverbindung fehlgeschlagen', [
                    'message' => $connectionException->getMessage(),
                    'code' => $connectionException->getCode(),
                    'host' => config('database.connections.redm.host'),
                    'database' => config('database.connections.redm.database'),
                    'username' => config('database.connections.redm.username'),
                    'port' => config('database.connections.redm.port'),
                    'trace' => $connectionException->getTraceAsString(),
                ]);
                
                $errorMessage = config('app.debug') 
                    ? 'RedM-Datenbankverbindung fehlgeschlagen: ' . $connectionException->getMessage() 
                    : 'Verbindung zur RedM-Datenbank fehlgeschlagen. Bitte kontaktieren Sie einen Administrator.';
                
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => $errorMessage,
                ]);
            }

            // Prüfe, ob die Discord ID in der RedM-Datenbank existiert
            // In RedM wird discord_identifier direkt in der users Tabelle gespeichert
            try {
                $redmUser = null;
                
                // Suche direkt in der users Tabelle nach discord_identifier
                $redmUser = DB::connection('redm')
                    ->table('users')
                    ->where('discord_identifier', $discordId)
                    ->first();
                
                // Fallback: Falls nicht in users, suche über characters
                if (!$redmUser) {
                    $character = DB::connection('redm')
                        ->table('characters')
                        ->where('discordid', $discordId)
                        ->first();
                    
                    if ($character) {
                        $redmUser = DB::connection('redm')
                            ->table('users')
                            ->where('identifier', $character->identifier)
                            ->first();
                    }
                }
                
                Log::info('RedM Benutzerabfrage durchgeführt', [
                    'discord_id' => $discordId,
                    'user_found' => $redmUser !== null,
                ]);
            } catch (\Exception $dbException) {
                Log::error('RedM Datenbankabfrage fehlgeschlagen', [
                    'message' => $dbException->getMessage(),
                    'code' => $dbException->getCode(),
                    'discord_id' => $discordId,
                    'host' => config('database.connections.redm.host'),
                    'database' => config('database.connections.redm.database'),
                    'username' => config('database.connections.redm.username'),
                    'trace' => $dbException->getTraceAsString(),
                ]);
                
                // In Entwicklung: Detaillierte Fehlermeldung anzeigen
                $errorMessage = config('app.debug') 
                    ? 'RedM-Datenbankfehler: ' . $dbException->getMessage() 
                    : 'Verbindung zur RedM-Datenbank fehlgeschlagen. Bitte kontaktieren Sie einen Administrator.';
                
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => $errorMessage,
                ]);
            }

            if (!$redmUser) {
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => 'Diese Discord ID wurde nicht in der RedM-Datenbank gefunden.',
                ]);
            }

            // Prüfe, ob die Spalte discord_identifier existiert, falls nicht füge sie hinzu
            try {
                $hasColumn = DB::getSchemaBuilder()->hasColumn('users', 'discord_identifier');
                if (!$hasColumn) {
                    // Prüfe, ob es MySQL/MariaDB ist
                    $driver = config('database.default');
                    $connection = config("database.connections.{$driver}.driver");
                    
                    if ($connection === 'mysql') {
                        // MySQL: Füge Spalte mit AFTER email hinzu
                        DB::statement('ALTER TABLE users ADD COLUMN discord_identifier VARCHAR(255) NULL AFTER email');
                        // Füge Unique-Index hinzu, falls er nicht existiert
                        try {
                            DB::statement('CREATE UNIQUE INDEX users_discord_identifier_unique ON users(discord_identifier)');
                        } catch (\Exception $indexException) {
                            // Index existiert möglicherweise bereits, ignoriere Fehler
                        }
                    } else {
                        // SQLite oder andere: Einfach Spalte hinzufügen
                        DB::statement('ALTER TABLE users ADD COLUMN discord_identifier VARCHAR(255) NULL');
                    }
                }
            } catch (\Exception $columnException) {
                Log::error('Fehler beim Prüfen/Hinzufügen der discord_identifier Spalte', [
                    'message' => $columnException->getMessage(),
                ]);
                // Versuche trotzdem fortzufahren, falls die Spalte bereits existiert
            }

            // Prüfe, ob ein Laravel-User mit dieser Discord ID existiert
            $laravelUser = null;
            try {
                $laravelUser = \App\Models\User::where('discord_identifier', $discordId)->first();
            } catch (\Exception $queryException) {
                // Falls die Abfrage fehlschlägt, versuche die Spalte hinzuzufügen
                if (strpos($queryException->getMessage(), 'Unknown column') !== false || 
                    strpos($queryException->getMessage(), 'discord_identifier') !== false ||
                    strpos($queryException->getMessage(), 'Column not found') !== false) {
                    try {
                        $driver = config('database.default');
                        $connection = config("database.connections.{$driver}.driver");
                        
                        if ($connection === 'mysql') {
                            DB::statement('ALTER TABLE users ADD COLUMN discord_identifier VARCHAR(255) NULL AFTER email');
                            try {
                                DB::statement('CREATE UNIQUE INDEX users_discord_identifier_unique ON users(discord_identifier)');
                            } catch (\Exception $indexException) {
                                // Index existiert möglicherweise bereits
                            }
                        } else {
                            DB::statement('ALTER TABLE users ADD COLUMN discord_identifier VARCHAR(255) NULL');
                        }
                        $laravelUser = \App\Models\User::where('discord_identifier', $discordId)->first();
                    } catch (\Exception $retryException) {
                        Log::error('Fehler beim Hinzufügen der discord_identifier Spalte', [
                            'message' => $retryException->getMessage(),
                        ]);
                        throw $retryException;
                    }
                } else {
                    throw $queryException;
                }
            }

            // Avatar-Funktionalität deaktiviert - verwende Standard Initialen

            if (!$laravelUser) {
                // Erstelle einen neuen Laravel-User basierend auf RedM-Daten
                try {
                    // Hole Character-Name falls vorhanden
                    $character = DB::connection('redm')
                        ->table('characters')
                        ->where('identifier', $redmUser->identifier)
                        ->where('discordid', $discordId)
                        ->first();
                    
                    $userName = $discordUser['username'] ?? 'Discord User';
                    if ($character && $character->firstname && $character->lastname) {
                        $userName = $character->firstname . ' ' . $character->lastname;
                    }
                    
                    $laravelUser = \App\Models\User::create([
                        'name' => $userName,
                        'email' => $discordUser['email'] ?? "discord_{$discordId}@westpoint.local",
                        'password' => bcrypt(str()->random(32)), // Zufälliges Passwort
                        'discord_identifier' => $discordId,
                    ]);
                } catch (\Exception $createException) {
                    Log::error('Fehler beim Erstellen des Users', [
                        'message' => $createException->getMessage(),
                    ]);
                    throw $createException;
                }
            }

            // Hole return_url aus der Session, falls vorhanden
            $returnUrl = session('login_return_url');
            session()->forget('login_return_url');

            // Prüfe, ob 2FA aktiviert ist
            if ($laravelUser->two_factor_secret && $laravelUser->two_factor_confirmed_at) {
                // Speichere return_url in Session für nach 2FA-Verifizierung
                if ($returnUrl) {
                    session(['two_factor_return_url' => $returnUrl]);
                }
                
                // Speichere User-ID und Remember-Flag in Session für 2FA-Challenge
                // WICHTIG: Benutzer wird NICHT eingeloggt, nur Session-Daten werden gesetzt
                session([
                    'login.id' => $laravelUser->id,
                    'login.remember' => true, // Remember me
                ]);
                
                // Weiterleitung zur 2FA-Challenge
                return redirect('/two-factor-challenge');
            }

            // 2FA ist nicht aktiviert - logge den Benutzer direkt ein
            Auth::login($laravelUser, true); // true = remember me

            // Wenn return_url vorhanden ist, dorthin weiterleiten, sonst Dashboard
            if ($returnUrl && filter_var($returnUrl, FILTER_VALIDATE_URL)) {
                // Prüfe, ob die URL zur eigenen Domain gehört (Sicherheit)
                $parsedUrl = parse_url($returnUrl);
                $appUrl = parse_url(config('app.url'));
                if ($parsedUrl && isset($parsedUrl['host']) && 
                    ($parsedUrl['host'] === $appUrl['host'] || 
                     $parsedUrl['host'] === 'localhost' || 
                     $parsedUrl['host'] === '127.0.0.1' ||
                     str_ends_with($parsedUrl['host'], '.test'))) {
                    return redirect($returnUrl);
                }
            }

            return redirect()->intended('/ucp/dashboard');
        } catch (\Exception $e) {
            Log::error('Discord Login Fehler', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            // In Entwicklung: Detaillierte Fehlermeldung anzeigen
            $errorMessage = config('app.debug') 
                ? $e->getMessage() 
                : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            
            return redirect('/auth/discord')->withErrors([
                'discord_id' => $errorMessage,
            ]);
        }
    }

    /**
     * Hole Discord Access Token
     */
    private function getDiscordToken($code)
    {
        $clientId = config('services.discord.client_id') ?? env('DISCORD_CLIENT_ID');
        $clientSecret = config('services.discord.client_secret') ?? env('DISCORD_CLIENT_SECRET');

        if (empty($clientId) || empty($clientSecret)) {
            throw new \Exception('Discord OAuth Credentials sind nicht konfiguriert.');
        }

        $response = Http::asForm()->post('https://discord.com/api/oauth2/token', [
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => url('/auth/discord/callback'),
        ]);

        if ($response->failed()) {
            $error = $response->json();
            Log::error('Discord Token Error', ['response' => $error]);
            throw new \Exception('Discord Token konnte nicht abgerufen werden: ' . ($error['error_description'] ?? 'Unbekannter Fehler'));
        }

        return $response->json();
    }

    /**
     * Hole Discord User Informationen
     */
    private function getDiscordUser($accessToken)
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$accessToken}",
        ])->get('https://discord.com/api/users/@me');

        return $response->json();
    }
}

