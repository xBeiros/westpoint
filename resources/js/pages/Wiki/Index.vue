<template>
    <div class="min-w-screen min-h-screen bg-[#1d1d1d]">
        <div class="w-full max-w-7xl mx-auto p-4 relative pt-14">
            <!-- Logo & Wiki-Label -->
            <div class="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center mb-8">
                <img src="@/Assets/images/logo.png" class="w-32 sm:w-40 drop-shadow-[0px_0px_15px_rgba(255,255,255,0.4)]" alt="Westpoint Logo" />
                <div class="stevie-sans-book-italic flex items-center bg-red-800/60 drop-shadow-[0px_0px_10px_rgba(255,255,255,0.4)] rounded-md mt-2 sm:mt-0 sm:ml-3 px-4 h-7">
                    <div class="-ml-1 drop-shadow-[0px_0px_10px_rgba(255,255,255,1)]">
                        WIKI
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-6xl mx-auto">
                <!-- Header Section with Search -->
                <div class="mb-12">
                    <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <!-- Left Image -->
                        <img src="@/Assets/images/Lupe.png" alt="Lupe" class="w-28 sm:w-32 md:w-40 object-cover hidden md:block" />

                        <!-- Center Content -->
                        <div class="text-center md:text-left flex-1">
                            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 stevie-sans-bold">
                                Allgemeine Kategorien
                            </h1>
                            <p class="text-lg text-gray-300 stevie-sans-book mb-6">
                                Hier findest du alle Informationen über den Westpoint Server, seine Spielsysteme und Features.
                            </p>
                            
                            <!-- Search Bar -->
                            <div class="relative w-full max-w-2xl mx-auto md:mx-0" ref="searchContainer">
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        v-model="query"
                                        @keyup.enter="search"
                                        @focus="isFocused = true"
                                        placeholder="Suche nach Informationen auf der Website..."
                                        class="w-full pl-12 pr-12 py-4 rounded-lg bg-[#2d2d2d] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition-all"
                                    />
                                    <button
                                        v-if="query.length > 0"
                                        @click="clearSearch"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-700 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Search Results Dropdown -->
                                <div
                                    v-if="query.length > 0 && isFocused && filteredArticles.length > 0"
                                    class="absolute w-full mt-2 bg-[#2d2d2d] rounded-lg border border-gray-700 shadow-xl z-50 max-h-96 overflow-y-auto"
                                >
                                    <ul>
                                        <li v-for="article in filteredArticles.slice(0, 10)" :key="article.slug">
                                            <Link
                                                :href="`/wiki/${article.slug}`"
                                                class="p-4 block text-left text-white hover:bg-[#3d3d3d] transition-colors border-b border-gray-700 last:border-b-0"
                                            >
                                                <div class="font-semibold">{{ article.title }}</div>
                                                <div v-if="article.description" class="text-sm text-gray-300 mt-1">
                                                    {{ article.description }}
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Right Image -->
                        <img src="@/Assets/images/wiki.png" alt="Wiki" class="w-28 sm:w-32 md:w-40 object-cover hidden md:block" />
                    </div>
                </div>

                <!-- Selected Category Header -->
                <div v-if="selectedCategory" class="mb-8">
                    <button
                        @click="router.visit('/wiki')"
                        class="text-gray-300 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Zurück zu allen Kategorien
                    </button>
                    <h2 class="text-3xl font-bold text-white mb-2">
                        {{ getCategoryDisplayName(selectedCategory) }}
                    </h2>
                    <p class="text-gray-300">
                        {{ getCategoryDescription(selectedCategory) }}
                    </p>
                </div>

                <!-- Category Cards Grid -->
                <div v-if="(!query || query.length === 0) && !selectedCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div
                        v-for="category in categories"
                        :key="category.name"
                        class="group relative bg-[#2d2d2d] rounded-lg border border-gray-700 p-6 hover:border-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-800/20"
                    >
                        <!-- External Link Icon -->
                        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                :href="`/wiki?category=${category.name}`"
                                class="text-gray-400 hover:text-white"
                                @click.stop
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        </div>

                        <!-- Category Icon -->
                        <div class="mb-4">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" :style="getCategoryIconStyle(category.name)">
                                {{ getCategoryIcon(category.name) }}
                            </div>
                        </div>

                        <!-- Category Title -->
                        <h3 class="text-xl font-bold text-white mb-2 stevie-sans-bold">
                            {{ category.display_name }}
                        </h3>

                        <!-- Category Description -->
                        <p class="text-sm text-gray-300 mb-4 stevie-sans-book">
                            {{ getCategoryDescription(category.name) }}
                        </p>

                        <!-- Article List (max 3 items) - Klickbar -->
                        <div v-if="category.articles && category.articles.length > 0" class="space-y-2 mb-4">
                            <Link
                                v-for="(article, index) in category.articles.slice(0, 3)"
                                :key="article.slug"
                                :href="`/wiki/${article.slug}`"
                                class="block text-sm text-gray-300 hover:text-red-800 transition-colors py-1.5 px-2 rounded hover:bg-[#3d3d3d] flex items-center"
                                @click.stop
                            >
                                <span class="w-1.5 h-1.5 bg-red-800 rounded-full mr-2 flex-shrink-0"></span>
                                <span class="truncate">{{ article.title }}</span>
                            </Link>
                        </div>

                        <!-- Expand List Link -->
                        <div v-if="category.articles && category.articles.length > 3" class="mt-4">
                            <Link
                                :href="`/wiki?category=${category.name}`"
                                class="text-sm text-blue-400 hover:text-blue-300 underline"
                                @click.stop
                            >
                                Liste erweitern ({{ category.count - 3 }} weitere)
                            </Link>
                        </div>

                        <!-- Article Count Badge -->
                        <div class="absolute bottom-4 right-4 text-xs text-gray-400">
                            {{ category.count }} {{ category.count === 1 ? 'Artikel' : 'Artikel' }}
                        </div>
                    </div>
                </div>

                <!-- Category Articles List -->
                <div v-else-if="selectedCategory && (!query || query.length === 0)" class="mb-12">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            v-for="article in getCategoryArticles(selectedCategory)"
                            :key="article.slug"
                            :href="`/wiki/${article.slug}`"
                            class="block bg-[#2d2d2d] rounded-lg border border-gray-700 p-6 hover:border-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-800/20"
                        >
                            <h3 class="text-lg font-bold text-white mb-2">{{ article.title }}</h3>
                            <p v-if="article.description" class="text-sm text-gray-300">
                                {{ article.description }}
                            </p>
                        </Link>
                    </div>
                </div>

                <!-- Search Results -->
                <div v-else-if="query && query.length > 0" class="mb-12">
                    <h2 class="text-2xl font-bold text-white mb-6">
                        Suchergebnisse für "{{ query }}"
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            v-for="article in filteredArticles"
                            :key="article.slug"
                            :href="`/wiki/${article.slug}`"
                            class="block bg-[#2d2d2d] rounded-lg border border-gray-700 p-6 hover:border-red-800 transition-all duration-300"
                        >
                            <h3 class="text-lg font-bold text-white mb-2">{{ article.title }}</h3>
                            <p v-if="article.description" class="text-sm text-gray-400 mb-2">
                                {{ article.description }}
                            </p>
                            <div v-if="article.category" class="text-xs text-red-800">
                                {{ article.category }}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Link, router } from '@inertiajs/vue3'

const props = defineProps({
    articles: {
        type: Array,
        default: () => []
    },
    categories: {
        type: Array,
        default: () => []
    },
    selectedCategory: {
        type: String,
        default: null
    }
})

const query = ref('')
const searchContainer = ref(null)
const isFocused = ref(false)

const filteredArticles = computed(() => {
    if (!query.value) return []
    const lowerQuery = query.value.toLowerCase()
    return props.articles.filter(article =>
        article.title?.toLowerCase().includes(lowerQuery) ||
        article.description?.toLowerCase().includes(lowerQuery) ||
        article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
})

// Category Icons Mapping
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

// Category Icon Colors
const categoryColors = {
    'server': { bg: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' },
    'vorbereitung': { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
    'spielanfang': { bg: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' },
    'grundlagen': { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
    'arbeit': { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' },
    'staatsfraktionen': { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
    'kriminelle-fraktionen': { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
    'familiensystem': { bg: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' },
    'geschäfte': { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' },
    'immobilien': { bg: 'rgba(249, 115, 22, 0.2)', color: '#f97316' },
    'freizeit': { bg: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' },
    'events': { bg: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' },
    'karte': { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
    'frisuren': { bg: 'rgba(249, 115, 22, 0.2)', color: '#f97316' },
    'kleidung': { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
    'unternehmen': { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' },
    'fahrzeug': { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
    'waffe': { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' },
    'general': { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' },
    'allgemein': { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' },
}

// Category Descriptions
const categoryDescriptions = {
    'server': 'Liste aller Westpoint RP Server',
    'vorbereitung': 'Vor dem Spielbeginn',
    'spielanfang': 'Nützlich für Anfänger',
    'grundlagen': 'Hauptfunktionen des Servers',
    'arbeit': 'Optionen, Geld zu verdienen',
    'staatsfraktionen': 'Alles über den öffentlichen Dienst',
    'kriminelle-fraktionen': 'Alles über die kriminelle Welt',
    'familiensystem': 'Spielt gemeinsam',
    'geschäfte': 'Wie man eine Million verdient',
    'immobilien': 'Alles über Häuser und mehr',
    'freizeit': 'Gut Zeit verbringen',
    'events': 'Einzigartige Events',
    'karte': 'Karte mit allen Standorten',
    'frisuren': 'Katalog der Frisuren für Charaktere',
    'kleidung': 'Katalog mit Kleidung für Charaktere',
    'unternehmen': 'Fortgeschrittene Verdienstmöglichkeiten',
    'fahrzeug': 'Alle verfügbaren Transporte',
    'waffe': 'Waffenkatalog und Informationen',
    'general': 'Allgemeine Informationen',
    'allgemein': 'Allgemeine Informationen',
}

const getCategoryIcon = (categoryName) => {
    const normalized = categoryName?.toLowerCase().replace(/\s+/g, '-')
    return categoryIcons[normalized] || '📚'
}

const getCategoryIconStyle = (categoryName) => {
    const normalized = categoryName?.toLowerCase().replace(/\s+/g, '-')
    const color = categoryColors[normalized] || categoryColors['general']
    return {
        backgroundColor: color.bg,
        color: color.color,
    }
}

const getCategoryDescription = (categoryName) => {
    const normalized = categoryName?.toLowerCase().replace(/\s+/g, '-')
    return categoryDescriptions[normalized] || 'Allgemeine Informationen'
}

const navigateToCategory = (categoryName) => {
    // Navigiere zur Kategorie-Seite oder zeige alle Artikel dieser Kategorie
    router.visit(`/wiki?category=${categoryName}`)
}

const getCategoryDisplayName = (categoryName) => {
    const category = props.categories.find(cat => cat.name === categoryName)
    return category?.display_name || ucfirst(categoryName)
}

const getCategoryArticles = (categoryName) => {
    const category = props.categories.find(cat => cat.name === categoryName)
    return category?.articles || []
}

const ucfirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

const search = () => {
    if (query.value) {
        router.visit(`/wiki/search?q=${encodeURIComponent(query.value)}`)
    }
}

const clearSearch = () => {
    query.value = ''
    isFocused.value = false
}

// Klick außerhalb erkennen
const handleClickOutside = (e) => {
    if (searchContainer.value && !searchContainer.value.contains(e.target)) {
        isFocused.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
body {
    background-color: #1d1d1d;
}
</style>
