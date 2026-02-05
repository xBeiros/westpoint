<template>
    <Head :title="rulebook.title" />
    
    <div class="min-h-screen w-full">
        <NavBar />
        
        <!-- Hero Section -->
        <div class="relative py-10 sm:px-6 lg:px-8">
            <div class="max-w-7xl w-full mx-auto px-4">
                <!-- Desktop: Side Navigation + Content -->
                <div class="flex gap-8">
                    <!-- Sticky Sidebar Navigation -->
                    <aside class="hidden lg:block w-72 flex-shrink-0">
                        <div class="sticky top-24">
                            <!-- Search Bar -->
                            <div class="mb-6">
                                <div class="relative">
                                    <input 
                                        v-model="searchQuery"
                                        type="text" 
                                        placeholder="Regeln durchsuchen..."
                                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                                    >
                                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Progress Bar -->
                            <div class="mb-6">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fortschritt</span>
                                    <span class="text-xs font-bold text-red-500">{{ Math.round(readingProgress) }}%</span>
                                </div>
                                <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div 
                                        class="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                                        :style="{ width: readingProgress + '%' }"
                                    ></div>
                                </div>
                            </div>

                            <!-- Navigation Header -->
                            <h3 class="text-lg font-bold text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Inhaltsverzeichnis
                            </h3>

                            <!-- Navigation Items -->
                            <nav class="space-y-1 max-h-[500px] md:max-h-[600px] lg:max-h-[700px] overflow-y-auto custom-scrollbar">
                                <div v-if="searchQuery && filteredNavigation.length === 0" class="px-4 py-3 text-center text-gray-500 text-sm">
                                    Keine Ergebnisse gefunden
                                </div>
                                <a 
                                    v-for="item in filteredNavigation" 
                                    :key="item.id"
                                    @click="scrollToSection(item.id)"
                                    :class="[
                                        'group block px-4 py-3 text-sm rounded-lg transition-all duration-200 cursor-pointer border-l-2',
                                        activeSection === item.id 
                                            ? 'bg-gradient-to-r from-red-500/20 to-transparent text-red-500 border-red-500 font-semibold' 
                                            : highlightedSections.includes(item.id) && searchQuery
                                            ? 'bg-gradient-to-r from-yellow-500/10 to-transparent text-yellow-400 border-yellow-500' 
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-transparent'
                                    ]"
                                >
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center flex-1">
                                            <span class="truncate">{{ item.title }}</span>
                                            <!-- Match Badge -->
                                            <span v-if="item.matchType === 'title'" class="ml-2 px-2 py-0.5 text-xs font-bold bg-red-500/20 text-red-400 rounded">
                                                Titel
                                            </span>
                                            <span v-if="item.matchType === 'content'" class="ml-2 px-2 py-0.5 text-xs font-bold bg-yellow-500/20 text-yellow-400 rounded">
                                                Inhalt
                                            </span>
                                        </div>
                                        <svg v-if="activeSection === item.id" class="ml-2 w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </a>
                            </nav>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <div class="flex-1 max-w-5xl content-wrapper">
                        <!-- Back Button -->
                        <div class="mb-8">
                            <Link 
                                :href="rulebookIndex.url()"
                                class="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
                            >
                                <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Zurück zum Regelwerk
                            </Link>
                        </div>

                        <!-- Title -->
                        <div class="text-left mb-12">
                            <div class="flex items-center mb-6">
                                <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg mr-4">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h1 class="text-4xl md:text-5xl font-bold text-white uppercase">
                                    {{ rulebook.title }}
                                </h1>
                            </div>
                        </div>

                <!-- Rulebook Content -->
                <div class="mb-12 px-4" id="rulebook-content-container" ref="contentContainer">
                    <div class="rulebook-content" v-html="rulebook.content"></div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <Footer />
    <ScrollToTop />
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import NavBar from "@/components/NavBar.vue"
import Footer from "@/components/Footer.vue"
import ScrollToTop from "@/components/ScrollToTop.vue"
import { computed, onMounted, nextTick, ref, watch, onUnmounted } from 'vue'
import { index as rulebookIndex } from "@/routes/rulebook"

// Regelwerke Daten
const rulebooksData = {
    hauptregelwerk: {
        id: 1,
        slug: 'hauptregelwerk',
        title: 'Hauptregelwerk',
        content: `
            <div class="rulebook-section">
                <div class="rule-section">
                    <h3 class="rule-section-title">§1 Allgemeine Regeln</h3>
                    <p>Auf dem Server herrscht eine Clip pflicht, ohne Clip auch kein Supportfall.</p>
                    <ul class="rule-list">
                        <li>Mit dem Beitritt auf Berlin City stimmst du zu dass deine Stimme in jedem Stream und Aufnahme verwendet werden darf.</li>
                        <li>Berlin City ist ab 16 Jahren spielbar.</li>
                        <li>Streamer müssen ein Ticket eröffnen und die Streamer Rolle beantragen.</li>
                        <li>Mit dem Beitritt des Servers bestätigst du dass Ic Regelwerk und Fraktionsregelwerk gelesen zu haben.</li>
                        <li>Eigenwerbung sowie Fremdwerbung ist strengstens untersagt, außer wenn man die Streaming Rolle besitzt.</li>
                        <li>Das Ausnutzen von Bugs/Glitches ist strengstens verboten. Diese sollen mit sofortiger Wirkung dem Support vorgelegt werden. Sollte dies nicht passieren, wird dies je nach Bugschwere mit Warns bis hin zu Ban bestraft. (Darunter zählt das Ausnutzen von Dupingmöglichkeiten)</li>
                        <li>Das Benutzen von Exploits/Scripts und oder Mods ist verboten. Ebenso die Doppelbelegung eines Keybinds, z.B. Medikit & Weste. Ebenso, Tracers, NoBusch, NoProbs etc. Derartige Verstöße werden mit Strafen bis hin zu einem permanenten Community Ausschluss geahndet.</li>
                        <li>IC ist das sexuelle Belästigen, Erniedrigen und Demütigen verboten. Über die Sexualität darf nicht geurteilt werden. Obszöne Äußerungen gegenüber Frauen werden mit einem direkten Ban bestraft.</li>
                        <li>Jegliche mit Echtgeld erworbene Items/Gegenstände (bspw. Case Gutscheine) dürfen unter keinen Umständen von einem Spieler entzogen werden. Es ist untersagt, Echtgeldhandel zu betreiben. Diese Items/Gegenstände durch Betrug oder arglistige Täuschungen (Scam) zu erhalten ist nicht gestattet!</li>
                        <li>Paycheck Farming ist bei uns strengstens untersagt und wird mit einem Kick sowie Warn bestraft.</li>
                        <li>Schütze dein Leben, dein Leben ist dein höchstes Gut.</li>
                        <li>Das Ausnutzen von Grauzonen wird vom Server Team sehr hart bestraft.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.1 Allgemeines Roleplay</h3>
                    <ul class="rule-list">
                        <li><strong>Random Deathmatch (RDM)</strong><br>Das sinnlose Beginnen eines Konfliktes was mit dem Ingame Tot endet ist strengstens untersagt.</li>
                        <li><strong>Vehicle Deathmatch (VDM)</strong><br>Das absichtliche Überfahren von Spielern ist strengstens untersagt.</li>
                        <li><strong>Fail-Rp</strong><br>Unrealistische oder lebensbedrohliche Handlungen gelten als Fail-RP. Alle Aktionen müssen zu jeder Zeit realitätsnah sein. Das Funkschießen sowie übertriebenes Speedboosten sind verboten. Ausnahme: In RP-freien Zonen wie FFA und Gangwar sind diese Moves erlaubt. Verstöße werden geahndet.</li>
                        <li><strong>Power-Rp</strong><br>Handlungen, die dem Gegenüber keine Möglichkeit zur Gegenwehr lassen, gelten als Power-RP und sind verboten! Jeder muss die Chance haben, sich zu wehren. Ein Blood-Out ist von dieser Regel ausgeschlossen.</li>
                        <li><strong>Meta- Gaming</strong><br>Informationen, die außerhalb des Roleplays erlangt wurden (z. B. durch externe Plattformen), dürfen im RP nicht verwendet werden. Als Meta Gaming zählt auch das Zusammensitzen im Talk wenn man Gemeinsam Ingame ist.</li>
                        <li><strong>Medic-Rp</strong><br>Das Medic-RP muss ausgespielt werden. Bei Fragen nach der Ursache der Bewusstlosigkeit darf nicht gelogen werden (z. B. nicht „Ich bin nur gestolpert" nach einem Schusswechsel). Der Medic muss nicht jede Person behandeln wenn er diese für Tot erklärt.</li>
                        <li><strong>Rp-Flucht</strong><br>Das Ausloggen während einer aktiven RP-Situation ist verboten und wird bestraft. Nach einer RP-Situation muss man mindestens 10 Minuten online bleiben. Flucht in Apartments oder Safezones gilt ebenfalls als RP-Flucht.</li>
                        <li><strong>Vergewaltigungs- Rp</strong><br>Das ausspielen von Vergewaltigungen sowie das missbrauchen einer Frau ist strengstens untersagt und wird mit einem sofortigen Bann bestraft. Es ist untersagt Personen dazu zu zwingen zu twerken oder sich auszuziehen die Person darf nicht erschossen werden wenn sie diese Dinge nicht tut.</li>
                        <li><strong>Backseatgaming</strong><br>Anweisungen von Personen, die sich nicht auf dem Server befinden, dürfen nicht befolgt werden.</li>
                        <li><strong>OOC Talk</strong><br>Auf das Regelwerk hinzuweisen gilt als OOC-Talk und ist verboten. Beispiel: „Das steht aber so und so in der Bibel". Jeglicher OOC Talk ist IC zu unterlassen und kann bei nichteinhaltung mit einem WARN bestraft werden. Trenne immer IC und OOC.</li>
                        <li><strong>Todeszonen</strong><br>In folgenden Zonen benötigt ihr keinen Schusscall: Bundespolizei, SG, Lootdrop, Gangwar, FFA, Routen, Familien Anwesen, Schwarzgeldwäsche, Räube (Wenn die Verhandlung gescheitert ist).</li>
                        <li><strong>Lootdrop</strong><br>Alles was beim Lootdrop passiert darf nicht mit ins RP genommen werden. Alle Fraktionen dürfen am Lootdrop teilnehmen, auch die Staatlichen. In der Zone sind nur Pistolen erlaubt und keine Langwaffen. Driveby ist in der Zone erlaubt. Das Teamen unter den Fraktionen ist verboten. Das schießen ist nur in der Lootdrop Zone erlaubt. Im Lootdrop darf niemand ausgenommen werden. Ist ein Lootdrop beendet so ist das schießen einzustellen und das Gebiet zu verlassen.</li>

                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.2 Charakter</h3>
                    <ul class="rule-list">
                        <li>Jeder Spieler muss einen authentischen RP-Charakter erstellen.</li>
                        <li>Der Charaktername muss realistisch sein (Vor- & Nachname).</li>
                        <li>Nachnamen von berühmten Persönlichkeiten sind ebenfalls verboten.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.3 New-Life</h3>
                    <ul class="rule-list">
                        <li>Sobald du von einem Mediziner hochgeholt wirst, kannst du dich an alles erinnern.</li>
                        <li>Blutest du aus, kannst du dich an die letzten 30 min vor deiner Bewusstlosigkeit nicht erinnern, was passiert ist.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.4 Saltychat</h3>
                    <ul class="rule-list">
                        <li>Gute Qualität ohne Rauschen oder störende Hintergrundgeräusche.</li>
                        <li>Ausnahme: Unvermeidbare Störungen wie Kleinkinder oder Haustiere.</li>
                        <li>Soundboard ist erlaubt solange keine beleidigen Sounds abgespielt werden oder Sounds die nicht zu der Situation passen.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.5 Maskierung</h3>
                    <ul class="rule-list">
                        <li>Vollmaskierte Personen dürfen nicht anhand ihrer Stimme erkannt werden. Dein ganzes Gesicht muss bedeckt sein. Als Vollmaskierung zählt NICHT Bandana, Hut oder Brille.</li>
                        <li>Eine Vollmaskierte Person darf nur erkannt werden wenn sie sich mit vollem Namen vorstellt.</li>
                        <li>Stimmverzerrer ist nur mit einer Vollmaskierung erlaubt.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.6 Safezonen</h3>
                    <ul class="rule-list">
                        <li>In einer Safezonen dürfen keine Leute als Geisel genommen werden.</li>
                        <li>In einer Safezone ist das Schießen verboten.</li>
                        <li>Als Safezone zählt: Würfelpark, Krankenhaus, Beach Club Paradies, Einreiseamt, Tattoo Studios, Schönheitsklinik, Taxi Unternehmen.</li>
                        <li>Bei einer aktiven Schießerei ist es verboten in die Safezone zu flüchten.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.7 Leichenschändung</h3>
                    <p>Leichenschändung ist bei uns verboten, darunter zählt:</p>
                    <ul class="rule-list">
                        <li>Das Anpinkeln von Personen</li>
                        <li>Das Ankacken von Personen</li>
                        <li>Trash Talken währenddessen die Person liegt</li>
                        <li>Treten</li>
                        <li>Überfahren</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.8 Bewusstlosigkeit</h3>
                    <ul class="rule-list">
                        <li>Bewusstlose oder AFK-Personen dürfen nicht gefesselt oder durchsucht werden.</li>
                        <li>Bewusstlose Spieler dürfen nicht sprechen, auch nicht, wenn der Medic sie anspricht.</li>
                        <li>Bewusstlose Spieler dürfen nicht ausgeraubt werden.</li>
                        <li>Während der Bewusstlosigkeit ist es untersagt F8 Quit zu machen.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.9 Zivile Gruppen</h3>
                    <ul class="rule-list">
                        <li>Es dürfen nur 5 Zivis zusammen agieren</li>
                        <li>Bei einer Aktion müssen alle 3 gleiche Merkmale an haben (Beispiel: Hose, Torso, Maske)</li>
                        <li>Zivilisten dürfen keine Routen pushen</li>
                        <li>Nur Zivilisten dürfen auf die Westen Route und diese an die Fraktionen verkaufen.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.10 Helme</h3>
                    <ul class="rule-list">
                        <li>Polizei-Helme nur bei Spezialeinsätzen (Staatsbank-Raub, Razzia).</li>
                        <li>Illegale & legale Gruppen dürfen keine Helme in Schießereien nutzen.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.11 Paycheck- Farming</h3>
                    <p>Paycheck-Farming ist verboten, bei Verstoß muss der Spieler mit einem sofortigen kick rechnen.</p>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.12 Raubüberfälle</h3>
                    <ul class="rule-list">
                        <li>Raub ist erlaubt, solange er nicht übertrieben wird.</li>
                        <li>Verboten: Diebstahl von Cases & Container.</li>
                        <li>Staatsfraktionswaffen dürfen nicht entwendet werden, aber alles andere (z. B. Medi-Kits, Nahrung, Munition, Handys) ist erlaubt.</li>
                        <li>Dauerhaftes oder mehrfaches Ausrauben derselben Person ist verboten.</li>
                        <li>Mitarbeiter dürfen nicht ohne RP-Grund direkt angegriffen oder verletzt werden. Die Polizei muss eine faire Reaktionszeit erhalten, bevor der Raub beendet wird.</li>
                        <li>Bei Geiselnahmen darf für eine gewöhnliche Geisel maximal 15.000$ Lösegeld verlangt werden. Handelt es sich um eine hochrangige Person, beträgt das maximale Lösegeld 20.000$.</li>
                        <li>Bei jedem großen Raub wie Staatsbank, Paleto Bank, Bank, Juwelier, muss die Partei die ausraubt, mindestens 10 min vor Ort bleiben.</li>
                        <li>Nach einem Raubüberfall darf die Fraktion in den nächsten 15 min aufs Anwesen flüchten.</li>
                        <li><strong>Geisel die mindestens beim Raub sein müssen:</strong><br>Juwelier: 5<br>Staatsbank: 5<br>Bank: 3<br>Ladenraub: 1<br>Human Labs: 5<br>Die maximale Anzahl an Geiseln beträgt 8.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.13 Regelwerk Änderungen</h3>
                    <ul class="rule-list">
                        <li>Regeln können sich jederzeit ändern.</li>
                        <li>Jeder Spieler ist selbst verantwortlich, sich über Änderungen im Discord zu informieren.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.14 Geiselnahmen</h3>
                    <ul class="rule-list">
                        <li>Spiele die Geiselnahme richtig aus.</li>
                        <li>Bei einer Geiselnahme darfst du der Person alles abnehmen, bis auf Cases, erworbene Sachen aus dem Coin Shop, Essen und Trinken.</li>
                        <li>Den staatlichen dürfen keine Dienstwaffen abgenommen werden.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.15 Grundlagen des Roleplays</h3>
                    <ul class="rule-list">
                        <li>Spaß & RP stehen im Vordergrund!</li>
                        <li>Erstelle einen individuellen Charakter mit Hintergrundgeschichte.</li>
                        <li>Je besser dein Charakter ausgearbeitet ist, desto besser dein RP-Erlebnis.</li>
                        <li>Sei offen für Situationen und nicht egoistisch. Gewinnen & Verlieren gehören dazu!</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.16 Waffengebrauch</h3>
                    <ul class="rule-list">
                        <li>Die Polizei darf die Sniper bei folgenden Einsätzen benutzen: Staatsbank, Razzia, Geiselnahmen mit hohem Risiko.</li>
                        <li>Es ist absolut verboten, Staatliche Waffen zu entnehmen oder weiter zu verkaufen.</li>
                    </ul>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§1.17 Support</h3>
                    <ul class="rule-list">
                        <li>In einem Supportfall ist der Stream oder die Aufnahme stumm zu schalten.</li>
                        <li>Die Supporter haben das letzte Wort und darüber wird nicht diskutiert.</li>
                        <li>Beleidigungen sowie Belästigungen im Support sind verboten.</li>
                        <li>Jede Art von Trolling im Support wird mit einem Bann bestraft.</li>
                    </ul>
                </div>
            </div>
        `
    },
    fraktionsregelwerk: {
        id: 2,
        slug: 'fraktionsregelwerk',
        title: 'Fraktionsregelwerk',
        content: `
            <div class="rulebook-section"> 
                <div class="rule-section">
                    <h3 class="rule-section-title">§1 Allgemeines Fraktionsregelwerk</h3>
                    
                    <div class="subsection">
                        <h4 class="subsection-title">§1.1 Gründung</h4>
                        <p>Um eine Fraktion zu gründen, muss ein Konzept bei der Fraktionsverwaltung eingereicht werden.</p>
                        <ul class="rule-list">
                            <li>Mindestens 5 Spieler müssen in der Fraktion sein.</li>
                            <li>Der Fraktionsleiter muss mindestens 16 Jahre alt sein und über die nötige geistige Reife verfügen.</li>
                            <li>Roleplay Erfahrung besitzen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.2 Fraktionsverwaltung</h4>
                        <ul class="rule-list">
                            <li>Die Fraktionsverwaltung hat das letzte Wort.</li>
                            <li>Die Fraktionsverwaltung ist dazu berechtigt, bei Regelverstößen die Fraktionen abzumahnen oder sogar aufzulösen.</li>
                            <li>Bedenkt, dass die Fraktionsverwaltung nicht für private Konflikte zuständig ist und sich somit nicht einschaltet.</li>
                            <li>Die Fraktionsverwaltung ist dazu berechtigt, eine Fraktions Analyse bei der jeweiligen Fraktion anzuordnen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.3 Fraktionsgröße</h4>
                        <ul class="rule-list">
                            <li>Die maximale Mitgliederzahl beträgt 25. Agieren dürft ihr zu 20.</li>
                            <li>Bei einer Razzia oder einem Baseraid dürfen die kompletten 25 Member agieren.</li>
                            <li>Wird die Fraktion Anzahl überschritten, bekommt die Fraktion einen Warn.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.4 Fraktionssperre</h4>
                        <ul class="rule-list">
                            <li>Von Staatlich zu Staatlich = 2 Tage</li>
                            <li>Von Staatlich zu Bad Frak = 3 Tage</li>
                            <li>Von Bad Frak zu Bad Frak = 3 Tage</li>
                            <li>Von Unternehmen zu Unternehmen = 2 Tage</li>
                        </ul>
                        <p>Die Sperre kann auch aus einem guten Grund bei der Fraktionsverwaltung entfernt werden lassen. (Mit einem guten Grund)</p>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.5 Konzept</h4>
                        <ul class="rule-list">
                            <li>Jede Fraktion hat sich an sein Konzept zu halten und dies im Roleplay bestmöglich auszuspielen.</li>
                            <li>Ein Kartell oder Mafia läuft nicht rum, als wären sie von einer Gang oder reden wie einer von der Gang.</li>
                            <li>Eine Gang kleidet sich nicht wie eine Mafia und redet auch nicht so.</li>
                            <li>Fraktionen, die sich nicht an ihr Konzept halten, bekommen einen Fraktions-Warn oder eine Auflösung.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.6 Fraktionskleidung</h4>
                        <ul class="rule-list">
                            <li>Als Fraktion müsst ihr mindestens 3 Erkennungsmerkmale tragen: Torso, Hose, Weste.</li>
                            <li>Was nicht als Erkennungsmerkmal zählt: Armband, Haare, Schuhe, Maske, Rucksack.</li>
                            <li>Bei Raubüberfällen dürfen andere Verkleidungen getragen werden, die aber identisch sein müssen. (Beispiel: Bauarbeiter, Affen, u.s.w)</li>
                            <li>Die Fraktionskleidung darf nur die sein, die ihr in eurem Konzept aufgelistet habt.</li>
                            <li>Bei Änderung der Kleidung müsst ihr dies bei der Fraktionsverwaltung beantragen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.7 Fahrzeuge</h4>
                        <ul class="rule-list">
                            <li>Bei Familien Aktionen müssen die Fraktionsfahrzeuge genutzt werden (Beispiel: Krieg, Schießerei oder Befreiung eines Kollegen aus dem SG)</li>
                            <li>Das erneute Ausparken von einem Fahrzeug bei einer Schießerei ist verboten.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.8 Fraktionslager & Fraktionskasse</h4>
                        <ul class="rule-list">
                            <li>Es ist verboten, beim Verlassen der Fraktion das Lager oder die Fraktionskasse leer zu räumen, bei Verstoß erhält der Spieler einen Bann und ein Inventar Clear.</li>
                            <li>Die Fraktionskasse darf nicht als eigene Bereicherung genutzt werden.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.9 Sicario</h4>
                        <ul class="rule-list">
                            <li>Sicarios sind mit einem RP-Hintergrund erlaubt.</li>
                            <li>Jede Familie darf pro Woche 2 Sicario durchführen.</li>
                            <li>Es ist nicht gestattet, ein Sicario zu nutzen, um eine Fraktionssperre zu umgehen.</li>
                            <li>Ein Sicario muss bei der Fraktionsverwaltung angemeldet werden.</li>
                            <li>Ein Sicario muss mit der Fraktion gut geplant und durchdacht werden.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.10 Stürmungen Staatlicher Fraktionen</h4>
                        <p>Von der Stürmung sind folgende Fraktionen ausgeschlossen:</p>
                        <ul class="rule-list">
                            <li>Krankenhaus Berlin</li>
                            <li>Mechaniker</li>
                            <li>Regierung</li>
                            <li>Unternehmen</li>
                            <li>Einreiseamt</li>
                        </ul>
                        <ul class="rule-list">
                            <li>Die Bundespolizei und die Landespolizei dürfen nur gestürmt werden, wenn mindestens 5 Personen von der Fraktion vor Ort eingeschlossen sind.</li>
                            <li>Die Fraktionen dürfen nur 2x pro Restart die Polizei Stürmen.</li>
                            <li>Versucht erstmal andere Methoden, bevor ihr zur Waffe greift.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.11 Extra Regelungen</h4>
                        <ul class="rule-list">
                            <li>Jede Staatsfraktion darf bei einem Einsatz maximal einen Helikopter einsetzen (Ausnahme: Krankenhaus Berlin). Ein Helikopter darf erst dann feuern, wenn er selbst unter Beschuss steht. Nur ein Helikopter pro Einsatz und Staatsfraktion ist erlaubt. Wird der Helikopter zerstört, darf kein neuer Helikopter eingesetzt werden. Der Helikopter darf nicht neu besetzt werden. Wenn im Helikopter drei Personen sind und einer stirbt, darf niemand nachrücken.</li>
                            <li>Staatsfraktionen müssen sich bei ihren Einsätzen eindeutig als Polizisten oder Mediziner zu erkennen geben (außer die Regierung).</li>
                            <li>Bad Fraks dürfen beim Fight oder Raub nur 1x Heli benutzen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.12 Terrorstatus</h4>
                        <ul class="rule-list">
                            <li>Ein Terrorstatus wird ausgerufen, wenn eine Fraktion wiederholt negativ gegenüber den Staatsfraktionen auffällt.</li>
                            <li>Der Antrag auf einen Terrorstatus muss über die Fraktionsverwaltung im Fraktionsdiscord gestellt werden und gilt für 48 Stunden. Der Terrorstatus wird durch die Fraktionsverwaltung ausgerufen.</li>
                            <li>Während eines Terrorstatus dürfen die Staatsfraktionen als permanente Aggressoren handeln.</li>
                            <li>Diese Regelungen gelten ausschließlich für die Fraktion, gegen die der Terrorstatus ausgerufen wurde.</li>
                            <li>Während des Terrorstatus haben sich Zivilisten und andere Personen daraus zu halten.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.13 Forderungen</h4>
                        <ul class="rule-list">
                            <li>Die maximale Forderung beträgt derzeit 3 Waffen oder $300.000. Diese Grenze wird regelmäßig an die aktuelle Wirtschaftslage angepasst. (Eine Forderung darf erst nach mehreren erfolglosen Versuchen der Eintreibung gestellt werden.)</li>
                            <li>Bis zur Klärung, ob eine Forderung bezahlt wird oder nicht, darf die Partei, die die Forderung stellt, keine weiteren Aktionen durchführen.</li>
                            <li>Forderungen müssen der Fraktion persönlich übermittelt werden.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.14 Baseraid</h4>
                        <ul class="rule-list">
                            <li>Ein Baseraid darf erst ausgeführt werden, wenn von der eigenen Familie mindestens 10 Leute beteiligt sind.</li>
                            <li>Beim Baseraid gilt danach eine Pause von 30 min.</li>
                            <li>Während eines Baseraid darf kein Trashtalk betrieben werden.</li>
                            <li>Die Fraktion die angegriffen wird, darf mit den vollen 25 Mitgliedern agieren. Für die Partei die Angreift gilt die normale Regelung (§1.3)</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.15 Kriegsverträge</h4>
                        <ul class="rule-list">
                            <li>Ein Kriegsvertrag wird mit Continentel angefertigt.</li>
                            <li>Der Kriegsvertrag gilt erst wenn dies von Continentel bestätigt wurde (Sie kommen auf euch zu)</li>
                            <li>Die beteiligten Familien dürfen sich die Regeln selber ausdenken und besprechen, was dann auf einem Google Docs Dokument festgehalten wird.</li>
                            <li>Solange der Kriegsvertrag nicht abgesegnet ist herrscht zwischen den Fraktionen stillstand.</li>
                            <li>Beide Fraktionen müssen den Kriegsvertrag unterschreiben sonst ist der Kriegsvertrag ungültig.</li>
                            <li>Weigert sich die Familie, die aufgefordert wird, auf einen Kriegsvertrag diesen einzugehen verliert diese die Route um die es geht und geht an die andere Fraktion.</li>
                            <li>Während eines Kriegvertrages dürfen die jeweiligen Fraktionen kein Bündnis mit anderen Familien eingehen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.16 Routen</h4>
                        <ul class="rule-list">
                            <li>Wenn Fraktion A eine Route übernimmt, steht diese Route 7 Tage unter Routen Schutz. Fraktionen dürfen diese dann nicht angreifen.</li>
                            <li>Wenn Fraktion B die Route von Fraktion A beanspruchen möchte, muss dies Fraktion A klar kommuniziert werden.</li>
                            <li>Staatliche Fraktionen dürfen die Routen nur 2x mal pro Restart stürmen. (Außer wenn diese unter dem Routen schutz steht)</li>
                            <li>Zivilisten dürfen die Routen nicht angreifen und die Leute auch nicht ausnehmen.</li>
                            <li>Fraktionen dürfen nur 1 Route besitzen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.17 Drittpartei</h4>
                        <ul class="rule-list">
                            <li>Es ist strengstens verboten, dass sich zwei Fraktionen oder Gruppierungen ohne vorherigen Antrag zusammenschließen, um gemeinsam zu agieren. Ebenso ist es nicht gestattet, sich in einen laufenden Konflikt zwischen zwei Fraktionen einzumischen.</li>
                            <li>Wenn eine Staatsfraktion gegen zwei andere Parteien kämpft und diese sich verteidigen, zählt dies nicht als Drittpartei.</li>
                            <li>Das Einmischen in laufende RP-Situationen wird als „Ninja Roleplay" bezeichnet und ist untersagt.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.18 Aufbauschutz</h4>
                        <ul class="rule-list">
                            <li>Bei der Gründung einer Fraktion kann ein Aufbauschutz von 7 Tagen beantragt werden.</li>
                            <li>Dieser Schutz entfällt, sobald die Fraktion als Aggressor auftritt (Räube ausgenommen).</li>
                            <li>Neu gegründete Fraktionen können entscheiden, ob sie den Aufbauschutz haben möchten. (Wurde eine Entscheidung getroffen, ist diese nicht mehr änderbar!)</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.19 Blood In - Blood Out</h4>
                        <ul class="rule-list">
                            <li>Ein Blood-In ist Voraussetzung für einen Blood-Out.</li>
                            <li>Die Führung einer illegalen Fraktion hat das Recht, ein Mitglied durch einen Blood-Out aus der Fraktion zu entfernen. Bei einem Blood-Out verliert der Spieler alle Erinnerungen an seine Zeit in der Fraktion und an die dort gemachten Erlebnisse. Nach dem Blood-Out sind RP-Handlungen gegen die Fraktion verboten. „Jemand hat mir erzählt" oder „Ich hatte einen Zettel in meiner Tasche" zählen nicht als gültige Gründe.</li>
                            <li>Ein Blood-Out ist abgeschlossen, sobald die betroffene Person ausgeblutet ist und der Blood Out muss der Person vorher klar kommuniziert werden ( „Das ist dein Blood Out")</li>
                            <li>Wird eine Person vor einem Blood-Out durch andere Fraktionsmitglieder informiert, hat sie die Möglichkeit, vor der Vollstreckung zu fliehen.</li>
                            <li>Die Flucht muss im Support angekündigt und ein separates Ticket erstellt werden, um die Spielzeit des Spielers zu dokumentieren.</li>
                            <li>Für die Durchführung eines Blood-Outs hat die Fraktion 72 Stunden Zeit. Sollte die betroffene Person sich in dieser Zeit nicht im RP befinden, verlängert sich die Frist entsprechend. Dies wird im Zweifelsfall durch den Support überprüft.</li>
                            <li>Während der Flucht entfallen alle Safezones für den Flüchtenden.</li>
                            <li>Der Flüchtende darf sich keinem Schutz bei anderen Fraktionen suchen. Sollte die Flucht jedoch erfolgreich sein, behält der Flüchtende alle Erinnerungen und darf nicht erneut einen Blood-Out von der Fraktion erhalten.</li>
                            <li>Ein Flüchtender darf sich bei anderen Fraktionen keinen Schutz suchen, es sei denn, dies erfolgt durch ein Sicario.</li>
                            <li>Der Spieler muss mindestens in den 3 Tagen 1 mal Online sein für mindestens 2 Stunden.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§1.20 Bündnisse</h4>
                        <ul class="rule-list">
                            <li>Bündnisse müssen bei der Continentel beantragt werden und erfordern einen RP-Hintergrund.</li>
                            <li>Die Fraktionsverwaltung entscheidet über die Art und Dauer des Bündnisses (z. B. Angriff oder Verteidigung).</li>
                            <li>Nach Abschluss eines Bündnisses kann dieses frühestens 2 Woche später wieder beantragt werden.</li>
                        </ul>
                    </div>
                </div>

                <div class="rule-section">
                    <h3 class="rule-section-title">§2 Legale Fraktionen</h3>
                    
                    <div class="subsection">
                        <h4 class="subsection-title">§2.1 Haftzeiten & Bußgelder</h4>
                        <ul class="rule-list">
                            <li>Maximale Untersuchungshaft beträgt 30 Minuten. Alles darüber muss abgezogen werden!</li>
                            <li>Maximale Haftzeit: 60 Minuten (Mit Staatsanwalt 80 min).</li>
                            <li>Maximales Bußgeld: 75.000$ (Mit Staatsanwalt 125.000$)</li>
                            <li>Rechtsanwälte dürfen bis zu 20 Hafteinheiten runtergehen.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§2.2 Korruption</h4>
                        <ul class="rule-list">
                            <li>Korruption mit Informationen ist erlaubt.</li>
                            <li>Korruption mit Waffen oder Gegenständen ist verboten. (dazu zählt auch das Sammeln, verarbeiten und Verkaufen Illegaler Substanzen)</li>
                            <li>Fraktionsleiter dürfen nicht korrupt sein.</li>
                            <li>Bei handfesten Beweisen für Korruption darf ein Beamter sofort entlassen werden</li>
                            <li>Fraktionen dürfen die Polizei schmieren.</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§2.3 Razzia</h4>
                        <ul class="rule-list">
                            <li>Staatliche Fraktionen dürfen 2x pro Restart eine Razzia durchführen.</li>
                            <li>Eine Razzia muss bei der Regierung angemeldet und bestätigt werden.</li>
                            <li>Bei einer Razzia darf nur 1 Helikopter verwendet werden.</li>
                            <li>Bei einer Razzia muss die Polizei im nach hinein die Fraktion auf klären weshalb es diese Razzia gibt.</li>
                            <li>Die Regierung oder die Fraktionsverwaltung holt bei Erfolg der Razzia die hälfte des Bestands aus dem lager und übergibt dies der Polizei</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§2.4 Waffen und Helme</h4>
                        <p>Helme und Langwaffen sind bei folgenden Situation erlaubt:</p>
                        <ul class="rule-list">
                            <li>Staatsbank</li>
                            <li>Human Labs Raub</li>
                            <li>Juwelier</li>
                            <li>Razzia</li>
                        </ul>
                        <p>Helme darf nur die Spezialeinheit tragen!</p>
                    </div>

                    <div class="subsection">
                        <h4 class="subsection-title">§2.5 Staatliche Ausrauben</h4>
                        <ul class="rule-list">
                            <li>Executivbehörden dürfen keine Staatswaffen und Staatszubehör abgenommen werden (Munition und andere Zivile Gegenständen dürfen abgenommen werden)</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
}

const props = defineProps({
    slug: String
})

const contentContainer = ref(null)
const searchQuery = ref('')
const activeSection = ref('')
const readingProgress = ref(0)
const highlightedSections = ref([])

// Das aktuelle Regelwerk basierend auf dem Slug bestimmen
const rulebook = computed(() => {
    return rulebooksData[props.slug] || rulebooksData.hauptregelwerk
})

// Gefilterte Navigation basierend auf Suche - erweitert für Inhaltsdurchsuchung
const filteredNavigation = computed(() => {
    if (!searchQuery.value) {
        highlightedSections.value = []
        return navigationItems.value
    }
    
    const query = searchQuery.value.toLowerCase()
    const results = []
    const highlights = []
    
    navigationItems.value.forEach(item => {
        // Titel durchsuchen
        if (item.title.toLowerCase().includes(query)) {
            results.push({ ...item, matchType: 'title' })
            return
        }
        
        // Inhalt durchsuchen
        const sectionElement = document.querySelector(`[data-section="${item.id}"]`)
        if (sectionElement) {
            const sectionText = sectionElement.textContent.toLowerCase()
            if (sectionText.includes(query)) {
                results.push({ ...item, matchType: 'content' })
                highlights.push(item.id)
            }
        }
    })
    
    highlightedSections.value = highlights
    return results
})

// Navigation Items für die Sidebar
const navigationItems = computed(() => {
    if (props.slug === 'hauptregelwerk') {
        return [
            { id: 'section-1', title: '§1 Allgemeine Regeln' },
            { id: 'section-1-1', title: '§1.1 Allgemeines Roleplay' },
            { id: 'section-1-2', title: '§1.2 Charakter' },
            { id: 'section-1-3', title: '§1.3 New-Life' },
            { id: 'section-1-4', title: '§1.4 Saltychat' },
            { id: 'section-1-5', title: '§1.5 Maskierung' },  
            { id: 'section-1-6', title: '§1.6 Safezonen' },
            { id: 'section-1-7', title: '§1.7 Leichenschändung' },
            { id: 'section-1-8', title: '§1.8 Bewusstlosigkeit' },
            { id: 'section-1-9', title: '§1.9 Zivile Gruppen' },
            { id: 'section-1-10', title: '§1.10 Helme' },
            { id: 'section-1-11', title: '§1.11 Paycheck Farming' },
            { id: 'section-1-12', title: '§1.12 Raubüberfälle' },
            { id: 'section-1-13', title: '§1.13 Regelwerk Änderungen' },
            { id: 'section-1-14', title: '§1.14 Geiselnahmen' },
            { id: 'section-1-15', title: '§1.15 Grundlagen des Roleplays' },
            { id: 'section-1-16', title: '§1.16 Waffengebrauch' },
            { id: 'section-1-17', title: '§1.17 Support' },
        ]
    } else if (props.slug === 'fraktionsregelwerk') {
        return [
            { id: 'section-1', title: '§1 Allgemeines Fraktionsregelwerk' },
            { id: 'section-1-1', title: '§1.1 Gründung' },
            { id: 'section-1-2', title: '§1.2 Fraktionsverwaltung' },
            { id: 'section-1-3', title: '§1.3 Fraktionsgröße' },
            { id: 'section-1-4', title: '§1.4 Fraktionssperre' },
            { id: 'section-1-5', title: '§1.5 Konzept' },
            { id: 'section-1-6', title: '§1.6 Fraktionskleidung' },
            { id: 'section-1-7', title: '§1.7 Fahrzeuge' },
            { id: 'section-1-8', title: '§1.8 Fraktionslager & Fraktionskasse' },
            { id: 'section-1-9', title: '§1.9 Sicario' },
            { id: 'section-1-10', title: '§1.10 Stürmungen Staatlicher Fraktionen' },
            { id: 'section-1-11', title: '§1.11 Extra Regelungen' },
            { id: 'section-1-12', title: '§1.12 Terrorstatus' },
            { id: 'section-1-13', title: '§1.13 Forderungen' },
            { id: 'section-1-14', title: '§1.14 Baseraid' },
            { id: 'section-1-15', title: '§1.15 Kriegsverträge' },
            { id: 'section-1-16', title: '§1.16 Routen' },
            { id: 'section-1-17', title: '§1.17 Drittpartei' },
            { id: 'section-1-18', title: '§1.18 Aufbauschutz' },
            { id: 'section-1-19', title: '§1.19 Blood In - Blood Out' },
            { id: 'section-1-20', title: '§1.20 Bündnisse' },
            { id: 'section-2', title: '§2 Legale Fraktionen' },
            { id: 'section-2-1', title: '§2.1 Haftzeiten & Bußgelder' },
            { id: 'section-2-2', title: '§2.2 Korruption' },
            { id: 'section-2-3', title: '§2.3 Razzia' },
            { id: 'section-2-4', title: '§2.4 Waffen und Helme' },
            { id: 'section-2-5', title: '§2.5 Staatliche Ausrauben' },
        ]
    }
    return []
})

// Funktion zum Scrollen zu einem Abschnitt
const scrollToSection = (sectionId) => {
    // Warte kurz, damit die IDs gesetzt sind
    setTimeout(() => {
        const element = document.getElementById(sectionId) || document.querySelector(`#${sectionId}`) || document.querySelector(`[data-section="${sectionId}"]`)
        if (element) {
            const offset = 140 // Offset für sticky header
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }, 100)
}

// IDs nach dem Rendern zuweisen
const assignSectionIds = () => {
    nextTick(() => {
        if (!contentContainer.value) return
        
        // IDs dynamisch zu den Sections im Content hinzufügen
        const sections = document.querySelectorAll('.rule-section')
        sections.forEach((section) => {
            const titleElement = section.querySelector('h3')
            if (titleElement && titleElement.textContent) {
                const sectionNumber = titleElement.textContent.match(/§\d+(\.\d+)?/)?.[0]
                if (sectionNumber) {
                    const sectionId = sectionNumber.replace(/§/, '').replace(/\./g, '-')
                    section.setAttribute('id', `section-${sectionId}`)
                    section.setAttribute('data-section', `section-${sectionId}`)
                }
            }
        })
        
        // Subsections auch IDs geben
        const subsections = document.querySelectorAll('.subsection')
        subsections.forEach((subsection) => {
            const titleElement = subsection.querySelector('h4')
            if (titleElement && titleElement.textContent) {
                const sectionNumber = titleElement.textContent.match(/§\d+(\.\d+)?/)?.[0]
                if (sectionNumber) {
                    const sectionId = sectionNumber.replace(/§/, '').replace(/\./g, '-')
                    subsection.setAttribute('id', `section-${sectionId}`)
                    subsection.setAttribute('data-section', `section-${sectionId}`)
                }
            }
        })
    })
}

// Wenn der Content sich ändert, IDs neu zuweisen
watch(() => rulebook.value, () => {
    assignSectionIds()
})

// Watch für Suchquery, um Highlights hinzuzufügen
watch(() => searchQuery.value, () => {
    nextTick(() => {
        // Entferne alte Highlights
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.classList.remove('search-highlight')
        })
        
        // Füge neue Highlights hinzu
        if (searchQuery.value && highlightedSections.value.length > 0) {
            highlightedSections.value.forEach(sectionId => {
                const element = document.querySelector(`[data-section="${sectionId}"]`)
                if (element) {
                    element.classList.add('search-highlight')
                }
            })
        }
    })
})

// Scroll-Listener für aktiven Abschnitt und Fortschritt
const handleScroll = () => {
    const sections = document.querySelectorAll('[data-section]')
    const scrollPosition = window.scrollY + 200
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = window.scrollY + rect.top - 200
        
        if (scrollPosition >= sectionTop && index < sections.length - 1) {
            const nextSection = sections[index + 1]
            const nextSectionTop = window.scrollY + nextSection.getBoundingClientRect().top - 200
            
            if (scrollPosition < nextSectionTop) {
                activeSection.value = section.getAttribute('data-section')
            }
        }
    })
    
    // Lesefortschritt berechnen
    const contentHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = (window.scrollY / contentHeight) * 100
    readingProgress.value = Math.min(100, Math.max(0, scrollProgress))
}

// Beim Mounten IDs zuweisen und Listener registrieren
onMounted(() => {
    assignSectionIds()
    window.addEventListener('scroll', handleScroll)
    handleScroll()
})

// Cleanup beim Unmounten
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Global styles for rulebook content */
.rulebook-content .rulebook-section {
    color: #e5e7eb;
}

.rulebook-content .section-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #e74c3c;
    text-align: center;
    margin-bottom: 3rem;
    text-transform: uppercase;
}

.rulebook-content .rule-section {
    margin-bottom: 4rem;
    padding: 2.5rem;
    background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
    border-radius: 1rem;
    border-left: 4px solid #e74c3c;
    scroll-margin-top: 160px;
}

.rulebook-content .rule-section-title {
    font-size: 2.25rem;
    font-weight: 900;
    color: #e74c3c;
    margin-bottom: 2rem;
    margin-top: 1rem;
    border-bottom: 3px solid #e74c3c;
    padding-bottom: 1rem;
    letter-spacing: -0.02em;
}

.rulebook-content .subsection {
    margin-bottom: 3rem;
    padding-left: 1.5rem;
    scroll-margin-top: 160px;
}

.rulebook-content .subsection-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 1.25rem;
    margin-top: 2.5rem;
}

.rulebook-content .rule-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
    line-height: 1;
}

.rulebook-content .rule-list li {
    padding: 0;
    padding-left: 2rem;
    padding-bottom: 0.25rem;
    position: relative;
    line-height: 1.6;
    color: #d1d5db;
    margin: 0;
}

.rulebook-content .rule-list li::before {
    content: '•';
    color: #e74c3c;
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 1.5rem;
}

.rulebook-content .rule-section p {
    margin: 1.5rem 0;
    line-height: 1.8;
    color: #d1d5db;
    padding-left: 0.5rem;
}

.rulebook-content .rule-list li strong {
    color: #ffffff;
    font-weight: 700;
    font-size: 1.05em;
}

.rulebook-content .subsection p + .rule-list {
    margin-top: 1.5rem;
}

/* Bessere Hervorhebung für wichtige Textabschnitte */
.rulebook-content .rule-list li br {
    margin: 0.5rem 0;
    display: block;
}

/* Custom Scrollbar für Navigation */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #e74c3c, #c0392b);
    border-radius: 10px;
    transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #c0392b, #a93226);
}

/* Fokus-Effekt für aktive Section */
.rulebook-content [data-section] {
    transition: all 0.3s ease;
}

.rulebook-content [data-section]:hover {
    background: linear-gradient(90deg, rgba(231, 76, 60, 0.05) 0%, transparent 100%);
}

/* Highlight-Effekt für Suchtreffer */
.rulebook-content [data-section].search-highlight {
    animation: pulse-highlight 2s ease-in-out;
    background: linear-gradient(90deg, rgba(251, 191, 36, 0.1) 0%, transparent 100%);
    border-left-color: #fbbf24 !important;
}

@keyframes pulse-highlight {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

/* Responsive Anpassungen */
@media (max-width: 1024px) {
    .rulebook-content .rule-section {
        padding: 2rem;
        margin-bottom: 3rem;
    }
    
    .rulebook-content .rule-section-title {
        font-size: 2rem;
    }
}
</style>