<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Spieler Information',
        href: '/ucp/player-info',
    },
];

const props = defineProps<{
    characters: any[] | null;
    selectedCharacter: any | null;
    error?: string;
}>();

const selectedCharId = ref<number | null>(
    props.selectedCharacter?.charidentifier ?? null
);

const currentCharacter = computed(() => {
    if (!props.characters || !selectedCharId.value) {
        return props.selectedCharacter;
    }
    return props.characters.find(
        (char) => char.charidentifier === selectedCharId.value
    ) || props.selectedCharacter;
});

const selectCharacter = (charidentifier: number) => {
    selectedCharId.value = charidentifier;
};

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
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const formatHours = (hours: number | null | undefined) => {
    if (hours === null || hours === undefined) return '0h';
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
};
</script>

<template>
    <Head title="Spieler Information" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold mb-2">Spieler Information</h1>
                <p class="text-muted-foreground">Deine persönlichen Spielerdaten aus der RedM-Datenbank</p>
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

            <!-- Character Selection -->
            <div v-if="characters && characters.length > 1" class="mb-6">
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Charakter auswählen
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <button
                            v-for="char in characters"
                            :key="char.charidentifier"
                            @click="selectCharacter(char.charidentifier)"
                            :class="[
                                'p-4 rounded-lg border-2 transition-all text-left',
                                selectedCharId === char.charidentifier
                                    ? 'border-primary bg-primary/10'
                                    : 'border-sidebar-border/70 bg-muted/50 hover:border-primary/50'
                            ]"
                        >
                            <div class="font-semibold text-lg">
                                {{ char.firstname || 'Unbekannt' }} {{ char.lastname || '' }}
                            </div>
                            <div class="text-sm text-muted-foreground mt-1">
                                {{ char.joblabel || char.job || 'Unemployed' }}
                            </div>
                            <div class="text-xs text-muted-foreground mt-1">
                                Char ID: {{ char.charidentifier }}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="!currentCharacter && !error && (!characters || characters.length === 0)" class="flex items-center justify-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <!-- Character Data -->
            <div v-if="currentCharacter" class="space-y-6">
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
                            <p class="text-lg font-semibold">{{ currentCharacter.firstname || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Nachname</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.lastname || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Spitzname</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.nickname || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Geschlecht</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.gender || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Alter</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.age || 'N/A' }}</p>
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
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Beruf</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.joblabel || currentCharacter.job || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Berufsgrad</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.jobgrade !== null && currentCharacter.jobgrade !== undefined ? `Stufe ${currentCharacter.jobgrade}` : 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Gruppe</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.group || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">XP</p>
                            <p class="text-lg font-semibold">{{ formatNumber(currentCharacter.xp) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Currency & Money Card -->
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Währung & Vermögen
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Geld ($)</p>
                            <p class="text-lg font-semibold">{{ formatNumber(currentCharacter.money) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Gold</p>
                            <p class="text-lg font-semibold">{{ formatNumber(currentCharacter.gold) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Rol</p>
                            <p class="text-lg font-semibold">{{ formatNumber(currentCharacter.rol) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Gunsmith</p>
                            <p class="text-lg font-semibold">{{ formatNumber(currentCharacter.gunsmith) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Stats Card -->
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Statistiken
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Spielstunden</p>
                            <p class="text-lg font-semibold">{{ formatHours(currentCharacter.hours) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Letzter Login</p>
                            <p class="text-lg font-semibold">{{ formatDate(currentCharacter.LastLogin) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Inventar Slots</p>
                            <p class="text-lg font-semibold">{{ currentCharacter.slots || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70">
                            <p class="text-sm text-muted-foreground mb-1">Status</p>
                            <p class="text-lg font-semibold">
                                <span v-if="currentCharacter.isdead" class="text-destructive">Tot</span>
                                <span v-else class="text-green-500">Lebend</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
