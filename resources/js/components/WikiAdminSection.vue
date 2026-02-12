<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { create, edit as editRoute, destroy, togglePublish as togglePublishRoute, index as wikiIndex } from '@/routes/ucp/wiki';
import { show as wikiShow } from '@/routes/wiki';
import { index as changeRequestsIndex } from '@/routes/ucp/wiki/change-requests';

const props = defineProps<{
    articles: any[];
    pendingCount?: number;
}>();

const togglePublish = (article: any) => {
    router.post(togglePublishRoute(article.id).url, {}, {
        preserveScroll: true,
    });
};

const deleteArticle = (article: any) => {
    if (confirm(`Möchtest du den Artikel "${article.title}" wirklich löschen?`)) {
        router.delete(destroy(article.id).url);
    }
};
</script>

<template>
    <section class="mt-10">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Wiki Verwaltung
                </h2>
                <p class="text-muted-foreground text-sm">Verwalte Wiki-Artikel und Änderungsanträge</p>
            </div>
            <div class="flex gap-2">
                <Link
                    :href="create().url"
                    class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Neuer Artikel
                </Link>
                <Link
                    :href="wikiIndex().url"
                    class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                >
                    Alle anzeigen
                </Link>
            </div>
        </div>

        <!-- Articles Table Card -->
        <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card">
            <div class="p-6">
                <div v-if="articles.length === 0" class="text-center py-8">
                    <svg class="w-12 h-12 mx-auto text-muted-foreground mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p class="text-muted-foreground">Keine Artikel gefunden.</p>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-sidebar-border/70">
                                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Titel</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Kategorie</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Aufrufe</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Aktionen</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-sidebar-border/70">
                            <tr v-for="article in articles.slice(0, 5)" :key="article.id" class="hover:bg-muted/50 transition-colors">
                                <td class="px-4 py-4">
                                    <div class="text-sm font-medium">{{ article.title }}</div>
                                    <div class="text-xs text-muted-foreground mt-1">{{ article.slug }}</div>
                                </td>
                                <td class="px-4 py-4 text-sm">
                                    <span class="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs">
                                        {{ article.category || 'Keine Kategorie' }}
                                    </span>
                                </td>
                                <td class="px-4 py-4">
                                    <span
                                        :class="article.published 
                                            ? 'bg-green-500/10 text-green-500 border-green-500/50' 
                                            : 'bg-muted text-muted-foreground border-sidebar-border/70'"
                                        class="inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium"
                                    >
                                        {{ article.published ? 'Veröffentlicht' : 'Entwurf' }}
                                    </span>
                                </td>
                                <td class="px-4 py-4 text-sm text-muted-foreground">
                                    {{ article.views || 0 }}
                                </td>
                                <td class="px-4 py-4">
                                    <div class="flex items-center gap-2">
                                        <Link
                                            :href="wikiShow(article.slug).url"
                                            target="_blank"
                                            class="text-primary hover:text-primary/80 transition-colors"
                                            title="Ansehen"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                        <Link
                                            :href="editRoute(article.id).url"
                                            class="text-yellow-500 hover:text-yellow-600 transition-colors"
                                            title="Bearbeiten"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button
                                            @click="togglePublish(article)"
                                            :class="article.published 
                                                ? 'text-orange-500 hover:text-orange-600' 
                                                : 'text-green-500 hover:text-green-600'"
                                            class="transition-colors"
                                            :title="article.published ? 'Verstecken' : 'Veröffentlichen'"
                                        >
                                            <svg v-if="article.published" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button
                                            @click="deleteArticle(article)"
                                            class="text-destructive hover:text-destructive/80 transition-colors"
                                            title="Löschen"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="articles.length > 5" class="mt-4 text-center">
                    <Link
                        :href="wikiIndex().url"
                        class="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        Alle {{ articles.length }} Artikel anzeigen →
                    </Link>
                </div>
            </div>
        </div>

        <!-- Change Requests Card -->
        <div class="mt-6 relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-semibold mb-1 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Änderungsanträge
                    </h3>
                    <p class="text-muted-foreground text-xs">Verwalte ausstehende Änderungsanträge</p>
                </div>
                <Link
                    :href="changeRequestsIndex().url"
                    class="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors gap-2"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Verwalten
                    <span v-if="pendingCount && pendingCount > 0" class="ml-2 px-2 py-1 bg-red-500 rounded text-xs font-semibold">
                        {{ pendingCount }}
                    </span>
                </Link>
            </div>
        </div>
    </section>
</template>
