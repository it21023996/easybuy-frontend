import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import { useState } from 'react';
function LayoutRoutes() {
  const [categoryId, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <Header onCategoryChange={setCategoryId} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <main className="flex-grow-1">
        <Outlet context={{ categoryId,searchTerm, setSearchTerm }}/>
        </main>
        <Footer/>
        </div>
    </div>
  )
}

export default LayoutRoutes