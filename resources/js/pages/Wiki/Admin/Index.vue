<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { edit as editRoute, destroy, togglePublish as togglePublishRoute, store } from '@/routes/ucp/wiki';
import { show as wikiShow } from '@/routes/wiki';
import { index as changeRequestsIndex, show as changeRequestShow, approve as approveRoute, reject as rejectRoute } from '@/routes/ucp/wiki/change-requests';
import { Dialog, DialogScrollContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/composables/useInitials';
import { ref, computed, watch, onMounted } from 'vue';
import RichTextEditor from '@/components/Wiki/RichTextEditor.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wiki Verwaltung',
        href: '/ucp/wiki',
    },
];

const props = defineProps<{
    articles: any[];
    pendingCount?: number;
    categories?: string[];
}>();

const isCreateModalOpen = ref(false);
const isChangeRequestsModalOpen = ref(false);
const isChangeRequestDetailsModalOpen = ref(false);
const changeRequests = ref<any[]>([]);
const isLoadingChangeRequests = ref(false);
const isLoadingChangeRequestDetails = ref(false);
const selectedChangeRequest = ref<any>(null);
const showRejectModal = ref(false);
const rejectNotes = ref('');
const currentRejectRequest = ref<any>(null);

watch(isCreateModalOpen, (isOpen) => {
    if (isOpen) {
        categoryInput.value = form.category || '';
    }
});

watch(isChangeRequestsModalOpen, async (isOpen) => {
    if (isOpen) {
        await loadChangeRequests();
    }
});

// Lade Änderungsanträge beim Mounten der Komponente
onMounted(async () => {
    await loadChangeRequests();
});

const isLikesModalOpen = ref(false);
const selectedArticleId = ref<number | null>(null);
const likes = ref<any[]>([]);
const isLoadingLikes = ref(false);
const tagsInput = ref('');
const categoryInput = ref('');
const showCategoryDropdown = ref(false);
const { getInitials } = useInitials();

const existingCategories = computed(() => {
    const cats = props.categories || [];
    return Array.isArray(cats) ? cats : [];
});
const filteredCategories = computed(() => {
    if (!categoryInput.value) return existingCategories.value;
    return existingCategories.value.filter(cat => 
        cat && cat.toLowerCase().includes(categoryInput.value.toLowerCase())
    );
});

const selectCategory = (category: string) => {
    form.category = category;
    categoryInput.value = category;
    showCategoryDropdown.value = false;
};

const createNewCategory = () => {
    if (categoryInput.value.trim()) {
        form.category = categoryInput.value.trim();
        showCategoryDropdown.value = false;
    }
};

const form = useForm({
    title: '',
    slug: '',
    description: '',
    content: '',
    raw_content: '',
    tags: [] as string[],
    category: 'general',
    published: true,
    order: 0,
});

const updateTags = () => {
    form.tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
};

const submitCreate = () => {
    form.raw_content = form.content;
    form.post(store().url, {
        onSuccess: () => {
            isCreateModalOpen.value = false;
            form.reset();
            tagsInput.value = '';
            categoryInput.value = '';
            showCategoryDropdown.value = false;
        },
    });
};

// Watch category input to update form
watch(categoryInput, (newValue) => {
    form.category = newValue;
});

const togglePublish = (article: any) => {
    router.post(togglePublishRoute(article.id).url, {}, {
        preserveScroll: true,
    });
};

const deleteArticle = (article: any) => {
    if (confirm(`Möchtest du den Artikel "${article.title}" wirklich löschen?`)) {
        router.delete(destroy(article.id).url);
    }
};

const openLikesModal = async (articleId: number) => {
    selectedArticleId.value = articleId;
    isLikesModalOpen.value = true;
    isLoadingLikes.value = true;
    
    try {
        const response = await fetch(`/ucp/wiki/${articleId}/likes`, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            likes.value = data.likes || [];
        } else {
            likes.value = [];
        }
    } catch (error) {
        console.error('Fehler beim Laden der Likes:', error);
        likes.value = [];
    } finally {
        isLoadingLikes.value = false;
    }
};

const getFullName = (like: any) => {
    if (like.firstname && like.lastname) {
        return `${like.firstname} ${like.lastname}`;
    }
    return like.discord_name || 'Unbekannt';
};

const loadChangeRequests = async () => {
    isLoadingChangeRequests.value = true;
    try {
        const response = await fetch(changeRequestsIndex().url, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            changeRequests.value = data.requests || [];
        } else {
            changeRequests.value = [];
        }
    } catch (error) {
        console.error('Fehler beim Laden der Änderungsanträge:', error);
        changeRequests.value = [];
    } finally {
        isLoadingChangeRequests.value = false;
    }
};

const getRequestTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        create: 'Erstellen',
        edit: 'Bearbeiten',
        delete: 'Löschen'
    };
    return labels[type] || type;
};

const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
        pending: 'Ausstehend',
        approved: 'Genehmigt',
        rejected: 'Abgelehnt'
    };
    return labels[status] || status;
};

const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
        pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50',
        approved: 'bg-green-500/10 text-green-500 border-green-500/50',
        rejected: 'bg-red-500/10 text-red-500 border-red-500/50'
    };
    return classes[status] || 'bg-muted text-muted-foreground border-sidebar-border/70';
};

const approveRequest = (request: any) => {
    if (confirm('Möchtest du diesen Antrag wirklich genehmigen?')) {
        router.post(approveRoute(request.id).url, {}, {
            preserveScroll: true,
            onSuccess: () => {
                loadChangeRequests();
            },
        });
    }
};

const openRejectModal = (request: any) => {
    currentRejectRequest.value = request;
    rejectNotes.value = '';
    showRejectModal.value = true;
};

const rejectRequest = () => {
    if (currentRejectRequest.value) {
        router.post(rejectRoute(currentRejectRequest.value.id).url, {
            review_notes: rejectNotes.value
        }, {
            preserveScroll: true,
            onSuccess: () => {
                showRejectModal.value = false;
                currentRejectRequest.value = null;
                rejectNotes.value = '';
                loadChangeRequests();
            },
        });
    }
};

const openChangeRequestDetails = async (requestId: number) => {
    isChangeRequestDetailsModalOpen.value = true;
    isLoadingChangeRequestDetails.value = true;
    
    try {
        const response = await fetch(changeRequestShow(requestId).url, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            selectedChangeRequest.value = data.changeRequest || null;
            // Markierungen werden automatisch durch den Watch-Handler angewendet
        } else {
            selectedChangeRequest.value = null;
        }
    } catch (error) {
        console.error('Fehler beim Laden der Details:', error);
        selectedChangeRequest.value = null;
    } finally {
        isLoadingChangeRequestDetails.value = false;
    }
};

// Diff-Algorithmus für Zeichen-für-Zeichen Vergleich (GitHub-Style)
const diffChars = (oldStr: string, newStr: string) => {
    if (!oldStr) oldStr = '';
    if (!newStr) newStr = '';
    
    // Einfacher LCS-basierter Diff
    const oldChars = oldStr.split('');
    const newChars = newStr.split('');
    
    const m = oldChars.length;
    const n = newChars.length;
    
    // DP-Tabelle für LCS
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (oldChars[i - 1] === newChars[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack um Diff zu finden
    const oldParts: Array<{ type: 'removed' | 'unchanged', text: string }> = [];
    const newParts: Array<{ type: 'added' | 'unchanged', text: string }> = [];
    
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && oldChars[i - 1] === newChars[j - 1]) {
            // Gleiche Zeichen
            const char = oldChars[i - 1];
            if (oldParts.length > 0 && oldParts[0].type === 'unchanged') {
                oldParts[0].text = char + oldParts[0].text;
            } else {
                oldParts.unshift({ type: 'unchanged', text: char });
            }
            if (newParts.length > 0 && newParts[0].type === 'unchanged') {
                newParts[0].text = char + newParts[0].text;
            } else {
                newParts.unshift({ type: 'unchanged', text: char });
            }
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            // Hinzugefügt
            const char = newChars[j - 1];
            if (newParts.length > 0 && newParts[0].type === 'added') {
                newParts[0].text = char + newParts[0].text;
            } else {
                newParts.unshift({ type: 'added', text: char });
            }
            j--;
        } else {
            // Entfernt
            const char = oldChars[i - 1];
            if (oldParts.length > 0 && oldParts[0].type === 'removed') {
                oldParts[0].text = char + oldParts[0].text;
            } else {
                oldParts.unshift({ type: 'removed', text: char });
            }
            i--;
        }
    }
    
    return { oldParts, newParts };
};

// Diff-Algorithmus für Zeile-für-Zeile Vergleich
const getContentDiff = (oldContent: string, newContent: string) => {
    if (!oldContent) oldContent = '';
    if (!newContent) newContent = '';
    
    // Entferne HTML-Tags für Vergleich, aber behalte Formatierung
    const stripHtml = (html: string) => {
        if (!html) return '';
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        // Behalte Zeilenumbrüche und Leerzeichen
        let text = tmp.textContent || tmp.innerText || '';
        // Konvertiere <br> zu \n
        text = text.replace(/\n/g, '\n');
        return text;
    };
    
    const oldText = stripHtml(oldContent);
    const newText = stripHtml(newContent);
    
    // Wenn beide leer sind, keine Diff
    if (!oldText && !newText) return [];
    
    // Behalte alle Zeilenumbrüche - auch leere Zeilen
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    
    const diff: Array<{ 
        type: 'removed' | 'added' | 'modified' | 'unchanged', 
        oldLine?: string, 
        newLine?: string,
        oldParts?: Array<{ type: 'removed' | 'unchanged', text: string }>,
        newParts?: Array<{ type: 'added' | 'unchanged', text: string }>
    }> = [];
    
    // Einfacher Zeilen-Vergleich - behalte Original-Formatierung
    const maxLength = Math.max(oldLines.length, newLines.length);
    
    for (let i = 0; i < maxLength; i++) {
        const oldLine = oldLines[i];
        const newLine = newLines[i];
        
        if (oldLine === undefined && newLine !== undefined) {
            // Nur in neu
            diff.push({ type: 'added', newLine: newLine });
        } else if (oldLine !== undefined && newLine === undefined) {
            // Nur in alt
            diff.push({ type: 'removed', oldLine: oldLine });
        } else if (oldLine === newLine) {
            // Unverändert - behalte Original
            diff.push({ type: 'unchanged', oldLine: oldLine, newLine: newLine });
        } else {
            // Geändert - zeige Diff innerhalb der Zeile
            const charDiff = diffChars(oldLine, newLine);
            diff.push({ 
                type: 'modified', 
                oldLine: oldLine, 
                newLine: newLine,
                oldParts: charDiff.oldParts,
                newParts: charDiff.newParts
            });
        }
    }
    
    return diff;
};

const getContentDiffLines = computed(() => {
    if (!selectedChangeRequest.value) return [];
    
    if (selectedChangeRequest.value.request_type === 'create') {
        return [];
    }
    
    const oldContent = selectedChangeRequest.value.article?.raw_content || selectedChangeRequest.value.article?.content || '';
    const newContent = selectedChangeRequest.value.raw_content || selectedChangeRequest.value.content || '';
    
    if (!oldContent && !newContent) return [];
    
    return getContentDiff(oldContent, newContent);
});

// Wende Diff-Markierungen auf gerenderten HTML-Content an
const applyDiffMarkings = () => {
    if (!diffContentRef.value || !selectedChangeRequest.value || getContentDiffLines.value.length === 0) return;
    
    const container = diffContentRef.value;
    
    // Sammle alle Text-Knoten
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
    );
    
    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node as Text);
    }
    
    // Durchlaufe alle Diff-Lines und markiere entsprechende Text-Knoten
    getContentDiffLines.value.forEach((diffLine) => {
        if (diffLine.type === 'added' && diffLine.newLine) {
            const searchText = diffLine.newLine.trim();
            // Finde Text-Knoten die diese Zeile enthalten
            for (const textNode of textNodes) {
                const text = textNode.textContent || '';
                if (text.trim() === searchText || text.includes(searchText)) {
                    // Prüfe ob bereits markiert
                    if (textNode.parentElement?.classList.contains('text-green-400')) continue;
                    
                    const span = document.createElement('span');
                    span.className = 'text-green-400 underline decoration-green-400 bg-green-500/20 px-2 py-1 rounded inline-block my-1';
                    span.textContent = text;
                    textNode.parentNode?.replaceChild(span, textNode);
                    break;
                }
            }
        } else if (diffLine.type === 'removed' && diffLine.oldLine) {
            const searchText = diffLine.oldLine.trim();
            let found = false;
            // Finde Text-Knoten die diese Zeile enthalten
            for (const textNode of textNodes) {
                const text = textNode.textContent || '';
                if (text.trim() === searchText || text.includes(searchText)) {
                    // Prüfe ob bereits markiert
                    if (textNode.parentElement?.classList.contains('text-red-400')) continue;
                    
                    const span = document.createElement('span');
                    span.className = 'text-red-400 line-through decoration-red-400 bg-red-500/20 px-2 py-1 rounded inline-block my-1';
                    span.textContent = text;
                    textNode.parentNode?.replaceChild(span, textNode);
                    found = true;
                    break;
                }
            }
            // Wenn nicht gefunden, füge am Ende hinzu
            if (!found) {
                const p = document.createElement('p');
                p.className = 'text-red-400 line-through decoration-red-400 bg-red-500/20 px-2 py-1 rounded my-1';
                p.textContent = diffLine.oldLine;
                container.appendChild(p);
            }
        } else if (diffLine.type === 'modified' && diffLine.newParts && diffLine.newLine) {
            const searchText = diffLine.newLine.trim();
            // Finde Text-Knoten die diese Zeile enthalten
            for (const textNode of textNodes) {
                const text = textNode.textContent || '';
                if (text.trim() === searchText || text.includes(searchText)) {
                    // Prüfe ob bereits markiert
                    if (textNode.parentElement?.querySelector('.text-green-400, .text-red-400')) continue;
                    
                    let html = '';
                    if (diffLine.newParts) {
                        diffLine.newParts.forEach((newPart: any) => {
                            if (newPart.type === 'added') {
                                html += `<span class="text-green-400 underline decoration-green-400 bg-green-500/20 px-1 rounded">${escapeHtml(newPart.text)}</span>`;
                            } else {
                                html += escapeHtml(newPart.text);
                            }
                        });
                    }
                    if (diffLine.oldParts) {
                        diffLine.oldParts.forEach((oldPart: any) => {
                            if (oldPart.type === 'removed') {
                                html += `<span class="text-red-400 line-through decoration-red-400 bg-red-500/20 px-1 rounded">${escapeHtml(oldPart.text)}</span>`;
                            }
                        });
                    }
                    if (html) {
                        const span = document.createElement('span');
                        span.innerHTML = html;
                        textNode.parentNode?.replaceChild(span, textNode);
                        break;
                    }
                }
            }
        }
    });
};

// Markierungen werden jetzt direkt in getFormattedDiffContent eingebaut
// Kein Watch-Handler mehr nötig

// Formatiere Diff-Content: Baue Content mit Markierungen direkt in HTML ein
const getFormattedDiffContent = computed(() => {
    if (!selectedChangeRequest.value) {
        return '';
    }
    
    // Wenn keine Diff-Lines vorhanden, rendere einfach den Content
    if (getContentDiffLines.value.length === 0) {
        return selectedChangeRequest.value.content || selectedChangeRequest.value.raw_content || '';
    }
    
    // Hole den neuen HTML-Content
    let htmlContent = selectedChangeRequest.value.content || selectedChangeRequest.value.raw_content || '';
    
    // Erstelle temporären Container um Plain-Text zu extrahieren
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Erstelle eine Map für schnellen Lookup
    const diffMap = new Map<string, any>();
    getContentDiffLines.value.forEach((diffLine) => {
        if (diffLine.type === 'added' && diffLine.newLine) {
            const key = diffLine.newLine.trim().toLowerCase();
            diffMap.set(key, { type: 'added', line: diffLine.newLine.trim() });
        } else if (diffLine.type === 'removed' && diffLine.oldLine) {
            const key = diffLine.oldLine.trim().toLowerCase();
            diffMap.set(key, { type: 'removed', line: diffLine.oldLine.trim() });
        } else if (diffLine.type === 'modified' && diffLine.newLine) {
            const key = diffLine.newLine.trim().toLowerCase();
            diffMap.set(key, { 
                type: 'modified', 
                line: diffLine.newLine.trim(),
                newParts: diffLine.newParts,
                oldParts: diffLine.oldParts
            });
        }
    });
    
    // Durchlaufe alle Diff-Lines und markiere im HTML-String
    getContentDiffLines.value.forEach((diffLine) => {
        if (diffLine.type === 'added' && diffLine.newLine) {
            const searchText = diffLine.newLine.trim();
            if (plainText.includes(searchText)) {
                // Ersetze Text im HTML - suche nach Text zwischen Tags
                const escapedSearch = escapeRegex(searchText);
                // Ersetze Text der zwischen > und < steht
                htmlContent = htmlContent.replace(
                    new RegExp(`(>)([^<]*?)(${escapedSearch})([^<]*?)(<)`, 'gi'),
                    (match, before, prefix, text, suffix, after) => {
                        // Prüfe ob bereits markiert
                        if (match.includes('text-green-400') || match.includes('text-red-400')) {
                            return match;
                        }
                        // Markiere den gesamten Text-Bereich
                        const fullText = prefix + text + suffix;
                        const marked = `<span class="text-green-400 underline decoration-green-400 bg-green-500/20 px-2 py-1 rounded inline-block my-1">${escapeHtml(fullText)}</span>`;
                        return before + marked + after;
                    }
                );
            }
        } else if (diffLine.type === 'removed' && diffLine.oldLine) {
            const searchText = diffLine.oldLine.trim();
            if (plainText.includes(searchText)) {
                const escapedSearch = escapeRegex(searchText);
                htmlContent = htmlContent.replace(
                    new RegExp(`(>)([^<]*?)(${escapedSearch})([^<]*?)(<)`, 'gi'),
                    (match, before, prefix, text, suffix, after) => {
                        if (match.includes('text-green-400') || match.includes('text-red-400')) {
                            return match;
                        }
                        const fullText = prefix + text + suffix;
                        const marked = `<span class="text-red-400 line-through decoration-red-400 bg-red-500/20 px-2 py-1 rounded inline-block my-1">${escapeHtml(fullText)}</span>`;
                        return before + marked + after;
                    }
                );
            } else {
                // Füge entfernte Zeile am Ende hinzu
                htmlContent += `<p class="text-red-400 line-through decoration-red-400 bg-red-500/20 px-2 py-1 rounded my-1">${escapeHtml(diffLine.oldLine)}</p>`;
            }
        } else if (diffLine.type === 'modified' && diffLine.newParts && diffLine.newLine) {
            const searchText = diffLine.newLine.trim();
            if (plainText.includes(searchText)) {
                // Baue HTML mit Markierungen für geänderte Teile
                let replacement = '';
                if (diffLine.newParts) {
                    diffLine.newParts.forEach((newPart: any) => {
                        if (newPart.type === 'added') {
                            replacement += `<span class="text-green-400 underline decoration-green-400 bg-green-500/20 px-1 rounded">${escapeHtml(newPart.text)}</span>`;
                        } else {
                            replacement += escapeHtml(newPart.text);
                        }
                    });
                }
                if (diffLine.oldParts) {
                    diffLine.oldParts.forEach((oldPart: any) => {
                        if (oldPart.type === 'removed') {
                            replacement += `<span class="text-red-400 line-through decoration-red-400 bg-red-500/20 px-1 rounded">${escapeHtml(oldPart.text)}</span>`;
                        }
                    });
                }
                
                // Ersetze im Content
                const escapedSearch = escapeRegex(searchText);
                htmlContent = htmlContent.replace(
                    new RegExp(`(>)([^<]*?)(${escapedSearch})([^<]*?)(<)`, 'gi'),
                    (match, before, prefix, text, suffix, after) => {
                        if (match.includes('text-green-400') || match.includes('text-red-400')) {
                            return match;
                        }
                        return before + replacement + after;
                    }
                );
            }
        }
    });
    
    return htmlContent;
});

// HTML-Escape-Funktion
const escapeHtml = (text: string) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Regex-Escape-Funktion
const escapeRegex = (text: string) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    try {
        return new Date(date).toLocaleString('de-DE');
    } catch {
        return date;
    }
};
</script>

<template>
    <Head title="Wiki Verwaltung" />
    
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Header -->
            <div class="mb-4 flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Wiki Verwaltung</h1>
                    <p class="text-muted-foreground">Verwalte Wiki-Artikel und Änderungsanträge</p>
                </div>
                <Dialog v-model:open="isCreateModalOpen">
                    <DialogTrigger as-child>
                        <button
                            class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                    Neuen Artikel erstellen
                        </button>
                    </DialogTrigger>
                    <DialogScrollContent class="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle class="text-2xl font-semibold">Neuen Artikel erstellen</DialogTitle>
                            <DialogDescription>
                                Erstelle einen neuen Wiki-Artikel mit Titel, Beschreibung und Inhalt.
                            </DialogDescription>
                        </DialogHeader>

                        <form @submit.prevent="submitCreate" class="space-y-6 mt-4">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">
                                        Titel *
                                    </label>
                                    <input
                                        v-model="form.title"
                                        type="text"
                                        required
                                        class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Artikel-Titel"
                                    />
            </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">
                                        Slug (URL)
                                    </label>
                                    <input
                                        v-model="form.slug"
                                        type="text"
                                        class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="wird automatisch generiert"
                                    />
                                    <p class="mt-1 text-xs text-muted-foreground">Wird automatisch aus dem Titel generiert, falls leer</p>
            </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">
                                        Beschreibung
                                    </label>
                                    <textarea
                                        v-model="form.description"
                                        rows="3"
                                        class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        placeholder="Kurze Beschreibung des Artikels"
                                    ></textarea>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div class="relative">
                                        <label class="block text-sm font-medium mb-2">
                                            Kategorie
                                        </label>
                                        <div class="relative">
                                            <input
                                                v-model="categoryInput"
                                                type="text"
                                                @focus="showCategoryDropdown = true"
                                                @blur="setTimeout(() => showCategoryDropdown = false, 200)"
                                                class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="Kategorie auswählen oder neu erstellen"
                                            />
                                            <svg 
                                                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                            
                                            <!-- Dropdown -->
                                            <div 
                                                v-if="showCategoryDropdown"
                                                class="absolute z-50 w-full mt-1 bg-background border border-sidebar-border/70 rounded-lg shadow-lg max-h-60 overflow-auto"
                                            >
                                                <template v-if="filteredCategories.length > 0">
                                                    <div 
                                                        v-for="category in filteredCategories" 
                                                        :key="category"
                                                        @mousedown.prevent="selectCategory(category)"
                                                        class="px-4 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                                                    >
                                                        <div class="flex items-center gap-2">
                                                            <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                            </svg>
                                                            <span class="text-sm">{{ category }}</span>
                                                        </div>
                                                    </div>
                                                </template>
                                                
                                                <!-- Neue Kategorie erstellen -->
                                                <div 
                                                    v-if="categoryInput.trim() && !filteredCategories.some(c => c.toLowerCase() === categoryInput.trim().toLowerCase())"
                                                    @mousedown.prevent="createNewCategory"
                                                    class="px-4 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                                                    :class="{ 'border-t border-sidebar-border/70': filteredCategories.length > 0 }"
                                                >
                                                    <div class="flex items-center gap-2 text-primary">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        <span class="text-sm font-medium">Neue Kategorie: "{{ categoryInput.trim() }}" erstellen</span>
                                                    </div>
                                                </div>
                                                
                                                <!-- Keine Kategorien gefunden -->
                                                <div 
                                                    v-if="filteredCategories.length === 0 && !categoryInput.trim()"
                                                    class="px-4 py-2 text-sm text-muted-foreground"
                                                >
                                                    Keine Kategorien vorhanden
                                                </div>
                                            </div>
                                        </div>
                                        <p class="mt-1 text-xs text-muted-foreground">
                                            {{ existingCategories.length }} Kategorie{{ existingCategories.length !== 1 ? 'n' : '' }} vorhanden
                                        </p>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-2">
                                            Reihenfolge
                                        </label>
                                        <div class="relative">
                                            <input
                                                v-model.number="form.order"
                                                type="number"
                                                min="0"
                                                step="1"
                                                class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="0"
                                            />
                                            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <button
                                                    type="button"
                                                    @click="form.order = (form.order || 0) + 1"
                                                    class="w-4 h-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    @click="form.order = Math.max(0, (form.order || 0) - 1)"
                                                    class="w-4 h-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p class="mt-1 text-xs text-muted-foreground">Niedrigere Zahlen erscheinen zuerst</p>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">
                                        Tags (kommagetrennt)
                                    </label>
                                    <input
                                        v-model="tagsInput"
                                        type="text"
                                        class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="tag1, tag2, tag3"
                                        @input="updateTags"
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">
                                        Inhalt *
                                    </label>
                                    <div class="border border-sidebar-border/70 rounded-lg overflow-hidden bg-background">
                                        <RichTextEditor
                                            v-model="form.content"
                                            :height="400"
                                        />
                                    </div>
                                </div>

                                <div class="flex items-center gap-2">
                                    <input
                                        v-model="form.published"
                                        type="checkbox"
                                        id="published"
                                        class="w-4 h-4 text-primary bg-background border-sidebar-border/70 rounded focus:ring-primary"
                                    />
                                    <label for="published" class="text-sm">
                                        Artikel veröffentlichen
                                    </label>
                                </div>
                            </div>

                            <DialogFooter>
                                <button
                                    type="button"
                                    @click="isCreateModalOpen = false"
                                    class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {{ form.processing ? 'Wird gespeichert...' : 'Erstellen' }}
                                </button>
                            </DialogFooter>
                        </form>
                    </DialogScrollContent>
                </Dialog>
            </div>

            <!-- Success Message -->
            <div v-if="$page.props.flash?.success" class="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6">
                <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-green-500">{{ $page.props.flash.success }}</p>
                </div>
            </div>

            <!-- Articles Table Card -->
            <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card">
                <div class="p-6">
                    <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Artikel Übersicht
                    </h2>

                    <div v-if="articles.length === 0" class="text-center py-12">
                        <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p class="text-muted-foreground text-lg">Keine Artikel gefunden.</p>
                        <button
                            @click="isCreateModalOpen = true"
                            class="mt-4 inline-block px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                        >
                            Ersten Artikel erstellen
                        </button>
                    </div>

                    <div v-else class="overflow-x-auto">
                <table class="w-full">
                            <thead>
                                <tr class="border-b border-sidebar-border/70">
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Titel</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Kategorie</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Autor</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Aufrufe</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Likes</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Aktionen</th>
                        </tr>
                    </thead>
                            <tbody class="divide-y divide-sidebar-border/70">
                                <tr v-for="article in articles" :key="article.id" class="hover:bg-muted/50 transition-colors">
                                    <td class="px-4 py-4">
                                        <div class="text-sm font-medium">{{ article.title }}</div>
                                        <div class="text-xs text-muted-foreground mt-1">{{ article.slug }}</div>
                            </td>
                                    <td class="px-4 py-4 text-sm">
                                        <span class="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-sm">
                                            {{ article.category || 'Keine Kategorie' }}
                                        </span>
                            </td>
                                    <td class="px-4 py-4">
                                <span
                                            :class="article.published 
                                                ? 'bg-green-500/10 text-green-500 border-green-500/50' 
                                                : 'bg-muted text-muted-foreground border-sidebar-border/70'"
                                            class="inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium"
                                >
                                    {{ article.published ? 'Veröffentlicht' : 'Entwurf' }}
                                </span>
                            </td>
                                    <td class="px-4 py-4 text-sm text-muted-foreground">
                                {{ article.author_name || 'Unbekannt' }}
                            </td>
                                    <td class="px-4 py-4 text-sm text-muted-foreground">
                                        {{ article.views || 0 }}
                            </td>
                                    <td class="px-4 py-4">
                                        <button
                                            @click="openLikesModal(article.id)"
                                            class="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                                            :disabled="!article.likes_count || article.likes_count === 0"
                                        >
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                            </svg>
                                            <span class="text-sm font-medium">{{ article.likes_count || 0 }}</span>
                                        </button>
                            </td>
                                    <td class="px-4 py-4">
                                        <div class="flex items-center gap-2">
                                <Link
                                    :href="wikiShow(article.slug).url"
                                    target="_blank"
                                                class="text-primary hover:text-primary/80 transition-colors"
                                                title="Ansehen"
                                >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                </Link>
                                <Link
                                    :href="editRoute(article.id).url"
                                                class="text-yellow-500 hover:text-yellow-600 transition-colors"
                                                title="Bearbeiten"
                                >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                </Link>
                                <button
                                    @click="togglePublish(article)"
                                                :class="article.published 
                                                    ? 'text-orange-500 hover:text-orange-600' 
                                                    : 'text-green-500 hover:text-green-600'"
                                                class="transition-colors"
                                                :title="article.published ? 'Verstecken' : 'Veröffentlichen'"
                                            >
                                                <svg v-if="article.published" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                </button>
                                <button
                                    @click="deleteArticle(article)"
                                                class="text-destructive hover:text-destructive/80 transition-colors"
                                                title="Löschen"
                                >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                </button>
                                        </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    </div>
                </div>
            </div>

            <!-- Change Requests Card -->
            <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-2xl font-semibold mb-2 flex items-center gap-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Änderungsanträge
                        </h2>
                        <p class="text-muted-foreground text-sm">Verwalte ausstehende Änderungsanträge für Wiki-Artikel</p>
                    </div>
                    <span v-if="pendingCount && pendingCount > 0" class="px-3 py-1 bg-red-500 rounded text-sm font-semibold text-white">
                        {{ pendingCount }} ausstehend
                    </span>
                </div>

                <!-- Change Requests List -->
                <div v-if="isLoadingChangeRequests" class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>

                <div v-else-if="changeRequests.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <p class="text-muted-foreground text-lg">Keine Änderungsanträge gefunden.</p>
                </div>

                <div v-else class="space-y-4">
                    <div
                        v-for="request in changeRequests"
                        :key="request.id"
                        class="bg-card rounded-lg border border-sidebar-border/70 p-6 hover:bg-muted/50 transition-colors"
                    >
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-xl font-semibold text-foreground mb-2">
                                    {{ request.title || 'Unbenannt' }}
                                </h3>
                                <div class="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {{ getRequestTypeLabel(request.request_type) }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {{ request.requester_name }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {{ formatDate(request.created_at) }}
                                    </span>
                                </div>
                            </div>
                            <span
                                :class="getStatusClass(request.status)"
                                class="px-3 py-1 text-xs rounded-lg font-semibold border"
                            >
                                {{ getStatusLabel(request.status) }}
                            </span>
                        </div>

                        <div v-if="request.article" class="mb-3">
                            <p class="text-sm text-muted-foreground">
                                Artikel:
                <Link
                                    :href="wikiShow(request.article.slug).url"
                                    target="_blank"
                                    class="text-primary hover:underline"
                                >
                                    {{ request.article.title }}
                                </Link>
                            </p>
                        </div>

                        <div class="flex gap-2">
                            <button
                                @click="openChangeRequestDetails(request.id)"
                                class="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm flex items-center gap-1"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Details
                            </button>
                            <template v-if="request.status === 'pending'">
                                <button
                                    @click="approveRequest(request)"
                                    class="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors text-sm flex items-center gap-1"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Genehmigen
                                </button>
                                <button
                                    @click="openRejectModal(request)"
                                    class="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors text-sm flex items-center gap-1"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Ablehnen
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <!-- Likes Modal -->
        <Dialog v-model:open="isLikesModalOpen">
            <DialogScrollContent class="max-w-2xl">
                <DialogHeader>
                    <DialogTitle class="text-2xl font-semibold flex items-center gap-2">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Likes Übersicht
                    </DialogTitle>
                    <DialogDescription>
                        Alle Benutzer, die diesen Artikel geliked haben
                    </DialogDescription>
                </DialogHeader>

                <div v-if="isLoadingLikes" class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>

                <div v-else-if="likes.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <p class="text-muted-foreground">Dieser Artikel hat noch keine Likes.</p>
                </div>

                <div v-else class="space-y-3 mt-4">
                    <div
                        v-for="like in likes"
                        :key="like.id"
                        class="flex items-center gap-4 p-4 rounded-lg border border-sidebar-border/70 bg-card hover:bg-muted/50 transition-colors"
                    >
                        <Avatar class="h-12 w-12 overflow-hidden rounded-full">
                            <AvatarImage
                                v-if="like.avatar"
                                :src="like.avatar"
                                :alt="getFullName(like)"
                            />
                            <AvatarFallback class="rounded-full bg-muted font-semibold text-foreground">
                                {{ getInitials(getFullName(like)) }}
                            </AvatarFallback>
                        </Avatar>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <p class="font-semibold text-sm">
                                    {{ getFullName(like) }}
                                </p>
                            </div>
                            <div class="flex flex-col gap-1 text-xs text-muted-foreground">
                                <div v-if="like.discord_name && like.discord_name !== getFullName(like)" class="flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C2.451 6.018 1.99 7.765 1.99 9.524c0 4.488 2.857 8.46 7.184 10.99a.076.076 0 0 0 .084-.028a15.94 15.94 0 0 0 1.226-1.994a.074.074 0 0 0-.041-.1a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.1c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028c4.327-2.53 7.183-6.502 7.183-10.99c0-1.76-.462-3.506-1.655-5.127a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                                    </svg>
                                    <span>{{ like.discord_name }}</span>
                                </div>
                                <div v-if="like.discord_identifier" class="flex items-center gap-1">
                                    <span class="font-mono text-xs">Discord ID: {{ like.discord_identifier }}</span>
                                </div>
                                <div class="text-xs text-muted-foreground/70">
                                    Geliked am {{ formatDate(like.created_at) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogScrollContent>
        </Dialog>

        <!-- Change Requests Modal -->
        <Dialog v-model:open="isChangeRequestsModalOpen">
            <DialogScrollContent class="max-w-4xl">
                <DialogHeader>
                    <DialogTitle class="text-2xl font-semibold flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    Änderungsanträge verwalten
                    </DialogTitle>
                    <DialogDescription>
                        Verwalte ausstehende Änderungsanträge für Wiki-Artikel
                    </DialogDescription>
                </DialogHeader>

                <div v-if="isLoadingChangeRequests" class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>

                <div v-else-if="changeRequests.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-muted-foreground">Keine Änderungsanträge gefunden.</p>
                </div>

                <div v-else class="space-y-4 mt-4">
                    <div
                        v-for="request in changeRequests"
                        :key="request.id"
                        class="p-4 rounded-lg border border-sidebar-border/70 bg-card hover:bg-muted/50 transition-colors"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold mb-2">
                                    {{ request.title || 'Unbenannt' }}
                                </h3>
                                <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {{ getRequestTypeLabel(request.request_type) }}
                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {{ request.requester_name }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {{ formatDate(request.created_at) }}
                                    </span>
                                </div>
                            </div>
                            <span
                                :class="getStatusClass(request.status)"
                                class="inline-flex items-center px-3 py-1 rounded-md border text-xs font-medium"
                            >
                                {{ getStatusLabel(request.status) }}
                            </span>
                        </div>

                        <div v-if="request.article" class="mb-3">
                            <p class="text-sm text-muted-foreground">
                                Artikel: 
                                <Link 
                                    :href="wikiShow(request.article.slug).url" 
                                    target="_blank" 
                                    class="text-primary hover:underline"
                                >
                                    {{ request.article.title }}
                </Link>
                            </p>
            </div>

                        <div class="flex gap-2">
                            <button
                                @click="openChangeRequestDetails(request.id)"
                                class="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm flex items-center gap-1"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Details
                            </button>
                            <template v-if="request.status === 'pending'">
                                <button
                                    @click="approveRequest(request)"
                                    class="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors text-sm flex items-center gap-1"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Genehmigen
                                </button>
                                <button
                                    @click="openRejectModal(request)"
                                    class="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors text-sm flex items-center gap-1"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Ablehnen
                                </button>
                            </template>
        </div>
    </div>
                </div>
            </DialogScrollContent>
        </Dialog>

        <!-- Reject Modal -->
        <Dialog v-model:open="showRejectModal">
            <DialogScrollContent class="max-w-2xl">
                <DialogHeader>
                    <DialogTitle class="text-xl font-semibold">Antrag ablehnen</DialogTitle>
                    <DialogDescription>
                        Bitte gib einen Grund für die Ablehnung an (mindestens 10 Zeichen)
                    </DialogDescription>
                </DialogHeader>

                <div class="mt-4 space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">
                            Ablehnungsgrund *
                        </label>
                        <textarea
                            v-model="rejectNotes"
                            rows="4"
                            class="w-full px-4 py-2 bg-background border border-sidebar-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Bitte gib einen Grund für die Ablehnung an..."
                        ></textarea>
                        <p class="mt-1 text-xs text-muted-foreground">
                            {{ rejectNotes.length }} / 10 Zeichen (mindestens 10 Zeichen erforderlich)
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <button
                        type="button"
                        @click="showRejectModal = false"
                        class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                    >
                        Abbrechen
                    </button>
                    <button
                        type="button"
                        @click="rejectRequest"
                        :disabled="!rejectNotes || rejectNotes.length < 10"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Ablehnen
                    </button>
                </DialogFooter>
            </DialogScrollContent>
        </Dialog>

        <!-- Change Request Details Modal -->
        <Dialog v-model:open="isChangeRequestDetailsModalOpen">
            <DialogScrollContent class="max-w-5xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle class="text-2xl font-semibold flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Änderungsantrag Details
                    </DialogTitle>
                    <DialogDescription>
                        Übersicht aller Änderungen im Vergleich zum Original-Artikel
                    </DialogDescription>
                </DialogHeader>

                <div v-if="isLoadingChangeRequestDetails" class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>

                <div v-else-if="!selectedChangeRequest" class="text-center py-12">
                    <p class="text-muted-foreground">Fehler beim Laden der Details.</p>
                </div>

                <div v-else class="space-y-6 mt-4">
                    <!-- Request Info -->
                    <div class="p-4 rounded-lg border border-sidebar-border/70 bg-card">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="text-lg font-semibold mb-2">{{ selectedChangeRequest.title || 'Unbenannt' }}</h3>
                                <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {{ getRequestTypeLabel(selectedChangeRequest.request_type) }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {{ selectedChangeRequest.requester_name }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {{ formatDate(selectedChangeRequest.created_at) }}
                                    </span>
                                </div>
                            </div>
                            <span
                                :class="getStatusClass(selectedChangeRequest.status)"
                                class="inline-flex items-center px-3 py-1 rounded-md border text-xs font-medium"
                            >
                                {{ getStatusLabel(selectedChangeRequest.status) }}
                            </span>
                        </div>
                    </div>

                    <!-- Field Comparisons -->
                    <div class="space-y-4">
                        <!-- Title Comparison -->
                        <div v-if="selectedChangeRequest.request_type === 'create' || (selectedChangeRequest.article && selectedChangeRequest.title !== selectedChangeRequest.article.title)" class="p-4 rounded-lg border border-sidebar-border/70 bg-card">
                            <h4 class="text-sm font-semibold mb-3 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10m-7 4h7" />
                                </svg>
                                Titel
                            </h4>
                            <div v-if="selectedChangeRequest.request_type === 'create'" class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                <p class="text-sm text-green-500 font-medium">Neu:</p>
                                <p class="text-sm">{{ selectedChangeRequest.title }}</p>
                            </div>
                            <div v-else class="space-y-2">
                                <div class="p-3 rounded bg-red-500/10 border border-red-500/50">
                                    <p class="text-xs text-red-500 font-medium mb-1">Alt:</p>
                                    <p class="text-sm">{{ selectedChangeRequest.article?.title || 'N/A' }}</p>
                                </div>
                                <div class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                    <p class="text-xs text-green-500 font-medium mb-1">Neu:</p>
                                    <p class="text-sm">{{ selectedChangeRequest.title }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Description Comparison -->
                        <div v-if="selectedChangeRequest.request_type === 'create' || (selectedChangeRequest.article && selectedChangeRequest.description !== selectedChangeRequest.article.description)" class="p-4 rounded-lg border border-sidebar-border/70 bg-card">
                            <h4 class="text-sm font-semibold mb-3 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Beschreibung
                            </h4>
                            <div v-if="selectedChangeRequest.request_type === 'create'" class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                <p class="text-sm text-green-500 font-medium mb-1">Neu:</p>
                                <p class="text-sm whitespace-pre-wrap">{{ selectedChangeRequest.description || 'Keine Beschreibung' }}</p>
                            </div>
                            <div v-else class="space-y-2">
                                <div class="p-3 rounded bg-red-500/10 border border-red-500/50">
                                    <p class="text-xs text-red-500 font-medium mb-1">Alt:</p>
                                    <p class="text-sm whitespace-pre-wrap">{{ selectedChangeRequest.article?.description || 'Keine Beschreibung' }}</p>
                                </div>
                                <div class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                    <p class="text-xs text-green-500 font-medium mb-1">Neu:</p>
                                    <p class="text-sm whitespace-pre-wrap">{{ selectedChangeRequest.description || 'Keine Beschreibung' }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Category Comparison -->
                        <div v-if="selectedChangeRequest.request_type === 'create' || (selectedChangeRequest.article && selectedChangeRequest.category !== selectedChangeRequest.article.category)" class="p-4 rounded-lg border border-sidebar-border/70 bg-card">
                            <h4 class="text-sm font-semibold mb-3 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Kategorie
                            </h4>
                            <div v-if="selectedChangeRequest.request_type === 'create'" class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                <p class="text-sm text-green-500 font-medium">Neu:</p>
                                <p class="text-sm">{{ selectedChangeRequest.category || 'Keine Kategorie' }}</p>
                            </div>
                            <div v-else class="space-y-2">
                                <div class="p-3 rounded bg-red-500/10 border border-red-500/50">
                                    <p class="text-xs text-red-500 font-medium mb-1">Alt:</p>
                                    <p class="text-sm">{{ selectedChangeRequest.article?.category || 'Keine Kategorie' }}</p>
                                </div>
                                <div class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                    <p class="text-xs text-green-500 font-medium mb-1">Neu:</p>
                                    <p class="text-sm">{{ selectedChangeRequest.category || 'Keine Kategorie' }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Content Comparison -->
                        <div class="p-4 rounded-lg border border-sidebar-border/70 bg-card">
                            <h4 class="text-sm font-semibold mb-3 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Inhalt
                            </h4>
                            <div v-if="selectedChangeRequest.request_type === 'create'" class="p-6 rounded-lg border border-sidebar-border/70 bg-background overflow-x-auto max-h-[600px] overflow-y-auto">
                                <div class="prose prose-invert dark:prose-invert max-w-none">
                                    <div v-html="selectedChangeRequest.content || selectedChangeRequest.raw_content || 'Kein Inhalt'" class="wiki-content break-words"></div>
                                </div>
                            </div>
                            <div v-else-if="getContentDiffLines.length > 0" class="space-y-2">
                                <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <div class="flex items-center gap-1">
                                        <div class="w-3 h-3 rounded bg-red-500/20 border border-red-500/50"></div>
                                        <span>Entfernt</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <div class="w-3 h-3 rounded bg-green-500/20 border border-green-500/50"></div>
                                        <span>Hinzugefügt</span>
                                    </div>
                                </div>
                                <div class="border border-sidebar-border/70 rounded-lg overflow-hidden bg-background">
                                    <div class="p-6 overflow-x-auto max-h-[600px] overflow-y-auto">
                                        <!-- Diff - HTML Content mit Markierungen -->
                                        <div class="prose prose-invert dark:prose-invert max-w-none">
                                            <div 
                                                class="wiki-content break-words"
                                                v-html="getFormattedDiffContent"
                                                ref="diffContentRef"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-3 rounded bg-red-500/10 border border-red-500/50">
                                    <p class="text-xs text-red-500 font-medium mb-2">Alt:</p>
                                    <div class="prose prose-sm dark:prose-invert max-w-none" v-html="selectedChangeRequest.article?.content || selectedChangeRequest.article?.raw_content || 'Kein Inhalt'"></div>
                                </div>
                                <div class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                    <p class="text-xs text-green-500 font-medium mb-2">Neu:</p>
                                    <div class="prose prose-sm dark:prose-invert max-w-none" v-html="selectedChangeRequest.content || selectedChangeRequest.raw_content || 'Kein Inhalt'"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Tags Comparison -->
                        <div v-if="selectedChangeRequest.request_type === 'create' || JSON.stringify(selectedChangeRequest.tags || []) !== JSON.stringify(selectedChangeRequest.article?.tags || [])" class="p-4 rounded-lg border border-sidebar-border/70 bg-card">
                            <h4 class="text-sm font-semibold mb-3 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Tags
                            </h4>
                            <div v-if="selectedChangeRequest.request_type === 'create'" class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                <p class="text-sm text-green-500 font-medium mb-2">Neu:</p>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in (selectedChangeRequest.tags || [])" :key="tag" class="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                                        {{ tag }}
                                    </span>
                                    <span v-if="!selectedChangeRequest.tags || selectedChangeRequest.tags.length === 0" class="text-sm text-muted-foreground">Keine Tags</span>
                                </div>
                            </div>
                            <div v-else class="space-y-2">
                                <div class="p-3 rounded bg-red-500/10 border border-red-500/50">
                                    <p class="text-xs text-red-500 font-medium mb-2">Alt:</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="tag in (selectedChangeRequest.article?.tags || [])" :key="tag" class="px-2 py-1 bg-red-500/20 text-red-500 rounded text-xs">
                                            {{ tag }}
                                        </span>
                                        <span v-if="!selectedChangeRequest.article?.tags || selectedChangeRequest.article.tags.length === 0" class="text-sm text-muted-foreground">Keine Tags</span>
                                    </div>
                                </div>
                                <div class="p-3 rounded bg-green-500/10 border border-green-500/50">
                                    <p class="text-xs text-green-500 font-medium mb-2">Neu:</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="tag in (selectedChangeRequest.tags || [])" :key="tag" class="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                                            {{ tag }}
                                        </span>
                                        <span v-if="!selectedChangeRequest.tags || selectedChangeRequest.tags.length === 0" class="text-sm text-muted-foreground">Keine Tags</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogScrollContent>
        </Dialog>
    </AppLayout>
</template>

<style scoped>
.wiki-content {
    color: #374151;
    line-height: 1.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
}

.dark .wiki-content {
    color: #e5e7eb;
}

.wiki-content :deep(h1),
.wiki-content :deep(h2),
.wiki-content :deep(h3),
.wiki-content :deep(h4),
.wiki-content :deep(h5),
.wiki-content :deep(h6) {
    color: #111827;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.dark .wiki-content :deep(h1),
.dark .wiki-content :deep(h2),
.dark .wiki-content :deep(h3),
.dark .wiki-content :deep(h4),
.dark .wiki-content :deep(h5),
.dark .wiki-content :deep(h6) {
    color: #f9fafb;
}

.wiki-content :deep(h1) {
    font-size: 2.5rem;
}

.wiki-content :deep(h2) {
    font-size: 2rem;
}

.wiki-content :deep(h3) {
    font-size: 1.5rem;
}

.wiki-content :deep(p) {
    margin-bottom: 1rem;
    color: #4b5563;
}

.dark .wiki-content :deep(p) {
    color: #d1d5db;
}

.wiki-content :deep(ul),
.wiki-content :deep(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
    color: #4b5563;
}

.dark .wiki-content :deep(ul),
.dark .wiki-content :deep(ol) {
    color: #d1d5db;
}

.wiki-content :deep(li) {
    margin: 0.5rem 0;
}

.wiki-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
}

.wiki-content :deep(a) {
    color: #3b82f6;
    text-decoration: underline;
}

.wiki-content :deep(a:hover) {
    color: #60a5fa;
}

.wiki-content :deep(blockquote) {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #6b7280;
}

.dark .wiki-content :deep(blockquote) {
    color: #9ca3af;
}

.wiki-content :deep(code) {
    background-color: #e8e4df;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    color: #111827;
}

.dark .wiki-content :deep(code) {
    background-color: #374151;
    color: #fbbf24;
}

.wiki-content :deep(pre) {
    background-color: #f0ede8;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid #d4cfc8;
}

.dark .wiki-content :deep(pre) {
    background-color: #1f2937;
    border-color: #374151;
}

.wiki-content :deep(pre code) {
    background-color: transparent;
    padding: 0;
    color: #111827;
}

.dark .wiki-content :deep(pre code) {
    color: #e5e7eb;
}

.wiki-content :deep(hr) {
    border: none;
    border-top: 2px solid #d4cfc8;
    margin: 2rem 0;
}

.dark .wiki-content :deep(hr) {
    border-top-color: #4b5563;
}

.wiki-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}

.wiki-content :deep(table th),
.wiki-content :deep(table td) {
    border: 1px solid #d4cfc8;
    padding: 0.75rem;
    text-align: left;
}

.dark .wiki-content :deep(table th),
.dark .wiki-content :deep(table td) {
    border-color: #4b5563;
}

.wiki-content :deep(table th) {
    background-color: #ebe8e3;
    font-weight: bold;
    color: #111827;
}

.dark .wiki-content :deep(table th) {
    background-color: #374151;
    color: #f9fafb;
}

/* Custom Scrollbar Styles */
.overflow-y-auto::-webkit-scrollbar,
.overflow-x-auto::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track,
.overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb,
.overflow-x-auto::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 4px;
    transition: background 0.2s ease;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover,
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb,
.dark .overflow-x-auto::-webkit-scrollbar-thumb {
    background: rgba(75, 85, 99, 0.5);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover,
.dark .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(75, 85, 99, 0.7);
}

/* Firefox Scrollbar */
.overflow-y-auto,
.overflow-x-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

.dark .overflow-y-auto,
.dark .overflow-x-auto {
    scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
}
</style>
