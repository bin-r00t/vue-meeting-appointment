<script setup>
import { ref } from 'vue';

/** 已过期不可选的时间 */
const passedDisabled = [];
/** 已经被预定了的时间 */
const selectedDisabled = [];
/** 本次选择的时间 */
const selected = ref(new Set());
const timeStr = ((n, m) => ('' + (7 + n)).padStart(2, '0') + ':' + (m < 2 ? '00' : (m - 1) * 15));
const handleClick = (n, m) => {
    const time = timeStr(n, m);
    if (selected.value.has(time)) {
        selected.value.delete(time);
    } else {
        selected.value.add(timeStr(n, m));
    }
}
</script>


<template>
    <div class="time-block bg-white flex gap-1">
        <div class="flex-1 h-full flex flex-col gap-1" v-for="n in 16">
            <span class="text-xs text-gray-600 text-center">{{ ('' + (7 + n)).padStart(2, '0') }}</span>
            <div class="box bg-gray-100 h-4" v-for="m in 4" @click.native="handleClick(n, m)"
                :class="[selected.has(timeStr(n, m)) ? 'bg-red-400' : '']"></div>
        </div>
    </div>
</template>


<style scoped></style>