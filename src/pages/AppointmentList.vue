<script setup>
import MeetingRoomItem from '../components/MeetingRoomItem.vue';
import DateSlidePicker from '../components/DateSlidePicker.vue';
import MeetingAppHeader from '../components/MeetingAppHeader.vue';
import { getAppointmentList } from '@/api/appointment';

console.log('getAppointmentList', getAppointmentList);

const emits = defineEmits(['select'])
</script>


<template>
    <div class="h-screen overflow-y-auto bg-gray-100 flex flex-col">
        <MeetingAppHeader />
        <DateSlidePicker />
        <main class="flex-1 flex flex-col gap-3 overflow-y-auto">
            <MeetingRoomItem @select="id => emits('select', id)" />
            <MeetingRoomItem @select="id => emits('select', id)" />
            <MeetingRoomItem @select="id => emits('select', id)" />
            <MeetingRoomItem @select="id => emits('select', id)" />
            <div class="spinner text-center my-5">
                <div class="box w-12 h-12 inline-block bg-black text-white rounded-full"></div>
            </div>
        </main>
    </div>
</template>


<style scoped></style>