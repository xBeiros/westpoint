<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RedMController;

// ============================================
// Westpoint RedM API Routes
// ============================================
Route::get('/westpoint/test', [RedMController::class, 'testConnection']);
Route::get('/westpoint/players', [RedMController::class, 'getPlayers']);
Route::post('/westpoint/kick', [RedMController::class, 'kickPlayer']);
Route::post('/westpoint/ban', [RedMController::class, 'banPlayer']);
Route::post('/westpoint/warn', [RedMController::class, 'warnPlayer']);
Route::post('/westpoint/dm', [RedMController::class, 'sendDirectMessage']);
Route::post('/westpoint/money', [RedMController::class, 'manageMoney']);
Route::post('/westpoint/revive', [RedMController::class, 'revivePlayer']);

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
