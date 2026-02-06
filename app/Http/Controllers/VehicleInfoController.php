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
            // Hole Spieler-Identifier aus der FiveM-Datenbank
            $player = DB::connection('fivem')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player) {
                return Inertia::render('UCP/VehicleInfo/Index', [
                    'vehicles' => [],
                    'error' => 'Keine Spielerdaten in der FiveM-Datenbank gefunden.',
                ]);
            }

            $identifier = $player->identifier;

            // Versuche verschiedene Tabellennamen für Fahrzeuge
            $vehicles = [];
            $seenPlates = []; // Verhindere Duplikate basierend auf Kennzeichen
            
            // Prüfe owned_vehicles Tabelle (Standard ESX)
            try {
                $ownedVehicles = DB::connection('fivem')
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
                    $vehiclesData = DB::connection('fivem')
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

            return Inertia::render('VehicleInfo/Index', [
                'vehicles' => $vehicles,
                'identifier' => $identifier,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Fahrzeugdaten', [
                'message' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return Inertia::render('VehicleInfo/Index', [
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

