import axios from "axios";

export const api = axios.create({
    baseURL: "https://dissemina-iff-backend.vercel.app/api/",
    //baseURL: "http://localhost:3000/api/",
    timeout: 10000,
});