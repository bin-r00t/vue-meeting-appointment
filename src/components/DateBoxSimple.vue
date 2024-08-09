<script setup>
import { computed, ref } from "vue";

const props = defineProps(["hour", "occupiedStatus"]);

const morningStyles = computed(() => {
  const allOccupied = props.occupiedStatus[0] && props.occupiedStatus[1];
  return allOccupied
    ? "bg-gray-600"
    : props.occupiedStatus[0]
    ? "bg-gray-300"
    : "";
});
const afternoonStyles = computed(() => {
  const allOccupied = props.occupiedStatus[0] && props.occupiedStatus[1];
  return allOccupied
    ? "bg-gray-600"
    : props.occupiedStatus[1]
    ? "bg-gray-300"
    : "";
});
</script>

<template>
  <div class="date-box-simple">
    <span class="text-xs">{{ hour.toString().padStart(2, "0") }}</span>
    <div class="h-8 bg-gray-100 w-4 relative">
      <div class="morning absolute w-full h-1/2" :class="morningStyles"></div>
      <div
        class="afternoon absolute top-1/2 w-full h-1/2"
        :class="afternoonStyles"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
