<script setup lang="ts">
import {Head} from "@inertiajs/vue3";
import NavBar from "@/components/NavBar.vue";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const openFaq = ref<string | null>(null)

function toggleFaq(question: string) {
    openFaq.value = openFaq.value === question ? null : question
}

const faqs = [
    {
        id: 1,
        question: "Wie verbinde ich mich mit dem Westpoint RedM Server?",
        answer: "Lade zunächst <strong>Red Dead Redemption 2</strong> herunter und installiere es. Danach installierst du <strong>RedM</strong> von <a href='https://redm.gg/' target='_blank' class='underline text-red-400'>redm.gg</a>. Starte RedM und suche nach <strong>Westpoint</strong> im Server-Browser, dann trete dem Server bei."
    },
    {
        id: 2,
        question: "Was bedeutet Mid-Core RP bei Westpoint?",
        answer:
            "Wir setzen auf authentisches Wild-West-Rollenspiel ohne Hardcore-Zwang oder Chaos. RP soll Spaß machen – mit Regeln, aber ohne RP-Polizei. Wir legen Wert auf historisch authentisches Roleplay im Wilden Westen.",
    },
    {
        id: 3,
        question: "Kann ich eigene Geschäfte oder Fraktionen gründen?",
        answer:
            "Ja! Wenn du eine Idee für ein Geschäft, eine Gang oder eine Fraktion hast, kannst du bei der Verwaltung ein Konzept einreichen. Bei Erfolg bekommst du Support durch das Team.",
    },
    {
        id: 4,
        question: "Welche Voice-Chat-Lösung wird verwendet?",
        answer:
            "Wir verwenden <strong>SaltyChat</strong> für die Voice-Kommunikation. Folge uns auf <a href='https://discord.gg/westpoint' target='_blank' class='underline text-red-400'>Discord</a> für die aktuellsten Informationen und Downloads!",
    },
];

const faqsMore = [
    {
        question: "Welche Systemanforderungen benötige ich für RedM?",
        answer:
            "Du benötigst eine legale Kopie von <b>Red Dead Redemption 2</b> auf Steam, Epic Games oder Rockstar Games Launcher.<br>" +
            "Zusätzlich benötigst du <b>RedM</b>, das kostenlos von <a href='https://redm.gg/' target='_blank' class='underline text-red-400'>redm.gg</a> heruntergeladen werden kann.<br>" +
            "Die Systemanforderungen entsprechen denen von Red Dead Redemption 2.",
    },
    {
        question: "Wie funktioniert das Roleplay auf Westpoint?",
        answer:
            "Westpoint ist ein <b>historisch authentischer Wild-West Roleplay Server</b>.<br>" +
            "Wir legen Wert auf <b>realistisches Rollenspiel</b> im Stil des Wilden Westens um 1899.<br><br>" +
            "Alle Spieler sollten sich <b>in Charakter</b> verhalten und die <b>Regeln des Regelwerks</b> befolgen.<br>" +
            "Weitere Details findest du im <b>Hauptregelwerk</b> auf unserer Website.",
    },
    {
        question: "Kann ich mit Freunden zusammen spielen?",
        answer:
            "Ja! Du kannst <b>Gangs oder Fraktionen</b> gründen oder bestehenden beitreten.<br>" +
            "Auch <b>Geschäftspartnerschaften</b> sind möglich.<br><br>" +
            "Für größere Gruppen empfehlen wir, ein <b>Konzept bei der Verwaltung</b> einzureichen.",
    },
];
</script>

<template>
    <Head title="FAQ" />
    <div>
        <NavBar />

        <div class="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Häufig gestellte Fragen</h2>
            <p class="mt-6 max-w-2xl text-base/7 text-gray-300">
                Du hast eine andere Frage und konntest die Antwort nicht finden? Melde dich einfach bei unserem Support-Team auf <a href="https://discord.gg/westpoint" class="font-semibold text-red-400 hover:text-red-300">Discord</a> und wir werden dir so schnell wie möglich weiterhelfen.
            </p>
            <div class="mt-20">
                <dl class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
                    <div v-for="faq in faqs" :key="faq.id">
                        <dt class="text-base/7 font-semibold text-white">{{ faq.question }}</dt>
                        <div class="text-base/7 text-gray-300" v-html="faq.answer"></div>
                    </div>
                </dl>
            </div>

            <dl class="mt-16 divide-y divide-white/10">
                <div
                    v-for="faq in faqsMore"
                    :key="faq.question"
                    class="py-6 first:pt-0 last:pb-0"
                >
                    <dt>
                        <button
                            @click="toggleFaq(faq.question)"
                            class="flex w-full items-start justify-between text-left text-white"
                        >
                            <span class="text-base/7 font-semibold">{{ faq.question }}</span>
                            <span class="ml-6 flex h-7 items-center">
                                <PlusSmallIcon v-if="openFaq !== faq.question" class="size-6" aria-hidden="true" />
                                <MinusSmallIcon v-else class="size-6" aria-hidden="true" />
                            </span>
                        </button>
                    </dt>
                    <dd v-if="openFaq === faq.question" class="mt-2 pr-12">
                        <div class="text-base/7 text-gray-300" v-html="faq.answer"></div>
                    </dd>
                </div>
            </dl>
        </div>


    </div>
</template>

<style scoped>

</style>
