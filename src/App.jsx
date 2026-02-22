import { Routes,Route } from 'react-router-dom'
import LayoutRoutes from './routes/LayoutRoutes'
import './App.css'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  
  return (
   <Routes>
    <Route element={<LayoutRoutes/>}>
    <Route path = "/" element={<Home/>}></Route>
    <Route path = "/login" element={<Login/>}></Route>
    <Route path = "/dashboard" element={<Dashboard/>}></Route>
    </Route>
   </Routes>
  )
}

export default App
