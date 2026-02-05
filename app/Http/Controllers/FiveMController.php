<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FiveMController extends Controller
{
    /**
     * Test-Verbindung zum FiveM-Server
     */
    public function testConnection(Request $request)
    {
        try {
            $serverUrl = config('fivem.server_url');
            
            if (!$serverUrl) {
                return response()->json([
                    'success' => false,
                    'message' => 'FiveM Server-URL nicht konfiguriert',
                    'details' => 'Bitte FIVEM_SERVER_URL in .env setzen',
                ], 500);
            }

            // URL normalisieren
            $serverUrl = trim($serverUrl);
            if (!preg_match('/^https?:\/\//', $serverUrl)) {
                $serverUrl = ltrim($serverUrl, '/');
                $serverUrl = 'http://' . $serverUrl;
            }
            $serverUrl = rtrim($serverUrl, '/');

            // FiveM SetHttpHandler benötigt Resource-Namen als Prefix!
            // Format: http://IP:PORT/<RESOURCE_NAME>/<PATH>
            // Resource heißt: berlincity_api
            $endpoints = [
                $serverUrl . '/berlincity_api/test',  // Einfacher Pfad
                $serverUrl . '/berlincity_api/berlincity/test',  // Mit /berlincity Prefix
            ];

            $errors = [];
            
            foreach ($endpoints as $endpoint) {
                try {
                    Log::info('[FiveM Test] Versuche Endpoint', ['endpoint' => $endpoint]);
                    
                    $response = Http::timeout(10)
                        ->withOptions([
                            'verify' => false, // SSL-Zertifikat-Verifizierung deaktivieren für Tests
                        ])
                        ->get($endpoint);
                    
                    if ($response->successful()) {
                        Log::info('[FiveM Test] Erfolgreich', ['endpoint' => $endpoint]);
                        return response()->json([
                            'success' => true,
                            'message' => 'Verbindung erfolgreich!',
                            'endpoint' => $endpoint,
                            'status' => $response->status(),
                            'data' => $response->json(),
                        ]);
                    } else {
                        $errors[] = [
                            'endpoint' => $endpoint,
                            'status' => $response->status(),
                            'body' => $response->body(),
                        ];
                    }
                } catch (\Illuminate\Http\Client\ConnectionException $e) {
                    $errors[] = [
                        'endpoint' => $endpoint,
                        'error' => 'Verbindungsfehler',
                        'message' => $e->getMessage(),
                        'code' => $e->getCode(),
                    ];
                    Log::warning('[FiveM Test] Verbindungsfehler', [
                        'endpoint' => $endpoint,
                        'error' => $e->getMessage(),
                    ]);
                } catch (\Exception $e) {
                    $errors[] = [
                        'endpoint' => $endpoint,
                        'error' => get_class($e),
                        'message' => $e->getMessage(),
                        'code' => $e->getCode(),
                    ];
                    Log::warning('[FiveM Test] Fehler', [
                        'endpoint' => $endpoint,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Keine Verbindung zum FiveM-Server möglich',
                'server_url' => config('fivem.server_url'),
                'normalized_url' => $serverUrl,
                'endpoints_tested' => $endpoints,
                'errors' => $errors,
                'hint' => 'Prüfe: 1) Ist der FiveM-Server erreichbar? 2) Läuft die Resource berlincity_api? 3) Ist Port 30120 geöffnet?',
            ], 500);

        } catch (\Exception $e) {
            Log::error('[FiveM Test] Exception: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Fehler: ' . $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null,
            ], 500);
        }
    }

    /**
     * Spieler vom FiveM-Server abrufen
     */
    public function getPlayers(Request $request)
    {
        try {
            $serverUrl = config('fivem.server_url');
            $apiKey = config('fivem.api_key');

            if (!$serverUrl || !$apiKey) {
                return response()->json([
                    'success' => false,
                    'message' => 'FiveM Server-Konfiguration fehlt',
                ], 500);
            }

            // URL normalisieren
            $serverUrl = trim($serverUrl);
            if (!preg_match('/^https?:\/\//', $serverUrl)) {
                $serverUrl = ltrim($serverUrl, '/');
                $serverUrl = 'http://' . $serverUrl;
            }
            $serverUrl = rtrim($serverUrl, '/');

            // FiveM SetHttpHandler benötigt Resource-Namen als Prefix!
            // Format: http://IP:PORT/<RESOURCE_NAME>/<PATH>
            // Resource heißt: berlincity_api
            $endpoints = [
                $serverUrl . '/berlincity_api/players',  // Einfacher Pfad
                $serverUrl . '/berlincity_api/berlincity/players',  // Mit /berlincity Prefix
            ];

            $response = null;
            $lastError = null;

            foreach ($endpoints as $endpoint) {
                Log::info('[FiveM] Versuche Endpoint', ['endpoint' => $endpoint]);

                try {
                    $response = Http::timeout(10)
                        ->withHeaders([
                            'x-api-key' => $apiKey,
                        ])
                        ->get($endpoint);

                    if ($response->successful()) {
                        Log::info('[FiveM] Erfolgreich', ['endpoint' => $endpoint]);
                        $data = $response->json();
                        return response()->json([
                            'success' => true,
                            'data' => $data,
                        ]);
                    }

                    // Bei 404, versuche nächsten Endpoint
                    if ($response->status() === 404) {
                        Log::warning('[FiveM] 404, versuche nächsten Endpoint', ['endpoint' => $endpoint]);
                        continue;
                    }

                    // Bei anderen Fehlern, breche ab
                    break;
                } catch (\Exception $e) {
                    $lastError = $e;
                    Log::warning('[FiveM] Exception', [
                        'endpoint' => $endpoint,
                        'error' => $e->getMessage()
                    ]);
                    continue;
                }
            }

            // Fehlerbehandlung
            if (!$response) {
                throw $lastError ?? new \Exception('Keine Verbindung zum FiveM-Server');
            }

            return response()->json([
                'success' => false,
                'message' => 'Fehler beim Abrufen der Spielerliste: HTTP ' . $response->status(),
                'status' => $response->status(),
                'endpoint_used' => $endpoint ?? 'unbekannt',
                'response_body' => $response->body(),
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('[FiveM] Fehler: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Verbindungsfehler: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Spieler vom FiveM-Server kicken
     */
    public function kickPlayer(Request $request)
    {
        $request->validate([
            'player_id' => 'required|integer',
            'reason' => 'nullable|string',
        ]);

        $serverUrl = rtrim(config('fivem.server_url'), '/');
        $apiKey = config('fivem.api_key');

        if (!preg_match('/^https?:\/\//', $serverUrl)) {
            $serverUrl = 'http://' . ltrim($serverUrl, '/');
        }
        $serverUrl = rtrim($serverUrl, '/');

        // FiveM SetHttpHandler benötigt Resource-Namen als Prefix!
        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
        ])->post($serverUrl . '/berlincity_api/kick', [
            'player_id' => $request->player_id,
            'reason' => $request->reason ?? 'Kein Grund',
        ]);

        return response()->json([
            'success' => $response->successful(),
            'data' => $response->json(),
            'status' => $response->status(),
        ], $response->status());
    }

    /**
     * Spieler bannen
     */
    public function banPlayer(Request $request)
    {
        $request->validate([
            'player_id' => 'required|integer',
            'reason' => 'nullable|string',
            'duration' => 'nullable|integer|min:1', // Dauer in Stunden
        ]);

        $serverUrl = rtrim(config('fivem.server_url'), '/');
        $apiKey = config('fivem.api_key');

        if (!preg_match('/^https?:\/\//', $serverUrl)) {
            $serverUrl = 'http://' . ltrim($serverUrl, '/');
        }
        $serverUrl = rtrim($serverUrl, '/');

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
        ])->post($serverUrl . '/berlincity_api/ban', [
            'player_id' => $request->player_id,
            'reason' => $request->reason ?? 'Kein Grund angegeben',
            'duration' => $request->duration ?? 24, // Standard: 24 Stunden
        ]);

        return response()->json([
            'success' => $response->successful(),
            'data' => $response->json(),
            'status' => $response->status(),
        ], $response->status());
    }

    /**
     * Spieler verwarnen
     */
    public function warnPlayer(Request $request)
    {
        $request->validate([
            'player_id' => 'required|integer',
            'reason' => 'nullable|string',
        ]);

        $serverUrl = rtrim(config('fivem.server_url'), '/');
        $apiKey = config('fivem.api_key');

        if (!preg_match('/^https?:\/\//', $serverUrl)) {
            $serverUrl = 'http://' . ltrim($serverUrl, '/');
        }
        $serverUrl = rtrim($serverUrl, '/');

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
        ])->post($serverUrl . '/berlincity_api/warn', [
            'player_id' => $request->player_id,
            'reason' => $request->reason ?? 'Keine Warnung angegeben',
        ]);

        return response()->json([
            'success' => $response->successful(),
            'data' => $response->json(),
            'status' => $response->status(),
        ], $response->status());
    }

    /**
     * Direct Message an Spieler senden
     */
    public function sendDirectMessage(Request $request)
    {
        $request->validate([
            'player_id' => 'required|integer',
            'message' => 'required|string',
        ]);

        $serverUrl = rtrim(config('fivem.server_url'), '/');
        $apiKey = config('fivem.api_key');

        if (!preg_match('/^https?:\/\//', $serverUrl)) {
            $serverUrl = 'http://' . ltrim($serverUrl, '/');
        }
        $serverUrl = rtrim($serverUrl, '/');

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
        ])->post($serverUrl . '/berlincity_api/dm', [
            'player_id' => $request->player_id,
            'message' => $request->message,
        ]);

        return response()->json([
            'success' => $response->successful(),
            'data' => $response->json(),
            'status' => $response->status(),
        ], $response->status());
    }

    /**
     * Geld verwalten (ESX)
     */
    public function manageMoney(Request $request)
    {
        $request->validate([
            'player_id' => 'required|integer',
            'money_type' => 'required|string|in:cash,bank,black_money',
            'amount' => 'required|numeric|min:0',
            'operation' => 'required|string|in:set,add,remove',
        ]);

        $serverUrl = rtrim(config('fivem.server_url'), '/');
        $apiKey = config('fivem.api_key');

        if (!preg_match('/^https?:\/\//', $serverUrl)) {
            $serverUrl = 'http://' . ltrim($serverUrl, '/');
        }
        $serverUrl = rtrim($serverUrl, '/');

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
        ])->post($serverUrl . '/berlincity_api/money', [
            'player_id' => $request->player_id,
            'money_type' => $request->money_type,
            'amount' => $request->amount,
            'operation' => $request->operation,
        ]);

        return response()->json([
            'success' => $response->successful(),
            'data' => $response->json(),
            'status' => $response->status(),
        ], $response->status());
    }

    /**
     * Spieler wiederbeleben (ESX)
     */
    public function revivePlayer(Request $request)
    {
        $request->validate([
            'player_id' => 'required|integer',
        ]);

        $serverUrl = rtrim(config('fivem.server_url'), '/');
        $apiKey = config('fivem.api_key');

        if (!preg_match('/^https?:\/\//', $serverUrl)) {
            $serverUrl = 'http://' . ltrim($serverUrl, '/');
        }
        $serverUrl = rtrim($serverUrl, '/');

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
        ])->post($serverUrl . '/berlincity_api/revive', [
            'player_id' => $request->player_id,
        ]);

        return response()->json([
            'success' => $response->successful(),
            'data' => $response->json(),
            'status' => $response->status(),
        ], $response->status());
    }

    /**
     * Spieler-Details anzeigen
     */
    public function showPlayer($id)
    {
        try {
            $serverUrl = config('fivem.server_url');
            $apiKey = config('fivem.api_key');

            if (!$serverUrl || !$apiKey) {
                return redirect()->route('players.index')
                    ->with('error', 'FiveM Server-Konfiguration fehlt');
            }

            // URL normalisieren
            $serverUrl = trim($serverUrl);
            if (!preg_match('/^https?:\/\//', $serverUrl)) {
                $serverUrl = ltrim($serverUrl, '/');
                $serverUrl = 'http://' . $serverUrl;
            }
            $serverUrl = rtrim($serverUrl, '/');

            // Spielerdaten abrufen
            $response = Http::timeout(10)
                ->withHeaders([
                    'x-api-key' => $apiKey,
                ])
                ->get($serverUrl . '/berlincity_api/players');

            if (!$response->successful()) {
                return redirect()->route('players.index')
                    ->with('error', 'Fehler beim Abrufen der Spielerdaten');
            }

            $data = $response->json();
            $players = $data['players'] ?? [];
            
            // Spieler mit der ID finden
            $player = collect($players)->firstWhere('id', (int) $id);

            if (!$player) {
                return redirect()->route('players.index')
                    ->with('error', 'Spieler nicht gefunden');
            }

            return \Inertia\Inertia::render('Players/Show', [
                'player' => $player,
            ]);

        } catch (\Exception $e) {
            Log::error('[FiveM] Fehler beim Abrufen der Spielerdaten: ' . $e->getMessage());
            return redirect()->route('players.index')
                ->with('error', 'Verbindungsfehler: ' . $e->getMessage());
        }
    }

}


