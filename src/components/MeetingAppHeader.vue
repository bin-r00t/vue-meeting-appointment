<script setup>
import { ref } from 'vue';
import Alert from './Alert.vue';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
const props = defineProps(['title', 'showReturn']);
const emits = defineEmits(['return']);
const visible = ref(false);
function handleContactAdmin() {
    visible.value = !visible.value;
}
function handleReturn() {
    emits('return')
}

</script>


<template>
    <header class="meeting-app-header border-b bg-white p-2 py-4 text-center relative">
        <button v-if="showReturn" class="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-blue-500"
            @click="handleReturn">
            <ChevronLeftIcon class="w-5 h-5" />
        </button>

        <h1 class="font-semibold">{{ title ?? '会议室' }}</h1>

        <button v-if="!showReturn" class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-blue-500"
            @click="handleContactAdmin">联系管理员</button>
    </header>
    <Alert :visible="visible" @close="visible = false" @ok="visible = false">
        <template #title>提示</template>
        <template #content>
            功能暂未开放!
        </template>
    </Alert>
</template>


<style scoped></style>