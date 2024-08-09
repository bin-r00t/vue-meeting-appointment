import instance from "@/utils/request";

export function getAppointmentList(params) {
  return instance({
    url: "/api/room/listByDate",
    method: "post",
    params,
  });
}
