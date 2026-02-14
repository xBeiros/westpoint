<?php

namespace App\Actions\Fortify;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Actions\GenerateNewRecoveryCodes as BaseGenerateNewRecoveryCodes;
use Laravel\Fortify\Events\RecoveryCodesGenerated;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\RecoveryCode;

class GenerateNewRecoveryCodes extends BaseGenerateNewRecoveryCodes
{
    /**
     * Generate new recovery codes for the user.
     *
     * @param  mixed  $user
     * @return void
     */
    public function __invoke($user)
    {
        $encryptedRecoveryCodes = Fortify::currentEncrypter()->encrypt(json_encode(Collection::times(8, function () {
            return RecoveryCode::generate();
        })->all()));

        // Speichere NUR in RedM-Datenbank - NICHT in Laravel!
        DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $user->discord_identifier)
            ->update([
                'two_factor_recovery_codes' => $encryptedRecoveryCodes,
            ]);

        // Aktualisiere nur den Cache im User-Model für aktuelle Session
        // WICHTIG: Kein save() - Daten werden NICHT in Laravel gespeichert!
        // Setze nur den Cache - die Accessors holen die Werte automatisch
        if ($user->redm2FAData) {
            $user->redm2FAData->two_factor_recovery_codes = $encryptedRecoveryCodes;
        } else {
            // Falls Cache noch nicht existiert, hole die anderen Werte aus RedM
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->select('two_factor_secret', 'two_factor_confirmed_at')
                ->first();
            
            $user->redm2FAData = (object) [
                'two_factor_secret' => $redmUser->two_factor_secret ?? null,
                'two_factor_recovery_codes' => $encryptedRecoveryCodes,
                'two_factor_confirmed_at' => $redmUser->two_factor_confirmed_at ?? null,
            ];
        }

        RecoveryCodesGenerated::dispatch($user);
    }
}

