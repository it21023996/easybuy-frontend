import React from 'react'
import NavBar from "../navBar/NavBar";
import './Header.css'
function Header({onCategoryChange,searchTerm, setSearchTerm}) {
  return (
    <>
    <NavBar onCategoryChange={onCategoryChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    <div className="header-spacer"></div>
    </>
  )
}

export default Header