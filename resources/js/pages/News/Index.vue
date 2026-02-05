<template>
    <Head title="Neuigkeiten" />
    
    <div class="min-h-screen w-full">
        <NavBar />
        
        <!-- Hero Section -->
        <div class="relative py-20 sm:px-6 lg:px-8">
            <div class="max-w-5xl w-full mx-auto">
                <!-- News Articles -->
                <div v-if="news && news.length > 0" class="mb-16 flex flex-col items-center space-y-8">
                    <div 
                        v-for="article in news" 
                        :key="article.id"
                        class="relative w-full"
                    >
                        <!-- Article Image - Breit gezogen -->
                        <div class="relative mb-6">
                            <img 
                                :src="article.image_path ? `/images/news/${article.image_path}` : '/images/news/1/Serverrelease.png'" 
                                :alt="article.title"
                                class="w-full h-auto transition-all duration-300 rounded-lg shadow-2xl"
                            />
                            <!-- Category Badge -->
                            <div class="absolute top-4 left-4">
                                <span class="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                                    {{ article.category }}
                                </span>
                            </div>
                            <!-- Date Badge -->
                            <div class="absolute top-4 right-4">
                                <div class="bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-sm">
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                        </svg>
                                        {{ formatDate(article.published_at) }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Article Content -->
                        <div class="text-left">
                            <div class="flex items-start justify-between mb-4">
                                <h2 class="text-2xl md:text-3xl font-bold text-white uppercase flex-1 mr-6">
                                    {{ article.title }}
                                </h2>
                                <!-- Author Info rechts -->
                                <div class="flex flex-col items-end text-right">
                                    <div class="flex items-center mb-2">
                                        <span class="text-red-500 font-semibold mr-2">by {{ article.author }}</span>
                                        <img 
                                            src="/images/blogo3.png" 
                                            :alt="article.author"
                                            class="w-12 h-12 rounded-full object-cover"
                                        />
                                    </div>
                                    <div class="text-gray-300 text-sm">
                                        <div class="flex items-center">
                                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                            </svg>
                                            {{ formatDate(article.published_at) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <p class="text-gray-300 text-base mb-6 max-w-4xl line-clamp-6">
                                {{ article.excerpt }}
                            </p>

                                    <div class="flex justify-end">
                                        <Link 
                                            :href="route('news.' + article.slug)"
                                            class="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Weiterlesen
                                        </Link>
                                    </div>
                        </div>
                    </div>
                </div>
                
                <!-- No News Message -->
                <div v-else class="mb-16 text-center">
                    <div class="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-12 rounded-2xl border border-gray-800">
                        <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 class="text-2xl font-bold text-white mb-2">Keine Neuigkeiten verfügbar</h3>
                        <p class="text-gray-400">Es gibt derzeit keine veröffentlichten Neuigkeiten.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <Footer />
    <ScrollToTop />
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import NavBar from "@/components/NavBar.vue"
import Footer from "@/components/Footer.vue"
import ScrollToTop from "@/components/ScrollToTop.vue"

defineProps({
    news: {
        type: Array,
        default: () => []
    }
})

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-6 {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

