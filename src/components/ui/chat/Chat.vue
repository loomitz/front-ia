<template>
<div class="flex flex-col relative">
    <div v-if="!loadingStart" class="flex-grow overflow-y-auto">
        <span class="text-3xl font-bold text-[#163963] dark:text-[#3ea8bd]">Bienvenido, <br/> {{drName}}</span>

        <div class="rounded-lg bg-zinc-100 dark:bg-zinc-700 p-4 mt-8 flex flex-col gap-2">

            <p>
                ¡Hola! Soy tu IA Urology Assistant personalizada para asistir en el ámbito de la urología, basada en guías clínicas actualizadas,
                como las de la American Urological Association (AUA) y la European Association of Urology (EAU). <br/>Mi objetivo es brindarte recomendaciones basadas en evidencia
                para el manejo de casos clínicos en urología, respetando siempre las consideraciones éticas y legales aplicables. Recuerda que todas las decisiones deben ajustarse al contexto clínico del paciente.
            </p>

            <div>
                Antes de continuar, necesito recordarte algunas consideraciones éticas:

                <ul class="list-disc px-6">

                    <li class="py-2">Confidencialidad y privacidad: Los datos que compartas estarán protegidos y anonimizados conforme a regulaciones como GDPR y HIPAA.</li>
                    <li class="py-2">Responsabilidad clínica: Las recomendaciones ofrecidas son complementarias y no sustituyen el juicio clínico ni las decisiones personalizadas que tomes con tus pacientes.</li>
                    <li class="py-2">Uso autorizado: Esta herramienta está destinada exclusivamente a profesionales de la salud capacitados en urología.</li>
                
                </ul>
            </div>
        </div>

        <template v-for="message in messages">
            <div v-if="message.role === 'user'" class="rounded-lg bg-slate-200 dark:bg-slate-600 p-4 mt-6 sm:ms-10 ms-3 flex flex-col gap-2">
                <p>{{ message.content[0].text.value }}</p>
            </div>
            <div v-if="message.role === 'assistant'" 
            class="bg-white assistant dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 sm:me-10 me-3 text-gray-900 dark:text-gray-200 prose prose-blue dark:prose-invert">
                <div v-html="markdownToHtml(message.content[0].text.value)"></div>
            </div>
        </template>

        <Skeleton v-if="loadingResponse" class="bg-white assistant h-[200px] dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 sm:me-10 me-3 text-gray-900 dark:text-gray-200 prose prose-blue dark:prose-invert" />

    </div>
</div>

</template>
<script setup lang="ts">
 import { useOpenAi } from '@/lib/apiDataService';
 import { Skeleton } from '@/components/ui/skeleton'
 import { onBeforeMount, computed } from 'vue'
 import { marked } from 'marked'
 import { useLocalStorage } from '@vueuse/core';

 
const userEmail = useLocalStorage("userEmail", null);
const { messages, loadingStart, loadingResponse, mountedSetup,  } = useOpenAi()

const markdownToHtml = (text: string) => {
    return marked(text)
}

onBeforeMount(async() => {
    await mountedSetup()
})

const drName = computed(() => {
    switch (userEmail.value) {
        case 'urosusy@test.com':
            return 'Dra. Susy Castillo'
        case 'htsantamaria@gmail.com':
            return 'Dr. Hegel T-Santamaría'
        case 'carolina@test.com':
            return 'Dra. Carolina'
        case 'aljr@loo.casa':
            return 'Dr. Alejandro R. Rodriguez'
        // si no es ninguno de los anteriores
        default:
            return 'Dr. Hegel T-Santamaría'
    }
})


</script>

<style>

/* justificamos el texto a la izquierda */
div.assistant {
    text-align: justify;
}

div.assistant p {
    margin-bottom: 10px;
}

div.assistant ol {
    margin-left:2.5rem;
    margin-bottom: 10px;
}

/* add bullets to il */
div.assistant ol li {
    list-style-type: decimal;
    padding-bottom: 0.7rem;
}

</style>