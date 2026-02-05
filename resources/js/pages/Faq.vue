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
        question: "Wie installiere ich SaltyChat und verbinde es mit dem Server?",
        answer: "Hier kannst du dir den aktuellsten SaltyChat herunterladen: <a href='https://gaming.v10networks.com/SaltyChat' target='_blank' class='underline text-blue-400'>SaltyChat Download</a>. Danach verbindest du dich über TeamSpeak mit <strong>berlin-city</strong>."
    },
    {
        id: 2,
        question: "Was bedeutet Mid-Core RP bei BerlinCity?",
        answer:
            "Wir setzen auf authentisches Rollenspiel ohne Hardcore-Zwang oder Gambo-Chaos. RP soll Spaß machen – mit Regeln, aber ohne RP-Polizei.",
    },
    {
        id: 3,
        question: "Kann ich eigene Unternehmen gründen?",
        answer:
            "Ja! Wenn du eine Idee hast, kannst du bei der Stadtverwaltung ein Konzept einreichen. Bei Erfolg bekommst du Support durch das Team.",
    },
    {
        id: 4,
        question: "Wann ist der offizielle Release?",
        answer:
            "Der Release ist aktuell in Planung. Folge uns auf <a href='https://discord.gg/berlincity' target='_blank' class='underline text-blue-400'>Discord</a> für alle Updates und Sneak Peaks!",
    },
];

const faqsMore = [
    {
        question: "Was passiert mit den Sachen, die ich bisher bei Berlin City hatte?",
        answer:
            "<b>Mit dem Neustart beginnt auch für alle Spieler ein neuer Abschnitt.</b><br>" +
            "Das bedeutet: <b>Jeder startet unter denselben Bedingungen</b>, um faire Chancen für alle zu gewährleisten.",
    },
    {
        question: "Was passiert mit den Imports, die ich besessen habe?",
        answer:
            "Alle <b>Imports wurden entfernt.</b><br>" +
            "Grund dafür sind die <b>Richtlinien von Rockstar Games</b>, an die wir uns halten müssen.<br><br>" +
            "Wir möchten jedoch eure bisherigen <b>Investitionen nicht ignorieren.</b><br>" +
            "Wenn ihr in der Vergangenheit Imports erworben habt, erstellt bitte ein <b>Ticket im Discord</b> und legt entsprechende <b>Nachweise</b> vor.<br>" +
            "Wir prüfen jeden Fall <b>individuell</b> und kommen euch – abhängig von euren bisherigen Ausgaben – <b>entsprechend entgegen.</b><br>" +
            "Weitere Informationen dazu erhaltet ihr direkt <b>im Ticket.</b>",
    },
];
</script>

<template>
    <Head title="Willkommen" />
    <div>
        <NavBar />

        <div class="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Häufig gestellte Fragen</h2>
            <p class="mt-6 max-w-2xl text-base/7 text-gray-300">
                Du hast eine andere Frage und konntest die Antwort nicht finden? Melde dich einfach bei unserem Support-Team auf <a href="https://discord.gg/berlincity" class="font-semibold text-indigo-400 hover:text-indigo-300">Discord</a> und wir werden dir so schnell wie möglich weiterhelfen.
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
