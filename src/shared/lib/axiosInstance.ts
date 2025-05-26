import type { AxiosInstance } from "axios";
import axios from "axios";

// interface ExtendAxiosRequestConfig extends InternalAxiosRequestConfig{
//     sent?:boolean
// }

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials:true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if(token){
            config.headers.Authorization = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)