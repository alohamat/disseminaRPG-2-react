import axios from "axios";

export const api = axios.create({
    //baseURL: "https://dissemina-iff-backend.vercel.app/api/",
    // baseURL: "http://localhost:3000/api/",
    baseURL: "https://dissemina-iff-backend.onrender.com/api/",
    timeout: 10000,
});