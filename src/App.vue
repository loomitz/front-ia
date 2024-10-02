<template>
  <div class="bg-gradient-to-bl from-slate-100 to-slate-400 dark:from-zinc-700 dark:to-zinc-900 min-h-screen realative">
  <!-- <div class="bg-main-pattern bg-[length:20.8rem] bg-center bg-opacity-15 bg-repeat-round min-h-screen z-10" /> -->
    <RouterView/>
  
    <dark-icon v-if="isDark" class="absolute top-5 right-5 w-6 h-6 cursor-pointer text-white" @click="toggleDark()" />
    <light-icon v-else class="absolute top-5 right-5 w-6 h-6 cursor-pointer text-zinc-900" @click="toggleDark()" />
  </div>

</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import darkIcon from '@/assets/icons/darkIcon.svg?component'
import lightIcon from '@/assets/icons/lightIcon.svg?component'

 const isDark = useDark()
 const toggleDark = useToggle(isDark)


</script>