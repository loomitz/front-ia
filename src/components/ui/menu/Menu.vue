<template>
    <div class="p-1">
    <Sheet>
        <SheetTrigger class="w-12 h-12 cursor-pointer">
            <hamburger-icon class="w-9 h-9 text-zinc-800 dark:text-zinc-100 absolute top-3 left-5" />
        </SheetTrigger>
        <addNewIcon @click="newThread()" class="w-9 h-9 cursor-pointer text-zinc-800 hidden dark:text-zinc-100 absolute top-16 left-5" />
        <dark-icon v-if="isDark" class="absolute top-5 right-5 w-6 h-6 cursor-pointer text-white" @click="toggleDark()" />
        <light-icon v-else class="absolute top-5 right-5 w-6 h-6 cursor-pointer text-zinc-900" @click="toggleDark()" />
        <SheetContent class="w-full" side="left">
            <SheetHeader>
        <SheetTitle>Menú</SheetTitle>
        <SheetDescription class="relative h-full w-full flex flex-col justify-center items-center space-y-4">
        <!-- Opción de Crear nuevo hilo -->
        <div class="flex items-center space-x-2 cursor-pointer mt-10 mb-9" @click="newThread">
            <addNewIcon class="w-9 h-9 text-zinc-800 dark:text-zinc-100" />
            <span class="text-zinc-800 dark:text-zinc-100 text-lg font-medium">Nuevo Hilo</span>
        </div>

        <!-- Opción de Cerrar sesión -->
        <div class="flex items-center space-x-2 cursor-pointer" @click="logoutApp">
            <closeSession class="w-9 h-9 text-zinc-800 dark:text-zinc-100" />
            <span class="text-zinc-800 dark:text-zinc-100 text-lg font-medium">Cerrar Sesión</span>
        </div>
        </SheetDescription>
    </SheetHeader>
        </SheetContent>
    </Sheet> 
    
    
    </div>


</template>

<script setup lang="ts">
import hamburgerIcon from '@/assets/icons/CiHamburger.svg?component'
import closeSession from '@/assets/icons/closeSession.svg?component'
import addNewIcon from '@/assets/icons/addNew.svg?component'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { logout } from '@/lib/apiDataService';
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import darkIcon from '@/assets/icons/darkIcon.svg?component'
import lightIcon from '@/assets/icons/lightIcon.svg?component'
import { useOpenAi } from '@/lib/apiDataService';


const isDark = useDark()
const toggleDark = useToggle(isDark)
const { newThread } = useOpenAi()

const router = useRouter()

const logoutApp = async() => {
    await logout()
    await router.push('/login')
}



</script>