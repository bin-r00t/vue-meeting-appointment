import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000
})

instance.interceptors.request.use(function (config) {
    return config;
});

instance.interceptors.response.use(function (response){
    if (response.statusText != 'ok') {
        return Promise.reject('Errors happend in Axios>interceptors>response.')
    }
    if (response.data.code != 200 || !response.data.success) {
        return Promise.reject(response.data.msg)
    }
})

export default instance;