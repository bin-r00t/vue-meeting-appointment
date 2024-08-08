export const timeFormatter = () => {};

export const timeBlock2 = function (time = []) {
  const result = Array(16)
    .fill(0)
    .map((_) => [0, 0]);

  for (let i = 0; i < time.length; i++) {
    const { startTime, endTime } = time[i];
    console.log(startTime, endTime);
  }
  console.log("result", result);
  return result;
};

export const timeBlock4 = function (time = []) {
  return [
    // 08:00
    [1, 1, 1, 1],
    // 09:00
    [1, 1, 1, 1],
    // 10:00
    [1, 1, 0, 0],
    // 11:00
    [0, 0, 0, 0],
    // 12:00
    [0, 0, 0, 0],
    // 13:00
    [0, 0, 0, 0],
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
