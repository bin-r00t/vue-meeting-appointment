<script setup>
import { ref } from 'vue';
import AppointmentList from './pages/AppointmentList.vue';
import AppointmentRoom from './pages/AppointmentRoom.vue';

const fakeRoute = ref('');
const roomId = ref('');
function handleRoomSelect(id) {
  fakeRoute.value = '/make-appointment';
  roomId.value = id;
}
</script>

<template>
  <AppointmentList v-if="fakeRoute == ''" @select="handleRoomSelect" />
  <AppointmentRoom v-if="fakeRoute == '/make-appointment'" :id="roomId" @return="fakeRoute = ''" />
</template>

<style scoped></style>
