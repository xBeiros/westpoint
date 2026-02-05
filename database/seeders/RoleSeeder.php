<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Erstelle Admin-Rolle mit allen Berechtigungen
        Role::updateOrCreate(
            ['name' => 'admin'],
            [
                'description' => 'Administrator mit allen Berechtigungen',
                'permissions' => [
                    'admin.players.view',
                    'admin.players.kick',
                    'admin.players.ban',
                    'admin.players.warn',
                    'admin.players.dm',
                    'admin.players.revive',
                    'admin.roles.view',
                    'admin.roles.create',
                    'admin.roles.edit',
                    'admin.roles.delete',
                ],
            ]
        );

        // Erstelle Moderator-Rolle mit eingeschränkten Berechtigungen
        Role::updateOrCreate(
            ['name' => 'moderator'],
            [
                'description' => 'Moderator mit eingeschränkten Berechtigungen',
                'permissions' => [
                    'admin.players.view',
                    'admin.players.warn',
                    'admin.players.dm',
                    'admin.roles.view',
                ],
            ]
        );

        // Erstelle Super-Admin-Rolle mit allen Berechtigungen (*)
        Role::updateOrCreate(
            ['name' => 'superadmin'],
            [
                'description' => 'Super-Administrator mit allen Berechtigungen',
                'permissions' => ['*'], // Wildcard für alle Berechtigungen
            ]
        );
    }
}



