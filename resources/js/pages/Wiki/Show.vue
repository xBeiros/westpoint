<template>
    <div class="min-h-screen bg-[#f5f3f0] dark:bg-[#1d1d1d] transition-colors">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-[#f5f3f0] dark:bg-[#1d1d1d] border-b border-[#e8e4df] dark:border-gray-800 transition-colors">
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
                            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                v-model="searchQuery"
                                @keyup.enter="performSearch"
                                placeholder="Suche nach Informationen auf der Website..."
                                class="w-full pl-10 pr-4 py-2 rounded-lg bg-[#ebe8e3] dark:bg-[#2d2d2d] text-gray-900 dark:text-white border border-[#d4cfc8] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition-colors"
                            />
                        </div>
                    </div>

                    <!-- Header Icons -->
                    <div class="flex items-center gap-4">
                        <!-- Dark Mode Toggle -->
                        <button 
                            @click="toggleDarkMode"
                            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            :title="isDarkMode ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'"
                        >
                            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button>
                        <!-- User Profile Dropdown or Login -->
                        <div class="relative">
                            <!-- Wenn User eingeloggt ist -->
                            <DropdownMenu v-if="auth?.user">
                                <DropdownMenuTrigger as-child>
                                    <button class="relative h-9 w-9 rounded-full focus-within:ring-2 focus-within:ring-red-800 transition-colors flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                        <Avatar class="h-8 w-8 overflow-hidden rounded-full">
                                            <AvatarImage
                                                v-if="auth.user.avatar"
                                                :src="auth.user.avatar"
                                                :alt="auth.user.name"
                                            />
                                            <AvatarFallback class="rounded-full bg-gray-200 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white text-sm">
                                                {{ getInitials(auth.user?.name) }}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" class="w-56">
                                    <UserMenuContent :user="auth.user" />
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <!-- Wenn User nicht eingeloggt ist -->
                            <Link
                                v-else
                                :href="login()"
                                class="relative h-9 px-4 rounded-full focus-within:ring-2 focus-within:ring-red-800 transition-colors flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                                <span class="text-sm font-medium">Login</span>
                            </Link>
                        </div>
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
                        <h3 class="text-xs font-bold mb-5 stevie-sans-bold text-gray-500 dark:text-[#747474]">Kategorien</h3>
                        <nav class="space-y-1">
                            <div v-for="category in categories" :key="category.name" class="mb-4">
                                <button
                                    @click="toggleCategory(category.name)"
                                    class="w-full flex items-center justify-between text-left text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-[#ebe8e3] dark:hover:bg-[#2d2d2d]"
                                >
                                    <div class="flex items-center gap-2">
                                        <span class="text-lg">{{ getCategoryIcon(category.name) }}</span>
                                        <span class="text-sm font-bold">{{ category.display_name }}</span>
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
                                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors py-1.5 px-3 rounded"
                                        :class="{ 'text-pink-500 dark:text-pink-500 font-semibold': article.slug === currentSlug }"
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
                    <article class="bg-transparent">
                        <!-- Article Header -->
                        <header class="mb-8">
                            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 stevie-sans-bold">
                                {{ article.title }}
                            </h1>

                            <!-- Metadata Badges -->
                            <div class="flex flex-wrap items-center gap-4 mb-6">
                                <button 
                                    @click="handleLike"
                                    :disabled="isLiking"
                                    class="flex items-center gap-2 bg-[#ebe8e3] dark:bg-[#2d2d2d] px-4 py-2 rounded-lg transition-colors hover:bg-[#e0dcd6] dark:hover:bg-[#3d3d3d] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    :class="{ 'bg-red-100 dark:bg-red-900/20': articleData.is_liked }"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                         class="h-5 w-5 transition-colors" 
                                         :class="articleData.is_liked ? 'text-red-600 dark:text-red-400 fill-current' : 'text-red-500'" 
                                         fill="currentColor" 
                                         viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                    <span class="text-gray-900 dark:text-white text-sm font-medium">
                                        {{ articleData.likes_count }} {{ articleData.likes_count === 1 ? 'Like' : 'Likes' }}
                                    </span>
                                </button>
                                <div class="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    {{ article.views || 0 }} Aufrufe
                                </div>
                                <div v-if="article.created_at" class="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
                        <div class="bg-[#f0ede8] dark:bg-[#2d2d2d] rounded-lg border border-[#e8e4df] dark:border-gray-700 p-6 transition-colors">
                            <!-- Category -->
                            <div class="mb-6">
                                <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Kategorie</h4>
                                <div class="flex items-center gap-2">
                                    <span class="text-lg">{{ getCategoryIcon(article.category || 'general') }}</span>
                                    <span class="text-gray-900 dark:text-white font-bold text-base">{{ getCategoryDisplayName(article.category || 'general') }}</span>
                                </div>
                            </div>

                            <!-- Reading Time -->
                            <div class="mb-6">
                                <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Lesezeit</h4>
                                <p class="text-gray-900 dark:text-white font-bold text-base">{{ calculateReadingTime(article.content) }} Minuten</p>
                            </div>

                            <!-- Share Button -->
                            <div class="mb-6">
                                <button
                                    @click="shareArticle"
                                    class="w-full flex items-center justify-center gap-2 bg-[#ebe8e3] dark:bg-[#2d2d2d] hover:bg-[#e0dcd6] dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white px-4 py-3 rounded-lg transition-colors border border-[#d4cfc8] dark:border-gray-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    <span>Teilen</span>
                                </button>
                            </div>

                            <!-- Report Error -->
                            <div>
                                <Link
                                    :href="`/wiki/change-request/create/${article.slug}`"
                                    class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors text-center block"
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
import { Link, router, usePage } from '@inertiajs/vue3'
import { show as wikiShow } from '@/routes/wiki'
import { login } from '@/routes'
import { login as discordLogin } from '@/routes/discord'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UserMenuContent from '@/components/UserMenuContent.vue'
import { getInitials } from '@/composables/useInitials'

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
const isLiking = ref(false)

// Reaktive Article-Daten für Updates
const articleData = ref({
    likes_count: props.article.likes_count || 0,
    is_liked: props.article.is_liked || false,
})

// User Authentication
const page = usePage()
const auth = computed(() => {
    return page.props?.auth || { user: null }
})

// Like functionality
const handleLike = async () => {
    // Prüfe ob User eingeloggt ist
    if (!auth.value?.user) {
        // Weiterleitung zur Discord-Login-Seite mit return_url als Query-Parameter
        const returnUrl = encodeURIComponent(window.location.href)
        router.visit(`${discordLogin.url()}?return_url=${returnUrl}`)
        return
    }

    // Wenn User eingeloggt ist, Like togglen
    if (isLiking.value) return
    
    isLiking.value = true
    
    try {
        const response = await fetch(`/wiki/${props.article.slug}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            credentials: 'same-origin',
        })

        if (response.ok) {
            const data = await response.json()
            // Update article data
            articleData.value.likes_count = data.likes_count
            articleData.value.is_liked = data.is_liked
        } else if (response.status === 401) {
            // Nicht autorisiert - zur Login-Seite
            router.visit(discordLogin.url(), {
                data: {
                    return_url: window.location.href
                }
            })
        }
    } catch (error) {
        console.error('Fehler beim Liken:', error)
    } finally {
        isLiking.value = false
    }
}

// Dark Mode Management
const isDarkMode = ref(false)

const initDarkMode = () => {
    // Prüfe localStorage oder System-Präferenz
    const stored = localStorage.getItem('wiki-dark-mode')
    if (stored !== null) {
        isDarkMode.value = stored === 'true'
    } else {
        // Fallback auf System-Präferenz
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateDarkMode()
}

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('wiki-dark-mode', isDarkMode.value.toString())
    updateDarkMode()
}

const updateDarkMode = () => {
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

onMounted(() => {
    initDarkMode()
    if (props.article.category) {
        expandedCategories.value.push(props.article.category)
    }
    // Initialisiere articleData mit Props-Werten
    articleData.value = {
        likes_count: props.article.likes_count || 0,
        is_liked: props.article.is_liked || false,
    }
})

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
    color: #374151;
    line-height: 1.8;
}

.dark .wiki-content {
    color: #e5e7eb;
}

.wiki-content :deep(h1),
.wiki-content :deep(h2),
.wiki-content :deep(h3),
.wiki-content :deep(h4),
.wiki-content :deep(h5),
.wiki-content :deep(h6) {
    color: #111827;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.dark .wiki-content :deep(h1),
.dark .wiki-content :deep(h2),
.dark .wiki-content :deep(h3),
.dark .wiki-content :deep(h4),
.dark .wiki-content :deep(h5),
.dark .wiki-content :deep(h6) {
    color: #f9fafb;
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
    color: #4b5563;
}

.dark .wiki-content :deep(p) {
    color: #d1d5db;
}

.wiki-content :deep(ul),
.wiki-content :deep(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
    color: #4b5563;
}

.dark .wiki-content :deep(ul),
.dark .wiki-content :deep(ol) {
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
    color: #6b7280;
    font-style: italic;
}

.dark .wiki-content :deep(blockquote) {
    color: #9ca3af;
}

.wiki-content :deep(code) {
    background-color: #e8e4df;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
    color: #dc2626;
}

.dark .wiki-content :deep(code) {
    background-color: #374151;
    color: #fbbf24;
}

.wiki-content :deep(pre) {
    background-color: #f0ede8;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    overflow-x: auto;
    border: 1px solid #e8e4df;
}

.dark .wiki-content :deep(pre) {
    background-color: #1f2937;
    border-color: #374151;
}

.wiki-content :deep(pre code) {
    background-color: transparent;
    padding: 0;
    color: #111827;
}

.dark .wiki-content :deep(pre code) {
    color: #e5e7eb;
}

.wiki-content :deep(hr) {
    border: none;
    border-top: 2px solid #d4cfc8;
    margin: 2rem 0;
}

.dark .wiki-content :deep(hr) {
    border-top-color: #4b5563;
}

.wiki-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}

.wiki-content :deep(table th),
.wiki-content :deep(table td) {
    border: 1px solid #d4cfc8;
    padding: 0.75rem;
    text-align: left;
}

.dark .wiki-content :deep(table th),
.dark .wiki-content :deep(table td) {
    border-color: #4b5563;
}

.wiki-content :deep(table th) {
    background-color: #ebe8e3;
    font-weight: bold;
    color: #111827;
}

.dark .wiki-content :deep(table th) {
    background-color: #374151;
    color: #f9fafb;
}
</style>
