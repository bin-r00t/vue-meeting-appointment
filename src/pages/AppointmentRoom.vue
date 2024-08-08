<script setup>
import MeetingAppHeader from "@com/MeetingAppHeader.vue";
import TimeBlock from "@com/TimeBlock.vue";
import Alert from "@com/Alert.vue";
import { UsersIcon, MapIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import okIcon from "@/assets/ok.png";
import failedIcon from "@/assets/notok.png";

const props = defineProps(["id"]);
const emits = defineEmits(["return"]);

const uploadInput = ref(null);

const hintVisible = ref(false);
function handleConfirm() {
  hintVisible.value = true;
  setTimeout(() => {
    hintVisible.value = false;
  }, 2000);
}
function handleCancel() {}
</script>

<template>
  <div class="h-screen overflow-y-auto flex flex-col">
    <MeetingAppHeader
      :showReturn="true"
      title="预约会议室"
      @return="emits('return')"
    />
    <main class="flex-1 flex flex-col overflow-y-auto bg-gray-200">
      <!-- {{ id }} -->

      <!-- 会议室相关 -->
      <section class="room-detail mb-3 p-4 bg-white flex flex-col gap-3">
        <section class="room-info flex items-center gap-2">
          <h1 class="font-bold mr-3">101会议室</h1>
          <i class="icon">
            <UsersIcon class="w-4 h-4" />
          </i>
          <small>30人</small>
        </section>
        <section
          class="room-features flex items-center flex-wrap gap-2 text-xs"
        >
          <span class="bg-gray-200 text-gray-700 p-1 px-2 rounded"
            >大屏投影</span
          >
          <span class="bg-gray-200 text-gray-700 p-1 px-2 rounded">摄像头</span>
          <span class="bg-gray-200 text-gray-700 p-1 px-2 rounded">白板</span>
        </section>
        <section class="room-location flex gap-2">
          <i class="icon">
            <MapIcon class="w-4 h-4" />
          </i>
          <span class="text-xs">1楼靠东</span>
        </section>
        <section
          class="room-description bg-gray-100 text-gray-800 p-1 px-2 rounded"
        >
          <span class="text-xs">备注: 超大会议室</span>
        </section>
      </section>

      <!-- 会议相关  -->
      <section
        class="appointment-section bg-white p-4 flex flex-col gap-2 divide-y"
      >
        <div class="subject py-2 flex justify-between items-center">
          <label for="subject" class="text-sm font-semibold">会议主题</label>
          <input
            type="text"
            id="subject"
            class="outline-none px-3 text-sm text-right"
            placeholder="请输入会议主题"
          />
        </div>
        <div class="pb-3">
          <div class="datetime flex justify-between items-center">
            <div class="time-select py-2">
              <label for="date" class="text-sm font-semibold mr-3"
                >会议时间</label
              >
              <span id="date" class="text-sm">今天02-24</span>
            </div>
            <span class="time-selected text-sm pr-2 text-gray-600"
              >18:30-19:30</span
            >
          </div>
          <p
            class="description rounded mb-2 text-xs p-1 px-2 bg-gray-100 text-gray-800"
          >
            选择方块预约，每个小方块15分钟，1小时划分为4个方块
          </p>
          <TimeBlock />

          <div class="participant mt-3 flex flex-col gap-3">
            <section class="participant-add text-sm">
              <label for="participant" class="font-semibold">参会人</label>
              <span class="text-gray-400"> (已选5人) </span>
              <button class="float-right">
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </section>
            <section class="participant-selected flex flex-wrap gap-3">
              <!-- fake  -->
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >张喜喜</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >王志鹏</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >王安妮</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >小李</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >张大大</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >张喜喜</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >王璐</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >欧阳话费</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >江西西</span
              >
              <span
                class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs"
                >哈哈哈</span
              >
            </section>
          </div>
        </div>

        <div class="agenda py-3 text-sm flex flex-col gap-3">
          <label for="agenda" class="font-semibold">议程</label>
          <textarea
            name="agenda"
            id="agenda"
            rows="5"
            placeholder="请输入议程内容"
            class="rounded outline-none bg-gray-100 p-2 text-gray-600"
          ></textarea>
        </div>

        <div class="files pt-3 text-sm flex flex-col gap-3">
          <label for="file" class="font-semibold">附件</label>
          <input type="file" hidden ref="uploadInput" />
          <button class="rounded border p-2">选择附件</button>
          <div class="file-list min-h-24 bg-gray-100 mb-2"></div>
        </div>

        <div class="btn-groups pt-6 pb-3 flex gap-3">
          <button
            class="flex-1 p-2 text-center border rounded"
            @click="handleCancel"
          >
            取消
          </button>
          <button
            class="flex-1 p-2 text-center rounded bg-blue-600 text-white"
            @click="handleConfirm"
          >
            确定预约
          </button>
        </div>
      </section>
    </main>
  </div>

  <!-- 是否操作成功的提示  -->
  <Alert :visible="hintVisible">
    <template #title>
      <h1></h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-2 items-center">
        <template v-if="0">
          <img :src="okIcon" alt="ok icon" width="64" />
          <p>提交成功!</p>
        </template>
        <template v-if="!0">
          <img :src="failedIcon" alt="failed icon" width="64" />
          <p>出错了</p>
        </template>
      </div>
    </template>
    <template #opts>
      <div></div>
    </template>
  </Alert>
</template>

<style scoped></style>
