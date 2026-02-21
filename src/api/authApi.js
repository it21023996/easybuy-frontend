import { publicAxios } from "./publicAxios"

export const loginUser = (data) =>{
    return publicAxios.post("/authenticate",data)
}

export const registerUser = (data)=>{
    return publicAxios.post("/users",data)
}