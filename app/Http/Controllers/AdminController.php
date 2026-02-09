<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Zeige die Admin-Übersicht
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
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player) {
                return redirect('/ucp/dashboard')->withErrors([
                    'message' => 'Keine Spielerdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            // Prüfe, ob Benutzer Admin-Rechte hat (Gruppe != "user")
            $userGroup = $player->group ?? 'user';
            
            if ($userGroup === 'user') {
                return redirect('/ucp/dashboard')->withErrors([
                    'message' => 'Zugriff verweigert. Du hast keine Berechtigung für diesen Bereich.',
                ]);
            }

            // Hole online Spieler über die Westpoint API
            $onlinePlayers = $this->getOnlinePlayers();

            return Inertia::render('UCP/Admin/Index', [
                'userGroup' => $userGroup,
                'onlinePlayers' => $onlinePlayers,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Admin-Daten', [
                'message' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return Inertia::render('UCP/Admin/Index', [
                'userGroup' => null,
                'onlinePlayers' => [],
                'error' => config('app.debug') 
                    ? $e->getMessage() 
                    : 'Fehler beim Abrufen der Admin-Daten.',
            ]);
        }
    }

    /**
     * Aktualisiere die online Spieler
     */
    public function refresh()
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            $onlinePlayers = $this->getOnlinePlayers();

            return response()->json([
                'success' => true,
                'players' => $onlinePlayers,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Aktualisieren der Spielerliste', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler beim Aktualisieren',
            ], 500);
        }
    }

    /**
     * Hole Spielerdetails aus der RedM-Datenbank
     */
    public function getPlayerDetails(Request $request)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            $request->validate([
                'identifier' => 'required|string',
            ]);

            // Hole Spielerdaten aus der RedM-Datenbank
            $targetPlayer = DB::connection('redm')
                ->table('users')
                ->where('identifier', $request->identifier)
                ->first();

            if (!$targetPlayer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Spieler nicht gefunden',
                ], 404);
            }

            // Dekodiere JSON-Felder
            $playerData = [
                'identifier' => $targetPlayer->identifier ?? null,
                'discord_identifier' => $targetPlayer->discord_identifier ?? null,
                'firstname' => $targetPlayer->firstname ?? null,
                'lastname' => $targetPlayer->lastname ?? null,
                'dateofbirth' => $targetPlayer->dateofbirth ?? null,
                'sex' => $targetPlayer->sex ?? null,
                'height' => $targetPlayer->height ?? null,
                'job' => $targetPlayer->job ?? null,
                'job_grade' => $targetPlayer->job_grade ?? null,
                'group' => $targetPlayer->group ?? null,
                'phone_number' => $targetPlayer->phone_number ?? null,
                'isOnline' => $targetPlayer->isOnline ?? false,
                'last_seen' => $targetPlayer->last_seen ?? null,
                'created_at' => $targetPlayer->created_at ?? null,
                'accounts' => $this->decodeJson($targetPlayer->accounts),
                'status' => $targetPlayer->status ?? null,
                'is_dead' => $targetPlayer->is_dead ?? false,
            ];

            return response()->json([
                'success' => true,
                'player' => $playerData,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Spielerdetails', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler beim Abrufen der Spielerdaten',
            ], 500);
        }
    }

    /**
     * Führe eine Aktion auf einen Spieler aus
     */
    public function performPlayerAction(Request $request)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            $request->validate([
                'action' => 'required|string|in:kick,ban,warn,dm,revive',
                'player_id' => 'required|integer',
                'reason' => 'nullable|string',
                'message' => 'nullable|string',
                'duration' => 'nullable|integer',
            ]);

            $serverUrl = config('redm.server_url');
            $apiKey = config('redm.api_key');

            if (!preg_match('/^https?:\/\//', $serverUrl)) {
                $serverUrl = 'http://' . ltrim($serverUrl, '/');
            }
            $serverUrl = rtrim($serverUrl, '/');

            $endpoint = match($request->action) {
                'kick' => '/westpoint_api/kick',
                'ban' => '/westpoint_api/ban',
                'warn' => '/westpoint_api/warn',
                'dm' => '/westpoint_api/dm',
                'revive' => '/westpoint_api/revive',
                default => null,
            };

            if (!$endpoint) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ungültige Aktion',
                ], 400);
            }

            $payload = ['player_id' => $request->player_id];
            
            if ($request->action === 'dm') {
                $payload['message'] = $request->message ?? '';
            } elseif ($request->action === 'ban') {
                $payload['reason'] = $request->reason ?? 'Kein Grund angegeben';
                $payload['duration'] = $request->duration ?? 24;
            } elseif (in_array($request->action, ['kick', 'warn'])) {
                $payload['reason'] = $request->reason ?? 'Kein Grund angegeben';
            }

            $response = Http::timeout(10)
                ->withHeaders([
                    'x-api-key' => $apiKey ?? '',
                ])
                ->post($serverUrl . $endpoint, $payload);

            return response()->json([
                'success' => $response->successful(),
                'data' => $response->json(),
                'status' => $response->status(),
            ], $response->status());
        } catch (\Exception $e) {
            Log::error('Fehler bei Spieler-Aktion', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler bei der Aktion',
            ], 500);
        }
    }

    /**
     * Massenvergabe von Ressourcen an Spieler
     */
    public function bulkAssign(Request $request)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            // Unterstütze sowohl das alte Format (player_ids) als auch das neue Format (players_data)
            if ($request->has('players_data')) {
                $playersData = $request->input('players_data', []);
            } else {
                // Legacy: Konvertiere player_ids zu players_data Format
                $playerIds = $request->input('player_ids', []);
                $playersData = array_map(function($id) {
                    return ['id' => $id, 'identifier' => null];
                }, $playerIds);
            }
            
            $request->validate([
                'players_data' => 'required|array|min:1',
                'players_data.*.id' => 'required',
                'resource_type' => 'required|string|in:role,money,gold,items,b_coins',
            ]);

            $resourceType = $request->resource_type;
            $serverUrl = config('redm.server_url');
            $apiKey = config('redm.api_key');

            if (!preg_match('/^https?:\/\//', $serverUrl)) {
                $serverUrl = 'http://' . ltrim($serverUrl, '/');
            }
            $serverUrl = rtrim($serverUrl, '/');

            $updated = 0;
            $errors = [];

            foreach ($playersData as $playerData) {
                try {
                    $playerId = $playerData['id'] ?? null;
                    $identifier = $playerData['identifier'] ?? null;
                    
                    if (!$playerId) {
                        $errors[] = "Ungültige Spieler-Daten: ID fehlt";
                        continue;
                    }
                    
                    // Für API-Aufrufe (Cash, Bank, Black Money, Items) brauchen wir keine DB-Suche
                    // Für DB-Updates (Rolle, B Coins) müssen wir den identifier finden
                    $targetPlayer = null;
                    $needsDbUpdate = in_array($resourceType, ['role', 'b_coins']);
                    
                    if ($needsDbUpdate) {
                        // Hole identifier über die API, falls nicht vorhanden
                        if (!$identifier && is_numeric($playerId)) {
                            try {
                                // Versuche identifier über verschiedene API-Endpoints zu holen
                                $endpoints = [
                                    $serverUrl . '/westpoint_api/player/' . $playerId,
                                    $serverUrl . '/westpoint_api/players/' . $playerId,
                                    $serverUrl . '/westpoint_api/getPlayer/' . $playerId,
                                ];
                                
                                foreach ($endpoints as $endpoint) {
                                    try {
                                        $playerInfoResponse = Http::timeout(5)
                                            ->withHeaders(['x-api-key' => $apiKey ?? ''])
                                            ->get($endpoint);
                                        
                                        if ($playerInfoResponse->successful()) {
                                            $playerInfo = $playerInfoResponse->json();
                                            $identifier = $playerInfo['identifier'] 
                                                ?? $playerInfo['data']['identifier'] 
                                                ?? $playerInfo['player']['identifier'] 
                                                ?? null;
                                            
                                            if ($identifier) {
                                                Log::info('Identifier über API gefunden', [
                                                    'player_id' => $playerId,
                                                    'identifier' => $identifier,
                                                    'endpoint' => $endpoint,
                                                ]);
                                                break;
                                            }
                                        }
                                    } catch (\Exception $e) {
                                        continue;
                                    }
                                }
                                
                                // Fallback: Versuche identifier aus der Online-Spieler-Liste zu holen
                                if (!$identifier) {
                                    try {
                                        $playersResponse = Http::timeout(5)
                                            ->withHeaders(['x-api-key' => $apiKey ?? ''])
                                            ->get($serverUrl . '/westpoint_api/players');
                                        
                                        if ($playersResponse->successful()) {
                                            $playersData = $playersResponse->json();
                                            $players = $playersData['players'] ?? $playersData['data'] ?? [];
                                            
                                            foreach ($players as $player) {
                                                if (($player['id'] ?? $player['source'] ?? null) == $playerId) {
                                                    $identifier = $player['identifier'] ?? null;
                                                    if ($identifier) {
                                                        Log::info('Identifier aus Spielerliste gefunden', [
                                                            'player_id' => $playerId,
                                                            'identifier' => $identifier,
                                                        ]);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (\Exception $e) {
                                        Log::warning('Fehler beim Abrufen der Spielerliste', [
                                            'player_id' => $playerId,
                                            'error' => $e->getMessage(),
                                        ]);
                                    }
                                }
                            } catch (\Exception $e) {
                                Log::warning('Fehler beim Abrufen des identifiers über API', [
                                    'player_id' => $playerId,
                                    'error' => $e->getMessage(),
                                ]);
                            }
                        }
                        
                        // Suche über identifier in der Datenbank
                        if ($identifier) {
                            try {
                                // Versuche verschiedene Identifier-Formate
                                // 1. Exakte Suche
                                $targetPlayer = DB::connection('redm')
                                    ->table('users')
                                    ->where('identifier', $identifier)
                                    ->first();
                                
                                // 2. Falls nicht gefunden, versuche ohne "license:" Präfix
                                if (!$targetPlayer && strpos($identifier, 'license:') === 0) {
                                    $identifierWithoutPrefix = substr($identifier, 8); // Entferne "license:"
                                    $targetPlayer = DB::connection('redm')
                                        ->table('users')
                                        ->where('identifier', $identifierWithoutPrefix)
                                        ->orWhere('identifier', 'like', '%' . $identifierWithoutPrefix . '%')
                                        ->first();
                                }
                                
                                // 3. Falls immer noch nicht gefunden, versuche mit "license:" Präfix
                                if (!$targetPlayer && strpos($identifier, 'license:') !== 0) {
                                    $identifierWithPrefix = 'license:' . $identifier;
                                    $targetPlayer = DB::connection('redm')
                                        ->table('users')
                                        ->where('identifier', $identifierWithPrefix)
                                        ->orWhere('identifier', 'like', '%' . $identifier . '%')
                                        ->first();
                                }
                                
                                if ($targetPlayer) {
                                    Log::info('Spieler über identifier gefunden', [
                                        'identifier' => $identifier,
                                        'db_id' => $targetPlayer->id,
                                        'db_identifier' => $targetPlayer->identifier ?? 'N/A',
                                    ]);
                                } else {
                                    Log::warning('Spieler nicht über identifier gefunden', [
                                        'identifier' => $identifier,
                                        'identifier_length' => strlen($identifier),
                                    ]);
                                    
                                    // Debug: Prüfe, ob identifier-Spalte existiert und zeige Beispiel-Werte
                                    try {
                                        $sampleIdentifiers = DB::connection('redm')
                                            ->table('users')
                                            ->select('identifier')
                                            ->whereNotNull('identifier')
                                            ->limit(3)
                                            ->get();
                                        
                                        Log::info('Beispiel-Identifier aus Datenbank', [
                                            'samples' => $sampleIdentifiers->pluck('identifier')->toArray(),
                                        ]);
                                    } catch (\Exception $e) {
                                        Log::warning('Konnte Beispiel-Identifier nicht abrufen', [
                                            'error' => $e->getMessage(),
                                        ]);
                                    }
                                }
                            } catch (\Exception $e) {
                                Log::error('Fehler bei Identifier-Suche', [
                                    'identifier' => $identifier,
                                    'error' => $e->getMessage(),
                                    'trace' => $e->getTraceAsString(),
                                ]);
                            }
                        }
                        
                        // Fallback: Suche über ID (falls identifier nicht verfügbar)
                        if (!$targetPlayer && is_numeric($playerId)) {
                            try {
                                $targetPlayer = DB::connection('redm')
                                    ->table('users')
                                    ->where('id', (int)$playerId)
                                    ->first();
                            } catch (\Exception $e) {
                                Log::warning('Fehler bei ID-Suche', [
                                    'player_id' => $playerId,
                                    'error' => $e->getMessage(),
                                ]);
                            }
                        }

                        if (!$targetPlayer) {
                            $errorMsg = $identifier 
                                ? "Spieler mit ID '{$playerId}' und Identifier '{$identifier}' nicht in der Datenbank gefunden"
                                : "Spieler mit ID '{$playerId}' nicht in der Datenbank gefunden";
                            $errors[] = $errorMsg;
                            Log::warning('Spieler nicht gefunden für DB-Update', [
                                'player_id' => $playerId,
                                'identifier' => $identifier,
                                'resource_type' => $resourceType,
                            ]);
                            continue;
                        }
                        
                        Log::info('Spieler gefunden für DB-Update', [
                            'player_id' => $playerId,
                            'identifier' => $identifier,
                            'db_id' => $targetPlayer->id,
                            'db_identifier' => $targetPlayer->identifier ?? 'N/A',
                            'resource_type' => $resourceType,
                        ]);
                    } else {
                        // Für API-Aufrufe brauchen wir nur die playerId
                        Log::info('Verwende Online-Spieler-ID für API-Aufruf', [
                            'player_id' => $playerId,
                            'resource_type' => $resourceType,
                        ]);
                    }

                    // Verarbeite je nach Ressourcentyp
                    if ($resourceType === 'role') {
                        $request->validate(['role' => 'required|string|max:255']);
                        DB::connection('redm')
                            ->table('users')
                            ->where('id', $targetPlayer->id)
                            ->update(['group' => $request->role]);
                        $updated++;
                    } 
                    elseif (in_array($resourceType, ['money', 'gold'])) {
                        $request->validate(['amount' => 'required|numeric|min:0']);
                        
                        // Verwende die Westpoint API für Geld
                        // Die API erwartet die Online-Spieler-ID (source/id), nicht die DB-ID
                        $apiPlayerId = is_numeric($playerId) ? (int)$playerId : $playerId;
                        
                        Log::info('Füge Geld über API hinzu', [
                            'original_player_id' => $playerId,
                            'api_player_id' => $apiPlayerId,
                            'money_type' => $resourceType,
                            'amount' => $request->amount,
                        ]);
                        
                        $response = Http::timeout(10)
                            ->withHeaders(['x-api-key' => $apiKey ?? ''])
                            ->post($serverUrl . '/westpoint_api/money', [
                                'player_id' => $apiPlayerId,
                                'money_type' => $resourceType,
                                'amount' => $request->amount,
                                'operation' => 'add', // Füge zum vorhandenen Betrag hinzu
                            ]);
                        
                        if ($response->successful()) {
                            $responseData = $response->json();
                            // Prüfe auch, ob die API selbst success: false zurückgibt
                            if (isset($responseData['success']) && $responseData['success'] === false) {
                                $errorMsg = $responseData['error'] ?? $responseData['message'] ?? 'API-Fehler';
                                $errors[] = "Fehler bei Spieler ID {$playerId}: {$errorMsg}";
                                Log::error('API gab success: false zurück', [
                                    'player_id' => $playerId,
                                    'api_player_id' => $apiPlayerId,
                                    'money_type' => $resourceType,
                                    'response' => $responseData,
                                ]);
                            } else {
                                $updated++;
                                Log::info('Geld erfolgreich hinzugefügt', [
                                    'player_id' => $playerId,
                                    'api_player_id' => $apiPlayerId,
                                    'money_type' => $resourceType,
                                    'amount' => $request->amount,
                                    'response' => $responseData,
                                ]);
                            }
                        } else {
                            $errorData = $response->json();
                            $errorMsg = $errorData['error'] ?? $errorData['message'] ?? 'API-Fehler (HTTP ' . $response->status() . ')';
                            $errors[] = "Fehler bei Spieler ID {$playerId}: {$errorMsg}";
                            Log::error('Fehler beim Hinzufügen von Geld', [
                                'player_id' => $playerId,
                                'api_player_id' => $apiPlayerId,
                                'money_type' => $resourceType,
                                'url' => $serverUrl . '/westpoint_api/money',
                                'payload' => [
                                    'player_id' => $apiPlayerId,
                                    'money_type' => $resourceType,
                                    'amount' => $request->amount,
                                    'operation' => 'add',
                                ],
                                'response' => $errorData,
                                'status' => $response->status(),
                                'body' => $response->body(),
                            ]);
                        }
                    }
                    elseif ($resourceType === 'b_coins') {
                        $request->validate(['amount' => 'required|numeric|min:0']);
                        DB::connection('redm')
                            ->table('users')
                            ->where('id', $targetPlayer->id)
                            ->update(['b_coins' => $request->amount]);
                        $updated++;
                    }
                    elseif ($resourceType === 'items') {
                        $request->validate([
                            'items' => 'required|array|min:1',
                            'items.*.name' => 'required|string',
                            'items.*.amount' => 'required|integer|min:1',
                        ]);
                        
                        // Verwende die Westpoint API für Items
                        // Die API erwartet die Online-Spieler-ID (source/id), nicht die DB-ID
                        $apiPlayerId = is_numeric($playerId) ? (int)$playerId : $playerId;
                        
                        $itemsSuccess = 0;
                        $itemsErrors = [];
                        
                        // Füge jedes Item über die API hinzu
                        foreach ($request->items as $item) {
                            $itemName = $item['name'];
                            $itemQuantity = (int)$item['amount'];
                            
                            if (empty($itemName) || $itemQuantity <= 0) {
                                continue; // Überspringe ungültige Items
                            }
                            
                            try {
                                Log::info('Füge Item über API hinzu', [
                                    'player_id' => $playerId,
                                    'api_player_id' => $apiPlayerId,
                                    'item' => $itemName,
                                    'quantity' => $itemQuantity,
                                ]);
                                
                                $response = Http::timeout(10)
                                    ->withHeaders(['x-api-key' => $apiKey ?? ''])
                                    ->post($serverUrl . '/westpoint_api/giveitem', [
                                        'player_id' => $apiPlayerId,
                                        'item' => $itemName,
                                        'quantity' => $itemQuantity,
                                    ]);
                                
                                if ($response->successful()) {
                                    $itemsSuccess++;
                                    Log::info('Item erfolgreich hinzugefügt', [
                                        'player_id' => $playerId,
                                        'item' => $itemName,
                                        'quantity' => $itemQuantity,
                                    ]);
                                } else {
                                    $errorData = $response->json();
                                    $errorMsg = $errorData['error'] ?? $errorData['message'] ?? 'API-Fehler';
                                    $itemsErrors[] = "Item '{$itemName}': {$errorMsg}";
                                    Log::error('Fehler beim Hinzufügen von Item', [
                                        'player_id' => $playerId,
                                        'item' => $itemName,
                                        'response' => $errorData,
                                        'status' => $response->status(),
                                    ]);
                                }
                            } catch (\Exception $e) {
                                $itemsErrors[] = "Item '{$itemName}': " . $e->getMessage();
                                Log::error('Fehler beim Hinzufügen von Item', [
                                    'player_id' => $playerId,
                                    'item' => $itemName,
                                    'error' => $e->getMessage(),
                                ]);
                            }
                        }
                        
                        if ($itemsSuccess > 0) {
                            $updated++;
                        }
                        
                        // Füge Item-Fehler zu den allgemeinen Fehlern hinzu
                        if (!empty($itemsErrors)) {
                            $errors[] = "Spieler ID {$playerId}: " . implode(', ', $itemsErrors);
                        }
                    }
                } catch (\Exception $e) {
                    $playerIdStr = $playerData['id'] ?? 'unbekannt';
                    Log::error('Fehler bei der Massenvergabe', [
                        'player_id' => $playerIdStr,
                        'identifier' => $identifier ?? 'N/A',
                        'resource_type' => $resourceType,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                    ]);
                    $errors[] = "Fehler bei Spieler ID {$playerIdStr}: " . $e->getMessage();
                }
            }

                $resourceNames = [
                'role' => 'Rolle',
                'money' => 'Geld',
                'gold' => 'Gold',
                'b_coins' => 'B Coins',
                'items' => 'Items',
            ];

            $message = $updated > 0 
                ? "{$resourceNames[$resourceType]} wurde an {$updated} Spieler zugewiesen." 
                : 'Keine Spieler konnten aktualisiert werden.';
            
            // Füge Fehlerdetails zur Nachricht hinzu, falls vorhanden
            if (!empty($errors)) {
                $message .= ' Fehler: ' . implode('; ', array_slice($errors, 0, 3));
                if (count($errors) > 3) {
                    $message .= ' (und ' . (count($errors) - 3) . ' weitere)';
                }
            }

            Log::info('Bulk Assign abgeschlossen', [
                'resource_type' => $resourceType,
                'updated' => $updated,
                'total_players' => count($playersData),
                'errors_count' => count($errors),
                'errors' => $errors,
            ]);

            return response()->json([
                'success' => $updated > 0,
                'message' => $message,
                'updated' => $updated,
                'total' => count($playersData),
                'errors' => $errors,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler bei der Massenvergabe', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler bei der Massenvergabe: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hole verfügbare Items
     */
    public function getItems()
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            $items = [];

            // Versuche Items aus der items-Tabelle zu holen
            try {
                // Prüfe verschiedene mögliche Spaltennamen (name, item, item_name, label)
                $itemsQuery = DB::connection('redm')->table('items');
                
                // Versuche verschiedene Spaltennamen
                $nameColumn = null;
                $labelColumn = null;
                
                // Prüfe name/item/item_name Spalte
                foreach (['name', 'item', 'item_name'] as $column) {
                    try {
                        $test = DB::connection('redm')
                            ->table('items')
                            ->select($column)
                            ->limit(1)
                            ->first();
                        if ($test && isset($test->$column)) {
                            $nameColumn = $column;
                            break;
                        }
                    } catch (\Exception $e) {
                        continue;
                    }
                }
                
                // Prüfe label Spalte
                try {
                    $test = DB::connection('redm')
                        ->table('items')
                        ->select('label')
                        ->limit(1)
                        ->first();
                    if ($test && isset($test->label)) {
                        $labelColumn = 'label';
                    }
                } catch (\Exception $e) {
                    // Label-Spalte existiert nicht
                }
                
                if ($nameColumn) {
                    if ($labelColumn) {
                        // Hole name und label
                        $items = DB::connection('redm')
                            ->table('items')
                            ->select($nameColumn . ' as name', 'label')
                            ->orderBy($nameColumn)
                            ->get()
                            ->map(function ($item) {
                                return [
                                    'name' => $item->name ?? null,
                                    'label' => $item->label ?? $item->name ?? 'Unbekannt'
                                ];
                            })
                            ->filter(function ($item) {
                                return !empty($item['name']);
                            })
                            ->values()
                            ->toArray();
                    } else {
                        // Nur name verfügbar
                        $items = DB::connection('redm')
                            ->table('items')
                            ->select($nameColumn . ' as name')
                            ->orderBy($nameColumn)
                            ->get()
                            ->map(function ($item) {
                                return [
                                    'name' => $item->name ?? null,
                                    'label' => $item->name ?? 'Unbekannt'
                                ];
                            })
                            ->filter(function ($item) {
                                return !empty($item['name']);
                            })
                            ->values()
                            ->toArray();
                    }
                } else {
                    // Falls keine Spalte gefunden, versuche alle Spalten
                    $items = DB::connection('redm')
                        ->table('items')
                        ->get()
                        ->map(function ($item) {
                            $name = $item->name ?? $item->item ?? $item->item_name ?? null;
                            $label = $item->label ?? $name;
                            return [
                                'name' => $name,
                                'label' => $label ?? 'Unbekannt'
                            ];
                        })
                        ->filter(function ($item) {
                            return !empty($item['name']);
                        })
                        ->unique('name')
                        ->values()
                        ->toArray();
                }
            } catch (\Exception $e) {
                Log::info('Items-Tabelle nicht gefunden oder Fehler', [
                    'error' => $e->getMessage(),
                    'table' => 'items'
                ]);
                
                // Fallback: Versuche aus Inventaren zu holen
                try {
                    $itemNames = DB::connection('redm')
                        ->table('users')
                        ->whereNotNull('inventory')
                        ->get()
                        ->map(function ($user) {
                            $inventory = json_decode($user->inventory, true);
                            if (is_array($inventory)) {
                                return array_map(function ($item) {
                                    return $item['name'] ?? null;
                                }, $inventory);
                            }
                            return [];
                        })
                        ->flatten()
                        ->filter()
                        ->unique()
                        ->values()
                        ->toArray();
                    
                    $items = array_map(function ($name) {
                        return [
                            'name' => $name,
                            'label' => $name
                        ];
                    }, $itemNames);
                } catch (\Exception $e2) {
                    Log::error('Fehler beim Abrufen der Items aus Inventaren', [
                        'error' => $e2->getMessage(),
                    ]);
                }
            }

            // Fallback: Standard-Items falls keine gefunden
            if (empty($items)) {
                $fallbackItems = [
                    'bread', 'water', 'phone', 'radio', 'lockpick', 'bandage',
                    'medkit', 'weapon_pistol', 'weapon_knife', 'ammo-9',
                ];
                $items = array_map(function ($name) {
                    return [
                        'name' => $name,
                        'label' => $name
                    ];
                }, $fallbackItems);
            }

            return response()->json([
                'success' => true,
                'items' => $items,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Items', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => true,
                'items' => ['bread', 'water', 'phone', 'radio', 'lockpick', 'bandage', 'medkit'],
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

    /**
     * Hole online Spieler über die Westpoint API
     */
    private function getOnlinePlayers()
    {
        try {
            $serverUrl = config('redm.server_url');
            $apiKey = config('redm.api_key');

            if (!$serverUrl) {
                return [];
            }

            // URL normalisieren
            $serverUrl = trim($serverUrl);
            if (!preg_match('/^https?:\/\//', $serverUrl)) {
                $serverUrl = 'http://' . ltrim($serverUrl, '/');
            }
            $serverUrl = rtrim($serverUrl, '/');

            // Versuche verschiedene Endpoints
            $endpoints = [
                $serverUrl . '/westpoint_api/players',
                $serverUrl . '/westpoint_api/westpoint/players',
            ];

            foreach ($endpoints as $endpoint) {
                try {
                    $response = Http::timeout(10)
                        ->withHeaders([
                            'x-api-key' => $apiKey ?? '',
                        ])
                        ->get($endpoint);

                    if ($response->successful()) {
                        $data = $response->json();
                        return $data['players'] ?? $data['data'] ?? $data ?? [];
                    }
                } catch (\Exception $e) {
                    Log::info('Westpoint API Endpoint fehlgeschlagen', [
                        'endpoint' => $endpoint,
                        'error' => $e->getMessage(),
                    ]);
                    continue;
                }
            }

            return [];
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der online Spieler', [
                'message' => $e->getMessage(),
            ]);
            return [];
        }
    }
}

