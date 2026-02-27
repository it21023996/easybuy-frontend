import axiosInstance from "./axiosConfig";

export const addProductsToCart = (data)=>{
    return axiosInstance.post(`/carts`,data)
}

export const getCartById = ()=>{
    return axiosInstance.get(`/carts`)
}

export const updateCartItemQuantity= (cartId,cartItemId,data)=>{
    return axiosInstance.patch(`/carts/${cartId}/items/${cartItemId}`,data)
}

export const deleteItemFromCart = (cartId,cartItemId)=>{
    return axiosInstance.delete(`/carts/${cartId}/items/${cartItemId}`)
}

export const clearCart = (cartId)=>{
    return axiosInstance.delete(`/carts/${cartId}/clear`)
}