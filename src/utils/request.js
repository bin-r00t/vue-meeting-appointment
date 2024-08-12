import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "/api",
  timeout: 10000,
});

instance.interceptors.request.use(function (config) {
  // config.headers["Content-Type"] = "application/json";
  return config;
});

instance.interceptors.response.use(function (response) {
  console.log("response", response);
  if (response.statusText != "OK") {
    console.log("interceptors-1", response);
    return Promise.reject("Errors happend in Axios>interceptors>response.");
  }
  if (response.data.code != 200 || !response.data.success) {
    console.log("interceptors-2", response.data);
    return Promise.reject(response.data.msg);
  }
  return response.data;
});

export default instance;
