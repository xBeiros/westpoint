<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageView extends Model
{
    protected $fillable = [
        'page_name',
        'session_id',
        'ip_address',
        'user_agent',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    /**
     * Zähle einzigartige Views für eine Seite
     */
    public static function getUniqueViewsCount($pageName)
    {
        // Zähle basierend auf einzigartigen Session-IDs in den letzten 24 Stunden
        return self::where('page_name', $pageName)
            ->where('viewed_at', '>=', now()->subDay())
            ->distinct('session_id')
            ->count('session_id');
    }

    /**
     * Zähle alle Views für eine Seite
     */
    public static function getTotalViewsCount($pageName)
    {
        return self::where('page_name', $pageName)->count();
    }

    /**
     * Registriere einen neuen View
     */
    public static function recordView($pageName, $request)
    {
        $sessionId = $request->session()->getId();
        $ipAddress = $request->ip();

        // Prüfe ob dieser Benutzer die Seite in den letzten 30 Minuten bereits besucht hat
        $recentView = self::where('page_name', $pageName)
            ->where('session_id', $sessionId)
            ->where('viewed_at', '>=', now()->subMinutes(30))
            ->first();

        // Nur registrieren wenn kein kürzlicher Besuch
        if (!$recentView) {
            self::create([
                'page_name' => $pageName,
                'session_id' => $sessionId,
                'ip_address' => $ipAddress,
                'user_agent' => $request->userAgent(),
                'viewed_at' => now(),
            ]);
        }
    }
}


