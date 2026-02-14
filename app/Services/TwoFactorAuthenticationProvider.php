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
        // Stelle sicher, dass Window immer ein Integer ist
        $customWindow = config('fortify-options.two-factor-authentication.window');
        if (is_int($customWindow) && $customWindow > 0) {
            $this->engine->setWindow($customWindow);
        } else {
            // Setze Standard-Window auf 1, falls nicht gesetzt
            $currentWindow = $this->engine->getWindow();
            if (!is_int($currentWindow) || $currentWindow <= 0) {
                $this->engine->setWindow(1);
            }
        }

        // Verwende verifyKeyNewer mit Cache-Unterstützung, um zu verhindern, dass Codes mehrfach verwendet werden
        $key = 'fortify.2fa_codes.'.md5($code);
        $oldTimestamp = null;
        
        if ($this->cache) {
            $cachedValue = $this->cache->get($key);
            // Stelle sicher, dass nur Integer-Werte verwendet werden
            $oldTimestamp = is_int($cachedValue) ? $cachedValue : null;
        }

        // Stelle sicher, dass verifyKeyNewer mit korrekten Parametern aufgerufen wird
        // verifyKeyNewer($secret, $key, $oldTimestamp, $window = null, $timestamp = null)
        $timestamp = $this->engine->verifyKeyNewer(
            $secret,
            $code,
            $oldTimestamp,
            null, // window - wird intern verwendet
            null  // timestamp - wird intern verwendet
        );

        if ($timestamp !== false) {
            if ($timestamp === true) {
                $timestamp = $this->engine->getTimestamp();
            }

            // Stelle sicher, dass timestamp ein Integer ist
            if (!is_int($timestamp)) {
                return false;
            }

            // Speichere Timestamp im Cache, um Wiederverwendung zu verhindern
            // Stelle sicher, dass getWindow() einen Integer zurückgibt
            $window = $this->engine->getWindow();
            if (!is_int($window) || $window <= 0) {
                $window = 1;
            }
            $ttl = $window * 60;
            
            if ($this->cache) {
                $this->cache->put($key, $timestamp, $ttl);
            }

            return true;
        }

        return false;
    }
}

