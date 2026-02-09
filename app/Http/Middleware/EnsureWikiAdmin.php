<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class EnsureWikiAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if (!$user || !$user->discord_identifier) {
            abort(403, 'Du musst eingeloggt sein.');
        }

        // Prüfe Benutzergruppe aus RedM-Datenbank
        try {
            $redmUser = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$redmUser || ($redmUser->group !== 'wikiadmin' && $redmUser->group !== 'admin')) {
                abort(403, 'Du hast keine Berechtigung für diese Aktion. Benötigt: wikiadmin');
            }
        } catch (\Exception $e) {
            abort(403, 'Fehler beim Prüfen der Berechtigung.');
        }

        return $next($request);
    }
}
