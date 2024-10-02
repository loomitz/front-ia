<template>
<div class="flex flex-col lg:flex-row h-screen">
    <Menu />
    <Chat class="lg:flex-grow h-screen" />
</div>
</template>

<script setup lang="ts">
import { Chat } from '@/components/ui/chat'
import { Menu } from '@/components/ui/menu'

</script>