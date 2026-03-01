import React, { Children, use } from 'react'
import { useNavigate,Link,useLocation  } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import Login from '../../../pages/auth/Login'; 
import './NavBar.css'
import logo from '../../../assets/logo.svg'
import { FaUserCircle } from "react-icons/fa";
import CategoryDropdown from '../dropdowns/CategoryDropdown';
import SearchBar from '../dropdowns/SearchBar';
import Cart from '../../../pages/cart/Cart';
import { getCartById } from '../../../api/cartApi';
function NavBar({onCategoryChange,searchTerm,setSearchTerm}) {

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigate = useNavigate();
  const {userName,token,logout} = useContext(AuthContext);
  const {role} = useContext(AuthContext)
  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";
  const [showLogin,setShowLogin] = useState(false);
  const openLogin = ()=> setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [showDropdown,setShowDropdown] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState("")
  const [showCart,setShowCart] = useState(false);

  const [productCount,setProductCount] = useState(0);

  const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    return !!token
  }
  
  useEffect(()=>{
    const fetchCart = async()=> {
      if (!isAuthenticated()) {
      console.log('User not authenticated, skipping cart fetch')
      return
    }
    try{
      const response = await getCartById();
      setProductCount(response.data.data.cartItemDTOList.length);
      console.log("Cart items count:",response.data.data.cartItemDTOList.length || 0);
    }catch(error){
      console.error("Error fetching cart data:",error);
    }
  }
  fetchCart();
   },[isUser])

  

  const handleLogout =()=> {
        logout();
        setSearchTerm("");
        onCategoryChange("");
        navigate("/");
    }
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos && currentScrollPos > 50) {
        setVisible(false); // scrolling down → hide
      } else {
        setVisible(true); // scrolling up → show
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleMouseLeave = () => {
    setTimeout(() => setShowDropdown(false), 100); 
  };

  const adminMenuitem = [{
    label : "Products",
    Children : [
      {label : "All Products",path : "/products/product-table" },
      {label : "Add Product",path :"/products/add-product"}
    ]
  },{
    label : "Orders",
    Children : [
      {label : "View All Orders",path : "/orders"}
    ]
  },
  {
    label : "Account",
    Children : [
      {label : "View Account",path : "/my-account"},
      {label : "update/Delete Account",path : "/"}
    ]
  },{
    label : "LogOut",action: "logout",
    onClick : ()=> {
      logout();
      setShowDropdown(false);
      navigate("/")
    }
  } ]

  const userMenuitem = [{
    label : "Cart",
    Children : [
      {label : "View Cart",path : "/cart" },
    ]
  },{
    label : "Orders",
    Children : [
      {label : "View Orders",path : "/my-orders"}
    ]
  },
  {
    label : "Account",
    Children : [
      {label : "View Account",path : "/my-account"},
      {label : "update/Delete Account",path : "/edit-my-account"}
    ]
  },{
    label : "LogOut",action: "logout",
    onClick : handleLogout
  } ]

  const toggleCart = () => {
    setShowCart(prev => !prev);
  }
  return (
    <>
    <div className={`page-wrapper ${window.location.pathname === '/' ? 'home-page' : 'other-page'}`}>
      <nav className="navbar navbar-expand-lg fixed-top w-100"
       style={{ top: visible ? '0' : '-80px' }}>
        <div className="container">

          
          <span className="navbar-brand fw-bold">
            <a href="/" className='navbar-brand fw-bold'>
            <img src={logo} alt='logo' height='40' className="d-inline-block align-text-top"></img>
            </a> 
          </span>

          {isHomePage &&  (<>
          <div className="nav-search-category-wrapper">          
            <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>
          
          <div>
            <CategoryDropdown className="category-dropdown" onChange={(value)=>onCategoryChange(value)}/>
          </div>
          <p>{console.log(selectedCategory)}</p>
          </div>
          </>)}
          




          
          <div className="ms-auto position-relative dropdown-wrapper"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={ handleMouseLeave}>
            {!token ? (
            <button
              className="header-btn"
              onClick={openLogin}>
                <FaUserCircle className="header-icon" />
                <div className="btn-texts">
                <span className="main-text">Login / Register</span>
            <span className="sub-text">Orders & Account</span>
            </div>
            </button>
            ) : (<>
            <button
              className="header-btn">
                <FaUserCircle className="header-icon" />
                <div className="btn-texts">
                <span className="main-text">{!token ? "Login / Register" : "Hello, " + userName}</span>
            <span className="sub-text">Orders & Account</span>
            </div>
            </button> 
            
            {showDropdown && (
              <div className={`mega-overlay ${showDropdown ? 'show' : ''}`}>
                <div className='mega-menu container'>
                  {isAdmin ? adminMenuitem.map((item,index)=> (
                  <div key = {index}
                  className='mega-column'>
                    {item.path ? (<Link to={item.path} className='mega-title' onClick={handleMouseLeave}>{item.label}</Link>) : 
                    item.onClick ? ( <div  className="mega-links"> <Link onClick={item.onClick} className="mega-link">{item.label}</Link></div>) : (<div className='mega-title'>{item.label}  </div>) }
                    {item.Children && (
                      <div className="mega-links">{item.Children.map((sub,subIndex) => (
                        <Link key={subIndex} to ={sub.path} onClick={handleMouseLeave} className="mega-link">{sub.label}</Link>
                      ))}</div>
                    )}
                  </div>
                )) : userMenuitem.map((item,index)=> (
                  <div key = {index}
                  className='mega-column'>
                    {item.path ? (<Link to={item.path} className='mega-title' onClick={handleMouseLeave}>{item.label}</Link>) : 
                    item.onClick ? ( <div  className="mega-links"> <Link onClick={item.onClick} className="mega-link">{item.label}</Link></div>) : (<div className='mega-title'>{item.label}  </div>) }
                    {item.Children && (
                      <div className="mega-links">{item.Children.map((sub,subIndex) => (
                        <Link key={subIndex} to ={sub.path} onClick={handleMouseLeave} className="mega-link">{sub.label}</Link>
                      ))}</div>
                    )}
                  </div>
                ))}
                


                </div>
                </div>
            )}
            
             </>)}

             
          </div>
          {isUser && (<>
             
             <button className="cart-icon-btn" onClick={toggleCart}>
        🛒
        {productCount > 0 && <span className="cart-count">{productCount}</span>}
      </button>
          {showCart && <div className="cart-dropdown">
          <Cart variant="modal" onClose={()=>setShowCart(false)} />
        </div>}
             </>)}
          
          

        </div>
      </nav>

      {/* Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="login-modal-wrapper">
            <button className="close-btn" onClick={closeLogin}>
              X
            </button>
            <Login isModal={true}  onClose={closeLogin}/>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default NavBar