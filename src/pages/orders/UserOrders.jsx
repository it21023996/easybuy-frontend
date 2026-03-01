import React, { use } from 'react'
import './UserOrders.css'
import { useState,useEffect } from 'react'
import { getOrdersById } from '../../api/orderApi'
function UserOrders() {
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState("");
  const [orderStatus,setOrderStatus] = useState("");
  const [pageNumber,setPageNumber] = useState(0);
  const [pageSize,setPageSize] = useState(10);

  useEffect(()=>{
    setLoading(true);
    const fetchOrders = async()=>{
      try{
        const response = await getOrdersById(orderStatus,pageNumber,pageSize)
        console.log(response.data);
        setOrders(response.data.data);
      }catch(error){
        console.error("Error fetching orders:",error);
        setMessage("Failed to fetch orders. Please try again later.");
      }finally{
        setLoading(false);
    }
  }
    fetchOrders();
  },[orderStatus,pageNumber,pageSize])

  return (
    <>
    <div className="container py-4">
      <div className="cart-title"> 
        <h2>My Orders</h2>
      </div>


      {message && <>
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> setMessage("")}></button>
    </div>
      </>}


      <div>
        {loading ? 
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className='mt-3 text-muted'>Loading your orders...</p>
        </div> : (
          setOrders && orders.length == 0 ? 
          <div className="text-center py-5">
            <div className="empty-state">empty cart</div>
            <h3 className="h5 mb-3">No orders available</h3>
            <p className="text-muted mb-4">Looks like you haven't placed any orders yet.</p>
            <button className="btn btn-primary">Continue Shopping</button>
            </div> 
            :

            <div className="cart-items-grid">
              {orders.map((order)=> (
                <div key={order.orderId} className="cart-item-card">
                  <h5 className="cart-item-id">Order #{order.orderId}</h5>

                  {order.orderItemGetDTO && order.orderItemGetDTO.length > 0 && (
                    <div className="products-container">
                      <h4 className="products-title">Products</h4>
                      <div className="order-items-grid">
                      {order.orderItemGetDTO.map((item,index)=>(
                        <div key={index} className="order-item-card">
                          <img src={item.imageUrl} 
                          alt={item.productName} 
                           className="order-item-image"/>
                           <div className="order-item-details">
                          <p className="order-item-name">{item.productName}</p>
                          <p className="order-item-quantity">Quantity: {item.quantity}</p>
                          <p className="order-item-price">Price: Rs.{item.priceAtPurchase}</p>
                          <p className="order-item-total">Total Price: Rs.{item.totalAmount}</p>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                  )}

                  <div className="order-details-container">
                    <div className="order-summary-title">Order Summary</div>
                    <div className="order-details-grid">
                      <div className="detail-item">
                        <span className='detail-label'>Placed on: </span>
                        <span className="detail-value">{order.createdAt}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Status : </span>
                        <span className={`detail-value status-badge status-${order.orderStatus?.toLowerCase()}`}>{order.orderStatus}</span>
                      </div>

                      <div className="detail-item full-width">
                        <span className="detail-label">Shipping Address : </span>
                        <span className="detail-value">{order.shippingAddress}</span>
                      </div>

                      <div className="detail-item total">
                        <span className="detail-label">Total Amount : </span>
                        <span className="detail-value total-amount">Rs.{order.totalAmount}</span>
                      </div>
                  
                
                
                  
                  </div>

                  {order.orderStatus === "PENDING" && (
                    <div className="order-actions">
                    <button className='cancel-order'>Cancel Order</button>
                    </div>
                  ) }
                  
                  </div>


                  </div>
              ))}

            </div>
        )}

      </div>
    </div>
    </>
  )
}

export default UserOrders