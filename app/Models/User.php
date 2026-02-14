<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Cache für RedM 2FA-Daten
     */
    protected ?object $redm2FAData = null;

    /**
     * Attribute, die nicht in der Laravel-Datenbank gespeichert werden
     */
    protected $appends = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'discord_identifier',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Hole 2FA-Daten aus RedM-Datenbank
     */
    protected function getRedm2FAData(): ?object
    {
        if ($this->redm2FAData === null && $this->discord_identifier) {
            $this->redm2FAData = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $this->discord_identifier)
                ->select('two_factor_secret', 'two_factor_recovery_codes', 'two_factor_confirmed_at')
                ->first();
        }

        return $this->redm2FAData;
    }

    /**
     * Boot-Methode: Lade 2FA-Daten aus RedM beim Model-Load
     */
    protected static function booted()
    {
        static::retrieved(function ($user) {
            if ($user->discord_identifier) {
                $redmData = DB::connection('redm')
                    ->table('users')
                    ->where('discord_identifier', $user->discord_identifier)
                    ->select('two_factor_secret', 'two_factor_recovery_codes', 'two_factor_confirmed_at')
                    ->first();
                
                if ($redmData) {
                    // Setze Attribute direkt (ohne Mutator aufzurufen)
                    $user->attributes['two_factor_secret'] = $redmData->two_factor_secret;
                    $user->attributes['two_factor_recovery_codes'] = $redmData->two_factor_recovery_codes;
                    $user->attributes['two_factor_confirmed_at'] = $redmData->two_factor_confirmed_at;
                    $user->redm2FAData = $redmData;
                }
            }
        });
    }

    /**
     * Accessor für two_factor_secret - liest aus RedM-Datenbank
     */
    public function getTwoFactorSecretAttribute($value)
    {
        // Wenn bereits aus RedM geladen, verwende das
        if ($this->redm2FAData !== null) {
            return $this->redm2FAData->two_factor_secret ?? null;
        }
        
        // Sonst lade aus RedM
        $redmData = $this->getRedm2FAData();
        return $redmData->two_factor_secret ?? null;
    }

    /**
     * Accessor für two_factor_recovery_codes - liest aus RedM-Datenbank
     */
    public function getTwoFactorRecoveryCodesAttribute($value)
    {
        // Wenn bereits aus RedM geladen, verwende das
        if ($this->redm2FAData !== null) {
            return $this->redm2FAData->two_factor_recovery_codes ?? null;
        }
        
        // Sonst lade aus RedM
        $redmData = $this->getRedm2FAData();
        return $redmData->two_factor_recovery_codes ?? null;
    }

    /**
     * Accessor für two_factor_confirmed_at - liest aus RedM-Datenbank
     */
    public function getTwoFactorConfirmedAtAttribute($value)
    {
        // Wenn bereits aus RedM geladen, verwende das
        if ($this->redm2FAData !== null) {
            return $this->redm2FAData->two_factor_confirmed_at ?? null;
        }
        
        // Sonst lade aus RedM
        $redmData = $this->getRedm2FAData();
        return $redmData->two_factor_confirmed_at ?? null;
    }

    /**
     * Überschreibe save(), um 2FA-Daten in RedM zu speichern
     */
    public function save(array $options = [])
    {
        // Prüfe, ob 2FA-Attribute geändert wurden
        $twoFactorChanged = false;
        $updateData = [];

        if ($this->discord_identifier) {
            if (array_key_exists('two_factor_secret', $this->attributes)) {
                $updateData['two_factor_secret'] = $this->attributes['two_factor_secret'];
                $twoFactorChanged = true;
            }
            if (array_key_exists('two_factor_recovery_codes', $this->attributes)) {
                $updateData['two_factor_recovery_codes'] = $this->attributes['two_factor_recovery_codes'];
                $twoFactorChanged = true;
            }
            if (array_key_exists('two_factor_confirmed_at', $this->attributes)) {
                $updateData['two_factor_confirmed_at'] = $this->attributes['two_factor_confirmed_at'];
                $twoFactorChanged = true;
            }
        }

        // Speichere normale Attribute in Laravel-Datenbank
        $result = parent::save($options);

        // Speichere 2FA-Daten in RedM-Datenbank
        if ($twoFactorChanged && !empty($updateData)) {
            DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $this->discord_identifier)
                ->update($updateData);
            
            // Cache zurücksetzen
            $this->redm2FAData = null;
        }

        return $result;
    }

    /**
     * Überschreibe replaceRecoveryCode, um in RedM-Datenbank zu speichern
     */
    public function replaceRecoveryCode($code)
    {
        $redmData = $this->getRedm2FAData();
        if (!$redmData || empty($redmData->two_factor_recovery_codes)) {
            return;
        }

        $recoveryCodes = json_decode(\Laravel\Fortify\Fortify::currentEncrypter()->decrypt($redmData->two_factor_recovery_codes), true);
        $newCode = \Laravel\Fortify\RecoveryCode::generate();
        
        $recoveryCodes = array_map(function ($recoveryCode) use ($code, $newCode) {
            return $recoveryCode === $code ? $newCode : $recoveryCode;
        }, $recoveryCodes);

        $encryptedCodes = \Laravel\Fortify\Fortify::currentEncrypter()->encrypt(json_encode($recoveryCodes));

        DB::connection('redm')
            ->table('users')
            ->where('discord_identifier', $this->discord_identifier)
            ->update(['two_factor_recovery_codes' => $encryptedCodes]);

        // Cache zurücksetzen
        $this->redm2FAData = null;

        \Laravel\Fortify\Events\RecoveryCodeReplaced::dispatch($this, $code);
    }
}
