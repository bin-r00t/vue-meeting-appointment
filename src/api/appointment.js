import instance from '@/utils/request';


export async function getAppointmentList(data) {
    return instance({
        url: '/api/appointment/list',
        method: 'post',
        data
    })
}