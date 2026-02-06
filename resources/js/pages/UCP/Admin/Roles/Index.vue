<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { ref, computed, nextTick } from 'vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Textarea wird direkt verwendet
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrativ',
        href: '/ucp/admin',
    },
    {
        title: 'Rollen',
        href: '/ucp/admin/roles',
    },
];

const props = defineProps<{
    roles?: any[];
    error?: string;
    userPermissions?: string[];
}>();

const roles = ref(props.roles || []);
const isDialogOpen = ref(false);
const isEditMode = ref(false);
const currentRole = ref<any>(null);
const isLoading = ref(false);

// Formular-Daten
const formData = ref({
    name: '',
    description: '',
    permissions: [] as string[],
});

// Verfügbare Berechtigungen
const availablePermissions = [
    { id: 'admin.players.view', label: 'Spieler anzeigen' },
    { id: 'admin.players.kick', label: 'Spieler kicken' },
    { id: 'admin.players.ban', label: 'Spieler bannen' },
    { id: 'admin.players.warn', label: 'Spieler warnen' },
    { id: 'admin.players.dm', label: 'Nachricht senden' },
    { id: 'admin.players.revive', label: 'Spieler wiederbeleben' },
    { id: 'admin.roles.view', label: 'Rollen anzeigen' },
    { id: 'admin.roles.create', label: 'Rollen erstellen' },
    { id: 'admin.roles.edit', label: 'Rollen bearbeiten' },
    { id: 'admin.roles.delete', label: 'Rollen löschen' },
];

// Prüfe ob der Benutzer eine bestimmte Berechtigung hat
const hasPermission = (permissionId: string): boolean => {
    const userPerms = props.userPermissions || [];
    // Prüfe ob der Benutzer die spezifische Berechtigung hat oder alle Berechtigungen (*)
    return userPerms.includes(permissionId) || userPerms.includes('*');
};

const openCreateDialog = () => {
    if (!hasPermission('admin.roles.create')) {
        alert('Du hast keine Berechtigung, Rollen zu erstellen.');
        return;
    }
    isEditMode.value = false;
    currentRole.value = null;
    formData.value = {
        name: '',
        description: '',
        permissions: [],
    };
    isDialogOpen.value = true;
};

const openEditDialog = async (role: any) => {
    if (!hasPermission('admin.roles.edit')) {
        alert('Du hast keine Berechtigung, Rollen zu bearbeiten.');
        return;
    }
    
    isEditMode.value = true;
    currentRole.value = role;
    
    // Stelle sicher, dass permissions ein Array ist
    let permissions: string[] = [];
    
    if (role.permissions) {
        if (typeof role.permissions === 'string') {
            try {
                const parsed = JSON.parse(role.permissions);
                permissions = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                console.error('Fehler beim Parsen der Berechtigungen:', e);
                permissions = [];
            }
        } else if (Array.isArray(role.permissions)) {
            // Konvertiere zu einem echten Array (falls es ein Proxy ist)
            permissions = Array.from(role.permissions) as string[];
        } else if (typeof role.permissions === 'object' && role.permissions !== null) {
            // Falls es ein Objekt ist, versuche es zu konvertieren
            try {
                permissions = Object.values(role.permissions) as string[];
            } catch (e) {
                console.error('Fehler beim Konvertieren der Berechtigungen:', e);
                permissions = [];
            }
        }
    }
    
    console.log('=== OPEN EDIT DIALOG ===');
    console.log('Role:', role);
    console.log('Role.permissions (raw):', role.permissions);
    console.log('Role.permissions type:', typeof role.permissions);
    console.log('Role.permissions isArray:', Array.isArray(role.permissions));
    console.log('Parsed permissions:', permissions);
    console.log('Parsed permissions length:', permissions.length);
    
    // Erstelle eine neue Array-Referenz für Reaktivität
    formData.value = {
        name: role.name,
        description: role.description || '',
        permissions: [...permissions], // Neue Array-Referenz
    };
    
    console.log('FormData nach Initialisierung:', formData.value);
    console.log('FormData.permissions:', formData.value.permissions);
    console.log('FormData.permissions length:', formData.value.permissions.length);
    console.log('Ist Array?', Array.isArray(formData.value.permissions));
    
    isDialogOpen.value = true;
    
    // Warte einen Moment, damit Vue die Änderungen verarbeitet
    await nextTick();
    console.log('Dialog geöffnet, FormData:', formData.value);
    console.log('FormData.permissions nach nextTick:', formData.value.permissions);
    
    // Prüfe, welche Checkboxen aktiviert sein sollten
    availablePermissions.forEach((perm: any) => {
        const isChecked = formData.value.permissions.includes(perm.id);
        console.log(`Permission ${perm.id} (${perm.label}): ${isChecked ? 'CHECKED' : 'UNCHECKED'}`);
    });
};

const closeDialog = () => {
    isDialogOpen.value = false;
    currentRole.value = null;
    formData.value = {
        name: '',
        description: '',
        permissions: [],
    };
};

const togglePermission = (permissionId: string, checked: boolean | string) => {
    const isChecked = checked === true || checked === 'true' || checked === 'checked';
    console.log('Toggle Permission:', permissionId, 'checked:', checked, 'isChecked:', isChecked);
    
    // Erstelle eine neue Array-Referenz für Reaktivität
    const currentPermissions = [...formData.value.permissions];
    
    if (isChecked) {
        if (!currentPermissions.includes(permissionId)) {
            currentPermissions.push(permissionId);
        }
    } else {
        const index = currentPermissions.indexOf(permissionId);
        if (index > -1) {
            currentPermissions.splice(index, 1);
        }
    }
    
    formData.value.permissions = currentPermissions;
    console.log('Current permissions after toggle:', formData.value.permissions);
};

const togglePermissionDirect = (permissionId: string) => {
    // Verhindere mehrfache gleichzeitige Aufrufe
    if (isLoading.value) {
        return;
    }
    
    console.log('Toggle Permission Direct:', permissionId);
    console.log('Current permissions before toggle:', [...formData.value.permissions]);
    
    // Erstelle eine neue Array-Referenz für Reaktivität
    // Verwende Array.from() für bessere Reaktivität
    const currentPermissions = Array.from(formData.value.permissions);
    const index = currentPermissions.indexOf(permissionId);
    
    if (index > -1) {
        // Berechtigung entfernen
        currentPermissions.splice(index, 1);
        console.log('Berechtigung entfernt:', permissionId);
    } else {
        // Berechtigung hinzufügen
        currentPermissions.push(permissionId);
        console.log('Berechtigung hinzugefügt:', permissionId);
    }
    
    // Verwende Object.assign oder direkte Zuweisung für bessere Reaktivität
    formData.value = {
        ...formData.value,
        permissions: currentPermissions,
    };
    
    console.log('Current permissions after direct toggle:', formData.value.permissions);
    console.log('Permissions count:', formData.value.permissions.length);
    console.log('Is Array?', Array.isArray(formData.value.permissions));
    console.log('FormData object:', formData.value);
};

const saveRole = async () => {
    // Prüfe Berechtigungen vor dem Speichern
    if (!hasPermission('admin.roles.create') && !isEditMode.value) {
        alert('Du hast keine Berechtigung, Rollen zu erstellen.');
        return;
    }
    
    if (!hasPermission('admin.roles.edit') && isEditMode.value) {
        alert('Du hast keine Berechtigung, Rollen zu bearbeiten.');
        return;
    }
    
    // Prüfe ob der Benutzer die Berechtigung hat, alle gewählten Berechtigungen zu setzen
    const userPerms = props.userPermissions || [];
    const invalidPermissions = formData.value.permissions.filter(
        (perm: string) => !userPerms.includes(perm) && !userPerms.includes('*')
    );
    
    if (invalidPermissions.length > 0) {
        alert(`Du hast keine Berechtigung, folgende Berechtigungen zu setzen: ${invalidPermissions.join(', ')}`);
        return;
    }
    
    isLoading.value = true;
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        const url = isEditMode.value && currentRole.value
            ? `/ucp/admin/roles/${currentRole.value.id}`
            : '/ucp/admin/roles';
        
        const method = isEditMode.value ? 'PUT' : 'POST';
        
        // Stelle sicher, dass permissions ein echtes Array ist
        let permissionsArray: string[] = [];
        if (Array.isArray(formData.value.permissions)) {
            permissionsArray = [...formData.value.permissions];
        } else if (formData.value.permissions) {
            // Falls es ein Proxy oder ähnliches ist, konvertiere es
            permissionsArray = Array.from(formData.value.permissions) as string[];
        }
        
        const requestData = {
            name: formData.value.name,
            description: formData.value.description,
            permissions: permissionsArray,
        };
        
        console.log('=== SENDING ROLE DATA ===');
        console.log('FormData.value:', formData.value);
        console.log('FormData.value.permissions:', formData.value.permissions);
        console.log('FormData.value.permissions type:', typeof formData.value.permissions);
        console.log('Is Array?', Array.isArray(formData.value.permissions));
        console.log('Permissions Array (processed):', permissionsArray);
        console.log('Request Data:', requestData);
        console.log('Request Data JSON:', JSON.stringify(requestData));
        console.log('Is Edit Mode:', isEditMode.value);
        console.log('Current Role ID:', currentRole.value?.id);
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
            body: JSON.stringify(requestData),
        });
        
        if (!response.ok) {
            if (response.status === 419) {
                router.reload({ only: ['roles'] });
                return;
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('=== RESPONSE FROM SERVER ===');
        console.log('Response data:', data);
        console.log('Response role:', data.role);
        console.log('Response permissions:', data.role?.permissions);
        
        if (data.success) {
            console.log('Rolle gespeichert:', data.role);
            console.log('Gespeicherte Berechtigungen:', data.role?.permissions);
            closeDialog();
            router.reload({ only: ['roles'] });
        } else {
            console.error('Fehler beim Speichern:', data);
            alert('Fehler: ' + (data.message || 'Unbekannter Fehler'));
        }
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        alert('Fehler beim Speichern der Rolle');
    } finally {
        isLoading.value = false;
    }
};

const deleteRole = async (role: any) => {
    if (!confirm(`Möchtest du die Rolle "${role.name}" wirklich löschen?`)) {
        return;
    }
    
    isLoading.value = true;
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        
        const response = await fetch(`/ucp/admin/roles/${role.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });
        
        if (!response.ok) {
            if (response.status === 419) {
                router.reload({ only: ['roles'] });
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
            router.reload({ only: ['roles'] });
        } else {
            alert('Fehler: ' + (data.message || 'Unbekannter Fehler'));
        }
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
        alert('Fehler beim Löschen der Rolle');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <Head title="Rollen-Verwaltung" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4 flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Rollen-Verwaltung</h1>
                    <p class="text-muted-foreground">Verwalte Rollen und deren Berechtigungen</p>
                </div>
                <Button @click="openCreateDialog" variant="default">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Neue Rolle
                </Button>
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

            <!-- Roles List -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="role in roles"
                    :key="role.id"
                    class="bg-card rounded-lg p-6 border border-sidebar-border/70 hover:border-sidebar-border transition-colors"
                >
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold">{{ role.name }}</h3>
                            <p v-if="role.description" class="text-sm text-muted-foreground mt-1">{{ role.description }}</p>
                        </div>
                        <div class="flex gap-2">
                            <Button
                                @click="openEditDialog(role)"
                                variant="ghost"
                                size="sm"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </Button>
                            <Button
                                @click="deleteRole(role)"
                                variant="ghost"
                                size="sm"
                                class="text-destructive hover:text-destructive"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <p class="text-xs text-muted-foreground">Berechtigungen:</p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="permission in (role.permissions || [])"
                                :key="permission"
                                class="px-2 py-1 bg-muted rounded text-xs"
                            >
                                {{ availablePermissions.find(p => p.id === permission)?.label || permission }}
                            </span>
                            <span v-if="!role.permissions || role.permissions.length === 0" class="text-xs text-muted-foreground">
                                Keine Berechtigungen
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!roles || roles.length === 0" class="flex items-center justify-center py-12">
                <div class="text-center">
                    <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p class="text-lg text-muted-foreground">Keine Rollen vorhanden</p>
                    <p class="text-sm text-muted-foreground mt-2">Erstelle eine neue Rolle, um zu beginnen</p>
                </div>
            </div>
        </div>

        <!-- Create/Edit Dialog -->
        <Dialog :open="isDialogOpen" @update:open="(val) => !val && closeDialog()">
            <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {{ isEditMode ? 'Rolle bearbeiten' : 'Neue Rolle erstellen' }}
                    </DialogTitle>
                    <DialogDescription>
                        {{ isEditMode ? 'Bearbeite die Rolle und ihre Berechtigungen' : 'Erstelle eine neue Rolle mit Berechtigungen' }}
                    </DialogDescription>
                </DialogHeader>

                <div class="space-y-4">
                    <!-- Name -->
                    <div>
                        <Label for="name">Rollenname *</Label>
                        <Input
                            id="name"
                            v-model="formData.name"
                            placeholder="z.B. admin, moderator"
                            :disabled="isLoading"
                        />
                        <p class="text-xs text-muted-foreground mt-1">
                            Der Name entspricht der "Gruppe" in der Spieler-Information
                        </p>
                    </div>

                    <!-- Description -->
                    <div>
                        <Label for="description">Beschreibung</Label>
                        <textarea
                            id="description"
                            v-model="formData.description"
                            placeholder="Beschreibung der Rolle..."
                            :disabled="isLoading"
                            rows="3"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <!-- Permissions -->
                    <div>
                        <Label>Berechtigungen</Label>
                        <div class="mt-2 space-y-2 max-h-64 overflow-y-auto border border-sidebar-border/70 rounded-lg p-4">
                            <div
                                v-for="permission in availablePermissions"
                                :key="permission.id"
                                class="flex items-center space-x-2"
                            >
                                <Checkbox
                                    :id="permission.id"
                                    :checked="formData.permissions?.includes(permission.id) ?? false"
                                    :disabled="isLoading || !hasPermission(permission.id)"
                                    @update:checked="(checked: any) => togglePermission(permission.id, checked)"
                                />
                                <Label
                                    :for="permission.id"
                                    :class="[
                                        'text-sm font-normal',
                                        hasPermission(permission.id) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                                    ]"
                                    @click="hasPermission(permission.id) && togglePermissionDirect(permission.id)"
                                >
                                    {{ permission.label }}
                                    <span v-if="!hasPermission(permission.id)" class="text-xs text-muted-foreground ml-1">
                                        (Keine Berechtigung)
                                    </span>
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button @click="closeDialog" variant="outline" :disabled="isLoading">
                        Abbrechen
                    </Button>
                    <Button @click="saveRole" :disabled="isLoading || !formData.name">
                        {{ isLoading ? 'Wird gespeichert...' : (isEditMode ? 'Aktualisieren' : 'Erstellen') }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>

