import React from 'react'
import { useState } from 'react'
import { updateOrderStatus } from '../../../api/orderApi'
import './OrderStatusButton.css'
function OrderStatusButton({ orderId,orderStatus,onStatusUpdate }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setLoading(true);
        setMessage("");
        try{
            const response = await updateOrderStatus(orderId, newStatus);
            console.log(response.data.data);
            setMessage("Order status updated successfully");
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
            if (onStatusUpdate) {
                onStatusUpdate();
            }
        } catch(error){
            setMessage("Failed to update order status: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const renderButton = () => {
        switch(orderStatus){
            case "PENDING":
                return (
                    <div className="action-buttons">
                        <button 
                            onClick={() => handleStatusChange("PROCESSING")}
                            disabled={loading}
                            className="status-btn processing-btn"
                        >
                            PROCESSING
                        </button>
                        <button 
                            onClick={() => handleStatusChange("COMPLETED")}
                            disabled={loading}
                            className="status-btn completed-btn"
                        >
                            COMPLETED
                        </button>
                        <button 
                            onClick={() => handleStatusChange("CANCELLED")}
                            disabled={loading}
                            className="status-btn cancelled-btn"
                        >
                            CANCELLED
                        </button>
                    </div>
                );
            case "PROCESSING":
                return (
                    <div className="action-buttons">
                        <button 
                            onClick={() => handleStatusChange("COMPLETED")}
                            disabled={loading}
                            className="status-btn completed-btn"
                        >
                            COMPLETED
                        </button>
                        <button 
                            onClick={() => handleStatusChange("CANCELLED")}
                            disabled={loading}
                            className="status-btn cancelled-btn"
                        >
                            CANCELLED
                        </button>
                    </div>
                );
            case "COMPLETED":
                return (
                    <></>
                );
            case "CANCELLED":
                return (
                    <></>
                );
            
            default:
                return null;
        }
    };
    return (
        <div className="order-actions-container">
            {renderButton()}
            
            {loading && (
                <div className="loading-overlay">
                    <span className="spinner"></span>
                    Updating...
                </div>
            )}
            
            {message.text && (
                <p className={`action-message ${message.type}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
  


export default OrderStatusButton