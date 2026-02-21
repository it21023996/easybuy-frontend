import axiosInstance from "./axiosConfig";

export const createCategory = (data)=>{
    return axiosInstance.post(`/categories`,data)
}

export const updateCategory = (categoryId,data)=> {
    return axiosInstance.put(`/categories/${categoryId}`,data)
}

export const deleteCategoryById = (categoryId)=>{
    return axiosInstance.delete(`/categories/${categoryId}`)
}

export const getAllCategories = ()=>{
    return axiosInstance.get(`/categories`)
}

export const getCategoriesForDropdown = ()=>{
    return axiosInstance.get(`/categories/dropdown`)
}