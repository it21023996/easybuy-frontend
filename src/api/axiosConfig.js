import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/api",
    timeout:10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if(token){
            config.headers.Authorization =  `Bearer ${token}`;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    (response)=> response,
    (error) => {
        if(error.response && error.response.status === 401){
            console.log("Unauthorized, token may be expired")
            //can add redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;