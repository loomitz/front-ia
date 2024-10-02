<template>
<div class="flex flex-col relative">
    <div class="flex-grow overflow-y-auto p-14">
        <span class="text-4xl font-bold text-[#163963] dark:text-[#3ea8bd]">Bienvenido, Dr. </span>

        <div class="rounded bg-zinc-200 dark:bg-zinc-700 p-4 mt-10 flex flex-col gap-2">

            <p>
                ¡Hola! Soy tu IA Urology Assistant personalizada para asistir en el ámbito de la urología, basada en guías clínicas actualizadas,
                como las de la American Urological Association (AUA) y la European Association of Urology (EAU). Mi objetivo es brindarte recomendaciones basadas en evidencia
                para el manejo de casos clínicos en urología, respetando siempre las consideraciones éticas y legales aplicables. Recuerda que todas las decisiones deben ajustarse al contexto clínico del paciente.
            </p>

            <div>
                Antes de continuar, necesito recordarte algunas consideraciones éticas:

                <ul class="list-disc px-6">

                    <li class="py-2">Confidencialidad y privacidad: Los datos que compartas estarán protegidos y anonimizados conforme a regulaciones como GDPR y HIPAA.</li>
                    <li class="py-2">Responsabilidad clínica: Las recomendaciones ofrecidas son complementarias y no sustituyen el juicio clínico ni las decisiones personalizadas que tomes con tus pacientes.</li>
                    <li class="py-2">Uso autorizado: Esta herramienta está destinada exclusivamente a profesionales de la salud capacitados en urología.</li>
                
                
                </ul>


                Por favor, confirma si aceptas estos términos para continuar.
            </div>
        
        </div>


    </div>

    <div class="px-8 w-full mb-5">
        <input v-model="prompt" placeholder="Introduce una petición aquí" 
            class="rounded-full bg-zinc-200 py-4 px-8 w-full placeholder:text-zinc-500 dark:bg-zinc-700 dark:placeholder:text-zinc-400" />
    </div>
</div>
</template>
<script setup lang="ts">
 import { Input } from '@/components/ui/input'
 import { ref } from 'vue'

    const prompt = ref('')


</script>