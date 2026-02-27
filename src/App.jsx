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
import AllOrders from './pages/orders/AllOrders.jsx'
import Test from './pages/Test.jsx'
import Cart from './pages/cart/Cart.jsx'
import UserOrders from './pages/orders/UserOrders.jsx'
function App() {
  
  return (
   <Routes>

    <Route element={<LayoutRoutes/>}>
    <Route path = "/" element={<Home/>}></Route>
     <Route path = "/test" element={<Test/>}></Route>
    <Route path = "/login" element={<Login/>}></Route>
    <Route path = "/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}></Route>
    <Route path = "/products/add-product" element={<ProtectedRoutes><AddProducts/></ProtectedRoutes>}></Route>
    <Route path = "/products/product-table" element={<ProtectedRoutes><ProductTable/></ProtectedRoutes>}></Route>
    <Route path = "/products/update/:productId" element={<ProtectedRoutes><UpdateProduct/></ProtectedRoutes>}></Route>
    <Route path = "/cart" element={<ProtectedRoutes><Cart/></ProtectedRoutes>}></Route>
    <Route path = "/orders" element={<ProtectedRoutes><AllOrders/></ProtectedRoutes>}></Route>
    <Route path = "/my-orders" element={<ProtectedRoutes><UserOrders/></ProtectedRoutes>}></Route>
    </Route>
   </Routes>
  )
}

export default App
