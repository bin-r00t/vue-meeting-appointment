import Mock, { Random } from "mockjs";

const LOCATIONS = [
  "明珠商务中心5号楼501",
  "明珠商务中心5号楼601",
  "明珠商务中心5号楼301",
  "明珠商务中心5号楼201",
  "明珠商务中心5号楼101",
  "明珠商务中心5号楼701",
  "浙商证券大厦302",
  "浙商证券大厦401",
  "浙商证券大厦515",
  "浙商证券大厦212",
  "浙商证券大厦109",
];

const EQUIPMENTS = [
  "路由器",
  "交换机",
  "空调",
  "长桌",
  "投影仪",
  "饮水机",
  "显示器",
  "机顶盒",
];

export const TEMPLATE = {
  Room: {
    id: "@id",
    name: "ZS_" + "@integer(100,200)" + "会议室",
    count: "@integer(0,30)",
    description: "@csentence(5,10)",
    location: () => Random.pick(LOCATIONS),
    equipment: () => {
      let es = [];
      for (let i = 0; i < Random.integer(1, 4); i++) {
        const e = Random.pick(EQUIPMENTS);
        if (!es.includes(e)) {
          es.push(e);
        }
      }
      return es.join(",");
    },
  },
  AppointmentRoom: {},
};

const BASE_URL = "http://localhost:8000";

// Mock.mock(`${BASE_URL}/api/appointment/list`, "post", {
//   success: true,
//   code: 200,
//   "data|2-10": [TEMPLATE.Room],
// });

const doMock = function (url, ...options) {
  if (url instanceof RegExp) {
    return Mock.mock(url, ...options);
  }
  return Mock.mock(`${BASE_URL}${url}`, ...options);
};

/** 所有会议室列表 */
doMock(/api\/room\/listByDate/, {
  success: true,
  code: 200,
  "data|2-10": [TEMPLATE.Room],
});
