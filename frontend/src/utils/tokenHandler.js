import jwt_decode from "jwt-decode";

export const token = localStorage.getItem('token')

export function tokenExist() { 
    if (token && jwt_decode(token).exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return false
    }
    if (!token) return false
    else return true
}