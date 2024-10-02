<template>
    <div>
    <Sheet>
        <SheetTrigger class="w-12 h-12 cursor-pointer">
            <hamburger-icon class="w-9 h-9 text-zinc-800 dark:text-zinc-100 absolute top-3 left-5" />
        </SheetTrigger>
        <SheetContent class="w-[500px]" side="left">
        <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
                Contenido del menu
                 <closeSession class="w-9 h-9 cursor-pointer text-zinc-800 dark:text-zinc-100 absolute bottom-5 right-9" />

            </SheetDescription>
        </SheetHeader>
        </SheetContent>
    </Sheet> 

    <!-- <div class="dark:bg-zinc-700 bg-zinc-300 h-full w-24 pt-5 lg:block place-items-center hidden relative">
        <closeSession class="w-9 h-9 cursor-pointer text-zinc-800 dark:text-zinc-100 absolute bottom-5 right-7" />

    
    
    </div> -->

    
    
    </div>


</template>

<script setup lang="ts">
import hamburgerIcon from '@/assets/icons/CiHamburger.svg?component'
import closeSession from '@/assets/icons/closeSession.svg?component'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'



</script>