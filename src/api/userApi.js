import axiosInstance from "./axiosConfig";

export const updateUser = (userId,data) =>{
    return axiosInstance.put(`/users/${userId}`,data)
}
export const getUserById = (userId)=>{
    return axiosInstance.get(`/users/${userId}`)
}