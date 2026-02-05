<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FiveMController;

// ============================================
// Berlincity FiveM API Routes
// ============================================
Route::get('/berlincity/test', [FiveMController::class, 'testConnection']);
Route::get('/berlincity/players', [FiveMController::class, 'getPlayers']);
Route::post('/berlincity/kick', [FiveMController::class, 'kickPlayer']);
Route::post('/berlincity/ban', [FiveMController::class, 'banPlayer']);
Route::post('/berlincity/warn', [FiveMController::class, 'warnPlayer']);
Route::post('/berlincity/dm', [FiveMController::class, 'sendDirectMessage']);
Route::post('/berlincity/money', [FiveMController::class, 'manageMoney']);
Route::post('/berlincity/revive', [FiveMController::class, 'revivePlayer']);

// ============================================
// Page Statistics API
// ============================================
Route::middleware('web', 'auth')->get('/page-stats', function () {
    return response()->json([
        'presentation' => [
            'total' => \App\Models\PageView::getTotalViewsCount('presentation'),
            'uniqueToday' => \App\Models\PageView::getUniqueViewsCount('presentation'),
        ],
    ]);
});
