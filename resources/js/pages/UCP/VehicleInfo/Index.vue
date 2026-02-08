<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fahrzeuge',
        href: '/ucp/vehicle-info',
    },
];

defineProps<{
    vehicles: any[];
    identifier?: string;
    error?: string;
}>();

const getVehicleModel = (vehicle: any, modelName?: string) => {
    if (modelName) return modelName;
    if (!vehicle || typeof vehicle !== 'object') return 'N/A';
    return vehicle.model || vehicle.name || 'N/A';
};

const getVehicleLabel = (vehicle: any, modelName?: string) => {
    if (modelName) return modelName;
    if (!vehicle || typeof vehicle !== 'object') return 'N/A';
    return vehicle.label || vehicle.name || getVehicleModel(vehicle);
};

const formatStored = (stored: any) => {
    if (stored === null || stored === undefined) return 'N/A';
    return stored == 1 || stored === true || stored === '1' ? 'Ja' : 'Nein';
};
</script>

<template>
    <Head title="Fahrzeuge" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold mb-2">Fahrzeuge</h1>
                <p class="text-muted-foreground">Deine Fahrzeuge aus der RedM-Datenbank</p>
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

            <!-- No Vehicles -->
            <div v-if="!vehicles || vehicles.length === 0" class="flex items-center justify-center py-20">
                <div class="text-center">
                    <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <p class="text-lg text-muted-foreground">Keine Fahrzeuge gefunden</p>
                </div>
            </div>

            <!-- Vehicles List -->
            <div v-if="vehicles && vehicles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    v-for="(vehicle, index) in vehicles"
                    :key="index"
                    class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-4"
                >
                    <div class="mb-3">
                        <h2 class="text-lg font-semibold mb-1 flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            {{ getVehicleLabel(vehicle.vehicle, vehicle.model_name) }}
                        </h2>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Kennzeichen</p>
                            <p class="text-sm font-semibold">{{ vehicle.plate || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Modell</p>
                            <p class="text-sm font-semibold">{{ getVehicleModel(vehicle.vehicle, vehicle.model_name) }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Eingelagert</p>
                            <p class="text-sm font-semibold">{{ formatStored(vehicle.stored) }}</p>
                        </div>
                        <div v-if="vehicle.type" class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Typ</p>
                            <p class="text-sm font-semibold">{{ vehicle.type }}</p>
                        </div>
                        <div v-if="vehicle.job" class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Job</p>
                            <p class="text-sm font-semibold">{{ vehicle.job }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

