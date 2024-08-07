<script setup>
import { computed, ref } from 'vue';

const morningOccupied = ref(true);
const afternoonOccupied = ref(false);


const morningStyles = computed(() => {
    const allOccupied = morningOccupied.value && afternoonOccupied.value;
    return allOccupied ? 'bg-gray-600' : morningOccupied.value ? "bg-gray-300" : ''
})
const afternoonStyles = computed(() => {
    const allOccupied = morningOccupied.value && afternoonOccupied.value;
    return allOccupied ? 'bg-gray-600' : afternoonOccupied.value ? "bg-gray-300" : ''
})
</script>


<template>
    <div class="date-box-simple">
        <span class="text-xs">08</span>
        <div class="h-8 bg-gray-100 w-4 relative">
            <div class="morning absolute w-full h-1/2" :class="morningStyles"></div>
            <div class="afternoon absolute top-1/2 w-full h-1/2" :class="afternoonStyles"></div>
        </div>
    </div>
</template>


<style scoped></style>