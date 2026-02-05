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
    public function show()
    {
        $clientId = config('services.discord.client_id') ?? env('DISCORD_CLIENT_ID', '');

        if (empty($clientId)) {
            return Inertia::render('auth/DiscordLogin', [
                'error' => 'Discord OAuth ist nicht konfiguriert. Bitte kontaktieren Sie einen Administrator.',
                'discordAuthUrl' => '#',
            ]);
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

            // Prüfe, ob die Verbindung zur FiveM-Datenbank besteht
            try {
                $fivemConnection = DB::connection('fivem');
                $fivemPdo = $fivemConnection->getPdo();
                
                Log::info('FiveM Datenbankverbindung erfolgreich', [
                    'host' => config('database.connections.fivem.host'),
                    'database' => config('database.connections.fivem.database'),
                    'username' => config('database.connections.fivem.username'),
                    'port' => config('database.connections.fivem.port'),
                    'driver' => config('database.connections.fivem.driver'),
                ]);
            } catch (\Exception $connectionException) {
                Log::error('FiveM Datenbankverbindung fehlgeschlagen', [
                    'message' => $connectionException->getMessage(),
                    'code' => $connectionException->getCode(),
                    'host' => config('database.connections.fivem.host'),
                    'database' => config('database.connections.fivem.database'),
                    'username' => config('database.connections.fivem.username'),
                    'port' => config('database.connections.fivem.port'),
                    'trace' => $connectionException->getTraceAsString(),
                ]);
                
                $errorMessage = config('app.debug') 
                    ? 'FiveM-Datenbankverbindung fehlgeschlagen: ' . $connectionException->getMessage() 
                    : 'Verbindung zur FiveM-Datenbank fehlgeschlagen. Bitte kontaktieren Sie einen Administrator.';
                
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => $errorMessage,
                ]);
            }

            // Prüfe, ob die Discord ID in der FiveM-Datenbank existiert
            try {
                $fivemUser = DB::connection('fivem')
                    ->table('users')
                    ->where('discord_identifier', $discordId)
                    ->first();
                
                Log::info('FiveM Benutzerabfrage durchgeführt', [
                    'discord_id' => $discordId,
                    'user_found' => $fivemUser !== null,
                ]);
            } catch (\Exception $dbException) {
                Log::error('FiveM Datenbankabfrage fehlgeschlagen', [
                    'message' => $dbException->getMessage(),
                    'code' => $dbException->getCode(),
                    'discord_id' => $discordId,
                    'host' => config('database.connections.fivem.host'),
                    'database' => config('database.connections.fivem.database'),
                    'username' => config('database.connections.fivem.username'),
                    'trace' => $dbException->getTraceAsString(),
                ]);
                
                // In Entwicklung: Detaillierte Fehlermeldung anzeigen
                $errorMessage = config('app.debug') 
                    ? 'FiveM-Datenbankfehler: ' . $dbException->getMessage() 
                    : 'Verbindung zur FiveM-Datenbank fehlgeschlagen. Bitte kontaktieren Sie einen Administrator.';
                
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => $errorMessage,
                ]);
            }

            if (!$fivemUser) {
                return redirect('/auth/discord')->withErrors([
                    'discord_id' => 'Diese Discord ID wurde nicht in der FiveM-Datenbank gefunden.',
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
                // Erstelle einen neuen Laravel-User basierend auf FiveM-Daten
                try {
                    $laravelUser = \App\Models\User::create([
                        'name' => $discordUser['username'] ?? ($fivemUser->name ?? 'Discord User'),
                        'email' => $discordUser['email'] ?? ($fivemUser->email ?? "discord_{$discordId}@berlincity.local"),
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

            // Logge den Benutzer ein
            Auth::login($laravelUser, true); // true = remember me

            return redirect()->intended('/dashboard');
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

