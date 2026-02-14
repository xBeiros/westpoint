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
                    // Setze nur den Cache - die Accessors holen die Werte automatisch
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
     * Überschreibe save(), um 2FA-Daten NUR in RedM zu speichern, NICHT in Laravel
     * 
     * HINWEIS: Diese Methode sollte eigentlich nie für 2FA-Daten aufgerufen werden,
     * da die Fortify Actions direkt in RedM schreiben. Diese Methode ist nur als
     * Sicherheitsnetz gedacht, falls irgendwo im Code versucht wird, 2FA-Daten
     * über das Model zu speichern.
     */
    public function save(array $options = [])
    {
        // Prüfe, ob 2FA-Attribute geändert wurden (ohne direkte Manipulation von $attributes)
        $twoFactorChanged = false;
        $updateData = [];

        if ($this->discord_identifier) {
            // Verwende getOriginal() und getDirty(), um zu prüfen, ob Attribute geändert wurden
            // Vermeide direkte Manipulation von $attributes für überladene Properties
            $dirty = $this->getDirty();
            
            if (isset($dirty['two_factor_secret'])) {
                $updateData['two_factor_secret'] = $dirty['two_factor_secret'];
                $twoFactorChanged = true;
            }
            if (isset($dirty['two_factor_recovery_codes'])) {
                $updateData['two_factor_recovery_codes'] = $dirty['two_factor_recovery_codes'];
                $twoFactorChanged = true;
            }
            if (isset($dirty['two_factor_confirmed_at'])) {
                $updateData['two_factor_confirmed_at'] = $dirty['two_factor_confirmed_at'];
                $twoFactorChanged = true;
            }
            
            // Entferne 2FA-Attribute aus den dirty attributes, damit sie NICHT in Laravel gespeichert werden
            if ($twoFactorChanged) {
                // Verwende setRawAttributes(), um die Attribute zu entfernen
                $attributes = $this->getAttributes();
                unset($attributes['two_factor_secret'], $attributes['two_factor_recovery_codes'], $attributes['two_factor_confirmed_at']);
                $this->setRawAttributes($attributes);
            }
        }

        // Speichere normale Attribute in Laravel-Datenbank (OHNE 2FA-Daten)
        $result = parent::save($options);

        // Speichere 2FA-Daten NUR in RedM-Datenbank
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
