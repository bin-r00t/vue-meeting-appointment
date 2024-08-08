export const timeFormatter = () => {};

// 15 分钟的毫秒数
const min15 = 15 * 60 * 1000;
// 30 分钟的毫秒数
const min30 = min15 * 2;

function handle(startHour, startMinute, endHour, endMinute, step, mapperArray) {
  let hours = endHour - startHour;
  debugger;
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
    /** 处理后部分 */
    blocks = Math.max(1, endMinute / step);
    for (let i = 0; i < blocks; i++) {
      mapperArray[startHour - 8 + hours][i] = 1;
    }
  }
}

export const timeBlock2 = function (time = []) {
  const result = Array(16)
    .fill(0)
    .map((_) => [0, 0]);

  for (let i = 0; i < time.length; i++) {
    const { startTime, endTime } = time[i];
    const [stHour, stMinute] = startTime.split(":");
    const [eHour, eMinute] = endTime.split(":");
    handle(+stHour, +stMinute, +eHour, +eMinute, 30, result);
  }
  console.log(result);
  return result;
};

export const timeBlock4 = function (time = []) {
  return [
    // 08:00
    [1, 0, 1, 1],
    // 09:00
    [1, 1, 1, 1],
    // 10:00
    [1, 1, 0, 0],
    // 11:00
    [0, 0, 0, 0],
    // 12:00
    [0, 0, 0, 0],
    // 13:00
    [0, 0, 1, 1],
    // 14:00
    [0, 0, 0, 0],
    // 15:00
    [0, 0, 0, 0],
    // 16:00
    [0, 0, 0, 0],
    // 17:00
    [0, 0, 0, 0],
    // 18:00
    [0, 0, 0, 0],
    // 19:00
    [0, 0, 0, 0],
    // 20:00
    [0, 0, 0, 0],
    // 21:00
    [0, 0, 0, 0],
    // 22:00
    [0, 0, 0, 0],
    // 23:00
    [0, 0, 0, 0],
  ];
};
