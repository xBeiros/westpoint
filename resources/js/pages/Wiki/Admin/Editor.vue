<template>
    <Head :title="article ? 'Artikel bearbeiten' : 'Neuen Artikel erstellen'" />
    
    <div class="min-h-screen bg-[#1d1d1d]">
        <div class="max-w-5xl mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">
                    {{ article ? 'Artikel bearbeiten' : 'Neuen Artikel erstellen' }}
                </h1>
                    <Link
                        :href="adminIndex().url"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        Zurück
                    </Link>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="bg-[#2d2d2d] rounded-lg border border-gray-700 p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Titel *
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                            placeholder="Artikel-Titel"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Slug (URL)
                        </label>
                        <input
                            v-model="form.slug"
                            type="text"
                            class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                            placeholder="wird automatisch generiert"
                        />
                        <p class="mt-1 text-xs text-gray-400">Wird automatisch aus dem Titel generiert, falls leer</p>
                    </div>

                    <div>
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

                    <div class="grid grid-cols-2 gap-4">
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
                                Reihenfolge
                            </label>
                            <input
                                v-model.number="form.order"
                                type="number"
                                class="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                                placeholder="0"
                            />
                        </div>
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

                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Inhalt *
                        </label>
                        <RichTextEditor
                            v-model="form.content"
                            :height="600"
                        />
                    </div>

                    <div class="flex items-center">
                        <input
                            v-model="form.published"
                            type="checkbox"
                            id="published"
                            class="w-4 h-4 text-red-800 bg-[#1a1a1a] border-gray-600 rounded focus:ring-red-800"
                        />
                        <label for="published" class="ml-2 text-sm text-gray-300">
                            Artikel veröffentlichen
                        </label>
                    </div>
                </div>

                <div class="flex justify-end space-x-4">
                    <Link
                        :href="adminIndex().url"
                        class="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        Abbrechen
                    </Link>
                    <button
                        type="submit"
                        :disabled="processing"
                        class="px-6 py-2 bg-red-800 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50"
                    >
                        {{ processing ? 'Wird gespeichert...' : (article ? 'Aktualisieren' : 'Erstellen') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import { index as adminIndex, store, update } from '@/routes/wiki/admin'
import { ref, computed, watch } from 'vue'
import RichTextEditor from '@/components/Wiki/RichTextEditor.vue'

const props = defineProps({
    article: Object
})

const tagsInput = ref(props.article?.tags?.join(', ') || '')

const form = useForm({
    title: props.article?.title || '',
    slug: props.article?.slug || '',
    description: props.article?.description || '',
    content: props.article?.content || props.article?.raw_content || '',
    raw_content: props.article?.raw_content || props.article?.content || '',
    tags: props.article?.tags || [],
    category: props.article?.category || 'general',
    published: props.article?.published ?? true,
    order: props.article?.order || 0,
})

const updateTags = () => {
    form.tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
}

const submit = () => {
    form.raw_content = form.content
    if (props.article) {
        form.put(update(props.article.id).url)
    } else {
        form.post(store().url)
    }
}

const processing = computed(() => form.processing)
</script>

