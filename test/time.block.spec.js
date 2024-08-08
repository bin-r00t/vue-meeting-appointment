import * as chai from "chai";
import { timeBlock2, timeBlock4 } from "../src/utils/index.js";

chai.should();

describe("时间块展示", function () {
  it("four blocks", function () {
    const time = [
      { startTime: "08:00", endTime: "08:15" },
      { startTime: "08:30", endTime: "08:45" },
      { startTime: "08:45", endTime: "10:30" },
      { startTime: "13:30", endTime: "14:00" },
    ];
    const res = timeBlock4(time);
    res.should.deep.equal([
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
    ]);
  });

  it("two blocks", function () {
    const time = [
      { startTime: "08:00", endTime: "08:15" },
      { startTime: "08:30", endTime: "08:45" },
      { startTime: "08:45", endTime: "10:30" },
      { startTime: "13:30", endTime: "14:00" },
    ];
    const res = timeBlock2(time);
    res.should.deep.equal([
      // 08:00
      [1, 1],
      // 09:00
      [1, 1],
      // 10:00
      [1, 0],
      // 11:00
      [0, 0],
      // 12:00
      [0, 0],
      // 13:00
      [0, 1],
      // 14:00
      [0, 0],
      // 15:00
      [0, 0],
      // 16:00
      [0, 0],
      // 17:00
      [0, 0],
      // 18:00
      [0, 0],
      // 19:00
      [0, 0],
      // 20:00
      [0, 0],
      // 21:00
      [0, 0],
      // 22:00
      [0, 0],
      // 23:00
      [0, 0],
    ]);
  });
});
