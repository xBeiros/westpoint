<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Spieler Information',
        href: '/player-info',
    },
];

defineProps<{
    player: any | null;
    error?: string;
}>();

const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    try {
        return new Date(date).toLocaleString('de-DE');
    } catch {
        return date;
    }
};

const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('de-DE').format(value);
};
</script>

<template>
    <Head title="Spieler Information" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold mb-2">Spieler Information</h1>
                <p class="text-muted-foreground">Deine persönlichen Spielerdaten aus der FiveM-Datenbank</p>
            </div>

            <!-- Error State -->
            <div v-if="error" class="bg-destructive/10 border border-destructive/50 rounded-lg p-6 mb-6">
                <div class="flex items-center gap-3">
                    <svg class="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-destructive">{{ error }}</p>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="!player && !error" class="flex items-center justify-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <!-- Player Data -->
            <div v-if="player" class="space-y-6">
                <!-- Personal Information Card -->
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Persönliche Informationen
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Vorname</p>
                            <p class="text-lg font-semibold">{{ player.firstname || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Nachname</p>
                            <p class="text-lg font-semibold">{{ player.lastname || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Geburtsdatum</p>
                            <p class="text-lg font-semibold">{{ player.dateofbirth || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Geschlecht</p>
                            <p class="text-lg font-semibold">{{ player.sex || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Größe</p>
                            <p class="text-lg font-semibold">{{ player.height ? `${player.height} cm` : 'N/A' }}</p>
                        </div>
                    </div>
                </div>

                <!-- Job & Group Card -->
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Beruf & Gruppe
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Beruf</p>
                            <p class="text-lg font-semibold">{{ player.job || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Berufsgrad</p>
                            <p class="text-lg font-semibold">{{ player.job_grade !== null ? `Stufe ${player.job_grade}` : 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Gruppe</p>
                            <p class="text-lg font-semibold">{{ player.group || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Craft Level</p>
                            <p class="text-lg font-semibold">{{ player.level_craft || 'N/A' }}</p>
                        </div>
                    </div>
                </div>

                <!-- Currency & Coins Card -->
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Währung & Coins
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">C Coins</p>
                            <p class="text-lg font-semibold">{{ formatNumber(player.c_coins) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">B Coins</p>
                            <p class="text-lg font-semibold">{{ formatNumber(player.b_coins) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Coins ausgegeben</p>
                            <p class="text-lg font-semibold">{{ formatNumber(player.coins_spent) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Kryptowährung</p>
                            <p class="text-lg font-semibold">{{ formatNumber(player.cryptocurrency) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>


