<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { dashboard } from '@/routes/ucp'
import { Head } from '@inertiajs/vue3'
import WikiAdminSection from '@/components/WikiAdminSection.vue'

const breadcrumbs = [{ title: 'Dashboard', href: dashboard().url }]

const props = defineProps<{
    wikiArticles?: any[]
    wikiPendingCount?: number
    canManageWiki?: boolean
}>()

const sections = [
    {
        title: 'Server',
        stats: [
            ['Serverstatus', 'Online', 'M9 12l2 2 4-4'],
            ['User Online', '128 / 256', 'M17 20v-2a4 4 0 00-4-4h-2M7 20v-2a4 4 0 014-4h2M9 7a4 4 0 118 0'],
            ['Nächster Restart', '04:00 Uhr', 'M12 8v4l3 3M12 2a10 10 0 100 20'],
        ],
    },
    {
        title: 'Community',
        stats: [
            ['Registrierungen Heute', '23', 'M16 21v-2a4 4 0 00-4-4H8M9 7a4 4 0 100 8'],
            ['Whitelist', 'Offen', 'M5 13l4 4L19 7'],
        ],
    },
    {
        title: 'Fraktionen',
        stats: [
            ['Staatsfraktionen', 'Bewerbungen Offen', 'M3 7h18M3 12h18M3 17h18'],
        ],
    },
    {
        title: 'Team & Support',
        stats: [
            ['Team Online', '4', 'M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4'],
            ['Support', 'Verfügbar', 'M18 10c0-3.866-3.582-7-8-7S2 6.134 2 10v5a3 3 0 003 3h1'],
        ],
    },
]
</script>

<template>
    <Head title="Server Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="garamond-font flex flex-col gap-10 p-4 ml-2 text-white">
            <section v-for="section in sections" :key="section.title">
                <!-- SECTION TITLE -->
                <h2 class="mb-4 text-sm uppercase tracking-wide font-normal text-white/70">
                    {{ section.title }}
                </h2>

                <!-- Grid: Boxen nebeneinander -->
                <div class="grid md:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-4">
                    <div
                        v-for="[title, value, path] in section.stats"
                        :key="title"
                        class="flex items-center gap-4 rounded-xl p-4
                               w-full ring-1 ring-inset ring-[#B66453]
                               shadow-[0_0_10px_rgba(255,182,193,0.6)]
                               hover:shadow-[0_0_20px_rgba(255,182,193,0.8)]
                               transition-shadow duration-500"
                    >
                        <!-- ICON -->
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-lg
                                   bg-white/5"
                        >
                            <svg
                                class="h-6 w-6"
                                style="color:#7F3F33"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    :d="path"
                                />
                            </svg>
                        </div>

                        <!-- TEXT -->
                        <div class="flex flex-1 flex-col text-center">
                            <span
                                class="text-sm font-normal"
                                style="color:#7F3F33"
                            >
                                {{ title }}
                            </span>
                            <span class="text-2xl font-normal text-white">
                                {{ value }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </AppLayout>
</template>

<style scoped>
@font-face {
    font-family: 'GaramondItalic';
    src: url('@/Assets/fonts/Garamond Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

.garamond-font {
    font-family: 'GaramondItalic', serif;
    font-weight: normal;
}
</style>
