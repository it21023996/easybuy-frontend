import React from 'react'
import { getUserByName,updateUser } from '../../api/userApi'
import { useState,useEffect } from 'react'
import './AccountPage.css'
function UpdateAccountPage() {
    const [message,setMessage]= useState("")
    const [loading,setLoading] = useState(false)
    const [user,setUser]=useState(null)
    const [userName,setUserName] = useState("")
    const [address,setAddress] = useState("")
    const [contactInfo,setContactInfo]=useState("")

    const fetchUser = async()=>{
            try{
                const response = await getUserByName();
                const userdata =  response.data.data.userGetDTO;
                setUser(userdata)
                setUserName(response.data.data.userGetDTO.userName || "")
                setAddress(response.data.data.userGetDTO.address || "");
                setContactInfo(response.data.data.userGetDTO.contactInfo|| "")
                console.log(response.data.data)

            }catch(error){
                setMessage("user not fetching",error)
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

    useEffect(()=>{
        setLoading(true)
        fetchUser();
    },[])

    const update = async(e)=>{
        e.preventDefault() 

         const isConfirmed = window.confirm("Are you sure you want to update your account?");
    
    if (!isConfirmed) {
        return; 
    }
        const payload = {
            userName : userName,
            address : address,
            contactInfo : contactInfo
        }
        console.log(payload)
        setLoading(true);
        try{
            const repsonse =  await updateUser(payload);
            console.log(repsonse.data)
            setMessage("Succesfully Updated the user")
            fetchUser();
        }catch(error){
            setMessage("error updating user")
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    if (!user) return <div>{loading}</div>
  return (
    <>

    {message && 
    <div className="alert-wrapper">
    <div className="alert-modern success" role="alert">
        <span className="alert-icon">✓</span>
        {message}
        <button type = "button" className='btn-close' data-bs-dismiss="alert" aria-label="Close" onClick={()=> setMessage("")}></button>
        </div>
        </div>}


    <div className="account-page-container">
        <div className="account-header">
            <h3>Update Account</h3>
        </div>
        <div className="account-content">
            <div className="user-details-section">
            <div className="user-details-grid">
            <form onSubmit={update}>
            <div className="user-detail-item">
                <span className="detail-label">User Name : </span>
                <input value={userName} onChange={(e)=>setUserName(e.target.value)} className="detail-value"/>
            </div>
            <div className="user-detail-item">
                <span  className="detail-label">User Email : </span>
                <span className="detail-value">{user.email}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">Created Date : </span>
                <span className="detail-value">{user.createTime ? new Date(user.createTime).toLocaleDateString(): 'N/A'}</span>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">Address : </span>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} className="detail-value"/>
            </div>
            <div className="user-detail-item">
                <span className="detail-label">Contact Info : </span>
                <input value={contactInfo} onChange={(e)=>setContactInfo(e.target.value)} className="detail-value"/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type='submit' className='submit-btn' disabled={loading}>{loading ? "Updating...": "Submit"}</button>
            </div>
            </form>
            </div>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default UpdateAccountPage