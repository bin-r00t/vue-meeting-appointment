<script setup>
import MeetingRoomItem from "@com/MeetingRoomItem.vue";
import DateSlidePicker from "@com/DateSlidePicker.vue";
import MeetingAppHeader from "@com/MeetingAppHeader.vue";
import { getAppointmentList } from "@/api/appointment";
import { ref, watch } from "vue";
import { useSearchConditionStore } from "../store";

const searchCondition = useSearchConditionStore();
watch(
  () => searchCondition.date,
  (val) => {
    if (val) {
      document.querySelector(".meeting-room-item").scrollIntoView({
        behavior: "smooth",
      });
    }
  }
);

const defaultDate = ref(searchCondition.date);
const rooms = ref([]);
// const TODO_TIME_ARR = [
//   { startTime: "08:00", endTime: "08:15" },
//   { startTime: "08:30", endTime: "08:45" },
//   { startTime: "08:45", endTime: "10:30" },
//   { startTime: "13:30", endTime: "14:00" },
//   { startTime: "14:30", endTime: "15:30" },
//   { startTime: "18:15", endTime: "19:00" },
//   { startTime: "20:45", endTime: "21:15" },
// ];
const loadMoreRef = ref(null);
const page = ref(1);
getAppointmentList({
  page: page.value,
  size: 5,
  datetime: defaultDate.value,
}).then(({ data }) => {
  console.table(data);
  rooms.value = data;
});

/** 延迟加载 */
const hint = ref("下拉加载更多...");
const loadMore = () => {
  getAppointmentList({
    page: page.value + 1,
    limit: 5,
    datetime: defaultDate.value,
  }).then(({ data }) => {
    if (data.length == 0) {
      hint.value = "已全部加载完毕";
      return;
    }
    page.value += 1;
    rooms.value = rooms.value.concat(data); // data is a list
  });
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });
});

watch(
  () => loadMoreRef.value,
  (val) => {
    if (val) {
      console.log("start observing...");
      observer.observe(loadMoreRef.value);
    }
  }
);

const emits = defineEmits(["select"]);
/**
 *
 * @param date YYYY-MM-DD
 */
function handlePickDate(date, filterCondition = {}) {
  if (date) defaultDate.value = date;
  console.log("------- pull new data ----------");
  page.value = 1;
  getAppointmentList({
    page: 1,
    size: 5,
    datetime: date ?? defaultDate.value,
    ...filterCondition,
    equipment: filterCondition?.equipment?.join(","),
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
        :key="room.id + defaultDate"
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
      <div
        ref="loadMoreRef"
        v-if="rooms.length > 4"
        class="spinner text-center my-5"
      >
        <p class="text-center text-sm text-gray-700 p-2">{{ hint }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
