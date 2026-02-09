<template>
    <div class="min-h-screen bg-[#1d1d1d]">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-[#1d1d1d] border-b border-gray-800">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center gap-3">
                        <Link href="/wiki" class="flex items-center gap-3">
                            <img src="@/Assets/images/logo.png" class="h-8 drop-shadow-[0px_0px_15px_rgba(255,255,255,0.4)]" alt="Westpoint Logo" />
                            <div class="stevie-sans-book-italic flex items-center bg-red-800/60 drop-shadow-[0px_0px_10px_rgba(255,255,255,0.4)] rounded-md px-3 h-6">
                                <div class="-ml-1 drop-shadow-[0px_0px_10px_rgba(255,255,255,1)] text-sm">
                                    WIKI
                                </div>
                            </div>
                        </Link>
                    </div>

                    <!-- Search Bar -->
                    <div class="flex-1 max-w-2xl mx-8">
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                v-model="searchQuery"
                                @keyup.enter="performSearch"
                                placeholder="Suche nach Informationen auf der Website..."
                                class="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2d2d2d] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
                            />
                        </div>
                    </div>

                    <!-- Header Icons -->
                    <div class="flex items-center gap-4">
                        <button class="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button>
                        <div class="flex items-center gap-2 text-gray-400">
                            <span class="text-sm">DE</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <button class="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Layout -->
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex gap-8">
                <!-- Left Sidebar - Navigation -->
                <aside class="w-64 flex-shrink-0">
                    <div class="sticky top-24">
                        <h3 class="text-lg font-bold text-white mb-4 stevie-sans-bold">Kategorien</h3>
                        <nav class="space-y-1">
                            <div v-for="category in categories" :key="category.name" class="mb-4">
                                <button
                                    @click="toggleCategory(category.name)"
                                    class="w-full flex items-center justify-between text-left text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-[#2d2d2d]"
                                >
                                    <div class="flex items-center gap-2">
                                        <span class="text-lg">{{ getCategoryIcon(category.name) }}</span>
                                        <span class="text-sm font-medium">{{ category.display_name }}</span>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 transition-transform"
                                        :class="{ 'rotate-90': expandedCategories.includes(category.name) }"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <div
                                    v-if="expandedCategories.includes(category.name)"
                                    class="ml-6 mt-1 space-y-1"
                                >
                                    <Link
                                        v-for="article in category.articles"
                                        :key="article.slug"
                                        :href="`/wiki/${article.slug}`"
                                        class="block text-sm text-gray-400 hover:text-red-800 transition-colors py-1.5 px-3 rounded"
                                        :class="{ 'text-red-800 font-semibold': article.slug === currentSlug }"
                                    >
                                        {{ article.title }}
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 min-w-0">
                    <article class="bg-[#1d1d1d]">
                        <!-- Article Header -->
                        <header class="mb-8">
                            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 stevie-sans-bold">
                                {{ article.title }}
                            </h1>

                            <!-- Metadata Badges -->
                            <div class="flex flex-wrap items-center gap-4 mb-6">
                                <div class="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                    <span class="text-white text-sm">0 likes</span>
                                </div>
                                <div class="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium">
                                    {{ article.views || 0 }} Aufrufe
                                </div>
                                <div v-if="article.created_at" class="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium">
                                    Veröffentlicht am {{ formatDate(article.created_at) }}
                                </div>
                            </div>
                        </header>

                        <!-- Article Content -->
                        <div class="prose prose-invert max-w-none">
                            <div v-html="article.content" class="wiki-content"></div>
                        </div>
                    </article>
                </main>

                <!-- Right Sidebar - Article Info -->
                <aside class="w-64 flex-shrink-0">
                    <div class="sticky top-24">
                        <div class="bg-[#2d2d2d] rounded-lg border border-gray-700 p-6 space-y-6">
                            <!-- Category -->
                            <div>
                                <h4 class="text-sm font-semibold text-gray-400 mb-2 uppercase">Kategorie</h4>
                                <div class="flex items-center gap-2">
                                    <span class="text-lg">{{ getCategoryIcon(article.category || 'general') }}</span>
                                    <span class="text-white font-medium">{{ getCategoryDisplayName(article.category || 'general') }}</span>
                                </div>
                            </div>

                            <!-- Reading Time -->
                            <div>
                                <h4 class="text-sm font-semibold text-gray-400 mb-2 uppercase">Lesezeit</h4>
                                <p class="text-white">{{ calculateReadingTime(article.content) }} Minuten</p>
                            </div>

                            <!-- Share Button -->
                            <div>
                                <button
                                    @click="shareArticle"
                                    class="w-full flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    <span>Teilen</span>
                                </button>
                            </div>

                            <!-- Report Error -->
                            <div>
                                <Link
                                    :href="`/wiki/change-request/create/${article.slug}`"
                                    class="text-sm text-blue-400 hover:text-blue-300 underline"
                                >
                                    Hast du einen Fehler in dem Artikel gefunden?
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import { show as wikiShow } from '@/routes/wiki'

const props = defineProps({
    article: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        default: () => []
    }
})

const searchQuery = ref('')
const expandedCategories = ref([])
const currentSlug = computed(() => props.article.slug)

// Category Icons Mapping (gleiche wie in Index.vue)
const categoryIcons = {
    'server': '🖥️',
    'vorbereitung': '🔧',
    'spielanfang': '🍼',
    'grundlagen': '🎮',
    'arbeit': '💼',
    'staatsfraktionen': '👮',
    'kriminelle-fraktionen': '💀',
    'familiensystem': '👨‍👩‍👧‍👦',
    'geschäfte': '🛒',
    'immobilien': '🏠',
    'freizeit': '🍹',
    'events': '🎉',
    'karte': '🗺️',
    'frisuren': '✂️',
    'kleidung': '👕',
    'unternehmen': '💰',
    'fahrzeug': '🚗',
    'waffe': '🔫',
    'general': '📚',
    'allgemein': '📚',
}

const getCategoryIcon = (categoryName) => {
    const normalized = categoryName?.toLowerCase().replace(/\s+/g, '-')
    return categoryIcons[normalized] || '📚'
}

const getCategoryDisplayName = (categoryName) => {
    const category = props.categories.find(cat => cat.name === categoryName)
    return category?.display_name || ucfirst(categoryName)
}

const ucfirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

const toggleCategory = (categoryName) => {
    const index = expandedCategories.value.indexOf(categoryName)
    if (index > -1) {
        expandedCategories.value.splice(index, 1)
    } else {
        expandedCategories.value.push(categoryName)
    }
}

// Expand category of current article on mount
onMounted(() => {
    if (props.article.category) {
        expandedCategories.value.push(props.article.category)
    }
})

const performSearch = () => {
    if (searchQuery.value) {
        router.visit(`/wiki/search?q=${encodeURIComponent(searchQuery.value)}`)
    }
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const calculateReadingTime = (content) => {
    if (!content) return 1
    // Entferne HTML-Tags und zähle Wörter
    const text = content.replace(/<[^>]*>/g, '')
    const words = text.split(/\s+/).length
    // Durchschnittliche Lesegeschwindigkeit: 200 Wörter pro Minute
    const minutes = Math.ceil(words / 200)
    return minutes || 1
}

const shareArticle = () => {
    if (navigator.share) {
        navigator.share({
            title: props.article.title,
            text: props.article.description,
            url: window.location.href,
        }).catch(() => {
            // Fallback: URL in Zwischenablage kopieren
            copyToClipboard()
        })
    } else {
        copyToClipboard()
    }
}

const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link wurde in die Zwischenablage kopiert!')
    })
}
</script>

<style scoped>
.wiki-content {
    color: #e5e7eb;
    line-height: 1.8;
}

.wiki-content :deep(h1),
.wiki-content :deep(h2),
.wiki-content :deep(h3),
.wiki-content :deep(h4),
.wiki-content :deep(h5),
.wiki-content :deep(h6) {
    color: #f9fafb;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.wiki-content :deep(h1) {
    font-size: 2.5rem;
}

.wiki-content :deep(h2) {
    font-size: 2rem;
}

.wiki-content :deep(h3) {
    font-size: 1.5rem;
}

.wiki-content :deep(p) {
    margin-bottom: 1rem;
    color: #d1d5db;
}

.wiki-content :deep(ul),
.wiki-content :deep(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
    color: #d1d5db;
}

.wiki-content :deep(li) {
    margin: 0.5rem 0;
}

.wiki-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
}

.wiki-content :deep(a) {
    color: #3b82f6;
    text-decoration: underline;
}

.wiki-content :deep(a:hover) {
    color: #60a5fa;
}

.wiki-content :deep(blockquote) {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #9ca3af;
    font-style: italic;
}

.wiki-content :deep(code) {
    background-color: #374151;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
    color: #fbbf24;
}

.wiki-content :deep(pre) {
    background-color: #1f2937;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    overflow-x: auto;
}

.wiki-content :deep(pre code) {
    background-color: transparent;
    padding: 0;
    color: #e5e7eb;
}

.wiki-content :deep(hr) {
    border: none;
    border-top: 2px solid #4b5563;
    margin: 2rem 0;
}

.wiki-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}

.wiki-content :deep(table th),
.wiki-content :deep(table td) {
    border: 1px solid #4b5563;
    padding: 0.75rem;
    text-align: left;
}

.wiki-content :deep(table th) {
    background-color: #374151;
    font-weight: bold;
    color: #f9fafb;
}
</style>
