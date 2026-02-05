<template>
    <div>
        <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
        <div v-html="article.content" class="prose max-w-none"></div>
    </div>
</template>

<script setup>
defineProps({ article: Object })
</script>
