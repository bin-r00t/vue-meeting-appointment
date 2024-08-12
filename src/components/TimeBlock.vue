<script setup>
import { computed, ref, watch } from "vue";
import { timeBlock4 } from "../utils";
import dayjs from "dayjs";

const props = defineProps(["time", "date"]);
const emits = defineEmits(["pick"]);

const startTime = ref();
const endTime = ref();
const selectedRange = computed(() => {
  if (!startTime.value && !endTime.value) return [];
  if (startTime.value && !endTime.value) return [startTime.value];
  if (startTime.value && endTime.value) {
    let range = [];
    let finished = false;
    let s0 =
      startTime.value.length == 2
        ? +startTime.value[0]
        : +startTime.value.slice(0, 2);
    let s1 =
      startTime.value.length == 2 ? +startTime.value[1] : +startTime.value[2];
    let e0 =
      endTime.value.length == 2
        ? +endTime.value[0]
        : +endTime.value.slice(0, 2);
    let e1 = endTime.value.length == 2 ? +endTime.value[1] : +endTime.value[2];

    for (let i = s0; i <= e0; i++) {
      let secondLoopInitValue = i == s0 ? Math.max(0, s1) : 0;
      for (let j = secondLoopInitValue; j < 4; j++) {
        if (i == e0 && j == e1) {
          range.push("" + i + j);
          finished = true;
          break;
        }
        range.push("" + i + j);
      }
      if (finished) break;
    }

    return range;
  }
});

// const needsCheckCol = new Set();
const initialMatrix = ref([]);
const initialTimeOccupied = ref([]);

watch(
  () => props.time,
  (val) => {
    if (!val) return;
    initialMatrix.value = timeBlock4(val);
    initialTimeOccupied.value = initialTimeOccupied.value.concat(
      initialMatrix.value.reduce((prev, curr, currIndex) => {
        curr.forEach((value, idx) => {
          value && prev.push("" + currIndex + idx);
          //   value && needsCheckCol.add(currIndex);
        });
        return prev;
      }, [])
    );
  },
  { immediate: true }
);

watch(
  () => props.date,
  (val) => {
    /** 过期时间查询 - 如果是今天 */
    if (!val || (val && val == dayjs().format("YYYY-MM-DD"))) {
      const now = Date.now();
      let index = 8;
      let quat = 0;
      while (1) {
        let indexTime = new Date().setHours(index, quat, 0, 0);
        if (indexTime >= now) break;
        initialTimeOccupied.value.push(`${index - 8}${quat / 15}`);
        quat += 15;
        if (quat == 60) {
          index++;
          quat = 0;
        }
      }
    }
  },
  { immediate: true }
);

/**
 * 比较两个时间矩阵是否有重合
 * @param newMatrix 选择的时间矩阵
 * @param oldMatrix 初始的时间矩阵
 */
const compare = (newMatrix, oldMatrix) => {
  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < 4; j++) {
      if (newMatrix[i][j] && oldMatrix[i]?.[j]) {
        return true;
      }
    }
  }
  return false;
};

const rangeCollapsed = (startTime, endTime) => {
  console.log("collapse", startTime, endTime);
  if (!startTime || !endTime) return [false, null];

  let stHour =
    (startTime.length == 2 ? +startTime[0] : +startTime.slice(0, 2)) + 8;
  let stMinute = (startTime.length == 2 ? +startTime[1] : +startTime[2]) * 15;
  let etHour = (endTime.length == 2 ? +endTime[0] : +endTime.slice(0, 2)) + 8;
  let etMinute = (1 + (endTime.length == 2 ? +endTime[1] : +endTime[2])) * 15;

  if (etMinute == 60) {
    etMinute = 0;
    etHour += 1;
  }

  const selectedRange = [
    {
      startTime: `${(stHour + "").padStart(2, "0")}:${(stMinute + "").padStart(
        2,
        "0"
      )}`,
      endTime: `${(etHour + "").padStart(2, "0")}:${(etMinute + "").padStart(
        2,
        "0"
      )}`,
    },
  ];

  const newMatrix = timeBlock4(selectedRange);
  return [compare(newMatrix, initialMatrix.value), selectedRange];
};

const handleClick = (n, m) => {
  if (initialTimeOccupied.value.includes("" + (n - 1) + (m - 1))) {
    alert("not allowed!");
    return;
  }
  if (!startTime.value) {
    /** 设置开始时间 */
    startTime.value = "" + (n - 1) + (m - 1);
  } else if (endTime.value) {
    /** 如果结束时间已经设置过了，此时重新设置开始时间 */
    endTime.value = "";
    startTime.value = "" + (n - 1) + (m - 1);
  } else {
    /** 设置结束时间 */
    let startIndex =
      startTime.value.length == 2
        ? +startTime.value[0]
        : +startTime.value.slice(0, 2);
    let endIndex = startIndex >= 10 ? +startTime.value[2] : +startTime.value[1];
    if (startIndex > n - 1 || (startIndex == n - 1 && endIndex > m - 1)) {
      /** 调换位置 */
      endTime.value = startTime.value;
      startTime.value = "" + (n - 1) + (m - 1);
    } else {
      endTime.value = "" + (n - 1) + (m - 1);
    }

    /** 范围有效性检查 */
    const [valid, timeRange] = rangeCollapsed(startTime.value, endTime.value);
    if (valid) {
      alert("时间范围无效");
      startTime.value = endTime.value = "";
    } else {
      emits("pick", timeRange);
    }
  }
};
</script>

<template>
  <div class="time-block bg-white flex gap-1">
    <div class="flex-1 h-full flex flex-col gap-1" v-for="n in 16">
      <span class="text-xs text-gray-600 text-center">{{
        ("" + (7 + n)).padStart(2, "0")
      }}</span>
      <div
        class="box bg-gray-100 h-4"
        v-for="m in 4"
        @click.native="handleClick(n, m)"
        :class="[
          initialTimeOccupied.includes('' + (n - 1) + (m - 1))
            ? 'disabled bg-gray-300'
            : '',
          selectedRange.includes('' + (n - 1) + (m - 1)) ? '!bg-slate-600' : '',
        ]"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
