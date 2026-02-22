import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";

function LayoutRoutes() {
  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-grow-1">
        <Outlet/>
        </main>
        <Footer/>
        </div>
    </div>
  )
}

export default LayoutRoutes