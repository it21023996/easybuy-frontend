import { useState,useContext } from 'react'
import { loginUser } from '../api/authApi';
import { AuthContext } from '../context/authContext';
function Login() {
    const{ login } = useContext(AuthContext);

    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

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
    }catch(err){
        setMessage("Login failed. Please check your credentials.");
        console.log(err)
    }finally{
        setLoading(false); 
    }
    };
  return (
    <>
    <div>
        <div>
            <form onSubmit={handleLogin}>
                <input placeholder='userName' onChange={(e)=>setUserName(e.target.value)}></input>
                <input placeholder='password' onChange={(e)=>setPassword(e.target.value)}></input>
                <button type ="submit" disabled={loading}>{loading ? "logged in..." : "Login"}</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login