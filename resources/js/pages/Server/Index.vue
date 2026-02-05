<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

// Server-Bilder Array - hier können Sie Ihre Bilder hinzufügen
const serverImages = ref([
    {
        id: 1,
        src: "/images/pres/1_1.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    },
    {
        id: 2,
        src: "/images/pres/1_2.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    },
    {
        id: 3,
        src: "/images/pres/1_3.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    },
    {
        id: 4,
        src: "/images/pres/1_4.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    },
    {
        id: 5,
        src: "/images/pres/1_5.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    },
    {
        id: 6,
        src: "/images/pres/begleit.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    },
    {
        id: 7,
        src: "/images/pres/1_6.png",
        alt: "BerlinCity",
        title: "BerlinCity",
        description: ""
    }
]);

// Hintergrundfarbe für die Präsentations-Seite setzen
onMounted(() => {
    document.documentElement.style.backgroundColor = '#0e0e0e';
    document.body.style.backgroundColor = '#0e0e0e';
});

onBeforeUnmount(() => {
    // Setze zurück auf Standard-Hintergrundfarbe
    document.documentElement.style.backgroundColor = '';
    document.body.style.backgroundColor = '';
});
</script>

<template>
    <Head title="Server Vorstellung" />

    <div class="min-h-screen w-full presentation-bg">
        <NavBar />
        
        <!-- Hero Section -->
        <div class="relative py-20 sm:px-6 lg:px-8">
            <div class=" max-w-5xl w-full mx-auto">
                <!-- Bildergalerie mit v-for -->
                <div class="mb-16 flex flex-col items-center space-y-8">
                    <div 
                        v-for="image in serverImages" 
                        :key="image.id"
                        class="relative"
                    >
                        <img 
                            :src="image.src" 
                            :alt="image.alt"
                            class="max-w-full h-auto transition-all duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <Footer />
    <ScrollToTop />
</template>

<style scoped>
/* Hauptcontainer Hintergrund - höchste Priorität */
.presentation-bg {
    background-color: #0e0e0e !important;
}

/* Zusätzliche Styles für die Server-Seite */
.group:hover .group-hover\:brightness-110 {
    filter: brightness(1.1);
}

/* Smooth transitions für alle interaktiven Elemente */
* {
    transition: all 0.3s ease;
}

/* Custom scrollbar für bessere Optik */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #666;
}
</style>
