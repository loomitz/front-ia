<template>
    <div class="grid h-screen sm:place-items-center place-items-start pt-10 sm:pt-24">
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
                        @keydown.enter="useLogin(email, password)"
                        type="password" 
                        placeholder="Contraseña" />
                </card-content>
                <card-footer>
                    <Button 
                        class="w-full bg-[#163963] dark:border-2 dark:border-[#101f30] hover:bg-[#135c8e] text-white p-3 rounded-full mx-5 relative"
                        @click="useLogin(email, password)"
                    >
                        Iniciar Sesión
                        <loading-icon v-if="checkingCredentials" class="w-6 h-6 absolute right-3" />
                    </Button>
                </card-footer>
            </card>

            <div v-if="error" class="px-5 pb-4 mt-3 w-full font-semibold text-center text-red-800 dark:text-red-600">
                Credenciales incorrectas
            </div>





        </div>
        <dark-icon v-if="isDark" class="absolute top-5 right-5 w-6 h-6 cursor-pointer text-white" @click="toggleDark()" />
        <light-icon v-else class="absolute top-5 right-5 w-6 h-6 cursor-pointer text-zinc-900" @click="toggleDark()" />
    </div>
</template>

<script setup lang="ts">
// 135c8e, #17b0ce
import { 
    Card,  
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
 } from '@/components/ui/card'
 import darkIcon from '@/assets/icons/darkIcon.svg?component'
 import lightIcon from '@/assets/icons/lightIcon.svg?component'
 import loadingIcon from '@/assets/icons/loadingIcon.svg?component'
 import { Input } from '@/components/ui/input'
 import { Button } from '@/components/ui/button'
 import { ref } from 'vue'
 import { useDark, useToggle } from '@vueuse/core'
 import { promiseTimeout } from '@vueuse/core'
 import { login } from '@/lib/apiDataService'
 import { useRouter } from 'vue-router'

const router = useRouter()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const email = ref('')
const password = ref('')
const checkingCredentials = ref(false)
const error = ref(false)



const useLogin = async (email: string, password: string) => {
    try {
        checkingCredentials.value = true
        const isLogin = await login(email, password)
        if (isLogin.response && isLogin.response.status === 400){
            checkingCredentials.value = false
            error.value = true
            await promiseTimeout(5000)
            error.value = false
        }
        await promiseTimeout(1000)
    } catch (error) {
        console.log(error)
    } finally {
        checkingCredentials.value = false
        await router.push('/chat')
        window.location.reload();
    }
}


</script>