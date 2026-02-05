<?php

namespace App\Data;

class VehicleModels
{
    /**
     * Mapping von Fahrzeug-Hash zu Fahrzeugnamen
     * Beispiele für Standard GTA V Fahrzeuge und Add-On Fahrzeuge
     */
    public static function getModelName($hash): ?string
    {
        $models = self::getModels();
        return $models[$hash] ?? null;
    }

    /**
     * Alle verfügbaren Fahrzeugmodelle
     * Erweitere diese Liste mit deinen Add-On Fahrzeugen
     */
    public static function getModels(): array
    {
        return [
            // Standard GTA V Fahrzeuge - Beispiele
            -208911803 => 'Adder',
            -1311240698 => 'Airbus',
            -214906006 => 'Airtug',
            
            // Add-On Fahrzeuge - Beispiele (erweitere diese Liste)
            // Beispiel: -123456789 => 'CustomCar1',
            // Beispiel: -987654321 => 'CustomCar2',
            // Beispiel: -555555555 => 'CustomCar3',
        ];
    }
}
