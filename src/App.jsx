import { Routes,Route } from 'react-router-dom'
import LayoutRoutes from './routes/LayoutRoutes'
import './App.css'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import AddProducts from './pages/products/AddProducts.jsx'
import ProductTable from './pages/products/ProductTable.jsx'
import UpdateProduct from './pages/products/UpdateProduct.jsx'
function App() {
  
  return (
   <Routes>

    <Route element={<LayoutRoutes/>}>
    <Route path = "/" element={<Home/>}></Route>
    <Route path = "/login" element={<Login/>}></Route>
    <Route path = "/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}></Route>
    <Route path = "/products/add-product" element={<ProtectedRoutes><AddProducts/></ProtectedRoutes>}></Route>
    <Route path = "/products/product-table" element={<ProtectedRoutes><ProductTable/></ProtectedRoutes>}></Route>
    <Route path = "/products/update/:productId" element={<ProtectedRoutes><UpdateProduct/></ProtectedRoutes>}></Route>
    </Route>
   </Routes>
  )
}

export default App
