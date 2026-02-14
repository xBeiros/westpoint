<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * API: Hole alle Rollen als JSON
     */
    public function apiIndex()
    {
        try {
            $roles = Role::orderBy('name')->get();
            return response()->json([
                'success' => true,
                'roles' => $roles,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Rollen (API)', [
                'message' => $e->getMessage(),
            ]);
            return response()->json([
                'success' => false,
                'roles' => [],
                'message' => 'Fehler beim Abrufen der Rollen',
            ], 500);
        }
    }

    /**
     * Zeige die Rollen-Verwaltung
     */
    public function index()
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return redirect('/ucp/dashboard')->withErrors([
                'message' => 'Keine Discord-Verbindung gefunden. Bitte melde dich mit Discord an.',
            ]);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return redirect('/ucp/dashboard')->withErrors([
                    'message' => 'Zugriff verweigert. Du hast keine Berechtigung für diesen Bereich.',
                ]);
            }

            // Hole alle Rollen
            $roles = Role::orderBy('name')->get();

            // Hole die Berechtigungen des aktuellen Benutzers
            $userGroup = $player->group ?? 'user';
            $userPermissions = [];
            
            // Spezielle Gruppen "projektmanagement" und "projektleitung" haben automatisch alle Berechtigungen
            if ($userGroup === 'projektmanagement' || $userGroup === 'projektleitung') {
                $userPermissions = ['*']; // Wildcard für alle Berechtigungen
            } else {
                $userRole = Role::where('name', $userGroup)->first();
                $userPermissions = $userRole ? ($userRole->permissions ?? []) : [];
            }

            return Inertia::render('UCP/Admin/Roles/Index', [
                'roles' => $roles,
                'userPermissions' => $userPermissions,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Abrufen der Rollen', [
                'message' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return Inertia::render('UCP/Admin/Roles/Index', [
                'roles' => [],
                'error' => config('app.debug') 
                    ? $e->getMessage() 
                    : 'Fehler beim Abrufen der Rollen.',
            ]);
        }
    }

    /**
     * Erstelle eine neue Rolle
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            // Prüfe ob der Benutzer die Berechtigung hat, Rollen zu erstellen
            $userGroup = $player->group ?? 'user';
            $userPermissions = [];
            
            // Spezielle Gruppen "projektmanagement" und "projektleitung" haben automatisch alle Berechtigungen
            if ($userGroup === 'projektmanagement' || $userGroup === 'projektleitung') {
                $userPermissions = ['*']; // Wildcard für alle Berechtigungen
            } else {
                $userRole = Role::where('name', $userGroup)->first();
                $userPermissions = $userRole ? ($userRole->permissions ?? []) : [];
            }
            
            if (!in_array('admin.roles.create', $userPermissions) && !in_array('*', $userPermissions)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Du hast keine Berechtigung, Rollen zu erstellen.',
                ], 403);
            }

            $request->validate([
                'name' => 'required|string|max:255|unique:roles,name',
                'description' => 'nullable|string|max:1000',
                'permissions' => 'nullable|array',
            ]);

            $permissions = $request->permissions ?? [];
            
            // Stelle sicher, dass permissions ein Array ist
            if (!is_array($permissions)) {
                if (is_string($permissions)) {
                    $permissions = json_decode($permissions, true) ?? [];
                } else {
                    $permissions = [];
                }
            }
            
            // Prüfe ob der Benutzer die Berechtigung hat, alle gewählten Berechtigungen zu setzen
            $invalidPermissions = array_filter($permissions, function($perm) use ($userPermissions) {
                return !in_array($perm, $userPermissions) && !in_array('*', $userPermissions);
            });
            
            if (!empty($invalidPermissions)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Du hast keine Berechtigung, folgende Berechtigungen zu setzen: ' . implode(', ', $invalidPermissions),
                ], 403);
            }
            
            Log::info('Erstelle Rolle mit Berechtigungen', [
                'name' => $request->name,
                'permissions' => $permissions,
                'permissions_type' => gettype($permissions),
                'user_permissions' => $userPermissions,
            ]);

            $role = Role::create([
                'name' => $request->name,
                'description' => $request->description,
                'permissions' => $permissions,
            ]);

            return response()->json([
                'success' => true,
                'role' => $role,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Erstellen der Rolle', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler beim Erstellen der Rolle',
            ], 500);
        }
    }

    /**
     * Aktualisiere eine Rolle
     */
    public function update(Request $request, Role $role)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            // Debug: Logge alle Request-Daten
            Log::info('=== UPDATE ROLE REQUEST ===', [
                'all_request_data' => $request->all(),
                'permissions_raw' => $request->input('permissions'),
                'permissions_type' => gettype($request->input('permissions')),
            ]);
            
            // Prüfe ob der Benutzer die Berechtigung hat, Rollen zu bearbeiten
            $userGroup = $player->group ?? 'user';
            $userPermissions = [];
            
            // Spezielle Gruppen "projektmanagement" und "projektleitung" haben automatisch alle Berechtigungen
            if ($userGroup === 'projektmanagement' || $userGroup === 'projektleitung') {
                $userPermissions = ['*']; // Wildcard für alle Berechtigungen
            } else {
                $userRole = Role::where('name', $userGroup)->first();
                $userPermissions = $userRole ? ($userRole->permissions ?? []) : [];
            }
            
            if (!in_array('admin.roles.edit', $userPermissions) && !in_array('*', $userPermissions)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Du hast keine Berechtigung, Rollen zu bearbeiten.',
                ], 403);
            }

            $request->validate([
                'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
                'description' => 'nullable|string|max:1000',
                'permissions' => 'nullable|array',
            ]);

            $permissions = $request->input('permissions', []);
            
            // Stelle sicher, dass permissions ein Array ist
            if (!is_array($permissions)) {
                if (is_string($permissions)) {
                    $decoded = json_decode($permissions, true);
                    $permissions = is_array($decoded) ? $decoded : [];
                } else {
                    $permissions = [];
                }
            }
            
            // Prüfe ob der Benutzer die Berechtigung hat, alle gewählten Berechtigungen zu setzen
            $invalidPermissions = array_filter($permissions, function($perm) use ($userPermissions) {
                return !in_array($perm, $userPermissions) && !in_array('*', $userPermissions);
            });
            
            if (!empty($invalidPermissions)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Du hast keine Berechtigung, folgende Berechtigungen zu setzen: ' . implode(', ', $invalidPermissions),
                ], 403);
            }
            
            Log::info('Aktualisiere Rolle mit Berechtigungen', [
                'role_id' => $role->id,
                'name' => $request->name,
                'permissions' => $permissions,
                'permissions_count' => count($permissions),
                'permissions_type' => gettype($permissions),
                'user_permissions' => $userPermissions,
            ]);

            $role->update([
                'name' => $request->name,
                'description' => $request->description,
                'permissions' => $permissions,
            ]);
            
            // Lade die aktualisierte Rolle neu
            $role->refresh();

            return response()->json([
                'success' => true,
                'role' => $role,
                'message' => 'Rolle erfolgreich aktualisiert',
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Aktualisieren der Rolle', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler beim Aktualisieren der Rolle',
            ], 500);
        }
    }

    /**
     * Lösche eine Rolle
     */
    public function destroy(Role $role)
    {
        $user = Auth::user();
        
        if (!$user || !$user->discord_identifier) {
            return response()->json([
                'success' => false,
                'message' => 'Nicht authentifiziert',
            ], 401);
        }

        try {
            // Prüfe Admin-Rechte
            $player = DB::connection('redm')
                ->table('users')
                ->where('discord_identifier', $user->discord_identifier)
                ->first();

            if (!$player || ($player->group ?? 'user') === 'user') {
                return response()->json([
                    'success' => false,
                    'message' => 'Keine Berechtigung',
                ], 403);
            }

            // Prüfe ob der Benutzer die Berechtigung hat, Rollen zu löschen
            $userGroup = $player->group ?? 'user';
            $userPermissions = [];
            
            // Spezielle Gruppen "projektmanagement" und "projektleitung" haben automatisch alle Berechtigungen
            if ($userGroup === 'projektmanagement' || $userGroup === 'projektleitung') {
                $userPermissions = ['*']; // Wildcard für alle Berechtigungen
            } else {
                $userRole = Role::where('name', $userGroup)->first();
                $userPermissions = $userRole ? ($userRole->permissions ?? []) : [];
            }
            
            if (!in_array('admin.roles.delete', $userPermissions) && !in_array('*', $userPermissions)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Du hast keine Berechtigung, Rollen zu löschen.',
                ], 403);
            }

            $role->delete();

            return response()->json([
                'success' => true,
            ]);
        } catch (\Exception $e) {
            Log::error('Fehler beim Löschen der Rolle', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Fehler beim Löschen der Rolle',
            ], 500);
        }
    }
}
