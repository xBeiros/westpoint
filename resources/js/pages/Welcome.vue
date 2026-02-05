<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import Image1 from "@/Assets/images/bg4.png";
import Image2 from "@/Assets/images/bg5.png";
import Image3 from "@/Assets/images/bg6.png";
import Image4 from "@/Assets/images/bg7.png";
import Image5 from "@/Assets/images/bg8.png";
import Image6 from "@/Assets/images/bg9.png";
import Image7 from "@/Assets/images/bg10.png";
import sheriff from "@/Assets/images/police.png";
import banditen from "@/Assets/images/gangstar.png";
import mediziner from "@/Assets/images/mediziner.png";
import arbeiter from "@/Assets/images/worker.png";
import army from "@/Assets/images/army.png";
import geschaft from "@/Assets/images/geschaft.png";
import partner_default from "@/Assets/images/partner-default.png"
import Image1_Outline from "@/Assets/images/bg4_outline.png";
import Image2_Outline from "@/Assets/images/bg5_outline.png";
import Image3_Outline from "@/Assets/images/bg6_outline.png";
import Image4_Outline from "@/Assets/images/bg7_outline.png";
import Image5_Outline from "@/Assets/images/bg8_outline.png";
import Image6_Outline from "@/Assets/images/bg9_outline.png";
import Image7_Outline from "@/Assets/images/bg10_outline.png";
import StepItem from "@/components/StepItem.vue";
import Footer from "@/components/Footer.vue";
import Slider from "@/components/Slider.vue";
import Gallery from "@/components/Gallery.vue";
import DownloadBg from "@/Assets/images/Download.webp";

const globalHover = ref(false); // nur Bild 4
const hoveredIndex = ref<number | null>(null);

const images = [
    {
        src: Image1,
        outline: Image1_Outline,
        alt: 'Screenshot 1',
        global: false,
        character: sheriff,
        title: 'Werde Polizist',
    },
    {
        src: Image2,
        outline: Image2_Outline,
        alt: 'Screenshot 2',
        global: false,
        character: mediziner,
        title: 'Werde Mediziner',
    },
    {
        src: Image3,
        outline: Image3_Outline,
        alt: 'Screenshot 3',
        global: false,
        character: army,
        title: 'Schütze deinen Land',
    },
    {
        src: Image4,
        outline: Image4_Outline,
        alt: 'Screenshot 4',
        global: true,
        character: '',
        title: 'Werde Held',
    },
    {
        src: Image5,
        outline: Image5_Outline,
        alt: 'Screenshot 5',
        global: false,
        character: banditen,
        title: 'Werde Gangster',
    },
    {
        src: Image6,
        outline: Image6_Outline,
        alt: 'Screenshot 6',
        global: false,
        character: geschaft,
        title: 'Werde Geschäftsmann',
    },
    {
        src: Image7,
        outline: Image7_Outline,
        alt: 'Screenshot 7',
        global: false,
        character: arbeiter,
        title: 'Werde Arbeiter',
    },
];

function handleMouseEnter(img: { global: boolean }, index: number) {
    if (img.global) {
        globalHover.value = true;
        hoveredIndex.value = null;
    } else {
        hoveredIndex.value = index;
        globalHover.value = false;
    }
}

function handleMouseLeave() {
    globalHover.value = false;
    hoveredIndex.value = null;
}
</script>
<template>
    <Head title="Willkommen" />
    <div
        class="min-h-[60vh] w-screen relative overflow-hidden"
        :class="globalHover ? 'grayscale-off' : 'grayscale-on'"
    >
        <!-- Hintergrundbild -->
        <div
            class="absolute inset-0 z-0"
            :class="globalHover ? 'grayscale-off-bg' : 'grayscale-on-bg'"
            :style="{ backgroundImage: `url(${DownloadBg})` }"
        ></div>
        <NavBar />
        <div class="w-full overflow-x-hidden relative z-10">
            <div
                class="flex gap-2 sm:gap-4 mt-12 sm:mt-16 px-2 sm:px-8 w-max-7xl justify-center mx-auto transition-all duration-300"
            >
                <template v-for="(img, index) in images" :key="index">
                    <div
                        class="relative flex-shrink-0 rounded-2xl overflow-hidden image-card
                      w-[140px] sm:w-[160px] md:w-[120px] lg:w-[150px] xl:w-[190px]
                      h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px]
                      flex items-center justify-center"
                        @mouseenter="handleMouseEnter(img, index)"
                        @mouseleave="handleMouseLeave"
                        :class="[
                        img.global
                          ? 'filter grayscale-0 cursor-pointer' // Kein Grayscale auf globalen Bildern
                          : (globalHover || hoveredIndex === index)
                            ? 'filter grayscale-0 cursor-pointer image-card-hover'
                            : 'filter grayscale cursor-pointer'
                    ]"
                    >
                        <!-- Hintergrundbilder mit Crossfade -->
                        <div
                            class="absolute inset-0 bg-cover bg-center image-bg"
                            :class="(globalHover || hoveredIndex === index) ? 'image-bg-outline-hidden' : 'image-bg-outline-visible'"
                            :style="{ backgroundImage: `url(${img.outline})` }"
                        ></div>
                        <div
                            class="absolute inset-0 bg-cover bg-center image-bg"
                            :class="(globalHover || hoveredIndex === index) ? 'image-bg-full-visible' : 'image-bg-full-hidden'"
                            :style="{ backgroundImage: `url(${img.src})` }"
                        ></div>
                        <!-- Play-Button & Text für das globale Bild -->
                        <template v-if="img.global">
                            <div class="absolute bottom-10 flex flex-col items-center gap-4 z-10">
                                <!-- Play-Button -->
                                <div
                                    class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg play-button"
                                    :class="globalHover ? 'play-button-hover' : 'play-button-default'"
                                >
                                    <svg class="w-8 h-8 text-red-500" fill="#b50505" viewBox="0 0 20 20">
                                        <path d="M6 4l10 6-10 6V4z"></path>
                                    </svg>
                                </div>

                                <!-- "SPIEL STARTEN" Text -->
                                <p class="text-white mt-10 font-bold text-lg uppercase stevie-sans-bold">SPIEL STARTEN</p>
                            </div>

                        </template>

                        <!-- Standard Inhalt (Charakterbild & Berufstitel) für andere Bilder -->
                        <template v-else>
                            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center text-white space-y-2 z-10">
                                <!-- Charakterbild -->
                                <div class="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] overflow-visible">
                                    <img
                                        :src="img.character"
                                        class="h-full w-full object-cover character-image"
                                        :class="[globalHover || hoveredIndex === index ? 'character-image-hover' : 'character-image-default']"
                                    />
                                </div>
                                <!-- Berufstitel -->
                                <div 
                                    v-if="hoveredIndex === index" 
                                    class="font-bold uppercase stevie-sans-bold text-xs sm:text-sm bg-black/60 text-center px-2 py-1 rounded absolute bottom-14 sm:bottom-16 left-1/2 transform -translate-x-1/2 title-badge"
                                >
                                    {{ img.title }}
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <div class="w-full mt-10">
        <div class="max-w-[1420px] mx-auto">
            <StepItem />

            <!-- Slider + Galerie -->
            <div class="flex flex-col md:flex-row gap-4 text-white mt-10">
                <div class="md:w-6/12 w-full">
                    <Slider />
                </div>
                <div class="md:w-6/12 w-full">
                    <Gallery />

                </div>
            </div>

            <div class="py-14 sm:py-24">
                <div class="mx-auto max-w-[1420px] px-6 py-12 lg:px-8">
                    <div class="mx-auto max-w-2xl lg:max-w-none">
                        <h2 class="text-lg/8 font-semibold text-white uppercase stevie-sans-book">unsere partner</h2>
                        <div class="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
                            <img class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" :src="partner_default" alt="DEFAULT" width="158" height="48" />
                            <img class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" :src="partner_default" alt="DEFAULT" width="158" height="48" />
                            <img class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" :src="partner_default" alt="DEFAULT" width="158" height="48" />
                            <img class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" :src="partner_default" alt="DEFAULT" width="158" height="48" />
                            <img class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" :src="partner_default" alt="DEFAULT" width="158" height="48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<style>
.grayscale-on-bg,
.grayscale-off-bg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: grayscale(100%);

    /* Weicher Übergang von 100% Sichtbarkeit zu Transparenz am unteren Rand */
    -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 95%,
        rgba(0, 0, 0, 0.7) 98%,
        rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 95%,
        rgba(0, 0, 0, 0.7) 98%,
        rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
}

.grayscale-off-bg {
    filter: grayscale(0%);
    transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.grayscale-on-bg {
    transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Image Card Hover Effects */
.image-card {
    transform-origin: center center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: filter;
}

.image-card-hover {
    filter: drop-shadow(0 20px 30px rgba(255, 0, 0, 0.6));
}

/* Alternativ: Box-Shadow auf Pseudo-Element für bessere Performance */
.image-card::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 20px 30px rgba(255, 0, 0, 0.6);
    z-index: -1;
}

.image-card-hover::before {
    opacity: 1;
}

/* Background Image Crossfade */
.image-bg {
    will-change: opacity;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-bg-outline-visible {
    opacity: 1;
    z-index: 0;
}

.image-bg-outline-hidden {
    opacity: 0;
    z-index: 0;
}

.image-bg-full-hidden {
    opacity: 0;
    z-index: 1;
}

.image-bg-full-visible {
    opacity: 1;
    z-index: 1;
}

/* Character Image Animation */
.character-image {
    will-change: transform;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.character-image-default {
    transform: translateY(20px) scale(1);
}

.character-image-hover {
    transform: translateY(0) scale(1.05);
}

/* Title Badge Animation */
.title-badge {
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity, transform;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate(-50%, 10px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

/* Play Button Animation */
.play-button {
    will-change: transform, box-shadow;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.play-button-default {
    transform: scale(1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.play-button-hover {
    transform: scale(1.15);
    box-shadow: 0 0px 20px rgba(255, 255, 255, 0.6);
}

/* In deiner main CSS Datei oder global */
html, body {
    overflow-x: hidden;
}

</style>
