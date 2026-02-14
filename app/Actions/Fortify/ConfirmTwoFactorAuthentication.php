<?php

namespace App\Actions\Fortify;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Actions\ConfirmTwoFactorAuthentication as BaseConfirmTwoFactorAuthentication;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\Events\TwoFactorAuthenticationConfirmed;
use Laravel\Fortify\Fortify;

class ConfirmTwoFactorAuthentication extends BaseConfirmTwoFactorAuthentication
{
    /**
     * Confirm the two factor authentication configuration for the user.
     *
     * @param  mixed  $user
     * @param  string  $code
     * @return void
     */
    public function __invoke($user, $code)
    {
        // Hole 2FA-Daten aus RedM-Datenbank
        $redmUser = DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $user->discord_identifier)
            ->first();

        if (!$redmUser || empty($redmUser->two_factor_secret) || empty($code)) {
            throw ValidationException::withMessages([
                'code' => [__('The provided two factor authentication code was invalid.')],
            ])->errorBag('confirmTwoFactorAuthentication');
        }

        // Verifiziere Code
        $secret = Fortify::currentEncrypter()->decrypt($redmUser->two_factor_secret);
        if (!$this->provider->verify($secret, $code)) {
            throw ValidationException::withMessages([
                'code' => [__('The provided two factor authentication code was invalid.')],
            ])->errorBag('confirmTwoFactorAuthentication');
        }

        // Aktualisiere NUR in RedM-Datenbank - NICHT in Laravel!
        DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $user->discord_identifier)
            ->update([
                'two_factor_confirmed_at' => now(),
            ]);

        // Aktualisiere nur den Cache im User-Model für aktuelle Session
        // WICHTIG: Kein save() - Daten werden NICHT in Laravel gespeichert!
        // Setze nur den Cache - die Accessors holen die Werte automatisch
        if ($user->redm2FAData) {
            $user->redm2FAData->two_factor_confirmed_at = now();
        } else {
            // Falls Cache noch nicht existiert, erstelle ihn
            $user->redm2FAData = (object) [
                'two_factor_secret' => $redmUser->two_factor_secret ?? null,
                'two_factor_recovery_codes' => $redmUser->two_factor_recovery_codes ?? null,
                'two_factor_confirmed_at' => now(),
            ];
        }

        TwoFactorAuthenticationConfirmed::dispatch($user);
    }
}

