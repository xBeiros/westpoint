<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicon - Wichtig für Authenticator-Apps -->
        <!-- Authenticator-Apps holen das Logo von /favicon.ico und /apple-touch-icon.png -->
        <link rel="icon" type="image/png" href="{{ asset('images/logo_new.png') }}">
        <link rel="shortcut icon" href="{{ asset('images/logo_new.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/logo_new.png') }}">
        <link rel="apple-touch-icon" sizes="192x192" href="{{ asset('images/logo_new.png') }}">
        <link rel="apple-touch-icon" sizes="512x512" href="{{ asset('images/logo_new.png') }}">
        <!-- Open Graph für bessere Logo-Erkennung -->
        <meta property="og:image" content="{{ asset('images/logo_new.png') }}">
        <meta property="og:image:type" content="image/png">
        <meta name="twitter:image" content="{{ asset('images/logo_new.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-background text-foreground">
        @inertia
        
        <script>
            // Dark Mode Initialisierung vor Inertia-Load (verhindert Flash)
            (function() {
                const stored = localStorage.getItem('dark-mode');
                if (stored !== null) {
                    if (stored === 'true') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>
    </body>
</html>

