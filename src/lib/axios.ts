import axios from "axios";


const baseURL=import.meta.env.VITE_LOCALHOST

export const axiosInstance=axios.create({
    baseURL:baseURL
});