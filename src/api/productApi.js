import axiosInstance from "./axiosConfig";

export const createProduct = (data)=>{
    return axiosInstance.post(`/products`,data)
}

export const updateProduct = (productId,data)=>{
    return axiosInstance.patch(`/products/${productId}`,data)
}

export const getAllProducts = (categoryName,productName,page,size) =>{
    const params = {page,size}
    if(categoryName) params.categoryName = categoryName;
    if(productName) params.productName = productName;
    return axiosInstance.get(`/products`,{params})
}

export const getProductById = (productId)=>{
    return axiosInstance.get(`/products/${productId}`)
}

export const getProductByCategory = (categoryId,page,size)=>{
    const params = {page,size}
    return axiosInstance.get(`/products/by-category/${categoryId}`,{params})
}