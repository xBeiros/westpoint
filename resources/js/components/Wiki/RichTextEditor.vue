<template>
    <div class="rich-text-editor">
        <div v-if="editor" class="editor-toolbar">
            <button
                type="button"
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                :disabled="disabled"
            >
                <strong>B</strong>
            </button>
            <button
                type="button"
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                :disabled="disabled"
            >
                <em>I</em>
            </button>
            <button
                type="button"
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
                :disabled="disabled"
            >
                <s>S</s>
            </button>
            <div class="divider"></div>
            <button
                type="button"
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                :disabled="disabled"
            >
                H1
            </button>
            <button
                type="button"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                :disabled="disabled"
            >
                H2
            </button>
            <button
                type="button"
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                :disabled="disabled"
            >
                H3
            </button>
            <div class="divider"></div>
            <button
                type="button"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                :disabled="disabled"
            >
                •
            </button>
            <button
                type="button"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                :disabled="disabled"
            >
                1.
            </button>
            <button
                type="button"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }"
                :disabled="disabled"
            >
                "
            </button>
            <div class="divider"></div>
            <button
                type="button"
                @click="editor.chain().focus().setHorizontalRule().run()"
                :disabled="disabled"
            >
                ─
            </button>
            <button
                type="button"
                @click="setLink"
                :class="{ 'is-active': editor.isActive('link') }"
                :disabled="disabled"
            >
                🔗
            </button>
            <button
                type="button"
                @click="addImage"
                :disabled="disabled"
            >
                🖼️
            </button>
            <div class="divider"></div>
            <button
                type="button"
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }"
                :disabled="disabled"
            >
                &lt;/&gt;
            </button>
            <button
                type="button"
                @click="editor.chain().focus().undo().run()"
                :disabled="disabled || !editor.can().undo()"
            >
                ↶
            </button>
            <button
                type="button"
                @click="editor.chain().focus().redo().run()"
                :disabled="disabled || !editor.can().redo()"
            >
                ↷
            </button>
        </div>
        <EditorContent :editor="editor" class="editor-content" />
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
// Table-Extensions werden später hinzugefügt, falls benötigt

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    height: {
        type: Number,
        default: 600
    }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Image.configure({
            inline: true,
            allowBase64: true,
        }),
        Link.configure({
            openOnClick: false,
        }),
        // Table-Extensions werden später hinzugefügt, falls benötigt
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-invert max-w-none focus:outline-none',
            style: `min-height: ${props.height}px;`,
        },
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
    editable: !props.disabled,
})

watch(() => props.modelValue, (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
        editor.value.commands.setContent(newValue || '')
    }
})

watch(() => props.disabled, (newValue) => {
    if (editor.value) {
        editor.value.setEditable(!newValue)
    }
})

const setLink = () => {
    if (!editor.value) return

    const previousUrl = editor.value.getAttributes('link').href
    const url = window.prompt('URL eingeben', previousUrl)

    if (url === null) {
        return
    }

    if (url === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
    if (!editor.value) return

    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.onchange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                editor.value?.chain().focus().setImage({ src: reader.result }).run()
            }
            reader.readAsDataURL(file)
        }
    }
    input.click()
}

onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy()
    }
})
</script>

<style scoped>
.rich-text-editor {
    width: 100%;
    border: 1px solid #4b5563;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #1f2937;
}

.editor-toolbar {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: #1f2937;
    border-bottom: 1px solid #4b5563;
    flex-wrap: wrap;
}

.editor-toolbar button {
    padding: 0.5rem 0.75rem;
    background-color: #374151;
    border: 1px solid #4b5563;
    border-radius: 0.25rem;
    color: #e5e7eb;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.editor-toolbar button:hover:not(:disabled) {
    background-color: #4b5563;
    border-color: #6b7280;
}

.editor-toolbar button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.editor-toolbar button.is-active {
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;
}

.divider {
    width: 1px;
    height: 1.5rem;
    background-color: #4b5563;
    margin: 0 0.25rem;
}

.editor-content {
    background-color: #111827;
    padding: 1rem;
    min-height: v-bind('props.height + "px"');
}

:deep(.ProseMirror) {
    outline: none;
    color: #e5e7eb;
    font-size: 14px;
    line-height: 1.6;
}

:deep(.ProseMirror p) {
    margin: 0.75rem 0;
}

:deep(.ProseMirror h1) {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0;
    color: #f9fafb;
}

:deep(.ProseMirror h2) {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.875rem 0;
    color: #f9fafb;
}

:deep(.ProseMirror h3) {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.75rem 0;
    color: #f9fafb;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
}

:deep(.ProseMirror li) {
    margin: 0.25rem 0;
}

:deep(.ProseMirror blockquote) {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #d1d5db;
    font-style: italic;
}

:deep(.ProseMirror code) {
    background-color: #374151;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
}

:deep(.ProseMirror pre) {
    background-color: #1f2937;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    overflow-x: auto;
}

:deep(.ProseMirror pre code) {
    background-color: transparent;
    padding: 0;
}

:deep(.ProseMirror img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
}

:deep(.ProseMirror a) {
    color: #3b82f6;
    text-decoration: underline;
}

:deep(.ProseMirror a:hover) {
    color: #60a5fa;
}

:deep(.ProseMirror table) {
    border-collapse: collapse;
    margin: 1rem 0;
    width: 100%;
}

:deep(.ProseMirror table td),
:deep(.ProseMirror table th) {
    border: 1px solid #4b5563;
    padding: 0.5rem;
}

:deep(.ProseMirror table th) {
    background-color: #374151;
    font-weight: bold;
}

:deep(.ProseMirror hr) {
    border: none;
    border-top: 2px solid #4b5563;
    margin: 1.5rem 0;
}
</style>
