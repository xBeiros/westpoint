<template>
    <div class="min-w-screen min-h-screen bg-[#1d1d1d]">
        <div class="w-full max-w-[7xl] mx-auto p-4 relative pt-14">
            <!-- Logo & Wiki-Label -->
            <div class="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center">
                <img src="@/Assets/images/logo.png" class="w-32 sm:w-40 drop-shadow-[0px_0px_15px_rgba(255,255,255,0.4)]" alt="test" />
                <div class="stevie-sans-book-italic flex items-center bg-red-800/60 drop-shadow-[0px_0px_10px_rgba(255,255,255,0.4)] rounded-md mt-2 sm:mt-0 sm:ml-3 px-4 h-7 ">
                    <div class="-ml-1 drop-shadow-[0px_0px_10px_rgba(255,255,255,1)]">
                        WIKI
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-5xl mx-auto mt-14">
                <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6 gap-x-10">
                    <!-- Left Image -->
                    <img src="@/Assets/images/Lupe.png" alt="Lupe" class="w-28 sm:w-32 md:w-40 object-cover" />

                    <!-- Center Content -->
                    <div class="text-center md:text-left flex-1">
                        <h2 class="text-lg stevie-sans-bold text-center">Allgemeine Kategorien</h2>
                        <p class="mb-4 text-sm text-gray-500 stevie-sans-book text-center mt-3">
                            Hier können Sie alle Informationen über den Westpoint Server und seine Features finden.
                        </p>
                        <!-- NEU -->
                        <div class="relative w-full" ref="searchContainer">
                            <div class="relative">
                                <!-- Suchleiste -->
                                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <!-- Suchglas Icon -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                                    </svg>
                                </span>

                                <input
                                    type="text"
                                    v-model="query"
                                    @keyup.enter="search"
                                    @focus="isFocused = true"
                                    placeholder="Suche nach Informationen auf Westpoin Wiki"
                                    class="border pl-10 pr-10 p-2 rounded w-full mb-4 mt-5 bg-[#2d2d2d] text-white focus:outline-none focus:ring-0 focus:border-red-800 active:outline-none active:ring-0"
                                />

                                <button
                                    v-if="query.length > 0"
                                    @click="clearSearch"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                v-if="query.length > 0 && isFocused"
                                class="absolute w-full bg-[#2d2d2d] p-2 rounded-lg -translate-y-1 border border-gray-500 z-10"
                            >
                                <ul v-if="filteredArticles.length > 0">
                                    <li v-for="article in filteredArticles" :key="article.slug">
                                        <a
                                            :href="`/wiki/${article.slug}`"
                                            class="p-2.5 block text-left text-base text-gray-300 hover:text-red-700 transition-all duration-300"
                                        >
                                            {{ article.title }}
                                        </a>
                                    </li>
                                </ul>
                                <p v-else class="text-sm text-gray-500">
                                    Keine Ergebnisse gefunden.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Image -->
                    <img src="@/Assets/images/wiki.png" alt="Wiki" class="w-28 sm:w-32 md:w-40 object-cover" />
                </div>

                <!-- Map component removed - file not found -->
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, computed} from 'vue'

const props = defineProps({
    articles: Array
})

const query = ref('')
const searchContainer = ref(null)
const isFocused = ref(false)
const filteredArticles = computed(() =>
    props.articles.filter(article =>
        article.title.toLowerCase().includes(query.value.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.value.toLowerCase()) ||
        article.raw?.toLowerCase().includes(query.value.toLowerCase())
    )
)

// Optional: Beispielhafte Suchfunktion
const search = () => {
    // hier könntest du z. B. fetch machen oder lokale Filterung
    console.log('Searching for:', query.value)
}

const clearSearch = () => {
    query.value = ''
    isFocused.value = true
}


const hideResults = () => {
    isFocused.value = false
}



// Klick außerhalb erkennen (Vue 3)
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
