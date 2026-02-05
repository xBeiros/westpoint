<template>
    <Head title="Discord Login" />
    
    <div class="min-h-screen w-full flex items-center justify-center bg-background p-6">
        <div class="w-full max-w-md">
            <div class="bg-card rounded-lg shadow-lg p-8">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-foreground mb-2">Discord Login</h1>
                    <p class="text-muted-foreground">Melde dich mit deinem Discord-Account an</p>
                </div>

                <div v-if="error" class="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p class="text-sm text-destructive">{{ error }}</p>
                </div>

                <div v-if="errors.discord_id" class="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p class="text-sm text-destructive">{{ errors.discord_id }}</p>
                </div>

                <a
                    :href="discordAuthUrl"
                    :class="[
                        'w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition-colors duration-200',
                        error || discordAuthUrl === '#' 
                            ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                            : 'bg-gray-700/80 hover:bg-red-900/80 text-white cursor-pointer'
                    ]"
                    :onclick="error || discordAuthUrl === '#' ? 'return false' : null"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c.095.056.193.11.293.162a.074.074 0 0 1 .042.077a11.98 11.98 0 0 0 2.31 0a.074.074 0 0 1 .043-.078a.075.075 0 0 1 .09.013c.1.062.198.12.293.162a.074.074 0 0 1 .078.01a.076.076 0 0 1-.01.128a13.1 13.1 0 0 1-1.873.892a.076.076 0 0 0-.041.107c.36.798.772 1.581 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Mit Discord anmelden
                </a>

                <div class="mt-6 text-center">
                    <a href="/" class="text-sm text-muted-foreground hover:text-foreground">
                        Zurück zur Startseite
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({
    errors: {
        type: Object,
        default: () => ({})
    },
    error: {
        type: String,
        default: null
    },
    discordAuthUrl: {
        type: String,
        default: '/auth/discord/redirect'
    }
})
</script>

