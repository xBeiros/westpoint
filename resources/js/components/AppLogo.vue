<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const appName = page.props.name as string || 'Westpoint';

// Initialen aus firstname und lastname generieren
const userInitials = computed(() => {
    const auth = page.props.auth as any;
    if (!auth || !auth.player) {
        // Fallback: Versuche aus auth.user.name
        if (auth && auth.user && auth.user.name) {
            const names = auth.user.name.trim().split(' ');
            if (names.length >= 2) {
                return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
            } else if (names.length === 1) {
                return names[0].charAt(0).toUpperCase();
            }
        }
        return 'WP'; // Fallback zu "Westpoint"
    }
    
    const firstname = auth.player.firstname || '';
    const lastname = auth.player.lastname || '';
    
    if (firstname && lastname) {
        return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
    } else if (firstname) {
        return firstname.charAt(0).toUpperCase();
    } else if (lastname) {
        return lastname.charAt(0).toUpperCase();
    }
    
    return 'WP'; // Fallback
});
</script>

<template>
    <div
        class="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-red-900/80 text-white font-bold text-sm"
    >
        {{ userInitials }}
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate leading-tight font-semibold"
            >{{ appName }}</span
        >
    </div>
</template>
