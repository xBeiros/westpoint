<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const appName = page.props.name as string || 'BerlinCity';
</script>

<template>
    <div
        class="flex aspect-square size-8 items-center justify-center overflow-hidden"
    >
        <img 
            src="/images/BerlinCity.gif" 
            alt="BerlinCity Logo" 
            class="size-full object-cover rounded-full"
        />
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate leading-tight font-semibold"
            >{{ appName }}</span
        >
    </div>
</template>
