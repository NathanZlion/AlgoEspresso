import axios from "axios";
import { getAuthToken } from "./utils";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

apiClient.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getAuthToken()}`
    console.log(config.headers.Authorization)
    return config;
}, (err: Error) => {
    console.log(err)
});
