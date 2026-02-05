<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'discord_identifier')) {
            Schema::table('users', function (Blueprint $table) {
                // SQLite unterstützt 'after()' nicht, daher weglassen
                if (config('database.default') === 'sqlite') {
                    $table->string('discord_identifier')->nullable()->unique();
                } else {
                    $table->string('discord_identifier')->nullable()->unique()->after('email');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'discord_identifier')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('discord_identifier');
            });
        }
    }
};

