<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    modelValue?: string;
    class?: string;
    rows?: number;
    disabled?: boolean;
    placeholder?: string;
    id?: string;
}>(), {
    rows: 3,
    disabled: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const classes = computed(() => cn(
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.class
));
</script>

<template>
    <textarea
        :id="id"
        :class="classes"
        :rows="rows"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
</template>



