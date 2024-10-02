<template>
    <div class="grid h-screen place-items-center">
        <div class="w-full px-6 sm:px-0 sm:w-4/6 flex flex-col place-items-center">
            <img v-if="isDark" src="@/assets/logos/hotizontalazul.png" alt="Urocare Logo" class="h-16 mb-10" />
            <img v-else src="@/assets/logos/horizontalcolor.png" alt="Urocare Logo" class="h-16 mb-10" />
            <card class="px-5 pb-4 w-full rounded-xl bg-slate-50 bg-opacity-75 dark:bg-zinc-700 shadow-md dark:shadow-black shadow-zinc-600">
                <card-header>
                    <card-title class="text-center text-3xl mb-4">Bienvenidos</card-title>
                </card-header>
                <card-content>
                    <Input
                        class="border rounded border-zinc-500 w-full p-4" 
                        v-model="email" 
                        placeholder="Correo Electrónico" />
                    <Input 
                        class="border rounded border-zinc-500 w-full p-4 mt-4"
                        v-model="password"
                        type="password" 
                        placeholder="Contraseña" />
                </card-content>
                <card-footer>
                    <Button 
                        class="w-full bg-[#163963] dark:border-2 dark:border-[#101f30] hover:bg-[#135c8e] text-white p-3 rounded-full mx-5"
                        @click="login(email, password)"
                    >
                        Iniciar Sesión
                    </Button>
                </card-footer>
            </card>
        </div>
        
    </div>
</template>

<script setup lang="ts">
// 135c8e, #17b0ce
import { 
    Card,  
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
 } from '@/components/ui/card'
 import { Input } from '@/components/ui/input'
 import { Button } from '@/components/ui/button'
 import { ref } from 'vue'
 import { useDark } from '@vueuse/core'
 import { login } from '@/lib/apiDataService'

const isDark = useDark()

const email = ref('')
const password = ref('')


</script>