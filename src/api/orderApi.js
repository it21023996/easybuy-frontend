import axiosInstance from "./axiosConfig";

export const addOrder = (userId)=>{
    return axiosInstance.post(`/order/order-add/${userId}`)
}

export const getAllOrders = ()=>{
    return axiosInstance.get("/order/get-all-orders")
}

export const getOrdersById = (userId,orderStatus,page,size)=>{
    return axiosInstance.get(`/order/get-orders-by-id/${userId}`,orderStatus,page,size)
}

export const cancelOrder = (orderId,orderStatus)=>{
    return axiosInstance(`/order/orders/${orderId}/status/${orderStatus}`)
}

