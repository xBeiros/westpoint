<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\TwoFactorConfirmedResponse as TwoFactorConfirmedResponseContract;

class TwoFactorConfirmedResponse implements TwoFactorConfirmedResponseContract
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
            return new JsonResponse('', 200);
        }

        // Prüfe, ob die Anfrage von der Profil-Seite kam (AJAX)
        if ($request->wantsJson() || $request->ajax()) {
            // Für AJAX-Anfragen (z.B. vom Profil), einfach 200 zurückgeben
            // Die Frontend-Seite wird sich selbst neu laden
            return new JsonResponse(['message' => 'Zwei-Faktor-Authentifizierung wurde erfolgreich aktiviert.'], 200);
        }

        // Für normale Anfragen, zur Profil-Seite zurückleiten
        return redirect('/ucp/profile')->with('status', 'Zwei-Faktor-Authentifizierung wurde erfolgreich aktiviert.');
    }
}

