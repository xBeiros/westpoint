<?php

namespace App\Actions\Fortify;

use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication as BaseDisableTwoFactorAuthentication;
use Laravel\Fortify\Events\TwoFactorAuthenticationDisabled;

class DisableTwoFactorAuthentication extends BaseDisableTwoFactorAuthentication
{
    /**
     * Disable two factor authentication for the user.
     *
     * @param  mixed  $user
     * @return void
     */
    public function __invoke($user)
    {
        // Lösche 2FA-Daten NUR in RedM-Datenbank - NICHT in Laravel!
        DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $user->discord_identifier)
            ->update([
                'two_factor_secret' => null,
                'two_factor_recovery_codes' => null,
                'two_factor_confirmed_at' => null,
            ]);

        // Aktualisiere nur den Cache im User-Model für aktuelle Session
        // WICHTIG: Kein save() - Daten werden NICHT in Laravel gespeichert!
        $user->attributes['two_factor_secret'] = null;
        $user->attributes['two_factor_recovery_codes'] = null;
        $user->attributes['two_factor_confirmed_at'] = null;
        $user->redm2FAData = null;

        TwoFactorAuthenticationDisabled::dispatch($user);
    }
}

