<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Laravel\Fortify\Fortify;

class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        // Prüfe, ob eine return_url in der Session gespeichert ist
        $returnUrl = $request->session()->get('two_factor_return_url');
        if ($returnUrl && filter_var($returnUrl, FILTER_VALIDATE_URL)) {
            // Prüfe, ob die URL zur eigenen Domain gehört (Sicherheit)
            $parsedUrl = parse_url($returnUrl);
            $appUrl = parse_url(config('app.url'));
            if ($parsedUrl && isset($parsedUrl['host']) && 
                ($parsedUrl['host'] === $appUrl['host'] || 
                 $parsedUrl['host'] === 'localhost' || 
                 $parsedUrl['host'] === '127.0.0.1' ||
                 str_ends_with($parsedUrl['host'], '.test'))) {
                $request->session()->forget('two_factor_return_url');
                return redirect($returnUrl);
            }
        }

        // Standard-Weiterleitung zum Dashboard
        return redirect('/ucp/dashboard');
    }
}

