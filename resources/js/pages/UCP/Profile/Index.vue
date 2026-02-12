<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'UCP',
        href: '/ucp',
    },
    {
        title: 'Profil bearbeiten',
        href: '/ucp/profile',
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
    // Lade Daten für ausgewählten Charakter
    if (currentCharacter.value) {
        form.firstname = currentCharacter.value.firstname || '';
        form.lastname = currentCharacter.value.lastname || '';
        form.email = currentCharacter.value.email || '';
        form.birthdate = currentCharacter.value.birthdate || '';
    }
};

const form = useForm({
    charidentifier: computed(() => currentCharacter.value?.charidentifier ?? null),
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
});

// Initialisiere Formular mit aktuellen Daten
if (currentCharacter.value) {
    form.firstname = currentCharacter.value.firstname || '';
    form.lastname = currentCharacter.value.lastname || '';
    form.email = currentCharacter.value.email || '';
    form.birthdate = currentCharacter.value.birthdate || '';
}

// Watch für Character-Änderung
watch(() => currentCharacter.value, (newChar) => {
    if (newChar) {
        form.charidentifier = newChar.charidentifier;
        form.firstname = newChar.firstname || '';
        form.lastname = newChar.lastname || '';
        form.email = newChar.email || '';
        form.birthdate = newChar.birthdate || '';
    }
}, { immediate: true });

const submit = () => {
    if (!form.charidentifier) {
        alert('Bitte wähle einen Charakter aus.');
        return;
    }
    
    form.post('/ucp/profile', {
        preserveScroll: true,
        onSuccess: () => {
            // Lade Seite neu, um aktualisierte Daten anzuzeigen
            router.reload({ only: ['characters', 'selectedCharacter'] });
        },
    });
};
</script>

<template>
    <Head title="Profil bearbeiten" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold mb-2">Profil bearbeiten</h1>
                <p class="text-muted-foreground">Bearbeite deine persönlichen Daten</p>
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

            <!-- Profile Edit Form -->
            <div v-if="currentCharacter" class="space-y-6">
                <form @submit.prevent="submit" class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Persönliche Daten bearbeiten
                    </h2>

                    <div class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Vorname *
                                </label>
                                <input
                                    v-model="form.firstname"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Vorname"
                                />
                                <p v-if="form.errors.firstname" class="mt-1 text-sm text-destructive">
                                    {{ form.errors.firstname }}
                                </p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Nachname *
                                </label>
                                <input
                                    v-model="form.lastname"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Nachname"
                                />
                                <p v-if="form.errors.lastname" class="mt-1 text-sm text-destructive">
                                    {{ form.errors.lastname }}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">
                                E-Mail-Adresse *
                            </label>
                            <input
                                v-model="form.email"
                                type="email"
                                required
                                class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="email@example.com"
                            />
                            <p v-if="form.errors.email" class="mt-1 text-sm text-destructive">
                                {{ form.errors.email }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">
                                Geburtsdatum
                            </label>
                            <input
                                v-model="form.birthdate"
                                type="date"
                                class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <p v-if="form.errors.birthdate" class="mt-1 text-sm text-destructive">
                                {{ form.errors.birthdate }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            @click="router.visit('/ucp/dashboard')"
                            class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                        >
                            Abbrechen
                        </button>
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="form.processing">Wird gespeichert...</span>
                            <span v-else>Speichern</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>

