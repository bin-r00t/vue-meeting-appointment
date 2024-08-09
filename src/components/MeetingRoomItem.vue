<script setup>
import { computed } from "vue";
import DateBoxSimple from "./DateBoxSimple.vue";
import { UsersIcon, MapIcon } from "@heroicons/vue/24/outline";
import { timeBlock2 } from "../utils";
const props = defineProps([
  "id",
  "name",
  "description",
  "equipment",
  "location",
  "count",
  "time",
]);
const emits = defineEmits(["select"]);
const eqList = computed(() => props.equipment.split(","));
const timeArr = timeBlock2(props.time);

</script>

<template>
  <div
    class="meeting-room-item p-3 bg-white flex flex-col gap-3 first:mt-3"
    @click.native="emits('select', id)"
  >
    <section class="room-info flex items-center gap-2">
      <h1 class="font-bold mr-3">{{ name }}</h1>
      <i class="icon">
        <UsersIcon class="w-4 h-4" />
      </i>
      <small>{{ count }}人</small>
    </section>
    <section class="room-features flex items-center flex-wrap gap-2 text-xs">
      <span
        v-for="eq in eqList"
        class="bg-gray-200 text-gray-700 p-1 px-2 rounded"
        >{{ eq }}</span
      >
    </section>
    <section class="room-location flex gap-2">
      <i class="icon">
        <MapIcon class="w-4 h-4" />
      </i>
      <span class="text-xs">{{ location }}</span>
    </section>
    <section
      class="room-description bg-gray-200 text-gray-800 p-1 px-2 rounded"
    >
      <span class="text-xs">备注: {{ description }}</span>
    </section>
    <section class="date-list flex justify-between">
      <DateBoxSimple
        v-for="(n, i) in timeArr"
        :hour="i + 8"
        :occupiedStatus="n"
      />
    </section>
  </div>
</template>

<style scoped></style>
