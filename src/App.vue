<template>
  <div class="bg-gradient-to-bl from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900 min-h-screen overflow-hidden realative">

    <RouterView/>
  
  </div>

</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { watch } from 'vue'
import { useLocalStorage } from '@vueuse/core';


const router = useRouter()
const token = useLocalStorage('token', null)

watch(token, (newValue) => {
  if (!newValue) {
    router.push('/login')
  }
})

</script>