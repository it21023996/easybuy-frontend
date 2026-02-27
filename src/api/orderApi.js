import axiosInstance from "./axiosConfig";

export const addOrder = (userId)=>{
    return axiosInstance.post(`/orders/order-add/${userId}`)
}

export const getAllOrders = (orderStatus,categoryId,productName,page,size)=>{
    const params = {page,size}
    if(orderStatus) params.orderStatus = orderStatus;
    if(categoryId) params.categoryId = categoryId; 
    if(productName) params.productName = productName;
    return axiosInstance.get("/orders", { params })
}

export const getOrdersById = (userId,orderStatus,page,size)=>{
    return axiosInstance.get(`/orders/get-orders-by-id/${userId}`,orderStatus,page,size)
}

export const cancelOrder = (orderId,orderStatus)=>{
    return axiosInstance.patch(`/orders/${orderId}/status/${orderStatus}`)
}

export const updateOrderStatus = (orderId,orderStatus)=>{
    return axiosInstance.patch(`/orders/${orderId}/status/${orderStatus}`)
}

export const addselectedOrder = (data)=>{
    return axiosInstance.post(`/orders/add`,data)
}

