<?php

namespace App\Http\Controllers;

use App\Data\VehicleModels;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VehicleInfoController extends Controller
{
    /**
     * Zeige die Fahrzeuginformationen
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
            // Hole Spieler-Identifier aus der RedM-Datenbank
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('identifier', 'like', '%' . $user->discord_identifier . '%')
                ->first();

            if (!$redmUser) {
                return Inertia::render('UCP/VehicleInfo/Index', [
                    'vehicles' => [],
                    'error' => 'Keine Spielerdaten in der RedM-Datenbank gefunden.',
                ]);
            }

            $identifier = $redmUser->identifier;

            // Versuche verschiedene Tabellennamen für Fahrzeuge
            $vehicles = [];
            $seenPlates = []; // Verhindere Duplikate basierend auf Kennzeichen
            
            // Prüfe wagons Tabelle (RedM verwendet wagons statt vehicles)
            try {
                $character = DB::connection('redm')
                    ->table('characters')
                    ->where('identifier', $identifier)
                    ->where('discordid', $user->discord_identifier)
                    ->first();
                
                if ($character) {
                    $wagons = DB::connection('redm')
                        ->table('wagons')
                        ->where('identifier', $identifier)
                        ->where('charid', $character->charidentifier)
                        ->get();
                    
                    foreach ($wagons as $wagon) {
                        $items = $this->decodeJson($wagon->items);
                        
                        $vehicles[] = [
                            'id' => $wagon->id,
                            'model' => $wagon->model,
                            'name' => $wagon->name,
                            'items' => $items,
                            'selected' => $wagon->selected,
                            'type' => 'wagon',
                        ];
                    }
                }
            } catch (\Exception $e) {
                Log::info('wagons Tabelle nicht gefunden oder Fehler', ['error' => $e->getMessage()]);
            }
            
            // Prüfe stagecoaches Tabelle (Alternative für RedM)
            try {
                if (isset($character)) {
                    $stagecoaches = DB::connection('redm')
                        ->table('stagecoaches')
                        ->where('identifier', $identifier)
                        ->where('charid', $character->charidentifier)
                        ->get();
                    
                    foreach ($stagecoaches as $stagecoach) {
                        $items = $this->decodeJson($stagecoach->items ?? '{}');
                        
                        $vehicles[] = [
                            'id' => $stagecoach->id,
                            'model' => $stagecoach->model,
                            'name' => $stagecoach->name,
                            'items' => $items,
                            'selected' => $stagecoach->selected ?? 0,
                            'type' => 'stagecoach',
                        ];
                    }
                }
            } catch (\Exception $e) {
                Log::info('stagecoaches Tabelle nicht gefunden oder Fehler', ['error' => $e->getMessage()]);
            }
            
            // Prüfe owned_vehicles Tabelle (Fallback für Kompatibilität)
            try {
                $ownedVehicles = DB::connection('redm')
                    ->table('owned_vehicles')
                    ->where('owner', $identifier)
                    ->get();
                
                foreach ($ownedVehicles as $vehicle) {
                    $plate = $vehicle->plate ?? null;
                    
                    // Überspringe, wenn Kennzeichen bereits vorhanden
                    if ($plate && in_array($plate, $seenPlates)) {
                        continue;
                    }
                    
                    if ($plate) {
                        $seenPlates[] = $plate;
                    }
                    
                    $vehicleData = $this->decodeJson($vehicle->vehicle);
                    $modelHash = $vehicleData['model'] ?? null;
                    $modelName = $modelHash ? VehicleModels::getModelName($modelHash) : null;
                    
                    $vehicles[] = [
                        'plate' => $plate,
                        'vehicle' => $vehicleData,
                        'model_hash' => $modelHash,
                        'model_name' => $modelName,
                        'stored' => $vehicle->stored ?? null,
                        'garage' => $vehicle->garage ?? null,
                        'type' => $vehicle->type ?? null,
                        'job' => $vehicle->job ?? null,
                        'owner' => $vehicle->owner ?? null,
                    ];
                }
            } catch (\Exception $e) {
                Log::info('owned_vehicles Tabelle nicht gefunden oder Fehler', ['error' => $e->getMessage()]);
            }

            // Prüfe vehicles Tabelle (Alternative) - nur wenn owned_vehicles leer war
            if (empty($vehicles)) {
                try {
                    $vehiclesData = DB::connection('redm')
                        ->table('vehicles')
                        ->where('owner', $identifier)
                        ->orWhere('identifier', $identifier)
                        ->get();
                    
                    foreach ($vehiclesData as $vehicle) {
                        $plate = $vehicle->plate ?? null;
                        
                        // Überspringe, wenn Kennzeichen bereits vorhanden
                        if ($plate && in_array($plate, $seenPlates)) {
                            continue;
                        }
                        
                        if ($plate) {
                            $seenPlates[] = $plate;
                        }
                        
                        $vehicleData = $this->decodeJson($vehicle->vehicle ?? $vehicle->mods ?? null);
                        $modelHash = $vehicleData['model'] ?? null;
                        $modelName = $modelHash ? VehicleModels::getModelName($modelHash) : null;
                        
                        $vehicles[] = [
                            'plate' => $plate,
                            'vehicle' => $vehicleData,
                            'model_hash' => $modelHash,
                            'model_name' => $modelName,
                            'stored' => $vehicle->stored ?? null,
                            'garage' => $vehicle->garage ?? null,
                            'type' => $vehicle->type ?? null,
                            'job' => $vehicle->job ?? null,
                            'owner' => $vehicle->owner ?? $vehicle->identifier ?? null,
                        ];
                    }
                } catch (\Exception $e) {
                    Log::info('vehicles Tabelle nicht gefunden oder Fehler', ['error' => $e->getMessage()]);
                }
            }
            
            // Entferne Duplikate basierend auf Kennzeichen (falls noch welche vorhanden)
            $uniqueVehicles = [];
            $usedPlates = [];
            foreach ($vehicles as $vehicle) {
                $plate = $vehicle['plate'] ?? null;
                $key = $plate ?: uniqid('vehicle_', true);
                
                if (!in_array($key, $usedPlates)) {
                    $usedPlates[] = $key;
                    $uniqueVehicles[] = $vehicle;
                }
            }
            $vehicles = $uniqueVehicles;

            return Inertia::render('UCP/VehicleInfo/Index', [
                'vehicles' => $vehicles,
                'identifier' => $identifier,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Fahrzeugdaten', [
                'message' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return Inertia::render('UCP/VehicleInfo/Index', [
                'vehicles' => [],
                'error' => config('app.debug') 
                    ? $e->getMessage() 
                    : 'Fehler beim Abrufen der Fahrzeugdaten.',
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

