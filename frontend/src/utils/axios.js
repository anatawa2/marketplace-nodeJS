import axios from 'axios'

const token = localStorage.getItem('token')
axios.defaults.baseURL = 'http://192.168.1.125:8080/'
axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

export async function getAxios(endpoint) {
    try {
        return await axios.get(endpoint)

    } catch (error) { 
        console.log('in axios',error);
    }
}
export async function postAxios(endpoint, inputs) {
    try {
        return await axios.post(endpoint, inputs) 

    } catch (error) {
        console.log('in axios',error)
        return error
    }
}

export async function patchAxios(endpoint, inputs) {
    try {
        return await axios.patch(endpoint, inputs)

    } catch (error) {
        console.log('in axios',error);
        return error
    }
}

export async function delAxios(endpoint, inputs) {
    try {
        return await axios.delete(endpoint, inputs)
    } catch (error) {
        console.log('in axios',error);
        return error
    }
}

// export default async function getAxiosAxios (endpoint, cb)  {
// export default getAxiosAxios 