<template>
    <div class="w-full mt-8">
        <div class="bg-[#2d2d2d] rounded-lg p-4 border border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-white stevie-sans-bold">Interaktive Karte</h3>
                <div class="flex gap-2">
                    <button
                        @click="toggleTestMode"
                        class="px-3 py-1.5 bg-yellow-600/80 hover:bg-yellow-600 text-white text-sm rounded transition-colors"
                        :class="{ 'bg-yellow-600': testMode }"
                    >
                        {{ testMode ? 'Test-Modus: AN' : 'Test-Modus: AUS' }}
                    </button>
                </div>
            </div>
            
            <!-- Test Mode Info -->
            <div v-if="testMode" class="mb-4 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded text-sm text-yellow-200">
                <p class="font-semibold mb-1">📋 Test-Modus aktiv</p>
                <p class="text-xs mb-1">• Linksklick: Blip setzen</p>
                <p class="text-xs mb-1">• Rechtsklick + Ziehen: Karte verschieben</p>
                <p class="text-xs">• Mausrad: Zoomen</p>
            </div>
            
            <!-- Map Container -->
            <div 
                class="relative w-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-600"
                ref="mapContainer"
                @click="handleMapClick"
                @mousemove="handleMouseMove"
                @wheel.prevent="handleWheel"
                @mousedown="startPan"
                @mouseup="endPan"
                @mouseleave="endPan"
                @contextmenu.prevent="handleContextMenu"
                :class="{ 
                    'cursor-grab': !isPanning && !testMode, 
                    'cursor-grabbing': isPanning, 
                    'cursor-crosshair': testMode && !isPanning,
                    'cursor-grabbing': testMode && isPanning
                }"
            >
                <!-- Zoomed and Panned Map Container -->
                <div 
                    class="relative w-full h-full"
                    :style="{
                        transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                        transformOrigin: '0 0',
                        height: mapHeight + 'px',
                        transition: isPanning ? 'none' : 'transform 0.05s ease-out'
                    }"
                    ref="mapContent"
                >
                    <img 
                        :src="mapImage" 
                        alt="Red Dead Redemption 2 Map" 
                        class="w-full h-full object-contain select-none pointer-events-none"
                        draggable="false"
                        @load="onMapLoad"
                    />
                    
                    <!-- Fixed Blips (from config) -->
                    <div 
                        v-for="(blip, index) in fixedBlips" 
                        :key="'fixed-' + index"
                        class="absolute cursor-pointer z-20"
                        :style="{
                            left: blip.x + '%',
                            top: blip.y + '%',
                            transform: 'translate(-50%, -50%)'
                        }"
                        @click.stop="showFixedBlipInfo(blip)"
                    >
                        <div class="relative">
                            <!-- Fixed Blip Icon (different style) -->
                            <div 
                                class="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                                :class="{
                                    'bg-red-500': blip.type === 'location',
                                    'bg-blue-500': blip.type === 'shop',
                                    'bg-green-500': blip.type === 'mission',
                                    'bg-yellow-500': blip.type === 'other'
                                }"
                            >
                                <div class="w-full h-full rounded-full bg-white/40"></div>
                            </div>
                            <!-- Fixed Blip Label -->
                            <div 
                                v-if="blip.label"
                                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap pointer-events-none border border-white/30"
                            >
                                {{ blip.label }}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Test Blips (temporary) -->
                    <div 
                        v-for="(blip, index) in testBlips" 
                        :key="'test-' + index"
                        class="absolute cursor-pointer z-30"
                        :style="{
                            left: blip.x + '%',
                            top: blip.y + '%',
                            transform: 'translate(-50%, -50%)'
                        }"
                        @click.stop="selectTestBlip(index)"
                        @contextmenu.prevent="removeTestBlip(index)"
                    >
                        <div class="relative">
                            <!-- Test Blip Icon (pulsing animation) -->
                            <div 
                                class="w-6 h-6 rounded-full border-2 border-yellow-400 shadow-lg bg-yellow-500/80 animate-pulse"
                            >
                                <div class="w-full h-full rounded-full bg-white/50"></div>
                            </div>
                            <!-- Test Blip Label -->
                            <div 
                                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-yellow-600/90 text-white text-xs rounded whitespace-nowrap pointer-events-none font-semibold"
                            >
                                {{ blip.label || `Test ${index + 1}` }}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cursor Crosshair (in test mode) -->
                    <div 
                        v-if="testMode && showCursor"
                        class="absolute pointer-events-none z-40"
                        :style="{
                            left: cursorX + '%',
                            top: cursorY + '%',
                            transform: 'translate(-50%, -50%)'
                        }"
                    >
                        <div class="w-4 h-4 border-2 border-yellow-400 rounded-full bg-yellow-400/20"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-yellow-400"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-4 bg-yellow-400"></div>
                    </div>
                </div>
                
                <!-- Coordinates Display (Test Mode) -->
                <div 
                    v-if="testMode"
                    class="absolute bottom-4 left-4 bg-black/95 text-white p-3 rounded-lg border border-yellow-600/50 min-w-[280px] z-50"
                >
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-semibold text-yellow-400">Koordinaten</h4>
                        <button @click="clearTestBlips" class="text-gray-400 hover:text-white text-xs">
                            Alle löschen
                        </button>
                    </div>
                    <div class="space-y-2 text-xs">
                        <div>
                            <span class="text-gray-400">X:</span>
                            <span class="ml-2 font-mono">{{ currentCoords.x.toFixed(2) }}%</span>
                        </div>
                        <div>
                            <span class="text-gray-400">Y:</span>
                            <span class="ml-2 font-mono">{{ currentCoords.y.toFixed(2) }}%</span>
                        </div>
                        <div v-if="testBlips.length > 0" class="mt-3 pt-2 border-t border-gray-600">
                            <div class="text-gray-400 mb-1">Test-Blips ({{ testBlips.length }}):</div>
                            <div class="max-h-32 overflow-y-auto space-y-1">
                                <div 
                                    v-for="(blip, index) in testBlips" 
                                    :key="index"
                                    class="flex justify-between items-center p-1 bg-gray-800/50 rounded"
                                >
                                    <span class="text-xs">{{ blip.label || `Blip ${index + 1}` }}</span>
                                    <button 
                                        @click="copyCoordinates(blip)"
                                        class="text-yellow-400 hover:text-yellow-300 text-xs"
                                        title="Koordinaten kopieren"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            @click="exportAllCoordinates"
                            v-if="testBlips.length > 0"
                            class="w-full mt-2 px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs transition-colors"
                        >
                            Alle Koordinaten exportieren
                        </button>
                    </div>
                </div>
                
                <!-- Zoom Controls -->
                <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <div class="flex flex-col gap-1 bg-black/80 rounded-lg p-1 border border-gray-700">
                        <button
                            @click="zoomIn"
                            class="px-3 py-2 bg-gray-700/80 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                            title="Vergrößern"
                        >
                            +
                        </button>
                        <div class="px-3 py-1 text-white text-xs text-center bg-gray-800/80 rounded">
                            {{ Math.round(zoomLevel * 100) }}%
                        </div>
                        <button
                            @click="zoomOut"
                            class="px-3 py-2 bg-gray-700/80 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                            title="Verkleinern"
                        >
                            −
                        </button>
                        <button
                            @click="resetZoom"
                            class="px-3 py-1 bg-gray-700/80 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                            title="Zoom zurücksetzen"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Export Modal -->
            <div 
                v-if="showExportModal"
                class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                @click.self="showExportModal = false"
            >
                <div class="bg-[#2d2d2d] rounded-lg p-6 max-w-2xl w-full mx-4 border border-gray-600">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold text-white">Koordinaten exportieren</h3>
                        <button @click="showExportModal = false" class="text-gray-400 hover:text-white">
                            ✕
                        </button>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm text-gray-400 mb-2 block">Format:</label>
                            <select v-model="exportFormat" class="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-sm text-white">
                                <option value="json">JSON</option>
                                <option value="lua">Lua Table</option>
                                <option value="js">JavaScript Array</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm text-gray-400 mb-2 block">Koordinaten:</label>
                            <textarea
                                v-model="exportedData"
                                readonly
                                class="w-full h-64 px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-sm text-white font-mono"
                            ></textarea>
                        </div>
                        <div class="flex gap-2">
                            <button
                                @click="copyExportedData"
                                class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                            >
                                Kopieren
                            </button>
                            <button
                                @click="showExportModal = false"
                                class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                            >
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import mapImageSrc from '@/Assets/images/rdr2.svg'

// Props für feste Blips (können von außen gesetzt werden)
const props = defineProps({
    fixedBlipsConfig: {
        type: Array,
        default: () => []
    }
})

const mapImage = mapImageSrc
const mapContainer = ref(null)
const mapContent = ref(null)
const mapHeight = ref(600)

// Test Mode
const testMode = ref(false)
const testBlips = ref([])
const showCursor = ref(false)
const currentCoords = ref({ x: 0, y: 0 })

// Fixed Blips (from config)
const fixedBlips = computed(() => props.fixedBlipsConfig || [])

// Zoom & Pan States
const zoomLevel = ref(1)
const minZoom = 0.25
const maxZoom = 10
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const panStartX = ref(0)
const panStartY = ref(0)
const panStartPanX = ref(0)
const panStartPanY = ref(0)

// Export Modal
const showExportModal = ref(false)
const exportFormat = ref('json')
const exportedData = ref('')

const onMapLoad = (event) => {
    const img = event.target
    if (img.naturalWidth && img.naturalHeight) {
        const aspectRatio = img.naturalHeight / img.naturalWidth
        const containerWidth = mapContainer.value?.clientWidth || 800
        mapHeight.value = containerWidth * aspectRatio
    }
    // Begrenze die Verschiebung nach dem Laden
    setTimeout(() => constrainPan(), 100)
}

// Berechne Koordinaten relativ zur Karte
const getMapCoordinates = (clientX, clientY) => {
    if (!mapContainer.value || !mapContent.value) return { x: 0, y: 0 }
    
    const containerRect = mapContainer.value.getBoundingClientRect()
    const contentRect = mapContent.value.getBoundingClientRect()
    
    // Berechne Position relativ zur gezoomten/verschobenen Karte
    const relativeX = (clientX - contentRect.left - panX.value) / (contentRect.width / zoomLevel.value)
    const relativeY = (clientY - contentRect.top - panY.value) / (contentRect.height / zoomLevel.value)
    
    // Konvertiere zu Prozent
    const x = (relativeX / contentRect.width) * 100 * zoomLevel.value
    const y = (relativeY / contentRect.height) * 100 * zoomLevel.value
    
    return {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
    }
}

// Berechne Pan-Grenzen, damit die Karte immer sichtbar bleibt
const constrainPan = () => {
    if (!mapContainer.value || !mapContent.value) return
    
    const containerRect = mapContainer.value.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height
    
    // Berechne die skalierte Größe der Karte
    const scaledWidth = containerWidth * zoomLevel.value
    const scaledHeight = mapHeight.value * zoomLevel.value
    
    // Berechne die maximalen Verschiebungen
    // Die Karte sollte nicht weiter verschoben werden, als dass sie noch sichtbar ist
    const maxPanX = 0 // Nach rechts: nicht weiter als 0
    const minPanX = containerWidth - scaledWidth // Nach links: nicht weiter als die Differenz
    const maxPanY = 0 // Nach unten: nicht weiter als 0
    const minPanY = containerHeight - scaledHeight // Nach oben: nicht weiter als die Differenz
    
    // Wenn die Karte kleiner als der Container ist, zentriere sie
    if (scaledWidth <= containerWidth) {
        panX.value = (containerWidth - scaledWidth) / 2
    } else {
        panX.value = Math.max(minPanX, Math.min(maxPanX, panX.value))
    }
    
    if (scaledHeight <= containerHeight) {
        panY.value = (containerHeight - scaledHeight) / 2
    } else {
        panY.value = Math.max(minPanY, Math.min(maxPanY, panY.value))
    }
}

const handleMouseMove = (event) => {
    if (!mapContainer.value || !mapContent.value) return
    
    // Wenn Panning aktiv ist, handle Panning (funktioniert mit Links- und Rechtsklick)
    if (isPanning.value) {
        const deltaX = event.clientX - panStartX.value
        const deltaY = event.clientY - panStartY.value
        panX.value = panStartPanX.value + deltaX
        panY.value = panStartPanY.value + deltaY
        
        // Begrenze die Verschiebung
        constrainPan()
        return
    }
    
    // Update Koordinaten im Test-Modus (nur wenn nicht am Pannen)
    if (testMode.value) {
        const coords = getMapCoordinates(event.clientX, event.clientY)
        currentCoords.value = coords
        showCursor.value = true
    }
}

const handleMapClick = (event) => {
    // Verhindere Klick während Panning
    if (isPanning.value) return
    
    if (!testMode.value) return
    
    if (!mapContainer.value || !mapContent.value) return
    
    const coords = getMapCoordinates(event.clientX, event.clientY)
    
    // Füge Test-Blip hinzu
    testBlips.value.push({
        x: coords.x,
        y: coords.y,
        label: `Test ${testBlips.value.length + 1}`,
        type: 'test'
    })
}

const handleWheel = (event) => {
    if (!mapContainer.value || !mapContent.value) return
    
    event.preventDefault()
    
    // Google Maps-ähnliches Zoom-Verhalten
    const zoomFactor = 0.1
    const delta = event.deltaY > 0 ? -zoomFactor : zoomFactor
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel.value * (1 + delta)))
    
    if (newZoom !== zoomLevel.value) {
        // Zoom zum Mauszeiger (wie Google Maps)
        const rect = mapContainer.value.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        
        // Berechne die Position relativ zur Karte vor dem Zoom
        const scale = newZoom / zoomLevel.value
        
        // Zoom zum Mauszeiger
        panX.value = mouseX - (mouseX - panX.value) * scale
        panY.value = mouseY - (mouseY - panY.value) * scale
        
        zoomLevel.value = newZoom
        
        // Begrenze die Verschiebung nach dem Zoom
        constrainPan()
    }
}

// Pan Functions (Google Maps-ähnlich)
const startPan = (event) => {
    // Im Test-Modus: Rechtsklick (button 2) = Panning, Linksklick (button 0) = Blip setzen
    if (testMode.value) {
        if (event.button === 2) {
            // Rechtsklick = Panning starten
            isPanning.value = true
            panStartX.value = event.clientX
            panStartY.value = event.clientY
            panStartPanX.value = panX.value
            panStartPanY.value = panY.value
            event.preventDefault() // Verhindere Kontextmenü
        }
        // Linksklick wird für Blip-Setzung verwendet, kein Panning
        return
    }
    
    // Außerhalb des Test-Modus: Linksklick = Panning
    if (event.button !== 0) return
    
    isPanning.value = true
    panStartX.value = event.clientX
    panStartY.value = event.clientY
    panStartPanX.value = panX.value
    panStartPanY.value = panY.value
}

// Kontextmenü-Handler
const handleContextMenu = (event) => {
    // Im Test-Modus: Verhindere Kontextmenü, da Rechtsklick für Panning verwendet wird
    if (testMode.value) {
        event.preventDefault()
    }
}

const endPan = () => {
    isPanning.value = false
}

// Zoom Functions
const zoomIn = () => {
    if (zoomLevel.value < maxZoom) {
        const newZoom = Math.min(maxZoom, zoomLevel.value * 1.5)
        zoomLevel.value = newZoom
        constrainPan()
    }
}

const zoomOut = () => {
    if (zoomLevel.value > minZoom) {
        const newZoom = Math.max(minZoom, zoomLevel.value / 1.5)
        zoomLevel.value = newZoom
        constrainPan()
    }
}

const resetZoom = () => {
    zoomLevel.value = 1
    panX.value = 0
    panY.value = 0
    constrainPan()
}

// Test Mode Functions
const toggleTestMode = () => {
    testMode.value = !testMode.value
    if (!testMode.value) {
        testBlips.value = []
        showCursor.value = false
    }
}

const selectTestBlip = (index) => {
    // Zeige Info oder erlaube Bearbeitung
    const blip = testBlips.value[index]
    copyCoordinates(blip)
}

const removeTestBlip = (index) => {
    testBlips.value.splice(index, 1)
}

const clearTestBlips = () => {
    if (confirm('Möchten Sie wirklich alle Test-Blips entfernen?')) {
        testBlips.value = []
    }
}

const copyCoordinates = (blip) => {
    const text = `{ x: ${blip.x.toFixed(2)}, y: ${blip.y.toFixed(2)}, label: "${blip.label || ''}" }`
    navigator.clipboard.writeText(text).then(() => {
        alert('Koordinaten kopiert!')
    })
}

const exportAllCoordinates = () => {
    if (testBlips.value.length === 0) return
    
    let data = ''
    
    if (exportFormat.value === 'json') {
        data = JSON.stringify(testBlips.value.map(b => ({
            x: parseFloat(b.x.toFixed(2)),
            y: parseFloat(b.y.toFixed(2)),
            label: b.label || '',
            type: b.type || 'test'
        })), null, 2)
    } else if (exportFormat.value === 'lua') {
        data = 'local blips = {\n'
        testBlips.value.forEach((blip, index) => {
            data += `    { x = ${blip.x.toFixed(2)}, y = ${blip.y.toFixed(2)}, label = "${blip.label || ''}", type = "${blip.type || 'test'}" }`
            if (index < testBlips.value.length - 1) data += ','
            data += '\n'
        })
        data += '}'
    } else if (exportFormat.value === 'js') {
        data = 'const blips = [\n'
        testBlips.value.forEach((blip, index) => {
            data += `    { x: ${blip.x.toFixed(2)}, y: ${blip.y.toFixed(2)}, label: "${blip.label || ''}", type: "${blip.type || 'test'}" }`
            if (index < testBlips.value.length - 1) data += ','
            data += '\n'
        })
        data += ']'
    }
    
    exportedData.value = data
    showExportModal.value = true
}

const copyExportedData = () => {
    navigator.clipboard.writeText(exportedData.value).then(() => {
        alert('Daten kopiert!')
    })
}

const showFixedBlipInfo = (blip) => {
    const info = `Fester Blip: ${blip.label || 'Unbenannt'}\nKoordinaten: X: ${blip.x.toFixed(2)}%, Y: ${blip.y.toFixed(2)}%`
    alert(info)
}

// Window resize handler
const handleResize = () => {
    if (mapContainer.value) {
        const img = mapContainer.value.querySelector('img')
        if (img && img.naturalWidth && img.naturalHeight) {
            const aspectRatio = img.naturalHeight / img.naturalWidth
            const containerWidth = mapContainer.value.clientWidth
            mapHeight.value = containerWidth * aspectRatio
        }
    }
    // Begrenze die Verschiebung nach Größenänderung
    constrainPan()
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.map-container {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.map-container img {
    pointer-events: none;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
