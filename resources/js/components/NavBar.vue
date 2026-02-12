<template>
    <Disclosure as="header" class="" v-slot="{ open }">
        <div class="mx-auto max-w-[1500px] mt-8 px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div class="relative flex h-16 justify-between">
                <div class="relative z-10 flex px-2 lg:px-0">
                    <div class="flex shrink-0 items-center">
                        <a href="/" class="flex items-center justify-center h-12 w-12 rounded-lg bg-red-900/80 text-white font-bold text-lg drop-shadow-[0px_0px_14px_rgba(255,255,255,0.5)] transition-all duration-200 hover:bg-red-800/80 hover:scale-105">
                            {{ userInitials }}
                        </a>
                    </div>
                </div>
                <div class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                    <div class="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-center z-0">
                        <nav class="flex space-x-4 py-2" aria-label="Global">
                            <a
                                v-for="item in activeNavigation"
                                :key="item.name"
                                :href="item.href"
                                :class="[
                                    item.current
                                      ? 'text-gray-300 font-bold'
                                      : 'text-gray-400 hover:text-gray-500',
                                    'inline-flex items-center stevie-sans-bold uppercase rounded-md px-3 py-2 text-base transition-colors duration-200'
                                  ]"
                                :aria-current="item.current ? 'page' : undefined"
                            >
                                {{ item.name }}
                            </a>
                        </nav>
                    </div>
                </div>
                <div class="relative z-10 flex items-center gap-4">
                    <!-- Discord Login Button (nur wenn nicht authentifiziert) -->
                    <a
                        v-if="!isAuthenticated"
                        href="/auth/discord"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/80 hover:bg-red-900/80 text-white rounded-lg font-semibold transition-colors duration-200 stevie-sans-bold uppercase text-sm whitespace-nowrap"
                    >
                        <svg class="w-5 h-5 flex-shrink-0" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M524.5 133.8C524.3 133.5 524.1 133.2 523.7 133.1C485.6 115.6 445.3 103.1 404 96C403.6 95.9 403.2 96 402.9 96.1C402.6 96.2 402.3 96.5 402.1 96.9C396.6 106.8 391.6 117.1 387.2 127.5C342.6 120.7 297.3 120.7 252.8 127.5C248.3 117 243.3 106.8 237.7 96.9C237.5 96.6 237.2 96.3 236.9 96.1C236.6 95.9 236.2 95.9 235.8 95.9C194.5 103 154.2 115.5 116.1 133C115.8 133.1 115.5 133.4 115.3 133.7C39.1 247.5 18.2 358.6 28.4 468.2C28.4 468.5 28.5 468.7 28.6 469C28.7 469.3 28.9 469.4 29.1 469.6C73.5 502.5 123.1 527.6 175.9 543.8C176.3 543.9 176.7 543.9 177 543.8C177.3 543.7 177.7 543.4 177.9 543.1C189.2 527.7 199.3 511.3 207.9 494.3C208 494.1 208.1 493.8 208.1 493.5C208.1 493.2 208.1 493 208 492.7C207.9 492.4 207.8 492.2 207.6 492.1C207.4 492 207.2 491.8 206.9 491.7C191.1 485.6 175.7 478.3 161 469.8C160.7 469.6 160.5 469.4 160.3 469.2C160.1 469 160 468.6 160 468.3C160 468 160 467.7 160.2 467.4C160.4 467.1 160.5 466.9 160.8 466.7C163.9 464.4 167 462 169.9 459.6C170.2 459.4 170.5 459.2 170.8 459.2C171.1 459.2 171.5 459.2 171.8 459.3C268 503.2 372.2 503.2 467.3 459.3C467.6 459.2 468 459.1 468.3 459.1C468.6 459.1 469 459.3 469.2 459.5C472.1 461.9 475.2 464.4 478.3 466.7C478.5 466.9 478.7 467.1 478.9 467.4C479.1 467.7 479.1 468 479.1 468.3C479.1 468.6 479 468.9 478.8 469.2C478.6 469.5 478.4 469.7 478.2 469.8C463.5 478.4 448.2 485.7 432.3 491.6C432.1 491.7 431.8 491.8 431.6 492C431.4 492.2 431.3 492.4 431.2 492.7C431.1 493 431.1 493.2 431.1 493.5C431.1 493.8 431.2 494 431.3 494.3C440.1 511.3 450.1 527.6 461.3 543.1C461.5 543.4 461.9 543.7 462.2 543.8C462.5 543.9 463 543.9 463.3 543.8C516.2 527.6 565.9 502.5 610.4 469.6C610.6 469.4 610.8 469.2 610.9 469C611 468.8 611.1 468.5 611.1 468.2C623.4 341.4 590.6 231.3 524.2 133.7zM222.5 401.5C193.5 401.5 169.7 374.9 169.7 342.3C169.7 309.7 193.1 283.1 222.5 283.1C252.2 283.1 275.8 309.9 275.3 342.3C275.3 375 251.9 401.5 222.5 401.5zM417.9 401.5C388.9 401.5 365.1 374.9 365.1 342.3C365.1 309.7 388.5 283.1 417.9 283.1C447.6 283.1 471.2 309.9 470.7 342.3C470.7 375 447.5 401.5 417.9 401.5z"/></svg>
                        <span class="hidden sm:inline">Discord Login</span>
                        <span class="sm:hidden">Login</span>
                    </a>
                    <!-- Dashboard Link (nur wenn authentifiziert) -->
                    <a
                        v-if="isAuthenticated"
                        :href="dashboard.url()"
                        class="group relative inline-flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg font-semibold transition-all duration-300 stevie-sans-bold uppercase text-sm whitespace-nowrap overflow-hidden shadow-lg shadow-red-900/50 hover:shadow-red-800/70 hover:scale-105 active:scale-95"
                    >
                        <!-- Glow-Effekt Hintergrund -->
                        <span class="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                        <!-- Animierter Hintergrund -->
                        <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                        <!-- Inhalt -->
                        <svg class="w-5 h-5 flex-shrink-0 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="hidden sm:inline relative z-10">Dashboard</span>
                        <span class="sm:hidden relative z-10">Home</span>
                    </a>
                    <!-- Mobile menu button -->
                    <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset transition-colors duration-200 lg:hidden">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open menu</span>
                        <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <DisclosurePanel as="nav" style="background-color: #0e0e0e;" class="lg:hidden border-t border-gray-600" aria-label="Global">
            <div class="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton v-for="item in activeNavigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'text-gray-900 font-bold' : 'text-gray-700 hover:text-gray-900', 'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { welcome } from '@/routes'
import { dashboard } from '@/routes/ucp'
import { index as rulebookIndex } from '@/routes/rulebook'
import { index as newsIndex } from '@/routes/news'
import { index as presentationIndex } from '@/routes/presentation'
import { index as wikiIndex } from '@/routes/wiki'
import { faq } from '@/routes'
import { index as adminNewsIndex } from '@/routes/ucp/admin/news'
import { getInitials } from '@/composables/useInitials'

const page = usePage()

// Debug: Prüfe Auth-Status
const isAuthenticated = computed(() => {
    const auth = page.props.auth
    return auth && auth.user !== null && auth.user !== undefined
})

// Initialen aus firstname und lastname generieren (wie im Footer)
const userInitials = computed(() => {
    const auth = page.props.auth
    if (!auth || !auth.player) {
        // Fallback: Versuche aus auth.user.name
        if (auth && auth.user && auth.user.name) {
            return getInitials(auth.user.name)
        }
        return 'WP' // Fallback zu "Westpoint"
    }
    
    const firstname = auth.player.firstname || ''
    const lastname = auth.player.lastname || ''
    
    if (firstname && lastname) {
        return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
    } else if (firstname) {
        return firstname.charAt(0).toUpperCase()
    } else if (lastname) {
        return lastname.charAt(0).toUpperCase()
    }
    
    return 'WP' // Fallback
})

const navigation = [
    { name: 'Startseite', href: welcome.url(), current: false },
    { name: 'Wiki', href: wikiIndex.url(), current: false },
    { name: 'Regelwerk', href: rulebookIndex.url(), current: false },
    { name: 'Neuigkeiten', href: newsIndex.url(), current: false },
    { name: 'Präsentation', href: presentationIndex.url(), current: false },
    { name: 'FAQ', href: faq.url(), current: false },
]

// Admin navigation (only show if user is authenticated)
const adminNavigation = [
    { name: 'Admin', href: adminNewsIndex.url(), current: false },
]

// Dynamisch die aktive Route bestimmen
const activeNavigation = computed(() => {
    const currentUrl = page.url
    return navigation.map(item => {
        if (item.href === '#') return { ...item, current: false }
        
        // Einfacher String-Vergleich
        const isActive = currentUrl === item.href || 
                        currentUrl.startsWith(item.href + '/') ||
                        (item.href === welcome.url() && currentUrl === '/') ||
                        (item.href === faq.url() && currentUrl.includes('/faq')) ||
                        (item.href === presentationIndex.url() && currentUrl.includes('/presentation')) ||
                        (item.href === newsIndex.url() && (currentUrl.includes('/news') || currentUrl === newsIndex.url())) ||
                        (item.href === rulebookIndex.url() && currentUrl.includes('/rulebook'))
        
        return { ...item, current: isActive }
    })
})

</script>
