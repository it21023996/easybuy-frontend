import axios from "axios";

export const publicAxios = axios.create({
    baseURL: "http://localhost:8081/api",
});