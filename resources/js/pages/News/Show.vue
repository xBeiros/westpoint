<template>
    <Head :title="article.title" />
    
    <div class="min-h-screen w-full">
        <NavBar />
        
        <!-- Back to News Button -->
        <div class="max-w-5xl w-full mx-auto pt-8">
            <Link 
                :href="route('news.index')"
                class="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Zurück zu den Neuigkeiten
            </Link>
        </div>
        
        <!-- Hero Section -->
        <div class="relative py-5 sm:px-6 lg:px-8">
            <div class="max-w-5xl w-full mx-auto">
                <!-- Article Image - Breit gezogen -->
                <div class="relative mb-8">
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
                    <!-- Date -->
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

                <!-- Article Title -->
                <div class="text-left mb-12">
                    <div class="flex items-start justify-between mb-4">
                        <h1 class="text-3xl md:text-4xl font-bold text-white uppercase flex-1 mr-6">
                            {{ article.title }}
                        </h1>
                        
                        <!-- Author Info -->
                        <div class="flex flex-col items-end text-right">
                            <div class="flex items-center mb-2">
                                <span class="text-red-500 font-semibold mr-2">by {{ article.author }}</span>
                                <img 
                                    src="/images/blogo3.png" 
                                    :alt="article.author"
                                    class="w-16 h-16 rounded-full object-cover"
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
                </div>

                <!-- Article Content -->
                <div class="mb-12">
                    <div class="prose prose-invert prose-lg max-w-none" v-html="article.content"></div>
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
    article: Object
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
.prose {
    color: #e5e7eb;
    font-size: 1.1rem;
    line-height: 1.8;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    color: #ffffff;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
}

.prose h2 {
    color: #e74c3c;
    font-size: 2rem;
    border-bottom: 2px solid #e74c3c;
    padding-bottom: 0.5rem;
}

.prose p {
    margin-bottom: 1.8rem;
    line-height: 1.8;
    font-size: 1.1rem;
}

.prose strong {
    color: #ffffff;
    font-weight: 700;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.prose a {
    color: #e74c3c;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;
}

.prose a:hover {
    color: #c0392b;
    border-bottom-color: #c0392b;
}

.prose div[style*="background-color:#111"] {
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
    border-left: 4px solid #e74c3c !important;
    color: #f3f4f6 !important;
    padding: 2rem !important;
    margin: 3rem 0 !important;
    border-radius: 1rem !important;
    position: relative !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
    font-style: italic !important;
}

.prose div[style*="font-size:40px"] {
    font-size: 4rem !important;
    color: #e74c3c !important;
    position: absolute !important;
    top: -1rem !important;
    left: 1rem !important;
    font-weight: bold !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) !important;
}

.prose div[style*="margin-left:30px"] {
    margin-left: 3rem !important;
    font-size: 1.1rem !important;
    line-height: 1.6 !important;
}

.prose div[style*="text-align:right"] {
    text-align: right !important;
    font-weight: bold !important;
    margin-top: 1rem !important;
    color: #e74c3c !important;
    font-size: 1rem !important;
}

.prose a[style*="background-color:#e74c3c"] {
    background-color: #e74c3c !important;
    color: white !important;
    padding: 0.75rem 1.5rem !important;
    border-radius: 0.375rem !important;
    text-decoration: none !important;
    font-weight: bold !important;
    display: inline-block !important;
    margin-top: 1.5rem !important;
    transition: background-color 0.2s !important;
}

.prose a[style*="background-color:#e74c3c"]:hover {
    background-color: #c0392b !important;
}

.prose div[style*="margin-top:20px"] {
    margin-top: 1.25rem !important;
    color: #9ca3af !important;
}

.prose br {
    display: block;
    margin: 0.5rem 0;
}
</style>
