<?php

namespace App\Services;

use Illuminate\Contracts\Cache\Repository;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider as TwoFactorAuthenticationProviderContract;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorAuthenticationProvider implements TwoFactorAuthenticationProviderContract
{
    /**
     * The underlying library providing two factor authentication helper services.
     *
     * @var \PragmaRX\Google2FA\Google2FA
     */
    protected $engine;

    /**
     * The cache repository implementation.
     *
     * @var \Illuminate\Contracts\Cache\Repository|null
     */
    protected $cache;

    /**
     * Create a new two factor authentication provider instance.
     *
     * @param  \PragmaRX\Google2FA\Google2FA  $engine
     * @param  \Illuminate\Contracts\Cache\Repository|null  $cache
     * @return void
     */
    public function __construct(Google2FA $engine, ?Repository $cache = null)
    {
        $this->engine = $engine;
        $this->cache = $cache;
    }

    /**
     * Generate a new secret key.
     *
     * @param  int  $secretLength
     * @return string
     */
    public function generateSecretKey(int $secretLength = 16)
    {
        return $this->engine->generateSecretKey($secretLength);
    }

    /**
     * Get the two factor authentication QR code URL.
     * 
     * WICHTIG: Authenticator-Apps wie Google Authenticator verwenden das Favicon der Domain,
     * nicht den image-Parameter im otpauth-URI. Stelle sicher, dass:
     * 1. /favicon.ico korrekt gesetzt ist
     * 2. /apple-touch-icon.png vorhanden ist
     * 3. Der Issuer korrekt gesetzt ist (wird als companyName übergeben)
     *
     * @param  string  $companyName
     * @param  string  $companyEmail
     * @param  string  $secret
     * @return string
     */
    public function qrCodeUrl($companyName, $companyEmail, $secret)
    {
        // Generiere die Basis-URL mit korrektem Issuer
        // Der Issuer wird von Authenticator-Apps verwendet, um das Logo zu identifizieren
        $baseUrl = $this->engine->getQRCodeUrl($companyName, $companyEmail, $secret);
        
        // Hinweis: Der image-Parameter wird von den meisten Apps ignoriert.
        // Stattdessen wird das Favicon der Domain verwendet.
        // Stelle sicher, dass /favicon.ico, /apple-touch-icon.png und /logo.png vorhanden sind.
        
        return $baseUrl;
    }

    /**
     * Verify the given code.
     *
     * @param  string  $secret
     * @param  string  $code
     * @return bool
     */
    public function verify($secret, $code)
    {
        return $this->engine->verifyKey($secret, $code, $this->cache);
    }
}

