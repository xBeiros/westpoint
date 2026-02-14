<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref, computed, watch, onMounted } from 'vue';
import { enable as enable2FA, disable as disable2FA, confirm as confirm2FA, qrCode as qrCodeRoute, secretKey as secretKeyRoute } from '@/routes/two-factor';

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
    userData: {
        firstname?: string | null;
        lastname?: string | null;
        email?: string | null;
        birthdate?: string | null;
    } | null;
    twoFactorEnabled?: boolean;
    twoFactorConfirmed?: boolean;
    error?: string;
}>();

const form = useForm({
    firstname: props.userData?.firstname || '',
    lastname: props.userData?.lastname || '',
    email: props.userData?.email || '',
    birthdate: props.userData?.birthdate || '',
});

// Watch für UserData-Änderung
watch(() => props.userData, (newData) => {
    if (newData) {
        form.firstname = newData.firstname || '';
        form.lastname = newData.lastname || '';
        form.email = newData.email || '';
        form.birthdate = newData.birthdate || '';
    }
}, { immediate: true });

const submit = () => {
    form.post('/ucp/profile', {
        preserveScroll: true,
        onSuccess: () => {
            // Lade Seite neu, um aktualisierte Daten anzuzeigen
            router.reload({ only: ['userData'] });
        },
    });
};

// 2FA State
const isEnabling2FA = ref(false);
const qrCodeUrl = ref<string | null>(null);
const secretKey = ref<string | null>(null);
const show2FASetup = ref(false);
const twoFactorCode = ref('');
const isConfirming2FA = ref(false);

// Lade 2FA-Daten beim Mount, wenn 2FA aktiviert aber nicht bestätigt ist
onMounted(async () => {
    if (props.twoFactorEnabled && !props.twoFactorConfirmed) {
        // 2FA ist aktiviert, aber nicht bestätigt - lade QR-Code und Secret Key
        try {
            const qrResponse = await fetch(qrCodeRoute().url, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });
            
            const secretResponse = await fetch(secretKeyRoute().url, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            if (qrResponse.ok && secretResponse.ok) {
                const qrData = await qrResponse.json();
                const secretData = await secretResponse.json();
                
                qrCodeUrl.value = qrData.svg || qrData;
                secretKey.value = secretData.secretKey || secretData.secret || secretData;
                show2FASetup.value = true;
            }
        } catch (error) {
            console.error('Fehler beim Laden der 2FA-Daten:', error);
        }
    }
});

const enable2FAAuth = async () => {
    isEnabling2FA.value = true;
    try {
        console.log('Starte 2FA-Aktivierung...');
        
        // Aktiviere 2FA (mit force=true, wenn bereits aktiviert, um neuen QR-Code zu generieren)
        const enableUrl = enable2FA().url;
        console.log('Enable URL:', enableUrl);
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        console.log('CSRF Token vorhanden:', !!csrfToken);
        
        // Erstelle FormData für POST-Request (Laravel erwartet form-data oder x-www-form-urlencoded)
        const formData = new FormData();
        if (props.twoFactorEnabled) {
            formData.append('force', '1');
        }
        
        const response = await fetch(enableUrl, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            },
            body: formData,
            credentials: 'same-origin',
        });

        console.log('2FA Enable Response Status:', response.status, response.statusText);

        if (!response.ok) {
            let errorMessage = 'Fehler beim Aktivieren von 2FA.';
            
            try {
                const errorData = await response.json();
                console.error('2FA Enable Error Data:', errorData);
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e) {
                const errorText = await response.text();
                console.error('2FA Enable Error Text:', errorText);
                if (errorText) {
                    errorMessage = errorText;
                }
            }
            
            alert(errorMessage);
            isEnabling2FA.value = false;
            return;
        }

        console.log('2FA erfolgreich aktiviert, hole QR-Code und Secret Key...');

        // Hole QR-Code und Secret Key parallel
        const [qrResponse, secretResponse] = await Promise.all([
            fetch(qrCodeRoute().url, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
            }),
            fetch(secretKeyRoute().url, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
            }),
        ]);

        console.log('QR Code Response Status:', qrResponse.status);
        console.log('Secret Key Response Status:', secretResponse.status);

        if (qrResponse.ok && secretResponse.ok) {
            const qrData = await qrResponse.json();
            const secretData = await secretResponse.json();
            
            console.log('QR Data:', qrData);
            console.log('Secret Data:', secretData);
            
            qrCodeUrl.value = qrData.svg || qrData;
            secretKey.value = secretData.secretKey || secretData.secret || secretData;
            show2FASetup.value = true;
            
            console.log('2FA Setup erfolgreich, QR-Code und Secret Key geladen');
        } else {
            const qrError = qrResponse.ok ? null : await qrResponse.text().catch(() => 'Unbekannter Fehler');
            const secretError = secretResponse.ok ? null : await secretResponse.text().catch(() => 'Unbekannter Fehler');
            console.error('QR Code Error:', qrError);
            console.error('Secret Key Error:', secretError);
            alert('Fehler beim Abrufen von QR-Code oder Secret Key. Bitte versuche es erneut.');
        }
    } catch (error) {
        console.error('Fehler beim Aktivieren von 2FA:', error);
        alert('Ein unerwarteter Fehler ist aufgetreten. Bitte öffne die Browser-Konsole für Details.');
    } finally {
        isEnabling2FA.value = false;
    }
};

const confirm2FAAuth = async () => {
    if (!twoFactorCode.value) {
        return;
    }

    isConfirming2FA.value = true;
    try {
        const confirmUrl = confirm2FA().url;
        console.log('Confirm 2FA URL:', confirmUrl);
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        console.log('CSRF Token vorhanden:', !!csrfToken);
        
        const response = await fetch(confirmUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                code: twoFactorCode.value,
            }),
        });

        console.log('Confirm 2FA Response Status:', response.status, response.statusText);

        if (response.ok) {
            const data = await response.json().catch(() => ({}));
            show2FASetup.value = false;
            twoFactorCode.value = '';
            qrCodeUrl.value = null;
            secretKey.value = null;
            // Lade die Seite neu, um den aktualisierten 2FA-Status zu erhalten
            router.reload({ only: ['twoFactorEnabled', 'twoFactorConfirmed'] });
        } else {
            let errorMessage = 'Ungültiger Code. Bitte versuche es erneut.';
            try {
                const data = await response.json();
                console.error('Confirm 2FA Error Data:', data);
                errorMessage = data.message || data.error || errorMessage;
            } catch (e) {
                const errorText = await response.text();
                console.error('Confirm 2FA Error Text:', errorText);
            }
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Fehler beim Bestätigen von 2FA:', error);
        alert('Ein unerwarteter Fehler ist aufgetreten. Bitte öffne die Browser-Konsole für Details.');
    } finally {
        isConfirming2FA.value = false;
    }
};

const disable2FAAuth = async () => {
    if (!confirm('Möchtest du die Zwei-Faktor-Authentifizierung wirklich deaktivieren?')) {
        return;
    }

    try {
        const response = await fetch(disable2FA().url, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        if (response.ok) {
            router.reload({ only: ['twoFactorEnabled', 'twoFactorConfirmed'] });
        }
    } catch (error) {
        console.error('Fehler beim Deaktivieren von 2FA:', error);
    }
};
</script>

<template>
    <Head title="Profil bearbeiten" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold mb-2">Profil bearbeiten</h1>
                <p class="text-muted-foreground">Bearbeite deine persönlichen Daten, diese sind Wichtig für den Fall des Account Verlustes</p>
                <p class="text-muted-foreground">Alle Daten sind Privat und werden mit Extra behutsamkeit verarbeitet.</p>
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
            <div v-if="!userData && !error" class="flex items-center justify-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <!-- Profile Edit Form -->
            <div v-if="userData" class="space-y-6">
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

                <!-- 2FA Section -->
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Zwei-Faktor-Authentifizierung
                    </h2>

                    <!-- 2FA noch nicht aktiviert -->
                    <div v-if="!props.twoFactorEnabled" class="space-y-4">
                        <p class="text-muted-foreground">
                            Erhöhe die Sicherheit deines Accounts durch Zwei-Faktor-Authentifizierung. 
                            Nach dem Discord-Login musst du einen Code aus deiner Authenticator-App eingeben.
                        </p>
                        <button
                            @click="enable2FAAuth"
                            :disabled="isEnabling2FA"
                            class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="isEnabling2FA">Wird aktiviert...</span>
                            <span v-else>2FA aktivieren</span>
                        </button>
                    </div>

                    <!-- 2FA aktiviert, aber nicht bestätigt -->
                    <div v-if="props.twoFactorEnabled && !props.twoFactorConfirmed" class="space-y-4">
                        <div class="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-4">
                            <div class="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span class="font-semibold">2FA-Einrichtung noch nicht abgeschlossen</span>
                            </div>
                            <p class="text-sm text-muted-foreground">
                                Du hast 2FA aktiviert, aber noch nicht bestätigt. Bitte scanne den QR-Code und gib den Bestätigungscode ein, um die Einrichtung abzuschließen.
                            </p>
                        </div>
                        
                        <button
                            @click="enable2FAAuth"
                            :disabled="isEnabling2FA"
                            class="px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            <span v-if="isEnabling2FA">Wird neu aktiviert...</span>
                            <span v-else>Neuen QR-Code generieren</span>
                        </button>
                    </div>

                    <!-- 2FA Setup Modal -->
                    <div v-if="show2FASetup && qrCodeUrl && secretKey" class="mt-6 space-y-4">
                        <div class="bg-muted/50 rounded-lg p-4">
                            <h3 class="text-lg font-semibold mb-3">Schritt 1: QR-Code scannen</h3>
                            <p class="text-sm text-muted-foreground mb-4">
                                Scanne diesen QR-Code mit deiner Authenticator-App (z.B. Google Authenticator, Authy):
                            </p>
                            <div class="flex justify-center mb-4">
                                <div v-html="qrCodeUrl" class="bg-white p-4 rounded-lg"></div>
                            </div>
                            <p class="text-sm text-muted-foreground mb-2">
                                Oder gib diesen Code manuell ein:
                            </p>
                            <div class="bg-background p-3 rounded-lg font-mono text-sm break-all">
                                {{ secretKey }}
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold">Schritt 2: Code bestätigen</h3>
                            <p class="text-sm text-muted-foreground">
                                Gib den 6-stelligen Code aus deiner Authenticator-App ein, um die Einrichtung abzuschließen:
                            </p>
                            <div class="flex gap-3">
                                <input
                                    v-model="twoFactorCode"
                                    type="text"
                                    maxlength="6"
                                    pattern="[0-9]{6}"
                                    placeholder="000000"
                                    class="flex-1 px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest font-mono"
                                />
                                <button
                                    @click="confirm2FAAuth"
                                    :disabled="!twoFactorCode || twoFactorCode.length !== 6 || isConfirming2FA"
                                    class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="isConfirming2FA">Wird bestätigt...</span>
                                    <span v-else>Bestätigen</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="props.twoFactorEnabled && props.twoFactorConfirmed" class="space-y-4">
                        <div class="flex items-center gap-2 text-green-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="font-semibold">Zwei-Faktor-Authentifizierung ist aktiviert</span>
                        </div>
                        <p class="text-muted-foreground text-sm">
                            Dein Account ist durch Zwei-Faktor-Authentifizierung geschützt. 
                            Nach jedem Discord-Login musst du einen Code aus deiner Authenticator-App eingeben.
                        </p>
                        <button
                            @click="disable2FAAuth"
                            class="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                        >
                            2FA deaktivieren
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

