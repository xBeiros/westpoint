<template>
    <div>
        <h1 class="text-xl font-semibold mb-4">Suchergebnisse für "{{ query }}"</h1>
        <ul>
            <li v-for="article in results" :key="article.slug" class="mb-2">
                <a :href="`/wiki/${article.slug}`" class="text-blue-500 hover:underline">
                    {{ article.title }}
                </a>
                <p class="text-sm text-gray-500">{{ article.description }}</p>
            </li>
        </ul>
        <p v-if="!results.length">Keine Ergebnisse gefunden.</p>
    </div>
</template>

<script setup>
defineProps({
    query: String,
    results: Array
})
</script>
