import { createContext,useState,useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
    const [token,setToken] = useState(localStorage.getItem("token") || null)
    const [userId,setUserId] = useState(localStorage.getItem("userId") || null)
    const [role,setRole] = useState(localStorage.getItem("role") || null)
    const [userName, setUserName] = useState(localStorage.getItem("userName") || null);

    useEffect(()=> {
        if(token)localStorage.setItem("userName",userName);
        else localStorage.removeItem("userName")

        if(token) localStorage.setItem("token",token);
        else localStorage.removeItem("token");

        if(userId) localStorage.setItem("userId",userId);
        else localStorage.removeItem("userId");

        if(role) localStorage.setItem("role",role);
        else localStorage.removeItem("role")
    },[token,userId,role,userName])

    const login = (loginData)=>{
        setToken(loginData.token)
        setUserId(loginData.userId)
        setUserName(loginData.userName)
        setRole(loginData.role)
    }

    const logout = () => {
        setToken(null);
        setUserId(null);
        setRole(null);
        setUserName(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{token,userId,role,userName,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}