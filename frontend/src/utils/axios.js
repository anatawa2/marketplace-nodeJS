import axios from 'axios'

const token = localStorage.getItem('token')
axios.defaults.baseURL = 'http://192.168.1.125:8080/'
axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

export async function getAxios(endpoint, setdata) {
    try {
        const res = await axios.get(endpoint)
        if (res.data) setdata(res.data)
    } catch (error) {
        console.log(error);
    }
}
export async function postAxios(endpoint, inputs) {
    try {
        const res = await axios.post(endpoint, inputs)
        console.log(res.data);
        return res.data

    } catch (error) {
        console.log(error)
        return (error.response.data)
    }
}

export function patchAxios(endpoint, inputs) {
    try {
        axios.patch(endpoint, inputs)
    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

// export default async function getAxiosAxios (endpoint, cb)  {
// export default getAxiosAxios 