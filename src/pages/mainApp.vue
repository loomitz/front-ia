<template>
<div class="flex flex-col h-dvh">
    <!-- Menu fijo en la parte superior -->
    <Menu class="sticky top-0 left-0 w-full z-10"
      />
    <div ref="chatContainer"
    class="flex flex-col flex-grow h-dvh lg:flex-grow p-5 md:p-8 overflow-y-auto">
      <Chat  />
    </div>
    <!-- Input fijo en la parte inferior -->
    <prompInput class="sticky bottom-3 left-0 w-full lg:relative lg:w-auto" />

</div>

</template>

<script setup lang="ts">
import { Chat } from '@/components/ui/chat'
import { Menu } from '@/components/ui/menu'
import prompInput from '@/components/prompInput.vue';
import { useScroll, useElementSize, promiseTimeout } from '@vueuse/core';
import { ref, watch } from 'vue'
import { useOpenAi } from '@/lib/apiDataService';

const { loadingStart, loadingResponse } = useOpenAi()

const chatContainer = ref(null);
const { y } = useScroll(chatContainer);
const isScrollingUp = ref(false);


watch(loadingStart, async (newValue) => {
    if (newValue) {
        await promiseTimeout(1000)
        y.value = 30000;
    }
})

watch(loadingResponse, async (newValue) => {
    if (newValue) {
        await promiseTimeout(1000)
        y.value = 30000;
    }
})

// watch if is scrolling down or up
watch(y, (newValue, oldValue) => {
    if (newValue > oldValue) {
        isScrollingUp.value = false;
    } else {
        isScrollingUp.value = true;
    }
});

</script>