<script setup>
import { FunnelIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import dayjs from "dayjs";
import Alert from "./Alert.vue";
import { useSearchConditionStore } from "../store";

const emits = defineEmits(["pick", "filter"]);

/** 日期相关 */
const searchCondition = useSearchConditionStore();
const WEEK_CHN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const week = Array(7)
  .fill(0)
  .map((_, n) => {
    let d = dayjs().add(n, "day");
    return {
      w: d.day(),
      s: d.format("MM-DD"),
      r: d.format("YYYY-MM-DD"),
    };
  });
const activeDate = ref(week[0].s);
searchCondition.$patch({ date: week[0].r });
const handleClickDate = (n) => {
  activeDate.value = n.s;
  emits("pick", n.r);
};

/** 表单 */
const eqList = ref([
  { id: 1, name: "投影仪" },
  { id: 2, name: "路由器" },
]);
const filterVisible = ref(false);
const handleShowFilterAlert = () => {
  filterVisible.value = true;
};
const handleCancel = function () {
  filterVisible.value = false;
  formData.value = INITIAL_FORM_DATA;
};

const INITIAL_FORM_DATA = {
  name: "",
  location: "",
  count: 0,
  equipment: [],
};
const formData = ref(Object.create(INITIAL_FORM_DATA));
const handleSubmit = () => {
  if (JSON.stringify(formData.value) == "{}") {
    filterVisible.value = false;
    formData.value = Object.create(INITIAL_FORM_DATA);
    return;
  }
  emits("filter", formData.value);
  filterVisible.value = false;
  formData.value = Object.create(INITIAL_FORM_DATA);
};
</script>

<template>
  <div class="date-slide-picker-on-top bg-white max-w-full border-b flex">
    <ul class="date-list flex-1 flex gap-1 overflow-x-auto">
      <li
        v-for="(n, i) in week"
        class="p-3 px-2 text-sm flex-nowrap text-gray-700 text-nowrap relative"
        @click.native="() => handleClickDate(n)"
      >
        <span v-if="i == 0">今天</span>
        <span v-else>{{ WEEK_CHN[n.w] }}</span>
        <span>{{ n.s }}</span>
        <span
          v-show="n.s == activeDate"
          class="line inline-block h-[3px] w-[60%] bg-blue-700 absolute bottom-0 left-[20%]"
        ></span>
      </li>
    </ul>
    <div
      class="filter border-l top-0 right-0 z-10 h-full flex w-10 items-center justify-center"
    >
      <button class="text-center" @click="handleShowFilterAlert">
        <FunnelIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>
  <Alert :visible="filterVisible" @close="handleCancel" @ok="handleSubmit">
    <template #title>筛选会议室</template>
    <template #content>
      <form action="#" class="flex flex-col gap-2">
        <div class="form-item flex flex-col gap-1">
          <label for="name" class="my-1 text-sm text-gray-600 uppercase"
            >会议室名称</label
          >
          <input
            type="text"
            id="name"
            class="outline-none p-1 px-2 border rounded text-gray-600 text-sm"
            v-model="formData.name"
          />
        </div>
        <div class="form-item flex flex-col gap-1">
          <label for="equipment" class="my-1 text-sm text-gray-600 uppercase"
            >设备选择</label
          >
          <select
            id="equipment"
            class="outline-none p-1 px-2 border rounded text-gray-600 text-sm appearance-none h-12"
            multiple
            v-model="formData.equipment"
          >
            <option
              v-for="eq in eqList"
              :value="eq.name"
              class="text-xs text-gray-600 inline-block p-1 rounded"
            >
              {{ eq.name }}
            </option>
          </select>
        </div>
        <div class="form-item flex flex-col gap-1">
          <label for="location" class="my-1 text-sm text-gray-600 uppercase"
            >地点</label
          >
          <input
            id="location"
            type="text"
            class="outline-none p-1 px-2 border rounded text-sm text-gray-600"
            v-model="formData.location"
          />
        </div>
        <div class="form-item flex flex-col gap-1">
          <label for="count" class="my-1 text-sm text-gray-600 uppercase"
            >最低容纳人数</label
          >
          <input
            id="count"
            type="number"
            min="0"
            max="100"
            class="outline-none p-1 px-2 border rounded text-sm text-gray-600"
            v-model="formData.count"
          />
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
