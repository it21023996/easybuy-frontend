import React, { Children } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import Login from '../../../pages/auth/Login'; 
import './NavBar.css'
import logo from '../../../assets/logo.svg'
import { FaUserCircle } from "react-icons/fa";
function NavBar() {
  const navigate = useNavigate();
  const {userName,token,logout} = useContext(AuthContext);
  const [showLogin,setShowLogin] = useState(false);
  const openLogin = ()=> setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [showDropdown,setShowDropdown] = useState(false);
  
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

  const menuitem = [{
    label : "Products",
    Children : [
      {label : "All Products",path : "/products/product-table" },
      {label : "Add Product",path :"/products/add-product"},
      {label : "Update/Remove Product",path : "/"}
    ]
  },{
    label : "Account",
    Children : [
      {label : "View Account",path : "/"},
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
  return (
    <>
    <div className={`page-wrapper ${window.location.pathname === '/' ? 'home-page' : 'other-page'}`}>
      <nav className="navbar navbar-expand-lg fixed-top w-100"
       style={{ top: visible ? '0' : '-80px' }}>
        <div className="container">

          
          <span className="navbar-brand fw-bold">
            <Link to="/" className='navbar-brand fw-bold'>
            <img src={logo} alt='logo' height='40' className="d-inline-block align-text-top"></img>
            </Link> 
          </span>

          
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
                {menuitem.map((item,index)=> (
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