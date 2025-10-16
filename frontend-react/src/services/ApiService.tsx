import axios from "axios";

export const api = axios.create({
    baseURL: "https://dissemina-iff-backend.vercel.app/api/",
    timeout: 10000,
});