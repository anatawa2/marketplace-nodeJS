import axios from 'axios'

const token = localStorage.getItem('token')
axios.defaults.baseURL = 'http://192.168.1.125:8080/'
axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

export function getAxios(endpoint) {
    try {
        return axios.get(endpoint)

    } catch (error) {
        console.log('in axios', error);
        return error.response
    }
}
export function postAxios(endpoint, inputs) {
    try {
        //return response.data.err
        return axios.post(endpoint, inputs)

    } catch (error) {
        console.log('in axios', error)
        return error.response
    }
}

export function patchAxios(endpoint, inputs) {
    try {
        return axios.patch(endpoint, inputs)

    } catch (error) {
        console.log('in axios', error);
        return error.response
    }
}

export function delAxios(endpoint, inputs) {
    try {
        return axios.delete(endpoint, inputs)
    } catch (error) {
        console.log('in axios', error);
        return error.response
    }
}

// export default async function getAxiosAxios (endpoint, cb)  {
// export default getAxiosAxios 