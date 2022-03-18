import axios from "axios";

const URL_API = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_URL_API : process.env.NEXT_PUBLIC_DEV_URL_API;

const api = axios.create({
    baseURL: URL_API
})

export default api;
