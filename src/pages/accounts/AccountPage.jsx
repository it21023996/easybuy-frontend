import React from 'react'
import { useState,useEffect } from 'react'
import { getUserByName } from '../../api/userApi'
import { Link, useNavigate } from 'react-router-dom';
import './AccountPage.css'
function AccountPage() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [orderCount,setOrderCount] = useState(0);
    const [message,setMessage] = useState("")
    const [user,setUser] =useState([])

    useEffect(()=>{
        setLoading(true)
        const getuserdetails = async()=>{
            try{
                const response = await getUserByName();
                setUser(response.data.data.userGetDTO);
                setOrderCount(response.data.data.orderCount);
                console.log(response.data)
            }catch(error){
                console.log(error)
                setMessage("error fetching user ",error)
            }finally{
                setLoading(false)
            }
        }
        getuserdetails();
    },[])

    if (loading) return <div className="loading-spinner">Loading...</div>
    if (message) return <div className="error-message">{message}</div>
    if (!user) return <div className="error-message">No user data found</div>

  return (
    <>
    <div className="account-page-container">
        <div className="account-header">
            <h2>My Account</h2>
        </div>
        <div className="account-content">
            <div className="user-details-section">
            <div className="user-details-grid">
            <div className="user-detail-item">
                <span className="detail-label">User Name : </span>
                <span className="detail-value">{user.userName}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">User Email : </span>
                <span className="detail-value">{user.email}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">Created Time : </span>
                <span className="detail-value">{user.createTime ? new Date(user.createTime).toLocaleDateString(): 'N/A'}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">User contact Info : </span>
                <span className="detail-value">{user.contactInfo}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">User Address : </span>
                <span className="detail-value">{user.address}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">User Role : </span>
                <span className="detail-value">
                    <span className="role-badge">{user.role || 'USER'}</span>
                </span>
            </div>
            </div>
        </div>

        <div className="order-count-section">
            <div>
                <Link to="/my-orders" className="order-count-link" >
                <div className="order-count-circle">
                <span className="order-count-label">Total Orders</span>
                <span className="order-count-number">{orderCount}</span>
                <span className="order-count-subtitle">Click to view</span>
                </div>
                </Link>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default AccountPage