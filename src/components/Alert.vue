<script setup>
import { watch } from 'vue';

const props = defineProps(['visible']);
const emits = defineEmits(['close', 'ok'])
const _ = e => e.preventDefault();

watch(() => props.visible, val => {
    if (val) document.body.addEventListener('scroll', _);
    else document.body.removeEventListener('scroll', _);
});



</script>


<template>
    <Teleport to="body">
        <div v-if="visible" class="modal fixed z-10 top-0 left-0 w-full h-full bg-[#0001] backdrop-blur-sm"></div>
        <div v-if="visible"
            class="alert fixed w-4/5 z-20 top-1/2 left-1/2 shadow-lg rounded-md -translate-x-1/2 -translate-y-1/2 p-2 flex flex-col bg-white">
            <div class="title p-2">
                <slot name="title">默认标题</slot>
            </div>
            <div class="content flex-1 p-2">
                <slot name="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt labore porro quas?
                </slot>
            </div>
            <div class="footer p-2 flex ">
                <slot name="opts">
                    <button class="flex-1 text-blue-500 text-sm" @click="emits('close')">Cancel</button>
                    <button class="flex-1 p-1 bg-blue-500 text-white rounded text-sm" @click="emits('ok')">OK</button>
                </slot>
            </div>
        </div>
    </Teleport>
</template>


<style scoped></style>