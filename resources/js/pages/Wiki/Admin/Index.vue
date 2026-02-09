<template>
    <Head title="Wiki Verwaltung" />
    
    <div class="min-h-screen bg-[#1d1d1d]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">Wiki Verwaltung</h1>
                <Link
                    :href="create().url"
                    class="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded transition-colors"
                >
                    Neuen Artikel erstellen
                </Link>
            </div>

            <div v-if="$page.props.flash?.success" class="mb-4 p-4 bg-green-900/30 border border-green-600 rounded text-green-200">
                {{ $page.props.flash.success }}
            </div>

            <div class="bg-[#2d2d2d] rounded-lg border border-gray-700 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-[#1a1a1a]">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Titel</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kategorie</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Autor</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aufrufe</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-700">
                        <tr v-for="article in articles" :key="article.id" class="hover:bg-[#1a1a1a]">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-white">{{ article.title }}</div>
                                <div class="text-sm text-gray-400">{{ article.slug }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {{ article.category }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="article.published ? 'bg-green-900/30 text-green-200' : 'bg-gray-900/30 text-gray-400'"
                                    class="px-2 py-1 text-xs rounded"
                                >
                                    {{ article.published ? 'Veröffentlicht' : 'Entwurf' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {{ article.author_name || 'Unbekannt' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {{ article.views }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <Link
                                    :href="wikiShow(article.slug).url"
                                    target="_blank"
                                    class="text-blue-400 hover:text-blue-300"
                                >
                                    Ansehen
                                </Link>
                                <Link
                                    :href="editRoute(article.id).url"
                                    class="text-yellow-400 hover:text-yellow-300"
                                >
                                    Bearbeiten
                                </Link>
                                <button
                                    @click="togglePublish(article)"
                                    :class="article.published ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'"
                                >
                                    {{ article.published ? 'Verstecken' : 'Veröffentlichen' }}
                                </button>
                                <button
                                    @click="deleteArticle(article)"
                                    class="text-red-400 hover:text-red-300"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                        <tr v-if="articles.length === 0">
                            <td colspan="6" class="px-6 py-4 text-center text-gray-400">
                                Keine Artikel gefunden.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6">
                <Link
                    :href="changeRequestsIndex().url"
                    class="inline-flex items-center px-4 py-2 bg-yellow-800 hover:bg-yellow-700 text-white rounded transition-colors"
                >
                    Änderungsanträge verwalten
                    <span v-if="pendingCount > 0" class="ml-2 px-2 py-1 bg-red-600 rounded text-xs">
                        {{ pendingCount }}
                    </span>
                </Link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { create, edit as editRoute, destroy, togglePublish as togglePublishRoute } from '@/routes/wiki/admin'
import { show as wikiShow } from '@/routes/wiki'
import { index as changeRequestsIndex } from '@/routes/wiki/admin/change-requests'

defineProps({
    articles: Array,
    pendingCount: {
        type: Number,
        default: 0
    }
})

const togglePublish = (article) => {
    router.post(togglePublishRoute(article.id).url, {}, {
        preserveScroll: true,
    })
}

const deleteArticle = (article) => {
    if (confirm(`Möchtest du den Artikel "${article.title}" wirklich löschen?`)) {
        router.delete(destroy(article.id).url)
    }
}
</script>

