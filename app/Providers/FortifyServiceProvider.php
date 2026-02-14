<?php

namespace App\Providers;

use App\Actions\Fortify\ConfirmTwoFactorAuthentication;
use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\DisableTwoFactorAuthentication;
use App\Actions\Fortify\EnableTwoFactorAuthentication;
use App\Actions\Fortify\GenerateNewRecoveryCodes;
use App\Actions\Fortify\ResetUserPassword;
use App\Http\Responses\TwoFactorChallengeViewResponse;
use App\Http\Responses\TwoFactorConfirmedResponse;
use App\Http\Responses\TwoFactorLoginResponse;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\TwoFactorChallengeViewResponse as TwoFactorChallengeViewResponseContract;
use Laravel\Fortify\Contracts\TwoFactorConfirmedResponse as TwoFactorConfirmedResponseContract;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
        $this->configureTwoFactorResponses();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
        
        // 2FA Actions - verwenden RedM-Datenbank
        $this->app->singleton(\Laravel\Fortify\Actions\EnableTwoFactorAuthentication::class, EnableTwoFactorAuthentication::class);
        $this->app->singleton(\Laravel\Fortify\Actions\ConfirmTwoFactorAuthentication::class, ConfirmTwoFactorAuthentication::class);
        $this->app->singleton(\Laravel\Fortify\Actions\DisableTwoFactorAuthentication::class, DisableTwoFactorAuthentication::class);
        $this->app->singleton(\Laravel\Fortify\Actions\GenerateNewRecoveryCodes::class, GenerateNewRecoveryCodes::class);
        
        // Custom 2FA Provider mit Logo-Unterstützung
        $this->app->singleton(\Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider::class, \App\Services\TwoFactorAuthenticationProvider::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        // Login und Register sind deaktiviert - Discord Login wird verwendet
        // Die Routen werden in web.php blockiert, daher werden diese Views nie aufgerufen
        
        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/ForgotPassword', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/VerifyEmail', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/ConfirmPassword'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            $loginId = $request->session()->get('login.id');
            $throttleKey = $loginId ? $loginId.'|'.$request->ip() : $request->ip();

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    /**
     * Configure two factor authentication responses.
     */
    private function configureTwoFactorResponses(): void
    {
        $this->app->singleton(TwoFactorChallengeViewResponseContract::class, TwoFactorChallengeViewResponse::class);
        $this->app->singleton(TwoFactorLoginResponseContract::class, TwoFactorLoginResponse::class);
        $this->app->singleton(TwoFactorConfirmedResponseContract::class, TwoFactorConfirmedResponse::class);
    }
}
