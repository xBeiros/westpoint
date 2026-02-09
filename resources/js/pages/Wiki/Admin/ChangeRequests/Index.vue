<template>
    <Head title="Änderungsanträge" />
    
    <div class="min-h-screen bg-[#1d1d1d]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">Änderungsanträge</h1>
                <Link
                    :href="adminIndex().url"
                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                    Zurück zur Übersicht
                </Link>
            </div>

            <div v-if="$page.props.flash?.success" class="mb-4 p-4 bg-green-900/30 border border-green-600 rounded text-green-200">
                {{ $page.props.flash.success }}
            </div>

            <div class="space-y-4">
                <div
                    v-for="request in requests"
                    :key="request.id"
                    class="bg-[#2d2d2d] rounded-lg border border-gray-700 p-6"
                >
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold text-white mb-2">
                                {{ request.title || 'Unbenannt' }}
                            </h3>
                            <div class="flex items-center space-x-4 text-sm text-gray-400">
                                <span>Typ: {{ getRequestTypeLabel(request.request_type) }}</span>
                                <span>Von: {{ request.requester_name }}</span>
                                <span>{{ formatDate(request.created_at) }}</span>
                            </div>
                        </div>
                        <span
                            :class="getStatusClass(request.status)"
                            class="px-3 py-1 text-xs rounded font-semibold"
                        >
                            {{ getStatusLabel(request.status) }}
                        </span>
                    </div>

                    <div v-if="request.article" class="mb-4">
                        <p class="text-sm text-gray-400">
                            Artikel: <Link :href="wikiShow(request.article.slug).url" target="_blank" class="text-blue-400 hover:underline">{{ request.article.title }}</Link>
                        </p>
                    </div>

                    <div class="flex space-x-2">
                        <Link
                            :href="changeRequestShow(request.id).url"
                            class="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded transition-colors text-sm"
                        >
                            Details ansehen
                        </Link>
                        <template v-if="request.status === 'pending'">
                            <button
                                @click="approveRequest(request)"
                                class="px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded transition-colors text-sm"
                            >
                                Genehmigen
                            </button>
                            <button
                                @click="showRejectModal(request)"
                                class="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded transition-colors text-sm"
                            >
                                Ablehnen
                            </button>
                        </template>
                    </div>
                </div>

                <div v-if="requests.length === 0" class="text-center text-gray-400 py-12">
                    Keine Änderungsanträge gefunden.
                </div>
            </div>
        </div>

        <!-- Reject Modal -->
        <div
            v-if="showReject"
            class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            @click.self="showReject = false"
        >
            <div class="bg-[#2d2d2d] rounded-lg p-6 max-w-2xl w-full mx-4 border border-gray-600">
                <h3 class="text-xl font-semibold text-white mb-4">Antrag ablehnen</h3>
                <p class="text-gray-300 mb-4">Bitte gib einen Grund für die Ablehnung an:</p>
                <textarea
                    v-model="rejectNotes"
                    rows="4"
                    class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="Ablehnungsgrund..."
                ></textarea>
                <div class="flex justify-end space-x-4 mt-4">
                    <button
                        @click="showReject = false"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        Abbrechen
                    </button>
                    <button
                        @click="rejectRequest"
                        :disabled="!rejectNotes || rejectNotes.length < 10"
                        class="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50"
                    >
                        Ablehnen
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { index as adminIndex } from '@/routes/wiki/admin'
import { show as wikiShow } from '@/routes/wiki'
import { index as changeRequestsIndex, show as changeRequestShow, approve, reject as rejectRoute } from '@/routes/wiki/admin/change-requests'
import { ref } from 'vue'

defineProps({
    requests: Array,
    pendingCount: Number
})

const showReject = ref(false)
const rejectNotes = ref('')
const currentRequest = ref(null)

const getRequestTypeLabel = (type) => {
    const labels = {
        create: 'Erstellen',
        edit: 'Bearbeiten',
        delete: 'Löschen'
    }
    return labels[type] || type
}

const getStatusLabel = (status) => {
    const labels = {
        pending: 'Ausstehend',
        approved: 'Genehmigt',
        rejected: 'Abgelehnt'
    }
    return labels[status] || status
}

const getStatusClass = (status) => {
    const classes = {
        pending: 'bg-yellow-900/30 text-yellow-200',
        approved: 'bg-green-900/30 text-green-200',
        rejected: 'bg-red-900/30 text-red-200'
    }
    return classes[status] || 'bg-gray-900/30 text-gray-400'
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const approveRequest = (request) => {
    if (confirm('Möchtest du diesen Antrag wirklich genehmigen?')) {
        router.post(approve(request.id).url, {}, {
            preserveScroll: true,
        })
    }
}

const showRejectModal = (request) => {
    currentRequest.value = request
    rejectNotes.value = ''
    showReject.value = true
}

const rejectRequest = () => {
    if (currentRequest.value) {
        router.post(rejectRoute(currentRequest.value.id).url, {
            review_notes: rejectNotes.value
        }, {
            preserveScroll: true,
        })
        showReject.value = false
        currentRequest.value = null
        rejectNotes.value = ''
    }
}
</script>

