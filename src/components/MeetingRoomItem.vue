<script setup>
import DateBoxSimple from './DateBoxSimple.vue';
import { UsersIcon, MapIcon } from '@heroicons/vue/24/outline';

const emits = defineEmits(['select'])
</script>


<template>
    <div class="meeting-room-item p-3 bg-white flex flex-col gap-3 first:mt-3" @click.native="emits('select', 1)">
        <section class="room-info flex items-center gap-2">
            <h1 class="font-bold mr-3">101会议室</h1>
            <i class="icon">
                <UsersIcon class="w-4 h-4" />
            </i>
            <small>30人</small>
        </section>
        <section class="room-features flex items-center flex-wrap gap-2 text-xs">
            <span class="bg-gray-200 text-gray-700 p-1 px-2 rounded">大屏投影</span>
            <span class="bg-gray-200 text-gray-700 p-1 px-2 rounded">摄像头</span>
            <span class="bg-gray-200 text-gray-700 p-1 px-2 rounded">白板</span>
        </section>
        <section class="room-location flex gap-2">
            <i class="icon">
                <MapIcon class="w-4 h-4" />
            </i>
            <span class="text-xs">1楼靠东</span>
        </section>
        <section class="room-description bg-gray-200 text-gray-800 p-1 px-2 rounded">
            <span class="text-xs">备注: 超大会议室</span>
        </section>
        <section class="date-list flex justify-between">
            <DateBoxSimple v-for="n in 16" />
        </section>
    </div>
</template>


<style scoped></style>