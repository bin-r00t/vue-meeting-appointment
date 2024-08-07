<script setup>
import { FunnelIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import Alert from './Alert.vue';
import dayjs from 'dayjs';

// const today = new Date().toLocaleDateString().split('/').slice(1).map(n => ('' + n).padStart(2, '0')).join('-');
const WEEK_CHN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const week = Array(7).fill(0).map((_, n) => ({ w: dayjs().add(n, 'day').day(), s: dayjs().add(n, 'day').format('MM-DD') }));
const activeDate = ref(week[0].s);

const filterVisible = ref(false);
const handleFilter = () => { filterVisible.value = true }
const handleClickDate = n => {
    activeDate.value = n.s
}
</script>


<template>
    <div class="date-slide-picker-on-top bg-white max-w-full border-b flex">
        <ul class="date-list flex-1 flex gap-1 overflow-x-auto">
            <li v-for="n, i in week" class="p-3 px-2 text-sm flex-nowrap text-gray-700 text-nowrap relative"
                @click.native="() => handleClickDate(n)">
                <span v-if="i == 0">今天</span>
                <span v-else>{{ WEEK_CHN[n.w] }}</span>
                <span>{{ n.s }}</span>
                <span v-show="n.s == activeDate"
                    class="line inline-block h-[3px] w-[60%] bg-blue-700 absolute bottom-0 left-[20%]"></span>
            </li>
        </ul>
        <div class="filter border-l top-0 right-0 z-10 h-full flex w-10 items-center justify-center">
            <button class="text-center" @click="handleFilter">
                <FunnelIcon class="w-5 h-5 text-gray-600" />
            </button>
        </div>
    </div>
    <Alert :visible="filterVisible" @close="filterVisible = false" @ok="filterVisible = false">
        <template #title>筛选会议室</template>
        <template #content>
            <form action="#" class="flex flex-col gap-2">
                <div class="form-item flex flex-col gap-1">
                    <label for="name">名称</label>
                    <input type="text" class="outline-none p-1 px-2 border rounded">
                </div>
                <div class="form-item flex flex-col gap-1">
                    <label for="name">名称</label>
                    <input type="text" class="outline-none p-1 px-2 border rounded">
                </div>
                <div class="form-item flex flex-col gap-1">
                    <label for="name">名称</label>
                    <input type="text" class="outline-none p-1 px-2 border rounded">
                </div>
            </form>
        </template>
    </Alert>
</template>


<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>