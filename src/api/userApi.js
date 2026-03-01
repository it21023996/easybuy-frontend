import axiosInstance from "./axiosConfig";

export const updateUser = (data) =>{
    return axiosInstance.put(`/users/update`,data)
}
export const getUserById = (userId)=>{
    return axiosInstance.get(`/users/${userId}`)
}
export const getUserByName = ()=>{
    return axiosInstance.get(`/users/user`)
}