<script setup>
import { ref } from 'vue'
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
        <!-- Galerie -->
        <div class="grid grid-cols-4 gap-4 mt-6">
            <div
                v-for="(img, index) in images.slice(0, 8)"
                :key="index"
                class="cursor-pointer relative group"
                @click="openGallery(index)"
            >
                <!-- Immer Thumbnail anzeigen -->
                <img
                    :src="img"
                    alt="Gallery Image"
                    class="rounded-md w-[180px] h-[92px] object-cover hover:opacity-80 transition hover:-translate-y-1"
                />

                <!-- 8. Bild mit Overlay -->
                <div
                    v-if="index === 7"
                    class="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center text-white text-sm hover:bg-black/60 transition"
                >
                    MEHR FOTOS
                </div>
            </div>
        </div>

        <!-- Modal für Galerie -->
        <div
            v-if="isGalleryOpen"
            class="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 px-6"
        >
            <!-- Close Button oben rechts -->
            <div class="w-full flex justify-end mb-4">
                <button
                    @click="isGalleryOpen = false"
                    class="text-white text-3xl hover:scale-110 transition"
                >
                    ✕
                </button>
            </div>

            <!-- Bild + Navigation -->
            <div class="flex items-center gap-6">
                <!-- Pfeil links -->
                <button @click="prevImage" class="text-white text-4xl hover:scale-110 transition">←</button>

                <!-- Großes Bild -->
                <img
                    :src="images[currentImage]"
                    class="rounded object-contain w-[900px] h-[500px]"
                    alt="Large Image"
                />

                <!-- Pfeil rechts -->
                <button @click="nextImage" class="text-white text-4xl hover:scale-110 transition">→</button>
            </div>
        </div>

    </div>
</template>
