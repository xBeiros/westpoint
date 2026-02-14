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

        // Speichere in RedM-Datenbank
        DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $user->discord_identifier)
            ->update([
                'two_factor_recovery_codes' => $encryptedRecoveryCodes,
            ]);

        // Aktualisiere auch Laravel User-Model für aktuelle Session
        $user->forceFill([
            'two_factor_recovery_codes' => $encryptedRecoveryCodes,
        ])->save();

        RecoveryCodesGenerated::dispatch($user);
    }
}

