<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import partner_default from "@/Assets/images/partner-default.png"
import StepItem from "@/components/StepItem.vue";
import Footer from "@/components/Footer.vue";
import Slider from "@/components/Slider.vue";
import Gallery from "@/components/Gallery.vue";
import DownloadBg from "@/Assets/images/Download.png";

const globalHover = ref(false); // nur Bild 4
const hoveredIndex = ref<number | null>(null);

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
    background-position: center top;
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
