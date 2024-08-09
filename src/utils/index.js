export const timeFormatter = () => {};

// 15 分钟的毫秒数
// const min15 = 15 * 60 * 1000;
// 30 分钟的毫秒数
// const min30 = min15 * 2;

function handle(startHour, startMinute, endHour, endMinute, step, mapperArray) {
  let hours = endHour - startHour;
  if (hours < 1) {
    /** 如果没跨小时 */
    let blocks = Math.max(1, (endMinute - startMinute) / step);
    let startIndex = Math.max(0, parseInt(startMinute / step));
    for (let i = 0; i < blocks; i++) {
      /** 开始是 8 点 */
      mapperArray[startHour - 8][startIndex + i] = 1;
    }
  } else {
    let loop = hours - 1;
    while (loop) {
      mapperArray[startHour - 8 + loop] = step == 30 ? [1, 1] : [1, 1, 1, 1];
      loop--;
    }

    /** 处理前部分 */
    let blocks = Math.max(1, (60 - startMinute) / step);
    let startIndex = Math.max(0, parseInt(startMinute / step));
    for (let i = 0; i < blocks; i++) {
      mapperArray[startHour - 8][startIndex + i] = 1;
    }

    if (endMinute > 0) {
      /** 处理后部分 - 仅在 endMinute > 0 时需要处理 */
      blocks = Math.max(1, endMinute / step);
      for (let i = 0; i < blocks; i++) {
        mapperArray[startHour - 8 + hours][i] = 1;
      }
    }
  }
}

const timeBlockBase = function (time = [], step) {
  const result = Array(16)
    .fill(0)
    .map((_) => (step == 30 ? [0, 0] : [0, 0, 0, 0]));

  for (let i = 0; i < time.length; i++) {
    const { startTime, endTime } = time[i];
    const [stHour, stMinute] = startTime.split(":");
    const [eHour, eMinute] = endTime.split(":");
    handle(+stHour, +stMinute, +eHour, +eMinute, step, result);
  }
  return result;
};

export const timeBlock4 = function (time = []) {
  return timeBlockBase(time, 15);
};

export const timeBlock2 = function (time = []) {
  return timeBlockBase(time, 30);
};
