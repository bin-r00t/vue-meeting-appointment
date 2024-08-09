import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useSearchConditionStore = defineStore("searchCondition", {
  state: () => {
    return {
      date: dayjs().format("YYYY-MM-DD"),
    };
  },
  getters: {},
  actions: {},
});
