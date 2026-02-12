<template>
    <Head :title="article ? 'Artikel bearbeiten' : 'Neuen Artikel vorschlagen'" />
    
    <div class="min-h-screen bg-[#1d1d1d]">
        <div class="max-w-5xl mx-auto px-4 py-8">
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-white mb-2">
                    {{ article ? 'Artikel bearbeiten' : 'Neuen Artikel vorschlagen' }}
                </h1>
                <p class="text-gray-400">
                    Dein Antrag wird von einem Wiki-Admin überprüft und dann freigegeben.
                </p>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="bg-[#2d2d2d] rounded-lg border border-gray-700 p-6 space-y-4">
                    <input v-model="form.request_type" type="hidden" />
                    <input v-model="form.article_id" type="hidden" />

                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Titel *
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            :disabled="article && form.request_type === 'delete'"
                            class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800 disabled:opacity-50"
                            placeholder="Artikel-Titel"
                        />
                    </div>

                    <div v-if="form.request_type === 'create'">
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Slug (URL)
                        </label>
                        <input
                            v-model="form.slug"
                            type="text"
                            class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                            placeholder="wird automatisch generiert"
                        />
                    </div>

                    <div v-if="form.request_type !== 'delete'">
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Beschreibung
                        </label>
                        <textarea
                            v-model="form.description"
                            rows="3"
                            class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                            placeholder="Kurze Beschreibung des Artikels"
                        ></textarea>
                    </div>

                    <div v-if="form.request_type === 'create' || form.request_type === 'edit'" class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                Kategorie
                            </label>
                            <input
                                v-model="form.category"
                                type="text"
                                class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                                placeholder="general"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                Tags (kommagetrennt)
                            </label>
                            <input
                                v-model="tagsInput"
                                type="text"
                                class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                                placeholder="tag1, tag2, tag3"
                                @input="updateTags"
                            />
                        </div>
                    </div>

                    <div v-if="form.request_type === 'create' || form.request_type === 'edit'">
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Inhalt *
                        </label>
                        <RichTextEditor
                            v-model="form.content"
                            :height="600"
                        />
                    </div>

                    <div v-if="form.request_type === 'delete'" class="p-4 bg-red-900/20 border border-red-800 rounded">
                        <p class="text-red-200">
                            <strong>Warnung:</strong> Du möchtest diesen Artikel löschen. Bitte stelle sicher, dass dies wirklich gewünscht ist.
                        </p>
                    </div>
                </div>

                <div class="flex justify-end space-x-4">
                    <Link
                        :href="article ? wikiShow(article.slug).url : wikiIndex().url"
                        class="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        Abbrechen
                    </Link>
                    <button
                        type="submit"
                        :disabled="processing"
                        class="px-6 py-2 bg-yellow-800 hover:bg-yellow-700 text-white rounded transition-colors disabled:opacity-50"
                    >
                        {{ processing ? 'Wird eingereicht...' : 'Antrag einreichen' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import wikiRoutes, { index as wikiIndex, show as wikiShow } from '@/routes/wiki'
import { ref, computed, onMounted } from 'vue'
import RichTextEditor from '@/components/Wiki/RichTextEditor.vue'

const { store } = wikiRoutes.changeRequest

const props = defineProps({
    article: Object
})

const tagsInput = ref(props.article?.tags?.join(', ') || '')

const form = useForm({
    article_id: props.article?.id || null,
    request_type: props.article ? 'edit' : 'create',
    title: props.article?.title || '',
    slug: props.article?.slug || '',
    description: props.article?.description || '',
    content: props.article?.content || props.article?.raw_content || '',
    raw_content: props.article?.raw_content || props.article?.content || '',
    tags: props.article?.tags || [],
    category: props.article?.category || 'general',
})

const updateTags = () => {
    form.tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
}

const submit = () => {
    form.raw_content = form.content
    form.post(store().url)
}

const processing = computed(() => form.processing)

onMounted(() => {
    if (props.article) {
        tagsInput.value = props.article.tags?.join(', ') || ''
    }
})
</script>

