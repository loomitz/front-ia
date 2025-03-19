<template>
    <div class="px-8 w-full mb-5 relative">
        <textarea
        v-model="prompt"
        placeholder="Introduce una petición aquí"
        class="rounded-2xl bg-zinc-200 py-3 ps-6 pe-10 w-full placeholder:text-zinc-500 dark:bg-zinc-700 dark:placeholder:text-zinc-400 resize-none overflow-hidden"
        @input="autoResize"
        rows="1"
        ref="textarea"
        ></textarea>
    <div
    v-if="!loadingResponse"
    class="hover:text-blue-400 cursor-pointer absolute bottom-4 right-12"
    @keydown.enter="sendMessage()"
    @click="sendMessage()"
    >
        <sendIcon class="w-6 h-6" />
    </div>
        <div v-else class="absolute bottom-3 right-12">
            <loadingIcon class="w-6 h-6 animate-spin" />
        </div>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import { useOpenAi } from '@/lib/apiDataService'
  import sendIcon from '@/assets/icons/sendIcon.svg?component'
  import loadingIcon from '@/assets/icons/loadingIcon.svg?component'
  
  const { loadingResponse, newPrompt } = useOpenAi()
  const prompt = ref('')
  const textarea = ref(null)
  
  const sendMessage = async () => {
    await newPrompt(prompt.value)
    prompt.value = ''
    nextTick(() => {
      autoResize() // Resetea el tamaño después de enviar el mensaje
    })
  }
  
  // Función para ajustar el tamaño del textarea automáticamente
  const autoResize = () => {
    if (textarea.value) {
      textarea.value.style.height = 'auto'
      textarea.value.style.height = `${textarea.value.scrollHeight}px`
    }
  }
  </script>
  