<?php

namespace App\Actions\Fortify;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication as BaseEnableTwoFactorAuthentication;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\Events\TwoFactorAuthenticationEnabled;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\RecoveryCode;

class EnableTwoFactorAuthentication extends BaseEnableTwoFactorAuthentication
{
    /**
     * Enable two factor authentication for the user.
     *
     * @param  mixed  $user
     * @param  bool  $force
     * @return void
     */
    public function __invoke($user, $force = false)
    {
        // Hole 2FA-Daten aus RedM-Datenbank
        $redmUser = DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $user->discord_identifier)
            ->first();

        $has2FA = $redmUser && !empty($redmUser->two_factor_secret);

        if (!$has2FA || $force === true) {
            $secretLength = (int) config('fortify-options.two-factor-authentication.secret-length', 16);

            $encryptedSecret = Fortify::currentEncrypter()->encrypt($this->provider->generateSecretKey($secretLength));
            $encryptedRecoveryCodes = Fortify::currentEncrypter()->encrypt(json_encode(Collection::times(8, function () {
                return RecoveryCode::generate();
            })->all()));

            // Speichere in RedM-Datenbank
            DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->update([
                    'two_factor_secret' => $encryptedSecret,
                    'two_factor_recovery_codes' => $encryptedRecoveryCodes,
                ]);

            // Aktualisiere auch Laravel User-Model für aktuelle Session
            $user->forceFill([
                'two_factor_secret' => $encryptedSecret,
                'two_factor_recovery_codes' => $encryptedRecoveryCodes,
            ])->save();

            TwoFactorAuthenticationEnabled::dispatch($user);
        }
    }
}

