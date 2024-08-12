<script setup>
import MeetingAppHeader from "@com/MeetingAppHeader.vue";
import TimeBlock from "@com/TimeBlock.vue";
import Alert from "@com/Alert.vue";
import { UsersIcon, MapIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
import { computed, ref, onMounted } from "vue";
import okIcon from "@/assets/ok.png";
import failedIcon from "@/assets/notok.png";
import {
  addAppointment,
  getAppointmentList,
  uploadFile,
} from "../api/appointment";
import { useSearchConditionStore } from "../store";

const props = defineProps(["id"]);
const emits = defineEmits(["return"]);

const uploadInput = ref(null);
const hintVisible = ref(false);
const participantListVisible = ref(false);
const currentSelectUser = ref("default");

/** 初始化会议室信息和预定信息 */
const roomInfo = ref({});
const searchCondition = useSearchConditionStore();
getAppointmentList({
  room_id: props.id,
  datetime: searchCondition.date,
  page: 1,
  limit: 1,
}).then(({ data }) => {
  roomInfo.value = data[0];
});

/** 确定预约 */
function handleConfirm() {
  addAppointment({
    ...formData,
    attachment: seletedFiles.value.map((i) => i.id).join(","),
    participant: formData.value.participant.map((p) => p.id).join(","),
  }).then((res) => {
    if (res.success) {
      hintVisible.value = "success";
      setTimeout(() => {
        hintVisible.value = null;
        emits("return");
      }, 2000);
    } else {
      hintVisible.value = "failed";
      setTimeout(() => {
        hintVisible.value = null;
      }, 2000);
    }
  });
}
/** 取消本次预约 */
function handleCancel() {
  emits("return");
}

/** 表单 */
const users = {
  xiaoli: "小李",
  xiaowang: "小王",
  xiaozhang: "校长",
  xiangwu: "向武",
};
const selectedCount = computed(() => formData.value.participant.length);
// const resetFrom = () => {
//   formData.value.room_id = props.id;
//   formData.value.subject = "";
//   formData.value.date = searchCondition.date;
//   formData.value.time = [];
//   formData.value.participant = [];
//   formData.value.agenda = "";
// };
const selectedFiles = ref([]);
onMounted(() => {
  /** 删除功能，不写了，TODO吧 */
  /** 注册文件上传事件 */
  uploadInput.value.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);

    uploadFile(fd).then(({ data }) => {
      selectedFiles.value.push({
        id: data.id,
        name: data.name,
        path: data.path,
        size: data.size,
        suffix: data.suffix,
      });
    });
  });
});
const handlePickFile = () => {
  uploadInput.value.click();
};
const handleConfirmDeleteFile = (id) => {
  selectedFiles.value = selectedFiles.value.filter((file) => file.id != id);
};

const formData = ref({
  room_id: props.id,
  subject: "",
  date: searchCondition.date,
  startTime: null,
  endTime: null,
  participant: [],
  agenda: "",
});
const handlePickTime = ([{ startTime, endTime }]) => {
  formData.value.startTime = startTime;
  formData.value.endTime = endTime;
};
const handleSelectParticipant = () => {
  participantListVisible.value = true;
};
const handlePickUser = () => {
  if (currentSelectUser.value == "default") {
    participantListVisible.value = false;
    return;
  }
  /** 查重 */
  if (
    formData.value.participant.findIndex(
      (p) => p.id == currentSelectUser.value
    ) != -1
  ) {
    alert("该参会人已加入会议");
    return;
  }

  formData.value.participant.push({
    id: currentSelectUser.value,
    name: users[currentSelectUser.value],
  });

  currentSelectUser.value = "default";
  participantListVisible.value = false;
};
const handleRemoveParticipant = (p) => {
  formData.value.participant = formData.value.participant.filter(
    (item) => item.id != p.id
  );
};
</script>

<template>
  <div class="h-screen overflow-y-auto flex flex-col">
    <MeetingAppHeader
      :showReturn="true"
      title="预约会议室"
      @return="emits('return')"
    />
    <main class="flex-1 flex flex-col overflow-y-auto bg-gray-200">
      <!-- 会议室相关 -->
      <section class="room-detail mb-3 p-4 bg-white flex flex-col gap-3">
        <section class="room-info flex items-center gap-2">
          <h1 class="font-bold mr-3">{{ roomInfo.name }}</h1>
          <i class="icon">
            <UsersIcon class="w-4 h-4" />
          </i>
          <small>{{ roomInfo.count }}人</small>
        </section>
        <section
          class="room-features flex items-center flex-wrap gap-2 text-xs"
        >
          <p v-if="!roomInfo.equipment" class="text-sm text-gray-600">
            - 无设备 -
          </p>
          <template v-else>
            <span
              v-for="eq in roomInfo.equipment.split(',')"
              :key="eq"
              class="bg-gray-200 text-gray-700 p-1 px-2 rounded"
              >{{ eq }}</span
            >
          </template>
        </section>
        <section class="room-location flex gap-2">
          <i class="icon">
            <MapIcon class="w-4 h-4" />
          </i>
          <span class="text-xs">{{ roomInfo.location }}</span>
        </section>
        <section
          class="room-description bg-gray-100 text-gray-800 p-1 px-2 rounded"
        >
          <span class="text-xs">备注: {{ roomInfo.description }}</span>
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
            v-model="formData.subject"
          />
        </div>
        <div class="pb-3">
          <div class="datetime flex justify-between items-center">
            <div class="time-select py-2">
              <label for="date" class="text-sm font-semibold mr-3"
                >会议时间</label
              >
              <span id="date" class="text-sm">{{ formData.date }}</span>
            </div>
            <span
              v-if="formData.startTime && formData.endTime"
              class="time-selected text-sm pr-2 text-gray-600"
              >{{ formData.startTime }}-{{ formData.endTime }}</span
            >
          </div>
          <p
            class="description rounded mb-2 text-xs p-1 px-2 bg-gray-100 text-gray-800"
          >
            选择方块预约，每个小方块15分钟，1小时划分为4个方块
          </p>

          <TimeBlock
            :time="roomInfo.time"
            :date="formData.date"
            @pick="handlePickTime"
          />

          <div class="participant mt-4 flex flex-col gap-3">
            <section class="participant-add text-sm flex gap-1 items-center">
              <label for="participant" class="font-semibold">参会人</label>
              <span class="text-gray-400"> (已选{{ selectedCount }}人) </span>
              <button
                id="participant"
                class="h-6 flex-1 text-right"
                @click="handleSelectParticipant"
              >
                <ChevronRightIcon class="inline-block w-4 h-4" />
              </button>
            </section>
            <section class="participant-selected flex flex-wrap gap-3">
              <p
                v-if="!formData.participant || !formData.participant.length"
                class="text-sm text-gray-600"
              >
                无
              </p>
              <template v-else>
                <span
                  v-for="person in formData.participant"
                  :key="person"
                  class="text-gray-600 bg-gray-100 rounded p-1 px-2 text-nowrap text-xs relative"
                  >{{ person.name }}
                  <button
                    @click="() => handleRemoveParticipant(person)"
                    class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 text-white"
                  >
                    <XMarkIcon
                      class="inline-block w-3 h-3 leading-3 mb-2"
                    /></button
                ></span>
              </template>
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
            v-model="formData.agenda"
            class="rounded outline-none bg-gray-100 p-2 text-gray-600"
          ></textarea>
        </div>

        <div class="files pt-3 text-sm flex flex-col gap-3">
          <label for="file" class="font-semibold">附件</label>
          <input type="file" hidden ref="uploadInput" />
          <button class="rounded border p-2" @click="handlePickFile">
            选择附件
          </button>
          <div class="file-list max-h-24 overflow-y-auto mb-2">
            <ul class="file-list__inner flex gap-2 flex-wrap">
              <li
                v-for="file in selectedFiles"
                :key="file.id"
                class="text-gray-800 p-1 px-2 rounded bg-gray-100 text-xs"
                @click="() => handleConfirmDeleteFile(file.id)"
              >
                {{ file.name }}
              </li>
            </ul>
          </div>
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
  <Alert :visible="!!hintVisible">
    <template #title>
      <h1></h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-2 items-center">
        <template v-if="hintVisible == 'success'">
          <img :src="okIcon" alt="ok icon" width="64" />
          <p>提交成功!</p>
        </template>
        <template v-else>
          <img :src="failedIcon" alt="failed icon" width="64" />
          <p>出错了</p>
        </template>
      </div>
    </template>
    <template #opts>
      <div></div>
    </template>
  </Alert>

  <!-- 人员选择提示  -->
  <Alert
    :visible="participantListVisible"
    @close="participantListVisible = false"
    @ok="handlePickUser"
  >
    <template #title>
      <h1>参会人列表</h1>
    </template>
    <template #content>
      <div class="flex flex-col">
        <select
          v-model="currentSelectUser"
          class="outline-none border p-1 rounded text-sm"
        >
          <option value="default" disabled class="text-gray-500">
            - 请选择参会人 -
          </option>
          <option v-for="(n, k) in users" :value="k">{{ n }}</option>
        </select>
      </div>
    </template>
  </Alert>
</template>

<style scoped></style>
