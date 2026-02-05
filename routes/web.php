<?php

use App\Http\Controllers\DiscordLoginController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WikiController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');


// Wiki Route wird durch prefix('wiki') weiter unten definiert

Route::get('/faq', function () {
    return Inertia::render('Faq');
})->name('faq');

Route::get('/bewerbung', function () {
    return Inertia::render('Bewerbung');
})->name('bewerbung');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'pageStats' => [
            'presentation' => [
                'total' => \App\Models\PageView::getTotalViewsCount('presentation'),
                'uniqueToday' => \App\Models\PageView::getUniqueViewsCount('presentation'),
            ]
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('news', AdminNewsController::class);
    });
});

Route::get('/bewerbungen', function () {
    return Inertia::render('Bewerbungen/Index');
})->middleware(['auth','verified'])
    ->name('bewerbungen');

Route::get('/players', function () {
    return Inertia::render('Players/Index');
})->middleware(['auth', 'verified'])
    ->name('players.index');

Route::get('/players/{id}', [\App\Http\Controllers\FiveMController::class, 'showPlayer'])
    ->middleware(['auth', 'verified'])
    ->name('players.show');

// API Route als Fallback (für Debugging)
Route::get('/api/berlincity/players', [\App\Http\Controllers\FiveMController::class, 'getPlayers']);

Route::get('/presentation', function (\Illuminate\Http\Request $request) {
    // View registrieren
    \App\Models\PageView::recordView('presentation', $request);
    
    // Statistiken abrufen
    $totalViews = \App\Models\PageView::getTotalViewsCount('presentation');
    $uniqueViewsToday = \App\Models\PageView::getUniqueViewsCount('presentation');
    
    return Inertia::render('Server/Index', [
        'pageViews' => [
            'total' => $totalViews,
            'uniqueToday' => $uniqueViewsToday,
        ]
    ]);
})->name('presentation.index');

// NEWS
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/news/serverrelease', function () {
    return Inertia::render('News/Serverrelease');
})->name('news.serverrelease');

// RULEBOOK - Statische Seiten
Route::get('/rulebook', function () {
    return Inertia::render('Rulebook/Index');
})->name('rulebook.index');

Route::get('/rulebook/{slug}', function ($slug) {
    return Inertia::render('Rulebook/Show', ['slug' => $slug]);
})->name('rulebook.show');


// WIKI

Route::prefix('wiki')->group(function () {
    Route::get('/', [WikiController::class, 'index'])->name('wiki.index');
    Route::get('/search', [WikiController::class, 'search'])->name('wiki.search');
    Route::get('/{slug}', [WikiController::class, 'show'])->where('slug', '.*')->name('wiki.show');
});

// Login blockieren (muss VOR require __DIR__.'/auth.php' stehen, um Fortify-Routen zu überschreiben)
Route::get('/login', function () {
    abort(403, 'Login ist derzeit nicht verfügbar. Bitte verwende Discord Login.');
})->name('login');

Route::post('/login', function () {
    abort(403, 'Login ist derzeit nicht verfügbar. Bitte verwende Discord Login.');
});

// Registrierung blockieren (muss VOR require __DIR__.'/auth.php' stehen, um Fortify-Routen zu überschreiben)
Route::get('/register', function () {
    abort(403, 'Registrierung ist derzeit nicht verfügbar.');
})->name('register');

Route::post('/register', function () {
    abort(403, 'Registrierung ist derzeit nicht verfügbar.');
});

require __DIR__.'/auth.php';

// Passwort-Reset blockieren
Route::get('/forgot-password', function () {
    abort(403, 'Passwort-Reset ist derzeit nicht verfügbar.');
})->name('password.request');

Route::post('/forgot-password', function () {
    abort(403, 'Passwort-Reset ist derzeit nicht verfügbar.');
})->name('password.email');

Route::get('/reset-password/{token}', function () {
    abort(403, 'Passwort-Reset ist derzeit nicht verfügbar.');
})->name('password.reset');

Route::post('/reset-password', function () {
    abort(403, 'Passwort-Reset ist derzeit nicht verfügbar.');
})->name('password.update');

// Discord Login
Route::get('/auth/discord', [DiscordLoginController::class, 'show'])->name('discord.login');
Route::get('/auth/discord/callback', [DiscordLoginController::class, 'callback'])->name('discord.callback');

// Spieler Information (nur für authentifizierte Benutzer)
Route::middleware('auth')->group(function () {
    Route::get('/player-info', [\App\Http\Controllers\PlayerInfoController::class, 'index'])->name('player.info');
    Route::get('/vehicle-info', [\App\Http\Controllers\VehicleInfoController::class, 'index'])->name('vehicle.info');
    Route::get('/admin', [\App\Http\Controllers\AdminController::class, 'index'])->name('admin.index');
        Route::post('/admin/refresh', [\App\Http\Controllers\AdminController::class, 'refresh'])->name('admin.refresh');
        Route::post('/admin/player/details', [\App\Http\Controllers\AdminController::class, 'getPlayerDetails'])->name('admin.player.details');
        Route::post('/admin/player/action', [\App\Http\Controllers\AdminController::class, 'performPlayerAction'])->name('admin.player.action');
        Route::get('/admin/items', [\App\Http\Controllers\AdminController::class, 'getItems'])->name('admin.items');
        Route::post('/admin/bulk-give', [\App\Http\Controllers\AdminController::class, 'bulkGive'])->name('admin.bulk.give');
        Route::post('/admin/bulk-assign', [\App\Http\Controllers\AdminController::class, 'bulkAssign'])->name('admin.bulk.assign');
    
    // Rollen-Verwaltung
    Route::get('/admin/roles', [\App\Http\Controllers\Admin\RoleController::class, 'index'])->name('admin.roles.index');
    Route::get('/admin/roles/api', [\App\Http\Controllers\Admin\RoleController::class, 'apiIndex'])->name('admin.roles.api');
    Route::post('/admin/roles', [\App\Http\Controllers\Admin\RoleController::class, 'store'])->name('admin.roles.store');
    Route::put('/admin/roles/{role}', [\App\Http\Controllers\Admin\RoleController::class, 'update'])->name('admin.roles.update');
    Route::delete('/admin/roles/{role}', [\App\Http\Controllers\Admin\RoleController::class, 'destroy'])->name('admin.roles.destroy');
});

// Test-Route für FiveM-Datenbankverbindung (nur in Entwicklung)
Route::get('/test/fivem-connection', function () {
    if (!config('app.debug')) {
        abort(404);
    }
    
    try {
        $connection = DB::connection('fivem');
        $pdo = $connection->getPdo();
        
        // Test-Abfrage
        $userCount = $connection->table('users')->count();
        // FiveM verwendet snake_case: discord_identifier
        $sampleUser = $connection->table('users')->whereNotNull('discord_identifier')->first();
        
        return response()->json([
            'success' => true,
            'message' => 'Verbindung erfolgreich!',
            'config' => [
                'host' => config('database.connections.fivem.host'),
                'database' => config('database.connections.fivem.database'),
                'username' => config('database.connections.fivem.username'),
                'port' => config('database.connections.fivem.port'),
            ],
            'stats' => [
                'user_count' => $userCount,
                'sample_user_discord_id' => $sampleUser->discord_identifier ?? null,
            ],
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'code' => $e->getCode(),
            'config' => [
                'host' => config('database.connections.fivem.host'),
                'database' => config('database.connections.fivem.database'),
                'username' => config('database.connections.fivem.username'),
                'port' => config('database.connections.fivem.port'),
            ],
        ], 500);
    }
})->name('test.fivem.connection');


