<script setup lang="ts">
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { store as twoFactorStore } from '@/routes/two-factor/login';

const form = useForm({
    code: '',
    recovery_code: '',
});

const useRecoveryCode = ref(false);

const submit = () => {
    form.post(twoFactorStore().url, {
        preserveScroll: true,
        onSuccess: () => {
            // Die Weiterleitung wird vom Backend übernommen
            // Falls keine return_url vorhanden ist, wird zum Dashboard weitergeleitet
        },
        onError: () => {
            form.code = '';
            form.recovery_code = '';
        },
    });
};
</script>

<template>
    <Head title="Zwei-Faktor-Authentifizierung">
        <link rel="icon" type="image/png" href="/images/logo_new.png" />
    </Head>

    <div class="min-h-screen bg-[#f5f3f0] dark:bg-[#1d1d1d] transition-colors flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <div class="bg-card rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-8 shadow-lg">
                <!-- Logo -->
                <div class="flex justify-center mb-6">
                    <img src="/images/logo_new.png" class="h-16 w-auto drop-shadow-[0px_0px_15px_rgba(255,255,255,0.4)]" alt="Westpoint Logo" />
                </div>

                <h1 class="text-2xl font-bold text-center mb-2">Zwei-Faktor-Authentifizierung</h1>
                <p class="text-muted-foreground text-center mb-6">
                    Bitte gib den Code aus deiner Authenticator-App ein, um fortzufahren.
                </p>

                <!-- Error Messages -->
                <div v-if="form.errors.code || form.errors.recovery_code" class="mb-4 p-3 bg-destructive/10 border border-destructive/50 rounded-lg">
                    <p class="text-destructive text-sm">
                        {{ form.errors.code || form.errors.recovery_code }}
                    </p>
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <!-- Toggle zwischen Code und Recovery Code -->
                    <div class="flex justify-center gap-2 mb-4">
                        <button
                            type="button"
                            @click="useRecoveryCode = false"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm transition-colors',
                                !useRecoveryCode
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            ]"
                        >
                            Authenticator Code
                        </button>
                        <button
                            type="button"
                            @click="useRecoveryCode = true"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm transition-colors',
                                useRecoveryCode
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            ]"
                        >
                            Recovery Code
                        </button>
                    </div>

                    <!-- Code Input -->
                    <div v-if="!useRecoveryCode">
                        <label class="block text-sm font-medium mb-2">
                            6-stelliger Code
                        </label>
                        <input
                            v-model="form.code"
                            type="text"
                            maxlength="6"
                            pattern="[0-9]{6}"
                            placeholder="000000"
                            required
                            class="w-full px-4 py-3 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest font-mono"
                            autofocus
                            autocomplete="one-time-code"
                        />
                    </div>

                    <!-- Recovery Code Input -->
                    <div v-else>
                        <label class="block text-sm font-medium mb-2">
                            Recovery Code
                        </label>
                        <input
                            v-model="form.recovery_code"
                            type="text"
                            placeholder="xxxxxxxx-xxxxxxxx"
                            required
                            class="w-full px-4 py-3 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                            autofocus
                        />
                        <p class="mt-2 text-xs text-muted-foreground">
                            Verwende einen deiner Recovery-Codes, falls du keinen Zugriff auf deine Authenticator-App hast.
                        </p>
                    </div>

                    <button
                        type="submit"
                        :disabled="form.processing || (!form.code && !form.recovery_code)"
                        class="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        <span v-if="form.processing">Wird überprüft...</span>
                        <span v-else>Verifizieren</span>
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-sm text-muted-foreground">
                        Probleme? <a href="/auth/discord" class="text-primary hover:underline">Neu anmelden</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

