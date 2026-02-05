<template>
    <div class="relative w-full overflow-hidden text-white rounded-lg">
        <div class="relative h-[400px]">
            <div
                v-for="(slide, index) in slides"
                :key="index"
                v-show="current === index"
                class="absolute inset-0 flex flex-col justify-end bg-contain bg-no-repeat bg-center transition-opacity duration-500"
                :style="{ backgroundImage: `url(${slide.image})` }"
            >

                <!-- Inhalt -->
                <div class="relative z-10 p-8">
                    <h2 class="text-2xl font-bold mb-2">{{ slide.title }}</h2>
                    <p class="text-sm text-gray-200">{{ slide.text }}</p>
                </div>
            </div>

            <!-- Linker Button -->
            <button
                @click="prev"
                :disabled="current === 0"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <span class="text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="p-1.5" fill="#ffffff" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                </span>
            </button>

            <!-- Rechter Button -->
            <button
                @click="next"
                :disabled="current === slides.length - 1"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <span class="text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="p-1.5" fill="#ffffff" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Slide1 from '@/Assets/images/slide1.png';

const current = ref(0)
const slides = ref([
    {
        title: 'DEIN WEG IST DEINE REGEL',
        text: 'Tu dich mit einer Gang oder Organisation zusammen, lass dich auf Verbrechen ein... aber es gibt immer die Möglichkeit, auf die helle Seite zu wechseln...',
        image: Slide1
    },
    {
        title: 'WERDE EIN HELD DES GESETZES',
        text: 'Schließe dich den Strafverfolgungsbehörden an und halte die Ordnung aufrecht. Überführe Verbrecher in spannenden Einsätzen.',
        image: Slide1
    },
    {
        title: 'LEBE DEINEN EIGENEN LIFESTYLE',
        text: 'Ob als Unternehmer, Cop oder Gangmitglied – gestalte dein Leben nach deinen Regeln.',
        image: Slide1
    },
    {
        title: 'XY',
        text: 'Ob als Unternehmer, Cop oder Gangmitglied – gestalte dein Leben nach deinen Regeln.',
        image: Slide1
    }
])

const next = () => {
    if (current.value < slides.value.length - 1) {
        current.value++
    }
}

const prev = () => {
    if (current.value > 0) {
        current.value--
    }
}
</script>
