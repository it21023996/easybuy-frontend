import { useState,useContext } from 'react'
import { loginUser } from '../../api/authApi';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'
function Login({isModal = false,onClose}) {
    const{ login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false)

    const[loading,setLoading] = useState(false);
    const[message,setMessage] = useState("");
    
    const handleLogin = async(e)=>{
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try{
        const res = await loginUser({
            userEmail : userName,
            userPassword : password
        });

        login(res.data.data);
        setMessage("Login Successfull");
        console.log(res.data.data);
        navigate('/')
        if(onClose) onClose();
    }catch(err){
        setMessage("Login failed. Please check your credentials.");
        console.log(err)
    }finally{
        setLoading(false); 
    }
    };
  return (
    <>
        <div className = {!isModal ? 'login-page-wrapper': '' }>
            <form onSubmit={handleLogin}>
                <h2 className="login-title">Login / Register</h2>

                <div className='login-features'>
                    <div className='feature-item'>
                        <span className='feature-icon'>🚚</span>
                        <span className='feature-text'>Free shipping</span>
                        <span className='feature-text-sub'>Special for you</span>
                    </div>
                    <div className='feature-item'>
                        <span className='feature-icon'>↩️</span>
                        <span className='feature-text'>Free returns</span>
                        <span className='feature-text-sub'>Up to 90 days</span>
                    </div>
                </div>

                <input 
                placeholder='UserName' 
                onChange={(e)=>setUserName(e.target.value)} required></input>

                <div className="password-field">
                <input 
                type={showPassword ? 'text': 'password'}
                placeholder='Password' 
                onChange={(e)=>setPassword(e.target.value)} required></input>

                <span className='password-toggle' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? "🙈":"👁️"}</span>
                </div>
                

                <button 
                type ="submit" disabled={loading}>{loading ? "logged in..." : "Login"}</button>

                <p className='register-text'>Don't have an Account? 
                    <span className='register-link'>Create one</span>
                </p>

                {message && <p className='message-error '>{message}</p>}
            </form>
        </div>
    </>
  )
}

export default Login