import React from 'react'
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-column">
          <h5>Company Info</h5>
          <p>About Us</p>
          <p>Contact</p>
        </div>
        <div className="footer-column">
          <h5>Customer Service</h5>
          <p>Help & FAQ</p>
          <p>Shipping Info</p>
          <p>Return & Refund</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer-column">
          <h5>Connect with Us</h5>
          <div className="footer-social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 EasyBuy LTD. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer