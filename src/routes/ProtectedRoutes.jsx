import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
function ProtectedRoutes({ children}) {
    const {token} = useContext(AuthContext);
    if(!token) {
        return <Navigate to="/" replace/>
    }
  return children
}

export default ProtectedRoutes