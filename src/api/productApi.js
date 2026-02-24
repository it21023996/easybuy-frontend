import axiosInstance from "./axiosConfig";

export const createProduct = (data)=>{
    return axiosInstance.post(`/products`,data)
}

export const updateProduct = (productId,data)=>{
    return axiosInstance.patch(`/products/${productId}`,data)
}

export const getAllProducts = (categoryId,productName,active,page,size) =>{
    const params = {page,size}
    if(categoryId) params.categoryId = categoryId; 
    if(productName) params.productName = productName;
    if(active) params.active = active;
    return axiosInstance.get(`/products`,{params})
}

export const getProductById = (productId)=>{
    return axiosInstance.get(`/products/${productId}`)
}

export const getProductByCategory = (categoryId,page,size)=>{
    const params = {page,size}
    return axiosInstance.get(`/products/by-category/${categoryId}`,{params})
}