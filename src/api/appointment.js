import instance from "@/utils/request";

/**
 * 获取预约房间列表
 * @param {*} params URL参数, name,count,location,equipment,page,size,count,room_id
 * @returns
 */
export function getAppointmentList(params) {
  return instance({
    url: "/room/listByDate",
    method: "post",
    params,
  });
}

/**
 * 创建预约记录
 * @param {*} data 预约信息
 * @returns
 */
export function addAppointment(data) {
  return instance({
    url: "/appointment/add",
    method: "post",
    data,
  });
}

/**
 * 更新预约记录
 * @param {*} data 预约信息
 * @returns
 */
export function updateAppointment(data) {
  return instance({
    url: "/appointment/update",
    method: "put",
    data,
  });
}

/**
 * 删除我的预约
 * @param {*} data 预约信息
 * @returns
 */
export function delAppointment(params) {
  return instance({
    url: "/appointment/delete",
    method: "delete",
    params,
  });
}

/**
 * 文件上传
 * @param {*} file 文件
 * @returns 
 */
export function uploadFile(file) {
  return instance({
    url: "/upload",
    method: "post",
    data: null
  });
}

/**
 * 文件下载
 * @param {*} id 文件id
 * @returns 
 */
export function downloadFile(id) {
  return instance({
    url: "/download",
    method: "post",
    data: {id},
  });
}
