<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrativ',
        href: '/ucp/admin',
    },
];

const props = defineProps<{
    userGroup?: string;
    onlinePlayers?: any[];
    error?: string;
}>();

const onlinePlayers = ref(props.onlinePlayers || []);
const isLoading = ref(false);
const selectedPlayer = ref<any>(null);
const isDialogOpen = ref(false);
const playerDetails = ref<any>(null);
const isLoadingDetails = ref(false);

// Action states
const actionType = ref<'kick' | 'ban' | 'warn' | 'dm' | 'revive' | null>(null);
const actionReason = ref('');
const actionMessage = ref('');
const actionDuration = ref(24);
const isPerformingAction = ref(false);

// Einzelne Spieler-Ressourcen states
const playerResourceType = ref<'cash' | 'bank' | 'black_money' | 'items' | 'b_coins' | null>(null);
const playerCashAmount = ref<number>(0);
const playerBankAmount = ref<number>(0);
const playerBlackMoneyAmount = ref<number>(0);
const playerBCoinsAmount = ref<number>(0);
const playerItems = ref<Array<{name: string, amount: number}>>([{name: '', amount: 1}]);
const playerItemSearchQuery = ref<Record<number, string>>({});
const playerFilteredItems = ref<Record<number, Array<{name: string, label: string}>>>({});
const isPerformingPlayerResource = ref(false);

// Massenvergabe states
const isBulkAssignDialogOpen = ref(false);
const selectedPlayersForBulk = ref<Set<number>>(new Set());
const bulkResourceType = ref<'cash' | 'bank' | 'black_money' | 'items' | 'b_coins'>('cash');
const bulkAssignRole = ref('');
const bulkCashAmount = ref<number>(0);
const bulkBankAmount = ref<number>(0);
const bulkBlackMoneyAmount = ref<number>(0);
const bulkBCoinsAmount = ref<number>(0);
const bulkItems = ref<Array<{name: string, amount: number}>>([{name: '', amount: 1}]);
const availableItems = ref<Array<{name: string, label: string}>>([]);
const itemSearchQuery = ref<Record<number, string>>({});
const filteredItems = ref<Record<number, Array<{name: string, label: string}>>>({});
const isPerformingBulkAssign = ref(false);
const availableRoles = ref<string[]>([]);

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

const refreshPlayers = async () => {
    isLoading.value = true;
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        
        const response = await fetch('/ucp/admin/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.players)) {
            // Aktualisiere die Liste mit den neuen Daten
            onlinePlayers.value = data.players;
            console.log('Spielerliste aktualisiert:', data.players.length, 'Spieler');
        } else {
            console.error('Ungültige Antwort:', data);
            // Fallback: Lade die gesamte Seite neu
            await router.reload({ only: ['onlinePlayers'] });
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren:', error);
        // Fallback: Lade die gesamte Seite neu
        await router.reload({ only: ['onlinePlayers'] });
    } finally {
        isLoading.value = false;
    }
};

const openPlayerDialog = async (player: any) => {
    selectedPlayer.value = player;
    isDialogOpen.value = true;
    isLoadingDetails.value = true;
    playerDetails.value = null;
    
    // Reset Ressourcen-States
    playerResourceType.value = null;
    playerCashAmount.value = 0;
    playerBankAmount.value = 0;
    playerBlackMoneyAmount.value = 0;
    playerBCoinsAmount.value = 0;
    playerItems.value = [{name: '', amount: 1}];
    playerItemSearchQuery.value = {};
    playerFilteredItems.value = {};
    
    // Lade Items falls noch nicht geladen
    if (availableItems.value.length === 0) {
        try {
            const response = await fetch('/ucp/admin/items', {
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success && data.items && Array.isArray(data.items)) {
                availableItems.value = data.items.map((item: any) => ({
                    name: item.name || item,
                    label: item.label || item.name || item
                }));
            }
        } catch (error) {
            console.error('Fehler beim Laden der Items:', error);
        }
    }
    
    // Initialisiere gefilterte Items
    if (availableItems.value.length > 0) {
        playerItems.value.forEach((_, index) => {
            playerFilteredItems.value[index] = availableItems.value.slice(0, 6);
            playerItemSearchQuery.value[index] = '';
        });
    }
    
    // Hole Spielerdetails
    if (player.identifier) {
        try {
            const response = await fetch('/ucp/admin/player/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ identifier: player.identifier }),
            });
            
            const data = await response.json();
            if (data.success) {
                playerDetails.value = data.player;
            }
        } catch (error) {
            console.error('Fehler beim Laden der Spielerdetails:', error);
        } finally {
            isLoadingDetails.value = false;
        }
    } else {
        isLoadingDetails.value = false;
    }
};

const performAction = async () => {
    if (!actionType.value || !selectedPlayer.value) return;
    
    isPerformingAction.value = true;
    try {
        const payload: any = {
            action: actionType.value,
            player_id: selectedPlayer.value.id || selectedPlayer.value.source,
        };
        
        if (actionType.value === 'dm') {
            payload.message = actionMessage.value;
        } else if (actionType.value === 'ban') {
            payload.reason = actionReason.value;
            payload.duration = actionDuration.value;
        } else if (['kick', 'warn'].includes(actionType.value)) {
            payload.reason = actionReason.value;
        }
        
        const response = await fetch('/ucp/admin/player/action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        if (data.success) {
            // Reset action form
            actionType.value = null;
            actionReason.value = '';
            actionMessage.value = '';
            actionDuration.value = 24;
            
            // Refresh players list
            await refreshPlayers();
        } else {
            alert('Fehler: ' + (data.message || 'Unbekannter Fehler'));
        }
    } catch (error) {
        console.error('Fehler bei der Aktion:', error);
        alert('Fehler bei der Aktion');
    } finally {
        isPerformingAction.value = false;
    }
};

const closeDialog = () => {
    isDialogOpen.value = false;
    selectedPlayer.value = null;
    playerDetails.value = null;
    actionType.value = null;
    actionReason.value = '';
    actionMessage.value = '';
    actionDuration.value = 24;
    playerResourceType.value = null;
    playerCashAmount.value = 0;
    playerBankAmount.value = 0;
    playerBlackMoneyAmount.value = 0;
    playerBCoinsAmount.value = 0;
    playerItems.value = [{name: '', amount: 1}];
    playerItemSearchQuery.value = {};
    playerFilteredItems.value = {};
};

const filterPlayerItems = (index: number) => {
    const query = (playerItemSearchQuery.value[index] || '').toLowerCase();
    if (!query) {
        playerFilteredItems.value[index] = availableItems.value.slice(0, 6);
    } else {
        const filtered = availableItems.value.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.label.toLowerCase().includes(query)
        );
        playerFilteredItems.value[index] = filtered.slice(0, 6);
    }
};

const selectPlayerItem = (index: number, item: {name: string, label: string}) => {
    playerItems.value[index].name = item.name;
    playerItemSearchQuery.value[index] = '';
    filterPlayerItems(index);
};

const addPlayerItem = () => {
    const newIndex = playerItems.value.length;
    playerItems.value.push({name: '', amount: 1});
    playerItemSearchQuery.value[newIndex] = '';
    playerFilteredItems.value[newIndex] = availableItems.value.slice(0, 6);
};

const removePlayerItem = (index: number) => {
    if (playerItems.value.length > 1) {
        playerItems.value.splice(index, 1);
        delete playerItemSearchQuery.value[index];
        delete playerFilteredItems.value[index];
        const newSearchQuery: Record<number, string> = {};
        const newFilteredItems: Record<number, Array<{name: string, label: string}>> = {};
        playerItems.value.forEach((_, newIndex) => {
            if (newIndex < index) {
                newSearchQuery[newIndex] = playerItemSearchQuery.value[newIndex] || '';
                newFilteredItems[newIndex] = playerFilteredItems.value[newIndex] || availableItems.value.slice(0, 6);
            } else if (newIndex >= index) {
                newSearchQuery[newIndex] = playerItemSearchQuery.value[newIndex + 1] || '';
                newFilteredItems[newIndex] = playerFilteredItems.value[newIndex + 1] || availableItems.value.slice(0, 6);
            }
        });
        playerItemSearchQuery.value = newSearchQuery;
        playerFilteredItems.value = newFilteredItems;
    }
};

const performPlayerResource = async () => {
    if (!selectedPlayer.value) return;
    
    // Validierung je nach Ressourcentyp
    if (playerResourceType.value === 'cash' && (!playerCashAmount.value || playerCashAmount.value <= 0)) {
        alert('Bitte gib einen gültigen Cash-Betrag ein.');
        return;
    }
    if (playerResourceType.value === 'bank' && (!playerBankAmount.value || playerBankAmount.value <= 0)) {
        alert('Bitte gib einen gültigen Bank-Betrag ein.');
        return;
    }
    if (playerResourceType.value === 'black_money' && (!playerBlackMoneyAmount.value || playerBlackMoneyAmount.value <= 0)) {
        alert('Bitte gib einen gültigen Black Money-Betrag ein.');
        return;
    }
    if (playerResourceType.value === 'b_coins' && (!playerBCoinsAmount.value || playerBCoinsAmount.value <= 0)) {
        alert('Bitte gib einen gültigen B Coins-Betrag ein.');
        return;
    }
    if (playerResourceType.value === 'items') {
        const validItems = playerItems.value.filter(item => item.name && item.amount > 0);
        if (validItems.length === 0) {
            alert('Bitte füge mindestens ein Item mit Name und Anzahl hinzu.');
            return;
        }
    }
    
    isPerformingPlayerResource.value = true;
    try {
        const playerId = selectedPlayer.value.id || selectedPlayer.value.source;
        const playerData = {
            id: playerId,
            identifier: selectedPlayer.value.identifier,
        };
        
        const payload: any = {
            players_data: [playerData],
            resource_type: playerResourceType.value,
        };
        
        // Füge die spezifischen Daten je nach Ressourcentyp hinzu
        if (playerResourceType.value === 'cash') {
            payload.amount = playerCashAmount.value;
        } else if (playerResourceType.value === 'bank') {
            payload.amount = playerBankAmount.value;
        } else if (playerResourceType.value === 'black_money') {
            payload.amount = playerBlackMoneyAmount.value;
        } else if (playerResourceType.value === 'b_coins') {
            payload.amount = playerBCoinsAmount.value;
        } else if (playerResourceType.value === 'items') {
            payload.items = playerItems.value.filter(item => item.name && item.amount > 0);
        }
        
        const response = await fetch('/ucp/admin/bulk-assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        if (data.success) {
            const resourceNames: Record<string, string> = {
                'cash': `${formatNumber(playerCashAmount.value)} $ Cash`,
                'bank': `${formatNumber(playerBankAmount.value)} $ Bank`,
                'black_money': `${formatNumber(playerBlackMoneyAmount.value)} $ Black Money`,
                'b_coins': `${formatNumber(playerBCoinsAmount.value)} B Coins`,
                'items': `${playerItems.value.filter(i => i.name && i.amount > 0).length} Item(s)`,
            };
            alert(`${resourceNames[playerResourceType.value!]} wurde erfolgreich vergeben.`);
            playerResourceType.value = null;
            playerCashAmount.value = 0;
            playerBankAmount.value = 0;
            playerBlackMoneyAmount.value = 0;
            playerBCoinsAmount.value = 0;
            playerItems.value = [{name: '', amount: 1}];
            playerItemSearchQuery.value = {};
            playerFilteredItems.value = {};
            await refreshPlayers();
        } else {
            alert('Fehler: ' + (data.message || 'Unbekannter Fehler'));
        }
    } catch (error) {
        console.error('Fehler bei der Ressourcenvergabe:', error);
        alert('Fehler bei der Ressourcenvergabe');
    } finally {
        isPerformingPlayerResource.value = false;
    }
};

const openBulkAssignDialog = async () => {
    isBulkAssignDialogOpen.value = true;
    // Wähle automatisch alle Online-Spieler aus
    if (onlinePlayers.value && onlinePlayers.value.length > 0) {
        selectedPlayersForBulk.value = new Set(onlinePlayers.value.map((_, index) => index));
    } else {
        selectedPlayersForBulk.value = new Set();
    }
    bulkResourceType.value = 'cash';
    bulkCashAmount.value = 0;
    bulkBankAmount.value = 0;
    bulkBlackMoneyAmount.value = 0;
    bulkBCoinsAmount.value = 0;
    bulkItems.value = [{name: '', amount: 1}];
    
    // Lade verfügbare Items
    try {
        const response = await fetch('/admin/items', {
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success && data.items && Array.isArray(data.items)) {
            availableItems.value = data.items.map((item: any) => ({
                name: item.name || item,
                label: item.label || item.name || item
            }));
            // Initialisiere gefilterte Items für alle Item-Felder
            bulkItems.value.forEach((_, index) => {
                filteredItems.value[index] = availableItems.value.slice(0, 6);
                itemSearchQuery.value[index] = '';
            });
        }
    } catch (error) {
        console.error('Fehler beim Laden der Items:', error);
    }
};

const filterItems = (index: number) => {
    const query = (itemSearchQuery.value[index] || '').toLowerCase();
    if (!query) {
        filteredItems.value[index] = availableItems.value.slice(0, 6);
    } else {
        const filtered = availableItems.value.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.label.toLowerCase().includes(query)
        );
        filteredItems.value[index] = filtered.slice(0, 6);
    }
};

const selectItem = (index: number, item: {name: string, label: string}) => {
    bulkItems.value[index].name = item.name;
    itemSearchQuery.value[index] = '';
    filterItems(index);
};

const addBulkItem = () => {
    const newIndex = bulkItems.value.length;
    bulkItems.value.push({name: '', amount: 1});
    itemSearchQuery.value[newIndex] = '';
    filteredItems.value[newIndex] = availableItems.value.slice(0, 6);
};

const removeBulkItem = (index: number) => {
    if (bulkItems.value.length > 1) {
        bulkItems.value.splice(index, 1);
        // Entferne auch die zugehörigen Suchfelder
        delete itemSearchQuery.value[index];
        delete filteredItems.value[index];
        // Aktualisiere Indizes für verbleibende Items
        const newSearchQuery: Record<number, string> = {};
        const newFilteredItems: Record<number, Array<{name: string, label: string}>> = {};
        bulkItems.value.forEach((_, newIndex) => {
            if (newIndex < index) {
                newSearchQuery[newIndex] = itemSearchQuery.value[newIndex] || '';
                newFilteredItems[newIndex] = filteredItems.value[newIndex] || availableItems.value.slice(0, 6);
            } else if (newIndex >= index) {
                newSearchQuery[newIndex] = itemSearchQuery.value[newIndex + 1] || '';
                newFilteredItems[newIndex] = filteredItems.value[newIndex + 1] || availableItems.value.slice(0, 6);
            }
        });
        itemSearchQuery.value = newSearchQuery;
        filteredItems.value = newFilteredItems;
    }
};


const performBulkAssign = async () => {
    if (!onlinePlayers.value || onlinePlayers.value.length === 0) {
        alert('Keine Online-Spieler verfügbar.');
        return;
    }
    
    // Validierung je nach Ressourcentyp
    if (bulkResourceType.value === 'cash' && (!bulkCashAmount.value || bulkCashAmount.value <= 0)) {
        alert('Bitte gib einen gültigen Cash-Betrag ein.');
        return;
    }
    if (bulkResourceType.value === 'bank' && (!bulkBankAmount.value || bulkBankAmount.value <= 0)) {
        alert('Bitte gib einen gültigen Bank-Betrag ein.');
        return;
    }
    if (bulkResourceType.value === 'black_money' && (!bulkBlackMoneyAmount.value || bulkBlackMoneyAmount.value <= 0)) {
        alert('Bitte gib einen gültigen Black Money-Betrag ein.');
        return;
    }
    if (bulkResourceType.value === 'b_coins' && (!bulkBCoinsAmount.value || bulkBCoinsAmount.value <= 0)) {
        alert('Bitte gib einen gültigen B Coins-Betrag ein.');
        return;
    }
    if (bulkResourceType.value === 'items') {
        const validItems = bulkItems.value.filter(item => item.name && item.amount > 0);
        if (validItems.length === 0) {
            alert('Bitte füge mindestens ein Item mit Name und Anzahl hinzu.');
            return;
        }
    }
    
    isPerformingBulkAssign.value = true;
    try {
        // Sammle Spieler-Informationen (ID und identifier falls verfügbar)
        const selectedPlayersData = Array.from(selectedPlayersForBulk.value).map(index => {
            const player = onlinePlayers.value[index];
            return {
                id: player.id || player.source || player.playerId,
                identifier: player.identifier,
                // Sende alle verfügbaren Felder für bessere Zuordnung
                player_data: {
                    id: player.id,
                    source: player.source,
                    identifier: player.identifier,
                    name: player.name,
                }
            };
        }).filter(p => p.id !== null && p.id !== undefined);
        
        if (selectedPlayersData.length === 0) {
            alert('Keine gültigen Spieler-IDs gefunden. Bitte aktualisiere die Spielerliste.');
            isPerformingBulkAssign.value = false;
            return;
        }
        
        console.log('Sende Massenvergabe-Request:', {
            players_data: selectedPlayersData,
            resource_type: bulkResourceType.value,
        });
        
        const payload: any = {
            players_data: selectedPlayersData, // Sende vollständige Spieler-Daten
            resource_type: bulkResourceType.value,
        };
        
        // Füge die spezifischen Daten je nach Ressourcentyp hinzu
        if (bulkResourceType.value === 'cash') {
            payload.amount = bulkCashAmount.value;
        } else if (bulkResourceType.value === 'bank') {
            payload.amount = bulkBankAmount.value;
        } else if (bulkResourceType.value === 'black_money') {
            payload.amount = bulkBlackMoneyAmount.value;
        } else if (bulkResourceType.value === 'b_coins') {
            payload.amount = bulkBCoinsAmount.value;
        } else if (bulkResourceType.value === 'items') {
            payload.items = bulkItems.value.filter(item => item.name && item.amount > 0);
        }
        
        const response = await fetch('/ucp/admin/bulk-assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        if (data.success) {
            const resourceNames: Record<string, string> = {
                'cash': `${formatNumber(bulkCashAmount.value)} $ Cash`,
                'bank': `${formatNumber(bulkBankAmount.value)} $ Bank`,
                'black_money': `${formatNumber(bulkBlackMoneyAmount.value)} $ Black Money`,
                'b_coins': `${formatNumber(bulkBCoinsAmount.value)} B Coins`,
                'items': `${bulkItems.value.filter(i => i.name && i.amount > 0).length} Item(s)`,
            };
            alert(`${resourceNames[bulkResourceType.value]} wurde erfolgreich an ${selectedPlayersData.length} Spieler zugewiesen.`);
            closeBulkAssignDialog();
            await refreshPlayers();
        } else {
            alert('Fehler: ' + (data.message || 'Unbekannter Fehler'));
        }
    } catch (error) {
        console.error('Fehler bei der Massenvergabe:', error);
        alert('Fehler bei der Massenvergabe');
    } finally {
        isPerformingBulkAssign.value = false;
    }
};

const closeBulkAssignDialog = () => {
    isBulkAssignDialogOpen.value = false;
    selectedPlayersForBulk.value = new Set();
    bulkResourceType.value = 'cash';
    bulkCashAmount.value = 0;
    bulkBankAmount.value = 0;
    bulkBlackMoneyAmount.value = 0;
    bulkBCoinsAmount.value = 0;
    bulkItems.value = [{name: '', amount: 1}];
    itemSearchQuery.value = {};
    filteredItems.value = {};
};
</script>

<template>
    <Head title="Administrativ" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold mb-2">Administrativ</h1>
                <p class="text-muted-foreground">Verwaltung und Übersicht über den Server</p>
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

            <!-- Online Players Card -->
            <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-semibold flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Online Spieler: {{ onlinePlayers?.length || 0 }}
                    </h2>
                    <div class="flex gap-2">
                        <Button 
                            @click="openBulkAssignDialog" 
                            :disabled="!onlinePlayers || onlinePlayers.length === 0"
                            variant="default"
                            size="sm"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Massenvergabe
                        </Button>
                        <Button 
                            @click="refreshPlayers" 
                            :disabled="isLoading"
                            variant="outline"
                            size="sm"
                        >
                            <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Aktualisieren
                        </Button>
                    </div>
                </div>

                <!-- No Players -->
                <div v-if="!onlinePlayers || onlinePlayers.length === 0" class="flex items-center justify-center py-12">
                    <div class="text-center">
                        <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p class="text-lg text-muted-foreground">Keine Spieler online</p>
                    </div>
                </div>

                <!-- Players Grid -->
                <div v-if="onlinePlayers && onlinePlayers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div
                        v-for="(player, index) in onlinePlayers"
                        :key="index"
                        @click="openPlayerDialog(player)"
                        class="bg-muted/50 rounded-lg p-4 border border-sidebar-border/70 cursor-pointer hover:bg-muted transition-colors"
                    >
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p class="text-sm font-semibold">{{ player.name || player.source || `Spieler #${index + 1}` }}</p>
                        </div>
                        <div class="space-y-1 text-xs text-muted-foreground">
                            <p v-if="player.id">ID: {{ player.id }}</p>
                            <p v-if="player.source">Source: {{ player.source }}</p>
                            <p v-if="player.identifier">Identifier: {{ player.identifier }}</p>
                            <p v-if="player.ping">Ping: {{ player.ping }}ms</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Player Details Dialog -->
        <Dialog :open="isDialogOpen" @update:open="(val) => !val && closeDialog()">
            <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {{ selectedPlayer?.name || selectedPlayer?.source || 'Spieler Details' }}
                    </DialogTitle>
                    <DialogDescription>
                        Informationen und Aktionen für diesen Spieler
                    </DialogDescription>
                </DialogHeader>

                <!-- Loading State -->
                <div v-if="isLoadingDetails" class="flex items-center justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>

                <!-- Player Information -->
                <div v-if="!isLoadingDetails" class="space-y-6">
                    <!-- Online Player Info -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">ID</p>
                            <p class="text-sm font-semibold">{{ selectedPlayer?.id || selectedPlayer?.source || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Source</p>
                            <p class="text-sm font-semibold">{{ selectedPlayer?.source || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Identifier</p>
                            <p class="text-sm font-semibold">{{ selectedPlayer?.identifier || 'N/A' }}</p>
                        </div>
                        <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                            <p class="text-xs text-muted-foreground mb-1">Ping</p>
                            <p class="text-sm font-semibold">{{ selectedPlayer?.ping ? `${selectedPlayer.ping}ms` : 'N/A' }}</p>
                        </div>
                    </div>

                    <!-- Database Player Info -->
                    <div v-if="playerDetails" class="space-y-4">
                        <h3 class="text-lg font-semibold">Datenbank Informationen</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                                <p class="text-xs text-muted-foreground mb-1">Vorname</p>
                                <p class="text-sm font-semibold">{{ playerDetails.firstname || 'N/A' }}</p>
                            </div>
                            <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                                <p class="text-xs text-muted-foreground mb-1">Nachname</p>
                                <p class="text-sm font-semibold">{{ playerDetails.lastname || 'N/A' }}</p>
                            </div>
                            <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                                <p class="text-xs text-muted-foreground mb-1">Beruf</p>
                                <p class="text-sm font-semibold">{{ playerDetails.job || 'N/A' }}</p>
                            </div>
                            <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                                <p class="text-xs text-muted-foreground mb-1">Gruppe</p>
                                <p class="text-sm font-semibold">{{ playerDetails.group || 'N/A' }}</p>
                            </div>
                            <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                                <p class="text-xs text-muted-foreground mb-1">Online</p>
                                <p class="text-sm font-semibold" :class="playerDetails.isOnline ? 'text-green-500' : ''">
                                    {{ playerDetails.isOnline ? 'Ja' : 'Nein' }}
                                </p>
                            </div>
                            <div class="bg-muted/50 rounded-lg p-3 border border-sidebar-border/70">
                                <p class="text-xs text-muted-foreground mb-1">Telefonnummer</p>
                                <p class="text-sm font-semibold">{{ playerDetails.phone_number || 'N/A' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="space-y-4 pt-4 border-t border-sidebar-border/70">
                        <h3 class="text-lg font-semibold">Aktionen</h3>
                        
                        <!-- Action Buttons -->
                        <div class="grid grid-cols-2 gap-2">
                            <Button 
                                @click="actionType = 'kick'" 
                                variant="outline"
                                :class="actionType === 'kick' ? 'border-destructive' : ''"
                            >
                                Kick
                            </Button>
                            <Button 
                                @click="actionType = 'ban'" 
                                variant="outline"
                                :class="actionType === 'ban' ? 'border-destructive' : ''"
                            >
                                Ban
                            </Button>
                            <Button 
                                @click="actionType = 'warn'" 
                                variant="outline"
                                :class="actionType === 'warn' ? 'border-destructive' : ''"
                            >
                                Warnen
                            </Button>
                            <Button 
                                @click="actionType = 'dm'" 
                                variant="outline"
                            >
                                Nachricht
                            </Button>
                            <Button 
                                @click="actionType = 'revive'" 
                                variant="outline"
                            >
                                Wiederbeleben
                            </Button>
                        </div>
                        
                        <!-- Ressourcen-Verwaltung -->
                        <div class="pt-4 border-t border-sidebar-border/70">
                            <h3 class="text-lg font-semibold mb-3">Ressourcen vergeben</h3>
                            
                            <!-- Ressourcentyp auswählen -->
                            <div class="mb-4">
                                <Label>Ressourcentyp</Label>
                                <div class="grid grid-cols-2 gap-2 mt-2">
                                    <Button 
                                        @click="playerResourceType = 'cash'" 
                                        :variant="playerResourceType === 'cash' ? 'default' : 'outline'"
                                        size="sm"
                                    >
                                        Cash
                                    </Button>
                                    <Button 
                                        @click="playerResourceType = 'bank'" 
                                        :variant="playerResourceType === 'bank' ? 'default' : 'outline'"
                                        size="sm"
                                    >
                                        Bank
                                    </Button>
                                    <Button 
                                        @click="playerResourceType = 'black_money'" 
                                        :variant="playerResourceType === 'black_money' ? 'default' : 'outline'"
                                        size="sm"
                                    >
                                        Black Money
                                    </Button>
                                    <Button 
                                        @click="playerResourceType = 'items'" 
                                        :variant="playerResourceType === 'items' ? 'default' : 'outline'"
                                        size="sm"
                                    >
                                        Items
                                    </Button>
                                    <Button 
                                        @click="playerResourceType = 'b_coins'" 
                                        :variant="playerResourceType === 'b_coins' ? 'default' : 'outline'"
                                        size="sm"
                                    >
                                        B Coins
                                    </Button>
                                </div>
                            </div>
                            
                            <!-- Ressourcen-spezifische Eingaben -->
                            <div v-if="playerResourceType" class="space-y-4 p-4 bg-muted/30 rounded-lg border border-sidebar-border/70">
                                <!-- Cash -->
                                <div v-if="playerResourceType === 'cash'">
                                    <Label for="player-cash">Cash-Betrag *</Label>
                                    <Input
                                        id="player-cash"
                                        v-model.number="playerCashAmount"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>

                                <!-- Bank -->
                                <div v-if="playerResourceType === 'bank'">
                                    <Label for="player-bank">Bank-Betrag *</Label>
                                    <Input
                                        id="player-bank"
                                        v-model.number="playerBankAmount"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>

                                <!-- Black Money -->
                                <div v-if="playerResourceType === 'black_money'">
                                    <Label for="player-black-money">Black Money-Betrag *</Label>
                                    <Input
                                        id="player-black-money"
                                        v-model.number="playerBlackMoneyAmount"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>

                                <!-- B Coins -->
                                <div v-if="playerResourceType === 'b_coins'">
                                    <Label for="player-b-coins">B Coins-Betrag *</Label>
                                    <Input
                                        id="player-b-coins"
                                        v-model.number="playerBCoinsAmount"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>

                                <!-- Items -->
                                <div v-if="playerResourceType === 'items'">
                                    <Label>Items *</Label>
                                    <div class="space-y-3 mt-2">
                                        <div 
                                            v-for="(item, index) in playerItems" 
                                            :key="index"
                                            class="space-y-2"
                                        >
                                            <div class="flex gap-2 items-end">
                                                <div class="flex-1 relative">
                                                    <Label :for="`player-item-search-${index}`" class="text-xs">Item suchen</Label>
                                                    <Input
                                                        :id="`player-item-search-${index}`"
                                                        v-model="playerItemSearchQuery[index]"
                                                        @input="filterPlayerItems(index)"
                                                        placeholder="Item suchen..."
                                                        class="pr-8"
                                                    />
                                                    <svg v-if="playerItemSearchQuery[index]" class="absolute right-2 top-8 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    
                                                    <!-- Dropdown mit max. 6 Items -->
                                                    <div v-if="playerFilteredItems[index] && playerFilteredItems[index].length > 0 && !item.name" 
                                                         class="absolute z-10 w-full mt-1 bg-card border border-sidebar-border/70 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                        <div
                                                            v-for="availableItem in playerFilteredItems[index]"
                                                            :key="availableItem.name"
                                                            @click="selectPlayerItem(index, availableItem)"
                                                            class="px-3 py-2 hover:bg-muted cursor-pointer border-b border-sidebar-border/70 last:border-b-0"
                                                        >
                                                            <p class="text-sm font-semibold">{{ availableItem.label }}</p>
                                                            <p class="text-xs text-muted-foreground">{{ availableItem.name }}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- Ausgewähltes Item anzeigen -->
                                                    <div v-if="item.name" class="mt-2 p-2 bg-muted/50 rounded-lg border border-sidebar-border/70">
                                                        <p class="text-sm font-semibold">
                                                            {{ availableItems.find(i => i.name === item.name)?.label || item.name }}
                                                        </p>
                                                        <p class="text-xs text-muted-foreground">{{ item.name }}</p>
                                                        <Button 
                                                            @click="item.name = ''; playerItemSearchQuery[index] = ''; filterPlayerItems(index)" 
                                                            variant="ghost" 
                                                            size="sm"
                                                            class="mt-1 h-6 text-xs"
                                                        >
                                                            Ändern
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div class="w-24">
                                                    <Label :for="`player-item-amount-${index}`" class="text-xs">Anzahl</Label>
                                                    <Input
                                                        :id="`player-item-amount-${index}`"
                                                        v-model.number="item.amount"
                                                        type="number"
                                                        min="1"
                                                        placeholder="1"
                                                    />
                                                </div>
                                                <Button 
                                                    @click="removePlayerItem(index)" 
                                                    variant="ghost" 
                                                    size="sm"
                                                    :disabled="playerItems.length === 1"
                                                    class="mb-0"
                                                >
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                        <Button @click="addPlayerItem" variant="outline" size="sm">
                                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Item hinzufügen
                                        </Button>
                                    </div>
                                </div>
                                
                                <!-- Submit Button -->
                                <div class="flex gap-2 pt-2">
                                    <Button 
                                        @click="performPlayerResource" 
                                        :disabled="isPerformingPlayerResource"
                                    >
                                        {{ isPerformingPlayerResource ? 'Wird vergeben...' : 'Vergeben' }}
                                    </Button>
                                    <Button 
                                        @click="playerResourceType = null" 
                                        variant="outline"
                                        :disabled="isPerformingPlayerResource"
                                    >
                                        Abbrechen
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <!-- Action Form -->
                        <div v-if="actionType" class="space-y-4 p-4 bg-muted/30 rounded-lg border border-sidebar-border/70">
                            <div v-if="actionType === 'dm'">
                                <Label for="message">Nachricht</Label>
                                <Input 
                                    id="message"
                                    v-model="actionMessage" 
                                    placeholder="Nachricht eingeben..."
                                />
                            </div>
                            
                            <div v-if="['kick', 'ban', 'warn'].includes(actionType)">
                                <Label for="reason">Grund</Label>
                                <Input 
                                    id="reason"
                                    v-model="actionReason" 
                                    placeholder="Grund eingeben..."
                                />
                            </div>
                            
                            <div v-if="actionType === 'ban'">
                                <Label for="duration">Dauer (Stunden)</Label>
                                <Input 
                                    id="duration"
                                    v-model.number="actionDuration" 
                                    type="number"
                                    min="1"
                                />
                            </div>

                            <div class="flex gap-2">
                                <Button 
                                    @click="performAction" 
                                    :disabled="isPerformingAction"
                                    :variant="actionType === 'ban' || actionType === 'kick' ? 'destructive' : 'default'"
                                >
                                    {{ isPerformingAction ? 'Wird ausgeführt...' : 'Ausführen' }}
                                </Button>
                                <Button 
                                    @click="actionType = null" 
                                    variant="outline"
                                >
                                    Abbrechen
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button @click="closeDialog" variant="outline">Schließen</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Massenvergabe Dialog -->
        <Dialog :open="isBulkAssignDialogOpen" @update:open="(val) => !val && closeBulkAssignDialog()">
            <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Massenvergabe</DialogTitle>
                    <DialogDescription>
                        Wähle Spieler aus und weise ihnen Ressourcen zu
                    </DialogDescription>
                </DialogHeader>

                <div class="space-y-6">
                    <!-- Ressourcentyp auswählen -->
                    <div>
                        <Label>Ressourcentyp *</Label>
                        <div class="grid grid-cols-2 gap-2 mt-2">
                            <Button 
                                @click="bulkResourceType = 'cash'" 
                                :variant="bulkResourceType === 'cash' ? 'default' : 'outline'"
                                size="sm"
                            >
                                Cash
                            </Button>
                            <Button 
                                @click="bulkResourceType = 'bank'" 
                                :variant="bulkResourceType === 'bank' ? 'default' : 'outline'"
                                size="sm"
                            >
                                Bank
                            </Button>
                            <Button 
                                @click="bulkResourceType = 'black_money'" 
                                :variant="bulkResourceType === 'black_money' ? 'default' : 'outline'"
                                size="sm"
                            >
                                Black Money
                            </Button>
                            <Button 
                                @click="bulkResourceType = 'items'" 
                                :variant="bulkResourceType === 'items' ? 'default' : 'outline'"
                                size="sm"
                            >
                                Items
                            </Button>
                            <Button 
                                @click="bulkResourceType = 'b_coins'" 
                                :variant="bulkResourceType === 'b_coins' ? 'default' : 'outline'"
                                size="sm"
                            >
                                B Coins
                            </Button>
                        </div>
                    </div>

                    <!-- Info: Alle Online-Spieler werden automatisch ausgewählt -->
                    <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p class="text-sm text-blue-800 dark:text-blue-200">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Alle {{ onlinePlayers?.length || 0 }} Online-Spieler erhalten die ausgewählten Ressourcen.
                        </p>
                    </div>

                    <!-- Ressourcen-spezifische Eingaben -->
                    <div class="space-y-4 p-4 bg-muted/30 rounded-lg border border-sidebar-border/70">
                        <!-- Cash -->
                        <div v-if="bulkResourceType === 'cash'">
                            <Label for="bulk-cash">Cash-Betrag *</Label>
                            <Input
                                id="bulk-cash"
                                v-model.number="bulkCashAmount"
                                type="number"
                                min="0"
                                placeholder="0"
                            />
                        </div>

                        <!-- Bank -->
                        <div v-if="bulkResourceType === 'bank'">
                            <Label for="bulk-bank">Bank-Betrag *</Label>
                            <Input
                                id="bulk-bank"
                                v-model.number="bulkBankAmount"
                                type="number"
                                min="0"
                                placeholder="0"
                            />
                        </div>

                        <!-- Black Money -->
                        <div v-if="bulkResourceType === 'black_money'">
                            <Label for="bulk-black-money">Black Money-Betrag *</Label>
                            <Input
                                id="bulk-black-money"
                                v-model.number="bulkBlackMoneyAmount"
                                type="number"
                                min="0"
                                placeholder="0"
                            />
                        </div>

                        <!-- B Coins -->
                        <div v-if="bulkResourceType === 'b_coins'">
                            <Label for="bulk-b-coins">B Coins-Betrag *</Label>
                            <Input
                                id="bulk-b-coins"
                                v-model.number="bulkBCoinsAmount"
                                type="number"
                                min="0"
                                placeholder="0"
                            />
                        </div>

                        <!-- Items -->
                        <div v-if="bulkResourceType === 'items'">
                            <Label>Items *</Label>
                            <div class="space-y-3 mt-2">
                                <div 
                                    v-for="(item, index) in bulkItems" 
                                    :key="index"
                                    class="space-y-2"
                                >
                                    <div class="flex gap-2 items-end">
                                        <div class="flex-1 relative">
                                            <Label :for="`item-search-${index}`" class="text-xs">Item suchen</Label>
                                            <Input
                                                :id="`item-search-${index}`"
                                                v-model="itemSearchQuery[index]"
                                                @input="filterItems(index)"
                                                placeholder="Item suchen..."
                                                class="pr-8"
                                            />
                                            <svg v-if="itemSearchQuery[index]" class="absolute right-2 top-8 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            
                                            <!-- Dropdown mit max. 6 Items -->
                                            <div v-if="filteredItems[index] && filteredItems[index].length > 0 && !item.name" 
                                                 class="absolute z-10 w-full mt-1 bg-card border border-sidebar-border/70 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                <div
                                                    v-for="availableItem in filteredItems[index]"
                                                    :key="availableItem.name"
                                                    @click="selectItem(index, availableItem)"
                                                    class="px-3 py-2 hover:bg-muted cursor-pointer border-b border-sidebar-border/70 last:border-b-0"
                                                >
                                                    <p class="text-sm font-semibold">{{ availableItem.label }}</p>
                                                    <p class="text-xs text-muted-foreground">{{ availableItem.name }}</p>
                                                </div>
                                            </div>
                                            
                                            <!-- Ausgewähltes Item anzeigen -->
                                            <div v-if="item.name" class="mt-2 p-2 bg-muted/50 rounded-lg border border-sidebar-border/70">
                                                <p class="text-sm font-semibold">
                                                    {{ availableItems.find(i => i.name === item.name)?.label || item.name }}
                                                </p>
                                                <p class="text-xs text-muted-foreground">{{ item.name }}</p>
                                                <Button 
                                                    @click="item.name = ''; itemSearchQuery[index] = ''; filterItems(index)" 
                                                    variant="ghost" 
                                                    size="sm"
                                                    class="mt-1 h-6 text-xs"
                                                >
                                                    Ändern
                                                </Button>
                                            </div>
                                        </div>
                                        <div class="w-24">
                                            <Label :for="`item-amount-${index}`" class="text-xs">Anzahl</Label>
                                            <Input
                                                :id="`item-amount-${index}`"
                                                v-model.number="item.amount"
                                                type="number"
                                                min="1"
                                                placeholder="1"
                                            />
                                        </div>
                                        <Button 
                                            @click="removeBulkItem(index)" 
                                            variant="ghost" 
                                            size="sm"
                                            :disabled="bulkItems.length === 1"
                                            class="mb-0"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                                <Button @click="addBulkItem" variant="outline" size="sm">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Item hinzufügen
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>

                <DialogFooter>
                    <Button @click="closeBulkAssignDialog" variant="outline" :disabled="isPerformingBulkAssign">
                        Abbrechen
                    </Button>
                    <Button 
                        @click="performBulkAssign" 
                        :disabled="isPerformingBulkAssign || !onlinePlayers || onlinePlayers.length === 0"
                    >
                        {{ isPerformingBulkAssign ? 'Wird zugewiesen...' : `An ${onlinePlayers?.length || 0} Spieler zuweisen` }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>

