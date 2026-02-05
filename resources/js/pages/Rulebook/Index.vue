<template>
    <Head title="Regelwerk" />
    
    <div class="min-h-screen w-full">
        <NavBar />
        
        <!-- Hero Section -->
        <div class="relative py-20 sm:px-6 lg:px-8">
            <div class="max-w-6xl w-full mx-auto">
                <!-- Title -->
                <div class="mb-16 relative">
                    <!-- Hintergrundbild absolut positioniert -->
                    <img 
                        src="@/Assets/images/richter.png" 
                        alt="Sheriff Rules" 
                        class="absolute left-64 top-1/2 -translate-y-1/2 h-32 md:h-48 lg:h-56 w-auto object-contain opacity-60 md:opacity-40 z-0 pointer-events-none"
                    />

                    <img 
                        src="@/Assets/images/sheriff_rules.png" 
                        alt="Sheriff Rules" 
                        class="absolute right-72 top-1/2 -translate-y-1/2 h-32 md:h-48 lg:h-56 w-auto object-contain opacity-60 md:opacity-40 z-0 pointer-events-none"
                    />
                    
                    <!-- Titel und Subtitle mit z-index darüber -->
                    <div class="relative z-10">
                        <h1 class="text-4xl md:text-5xl font-bold text-white uppercase mb-4 text-center">
                            Regelwerk
                        </h1>
                        <p class="text-gray-400 text-lg max-w-2xl mx-auto text-center">
                            Hier findest du alle wichtigen Regeln und Richtlinien für Westpoint
                        </p>
                    </div>
                </div>

                <!-- Rulebooks Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <Link
                        v-for="rulebook in rulebooks" 
                        :key="rulebook.id"
                        :href="rulebookShow.url(rulebook.slug)"
                        class="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-8 rounded-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20 cursor-pointer transform hover:-translate-y-2 block"
                    >
                        <!-- Icon/Image -->
                        <div class="mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>

                        <!-- Title -->
                        <h2 class="text-2xl font-bold text-white mb-3 uppercase group-hover:text-red-500 transition-colors duration-300">
                            {{ rulebook.title }}
                        </h2>

                        <!-- Description -->
                        <p class="text-gray-400 text-base mb-6 line-clamp-4">
                            {{ rulebook.description }}
                        </p>

                        <!-- View Button -->
                        <div class="flex items-center text-red-500 font-semibold group-hover:text-red-400 transition-colors duration-300">
                            <span class="mr-2">Regelwerk ansehen</span>
                            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>

                        <!-- Hover Glow Effect -->
                        <div class="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    </Link>
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
import { show as rulebookShow } from "@/routes/rulebook"

// Statische Regelwerke
const rulebooks = [
    {
        id: 1,
        slug: 'hauptregelwerk',
        title: 'Hauptregelwerk',
        description: 'Alle grundlegenden Regeln für den Server. Hier findest du die wichtigsten Verhaltensregeln, Roleplay-Grundlagen, Bestrafungsrichtlinien und allgemeine Serverrichtlinien.',
    },
    {
        id: 2,
        slug: 'fraktionsregelwerk',
        title: 'Fraktionsregelwerk',
        description: 'Spezielle Regeln für Fraktionen. Hier findest du alles über Fraktionsgründung, Kriegsverträge, Routen, Kooperationen und Besonderheiten für legale und illegale Fraktionen.',
    }
]
</script>

<style scoped>
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

