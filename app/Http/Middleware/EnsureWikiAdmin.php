<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Role;

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

            if (!$redmUser) {
                abort(403, 'Du hast keine Berechtigung für diese Aktion. Benötigt: wikiadmin oder wiki.admin Berechtigung');
            }

            $userGroup = $redmUser->group ?? 'user';
            
            // Prüfe ob Gruppe wikiadmin ist
            if ($userGroup === 'wikiadmin') {
                return $next($request);
            }

            // Prüfe ob Benutzer die Berechtigung wiki.admin hat
            $userRole = Role::where('name', $userGroup)->first();
            if ($userRole && $userRole->hasPermission('wiki.admin')) {
                return $next($request);
            }

            // Spezielle Gruppe "projektmanagement" hat automatisch alle Berechtigungen
            if ($userGroup === 'projektmanagement') {
                return $next($request);
            }

            abort(403, 'Du hast keine Berechtigung für diese Aktion. Benötigt: wikiadmin oder wiki.admin Berechtigung');
        } catch (\Exception $e) {
            abort(403, 'Fehler beim Prüfen der Berechtigung.');
        }
    }
}
