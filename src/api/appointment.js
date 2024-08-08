import instance from "@/utils/request";

export function getAppointmentList(data) {
  return instance({
    url: "/api/appointment/list",
    method: "post",
    data,
  });
}
