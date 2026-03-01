import React from 'react'
import './Register.css'
import { useState,useEffect,useContext } from 'react'
import { registerUser,loginUser } from '../../api/authApi'
import { AuthContext } from '../../context/authContext';
import { useNavigate,Link } from 'react-router-dom';
function Register() {
  const{ login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")
  const [userName,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [address,setAddress] = useState("")
  const [contactInfo,setContactInfo] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [errormsg,seterrormsg] = useState("")
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const [regUserName,setRegUserName] = useState("")
  const [regPassword,setRegPassword] = useState("")
  const hanldeRegister = async(e)=>{
    e.preventDefault();
    seterrormsg("");
    setMessage("");
    if(password != confirmPassword){
      seterrormsg("Passwords do not match")
      return;
    }
    setLoading(true);
    const payload = {
      userName : userName,
      email : email,
      password : password,
      address : address,
      contactInfo : contactInfo
    }
    try{
      const response = await registerUser(payload);
      if(response.data && response.data.data){
        console.log(response.data)
      setRegUserName(response.data.data.email)
      setRegPassword(password);
      await handleloginUser();
      }else{
        setMessage("Registration failed: Invalid response")
      }
    }catch(error){
      
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            "User with this email or username already exists";
        setMessage(errorMessage);
      }else{
        setMessage("Coudnt register ",error)
      }
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleloginUser = async()=>{
    setLoading(true);
    try{
        const res = await loginUser({
            userEmail : regUserName,
            userPassword : regPassword
        });

        login(res.data.data);
        setMessage("Login Successfull");
        console.log(res.data.data);
        
        navigate('/')
    }catch(err){
        setMessage("Login failed. Please check your credentials.");
        console.log(err)
    }finally{
        setLoading(false); 
    }
  }

  
  return (
    <>
    <div className="register-page-wrapper">
      <div>
          <h2 className="register-title">Register</h2>

          <div className="register-features">
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span className="feature-text">Secure</span>
            <span className="feature-text-sub">Your data is safe</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Fast</span>
            <span className="feature-text-sub">Quick checkout</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎁</span>
            <span className="feature-text">Offers</span>
            <span className="feature-text-sub">Exclusive deals</span>
          </div>
        </div>

        <div>
          {message && 
          <div className={`message ${message.includes('successful') || message.includes('Success') ? 'message-success' : 'message-info'}`}>{message}</div>}
        </div>
        
        <div>
          <form onSubmit={hanldeRegister}>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" 
              type="email" 
              value={email} 
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter your email"
              required></input>
            </div>

            <div className="form-group">
              <label htmlFor="userName">Full Name *</label>
              <input id="userName" 
              type="text" 
              value={userName} 
              onChange={(e)=> setUserName(e.target.value)}
              placeholder="Enter your full name"
              required></input>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input 
              id="address" 
              type="text" 
              value={address} 
              onChange={(e)=> setAddress(e.target.value)}
              placeholder="Enter your address"></input>
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input 
              id="contact" 
              type="number" 
              value={contactInfo}onChange={(e)=> setContactInfo(e.target.value)} 
              placeholder="Enter your contact number"></input>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-field">
              <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="Enter password (min. 6 characters"
              required
              minLength={6}></input>
              <span className="password-toggle"  
              onClick={()=>setShowPassword(!showPassword)}>{showPassword ? "👁️" : "👁️‍🗨️"}</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <div className="password-field">
              <input id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} 
              value={confirmPassword} 
              onChange={(e)=> setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              style={{
                borderColor: confirmPassword && password !== confirmPassword ? '#ff4444' : ''
              }}></input>
              <span className="password-toggle"
              onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "👁️" : "👁️‍🗨️"}</span>
              </div>
            </div>
            {errormsg && (
              <p style={{ color: 'red' }}>{errormsg}</p>
            )}
            {password && confirmPassword &&(
              <div className={`password-match ${password === confirmPassword ? 'match-success' : 'match-error'}`}>
                {password === confirmPassword ? "✓ Passwords Match" : "✗ Passwords do not match'"}</div>
            )}

            {errormsg && (
          <div className="message-error">
            ❌ {errormsg}
          </div>
        )}

            
            <div  className="register-button-container">
              <button 
              type="submit" 
              disabled={loading}
              className="register-button">{loading ? "Creating Account..." : "Register"}</button>
            </div>

            <div className="login-text">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </div>
            
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register