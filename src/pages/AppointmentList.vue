<script setup>
import MeetingRoomItem from "@com/MeetingRoomItem.vue";
import DateSlidePicker from "@com/DateSlidePicker.vue";
import MeetingAppHeader from "@com/MeetingAppHeader.vue";
import { getAppointmentList } from "@/api/appointment";
import { ref } from "vue";
import dayjs from "dayjs";

const defaultDate = ref(dayjs().format("YYYY-MM-DD"));
const rooms = ref([]);
const TODO_TIME_ARR = [
  { startTime: "08:00", endTime: "08:15" },
  { startTime: "08:30", endTime: "08:45" },
  { startTime: "08:45", endTime: "10:30" },
  { startTime: "13:30", endTime: "14:00" },
  { startTime: "14:30", endTime: "15:30" },
  { startTime: "18:15", endTime: "19:00" },
  { startTime: "20:45", endTime: "21:15" },
];
getAppointmentList({
  page: 1,
  size: 5,
  datetime: defaultDate.value,
}).then(({ data }) => {
  console.table(data);
  rooms.value = data;
});

const emits = defineEmits(["select"]);

/**
 *
 * @param date YYYY-MM-DD
 */
function handlePickDate(date, filterCondition = {}) {
  console.log("------- pull new data ----------");
  getAppointmentList({
    page: 1,
    size: 5,
    datetime: date ?? defaultDate.value,
    ...filterCondition,
  }).then(({ data }) => {
    rooms.value = data;
  });
}
</script>

<template>
  <div class="h-screen overflow-y-auto bg-gray-100 flex flex-col">
    <MeetingAppHeader />
    <DateSlidePicker
      @pick="handlePickDate"
      @filter="(condition) => handlePickDate(null, condition)"
    />
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
        :time="room.time ?? TODO_TIME_ARR"
        @select="(id) => emits('select', id)"
      />
      <!-- spinner  -->
      <div v-if="rooms.length > 5" class="spinner text-center my-5">
        <div
          class="box w-12 h-12 inline-block bg-black text-white rounded-full"
        ></div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
