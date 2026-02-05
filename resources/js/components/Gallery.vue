<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Slide1 from '@/Assets/images/gallery/img.png'
import Slide2 from '@/Assets/images/gallery/slide2.png'
import Slide3 from '@/Assets/images/gallery/slide3.png'
import Slide4 from '@/Assets/images/gallery/slide4.png'
import Slide5 from '@/Assets/images/gallery/slide5.png'
import Slide6 from '@/Assets/images/gallery/slide7.png'
import Slide7 from '@/Assets/images/gallery/slide7.png'
import Slide8 from '@/Assets/images/gallery/slide8.png'
import Slide9 from '@/Assets/images/gallery/slide3.png'
import Slide10 from '@/Assets/images/gallery/slide2.png'

const images = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    Slide10
]

const isGalleryOpen = ref(false)
const currentImage = ref(0)

const openGallery = (index) => {
    currentImage.value = index
    isGalleryOpen.value = true
}

const prevImage = () => {
    currentImage.value = (currentImage.value - 1 + images.length) % images.length
}

const nextImage = () => {
    currentImage.value = (currentImage.value + 1) % images.length
}

const openYouTube = () => {
    window.open('https://www.youtube.com/watch?v=DEIN_VIDEO_ID', '_blank')
}

// Keyboard-Navigation für Modal
const handleKeyDown = (e) => {
    if (!isGalleryOpen.value) return
    
    if (e.key === 'Escape') {
        isGalleryOpen.value = false
    } else if (e.key === 'ArrowLeft') {
        prevImage()
    } else if (e.key === 'ArrowRight') {
        nextImage()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})
</script>


<template>
    <div class="text-white p-4">
        <!-- Video Banner -->
        <div
            class="relative overflow-hidden rounded-lg group cursor-pointer transition-transform duration-300"
            @click="openYouTube"
        >
            <img src="@/Assets/images/Video_thumbnail.png" alt="Video Thumbnail" class="w-full h-60 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 flex items-center justify-center gap-6 px-8 group">
                <!-- Button -->
                <div>
                    <div
                        class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_0px_30px_rgba(255,255,255,1)]"
                    >
                        <svg class="w-8 h-8 text-red-500" fill="#b50505" viewBox="0 0 20 20">
                            <path d="M6 4l10 6-10 6V4z"></path>
                        </svg>
                    </div>
                </div>

                <!-- Text -->
                <div class="text-white font-bold text-lg stevie-sans-bold shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_0px_30px_rgba(255,255,255,1)]">
                    SCHAU DIR DAS VIDEO AN!
                </div>
            </div>


        </div>

        <!-- Galerie -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-6">
            <div
                v-for="(img, index) in images.slice(0, 8)"
                :key="index"
                class="cursor-pointer relative group overflow-hidden rounded-lg aspect-[16/9]"
                @click="openGallery(index)"
            >
                <!-- Thumbnail mit Hover-Effekt -->
                <img
                    :src="img"
                    alt="Gallery Image"
                    class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                />
                
                <!-- Overlay beim Hover -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                </div>

                <!-- 8. Bild mit "Mehr Fotos" Overlay -->
                <div
                    v-if="index === 7"
                    class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold backdrop-blur-sm group-hover:bg-black/70 transition-all duration-300"
                >
                    <span class="uppercase tracking-wider">+{{ images.length - 8 }} MEHR</span>
                </div>
            </div>
        </div>

        <!-- Modal für Galerie -->
        <Transition name="fade">
            <div
                v-if="isGalleryOpen"
                class="fixed inset-0 bg-black/95 backdrop-blur-sm flex flex-col z-50 px-4 md:px-6 py-4 md:py-6"
                @click.self="isGalleryOpen = false"
            >
                <div class="w-full max-w-7xl mx-auto flex flex-col h-full">
                    <!-- Header mit Close Button und Bildnummer -->
                    <div class="flex justify-between items-center mb-4 flex-shrink-0">
                        <div class="text-white text-sm md:text-base font-semibold">
                            {{ currentImage + 1 }} / {{ images.length }}
                        </div>
                        <button
                            @click="isGalleryOpen = false"
                            class="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label="Schließen"
                        >
                            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Bild + Navigation Container mit fester Höhe -->
                    <div class="flex items-center gap-2 md:gap-6 gallery-image-container mb-4">
                        <!-- Pfeil links -->
                        <button 
                            @click="prevImage" 
                            class="text-white hover:text-gray-300 transition-all p-2 md:p-4 rounded-full hover:bg-white/10 flex-shrink-0 z-10"
                            aria-label="Vorheriges Bild"
                        >
                            <svg class="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <!-- Großes Bild Container mit fester Höhe -->
                        <div class="flex-1 flex items-center justify-center h-full min-h-0">
                            <img
                                :src="images[currentImage]"
                                class="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                                alt="Gallery Image"
                                :key="currentImage"
                            />
                        </div>

                        <!-- Pfeil rechts -->
                        <button 
                            @click="nextImage" 
                            class="text-white hover:text-gray-300 transition-all p-2 md:p-4 rounded-full hover:bg-white/10 flex-shrink-0 z-10"
                            aria-label="Nächstes Bild"
                        >
                            <svg class="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <!-- Thumbnail-Navigation unten - immer sichtbar -->
                    <div class="w-full overflow-x-auto pb-2 flex-shrink-0">
                        <div class="flex gap-2 justify-center min-h-[60px] md:min-h-[80px] items-center">
                            <button
                                v-for="(img, index) in images"
                                :key="index"
                                @click="currentImage = index"
                                class="flex-shrink-0 rounded-md overflow-hidden border-2 transition-all"
                                :class="currentImage === index ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'"
                            >
                                <img
                                    :src="img"
                                    alt="Thumbnail"
                                    class="w-16 h-10 md:w-20 md:h-12 object-cover"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Feste Höhe für Modal Container */
.gallery-modal {
    height: 100vh;
    max-height: 100vh;
}

/* Bild Container mit fester Höhe */
.gallery-image-container {
    height: calc(100vh - 200px);
    min-height: 400px;
}

@media (max-width: 768px) {
    .gallery-image-container {
        height: calc(100vh - 180px);
        min-height: 300px;
    }
}
</style>
