<script setup>
import MeetingRoomItem from "@com/MeetingRoomItem.vue";
import DateSlidePicker from "@com/DateSlidePicker.vue";
import MeetingAppHeader from "@com/MeetingAppHeader.vue";
import { getAppointmentList } from "@/api/appointment";
import { ref } from "vue";

const rooms = ref([]);

getAppointmentList().then(({ data }) => {
  console.table(data);
  rooms.value = data;
});

const emits = defineEmits(["select"]);
</script>

<template>
  <div class="h-screen overflow-y-auto bg-gray-100 flex flex-col">
    <MeetingAppHeader />
    <DateSlidePicker />
    <main class="flex-1 flex flex-col gap-3 overflow-y-auto">
      <!-- placeholder -->
      <p v-if="!rooms.length" class="text-gray-500 text-lg text-center my-10">
        - 暂无可预约 -
      </p>
      <!-- room list  -->
      <MeetingRoomItem
        v-for="room in rooms"
        :id="room.id"
        :name="room.name"
        :count="room.count"
        :location="room.location"
        :description="room.description"
        :equipment="room.equipment"
        :time="room.time ?? []"
        @select="(id) => emits('select', id)"
      />
      <!-- spinner  -->
      <div v-if="rooms.length" class="spinner text-center my-5">
        <div
          class="box w-12 h-12 inline-block bg-black text-white rounded-full"
        ></div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
