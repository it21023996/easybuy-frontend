import React from 'react'
import { useState,useEffect,useCallback } from 'react'
import { getAllOrders } from '../../api/orderApi'
import './AllOrders.css'
import OrderStatusButton from '../../components/common/buttons/OrderStatusButton'
function AllOrders() {
  const [orderStatus,setOrderStatus]= useState("")
  const [categoryId,setCategoryId] = useState("")
  const [productName,setProductName] = useState("")
  const [pageNumber,setPageNumber] =useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")
  
    
    
    const getAllOrdersData = useCallback(async () => {
      setLoading(true)
      try{
        const response =  await getAllOrders(orderStatus,categoryId,productName,pageNumber,pageSize)
        console.log("Is array?", Array.isArray(response.data.data))
console.log("Type:", typeof response.data.data)
        setOrders(response.data.data)
        console.log(response.data)
      }catch(error){
        setMessage("Error fetching orders: " + error.message)
      }finally {
            setLoading(false);
        }
    
  },[orderStatus,categoryId,productName,pageNumber,pageSize]);

  useEffect(() => {
        getAllOrdersData();
    }, [getAllOrdersData]);

  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrderItems = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };
  

  return (
    <>
    <div className="order-table-container">
      <table className="table order-table">
        <tbody>
          {orders.length === 0 ? (
            <tr><td className="order-cell">No orders found.</td></tr>
          ) : (
            orders.map((order) => (
              <React.Fragment key={order.orderId}>
               
                <tr className="order-main-row">
                  <td className="order-cell">
                    <div className="order-info">
                      <button 
                        className={`expand-btn ${expandedOrders[order.orderId] ? 'expanded' : ''}`}
                        onClick={() => toggleOrderItems(order.orderId)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M6 12L10 8L6 4V12Z" />
                        </svg>
                      </button>
                      
                      <div className="order-details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Order ID:</span>
                          <span className="detail-value">#{order.orderId}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Customer:</span>
                          <span className="detail-value">{order.userId}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Total Amount:</span>
                          <span className="detail-value">Rs: {order.totalAmount}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className={`detail-value status ${order.orderStatus?.toLowerCase()}`}>
                            {order.orderStatus}
                          </span>
                          <OrderStatusButton orderId={order.orderId} orderStatus={order.orderStatus} onStatusUpdate={getAllOrdersData}/>
                      
                        </div>
                        <div className="detail-item full-width">
                          <span className="detail-label">Shipping Address:</span>
                          <span className="detail-value address">{order.shippingAddress}</span>
                        </div>
                        <div>
                          <span className="detail-label">Order Date:</span>
                          <span className="detail-value">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                
                {expandedOrders[order.orderId] && (
                  <tr className="order-items-row">
                    <td className="order-cell items-cell">
                      <div className="items-container">
                        <h4 className="items-title">Order Items</h4>
                        <div className="items-grid">
                          {order.orderItemGetDTO?.map((item) => (
                            <div key={item.orderItemId} className="item-card">
                              <div className="item-image">
                                <img 
                                  src={item.imageUrl || '/placeholder.jpg'} 
                                  alt={item.productName}
                                />
                              </div>
                              <div className="item-details">
                                <div className="item-detail">
                                  <span className="item-label">Product:</span>
                                  <span className="item-value">{item.productName}</span>
                                </div>
                                <div className="item-detail">
                                  <span className="item-label">Price:</span>
                                  <span className="item-value">Rs: {item.priceAtPurchase}</span>
                                </div>
                                <div className="item-detail">
                                  <span className="item-label">Qty:</span>
                                  <span className="item-value">{item.quantity}</span>
                                </div>
                                <div className="item-detail">
                                  <span className="item-label">Total:</span>
                                  <span className="item-value">Rs: {item.totalAmount}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AllOrders