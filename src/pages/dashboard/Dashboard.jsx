import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
function Dashboard() {
    const {userName} = useContext(AuthContext);
  return (
    
    <>
    <p>kjdhvudvkadnclkjasncansjkl</p>
    <h1>hello {userName}</h1>
    </>
  )
}

export default Dashboard