import React from 'react'
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
  const {userName,token} = useContext(AuthContext);
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

  const toggleDropDown = ()=> setShowDropdown(!showDropdown);
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

          
          <div className="ms-auto position-relative">
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
            ) : (<div className="dropdown-wrapper" onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}>
            <button
              className="header-btn"
              onMouseEnter={toggleDropDown}>
                <FaUserCircle className="header-icon" />
                <div className="btn-texts">
                <span className="main-text">{!token ? "Login / Register" : "Hello, " + userName}</span>
            <span className="sub-text">Orders & Account</span>
            </div>
            </button> 
            
            {showDropdown && (
              <div className='header-dropdown' >
                <Link to="/dashboard" onClick={()=>setShowDropdown(false)}>Orders</Link>
                <Link to="/" >Account</Link>
                <Link to="/" >Account</Link>
                <Link to="/" >Account</Link>
                <Link to="/" >Account</Link>
                </div>
            )}
            
             </div>)}
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