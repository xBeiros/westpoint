<template>
    <Head title="Berlin City Roleplay – Offizieller Release!" />
    
    <div class="min-h-screen w-full">
        <NavBar />
        
        <!-- Back Button -->
        <div class="max-w-5xl w-full mx-auto pt-8">
            <Link 
                :href="route('news.index')"
                class="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Zurück zu den Neuigkeiten
            </Link>
        </div>

        <div class="relative py-5 sm:px-6 lg:px-8">
            <div class="max-w-5xl w-full mx-auto">
                <!-- Header Image -->
                <div class="relative mb-8">
                    <img 
                        src="/images/news/1/Serverrelease.png" 
                        alt="Berlin City Roleplay – Offizieller Release!"
                        class="w-full h-auto transition-all duration-300 rounded-lg shadow-2xl"
                    />
                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4">
                        <span class="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                            Ankündigung
                        </span>
                    </div>
                    <!-- Date Badge -->
                    <div class="absolute top-4 right-4">
                        <div class="bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-sm">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                </svg>
                                20. Oktober 2025
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Article Header -->
                <div class="text-left mb-12">
                    <div class="flex items-start justify-between mb-4">
                        <h1 class="text-3xl md:text-4xl font-bold text-white uppercase flex-1 mr-6">
                            Berlin City Roleplay – Offizieller Release!
                        </h1>
                        <div class="flex flex-col items-end text-right">
                            <div class="flex items-center mb-2">
                                <span class="text-red-500 font-semibold mr-2">by xBeiros</span>
                                <img 
                                    src="/images/blogo3.png" 
                                    alt="xBeiros"
                                    class="w-16 h-16 rounded-full object-cover"
                                />
                            </div>
                            <div class="text-gray-300 text-sm">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                    20. Oktober 2025
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Article Content -->
                <div class="mb-12">
                    <div class="prose prose-invert prose-lg max-w-none">
                        <h2>📢 Berlin City Roleplay – Offizieller Release! 🏙️</h2>
                        
                        <p><strong>Liebe Community,</strong></p>
                        
                        <p>es ist endlich soweit! 🎉<br>
                        Nach <strong>fünf intensiven Monaten</strong> voller Arbeit, Höhen, Tiefen, Tests und Herzblut dürfen wir euch heute den <strong>offiziellen Release-Termin</strong> verkünden!</p>
                        
                        <p>🗓 <strong>Release-Datum:</strong> 07.11.2025<br>
                        ⏰ <strong>Uhrzeit:</strong> Wird noch bekannt gegeben<br>
                        🎮 <strong>Server:</strong> Berlin City Roleplay</p>
                        
                        <h2>💥 Ein neues Kapitel beginnt</h2>
                        
                        <p>Seit der Übernahme hat sich <strong>viel getan</strong> – neue Systeme, überarbeitete Strukturen und unzählige Verbesserungen.<br>
                        Unser Ziel war klar: <strong>Berlin City auf ein neues Niveau bringen</strong> und das <strong>authentischste RP-Erlebnis der Hauptstadt</strong> schaffen.</p>
                        
                        <p>Wir wissen, dass frühere Releases unter alter Leitung <strong>nicht das Vertrauen oder die Stabilität</strong> gebracht haben, die ihr euch gewünscht habt.<br>
                        Doch das gehört der Vergangenheit an – <strong>wir sind zurück</strong> und bereit zu zeigen, was wirklich in Berlin City steckt! 💪</p>
                        
                        <h2>🌆 Was euch erwartet</h2>
                        
                        <p>Ein lebendiges Berlin mit<br>
                        🏙️ <strong>realistischer Wirtschaft</strong><br>
                        🚓 <strong>spannenden Fraktionen</strong><br>
                        🧍 <strong>einzigartigen Charakteren</strong><br>
                        und einem <strong>echten Hauptstadt-Feeling</strong>.<br>
                        Ob <strong>Polizist, Unternehmer, Sanitäter oder Bürger</strong> – hier findet <strong>jeder seinen Platz</strong>.</p>
                        
                        <h2>❤️ Gemeinsam nach vorne</h2>
                        
                        <p>Perfekt sind wir noch nicht – aber wir arbeiten täglich daran, euch ein stabiles, kreatives und faires Spielerlebnis zu bieten.<br>
                        Mit eurer Unterstützung schaffen wir es, <strong>Berlin City Roleplay wieder groß zu machen</strong> – moderner, lebendiger und gemeinschaftlicher als je zuvor.</p>
                        
                        <p>💬 <strong>Seid dabei, gebt uns eine Chance und helft mit, Berlin City wieder zum Leben zu erwecken!</strong></p>
                        
                        <h2>🔗 Weitere Infos & Links</h2>
                        
                        <p style="margin-top:30px;">
                            <a href="https://berlincity.xyz/news/serverrelease" 
                               class="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 no-underline mr-4 mb-4">
                                📰 News Artikel
                            </a>
                            <a href="https://berlincity.xyz/presentation" 
                               class="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 no-underline mb-4">
                                🎯 Server Präsentation
                            </a>
                        </p>
                        
                        <p style="margin-top:40px; color:#999;">
                            <strong>Mit besten Grüßen,</strong><br>
                            ❤️ <strong>Euer Berlin City Roleplay Team</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
        <ScrollToTop />
    </div>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
</script>

<style scoped>
.prose {
    color: #e5e7eb;
}

.prose strong {
    background: linear-gradient(to right, #ef4444, #dc2626);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
}

.prose h2 {
    color: white;
    font-size: 1.875rem;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
}

.prose p {
    margin-bottom: 1.5rem;
    line-height: 1.875;
    font-size: 1.125rem;
}

.prose ul {
    list-style-type: none;
    margin: 1.5rem 0;
}

.prose ul li {
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    position: relative;
}

.prose ul li:before {
    content: "▸";
    color: #ef4444;
    font-weight: bold;
    position: absolute;
    left: 0;
}

.prose blockquote {
    position: relative;
    padding: 2rem 2rem 2rem 4rem;
    margin: 2rem 0;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
    border-left: 4px solid #ef4444;
    border-radius: 0.5rem;
    font-style: italic;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.prose blockquote:before {
    content: '"';
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    font-size: 4rem;
    color: #ef4444;
    opacity: 0.3;
    font-family: Georgia, serif;
    line-height: 1;
}

.prose blockquote p {
    margin: 0;
    color: #f3f4f6;
    font-size: 1.25rem;
}

.prose a {
    text-decoration: none;
    color: inherit;
}

.prose a:hover {
    text-decoration: none;
}
</style>

