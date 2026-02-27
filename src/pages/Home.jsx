import React from 'react'
import posterImage from "../assets/poster.jpg";
import './Home.css'
import HomeProducts from '../components/HomeProducts.jsx'
import { useOutletContext } from 'react-router-dom';
function Home() {
  const { categoryId,searchTerm, setSearchTerm } = useOutletContext();
  return (
    <>
    
    <div className="page-content">
        <div className="poster-wrapper">
          <img src={posterImage} alt="Poster" className="poster-img" />
        </div>

        <HomeProducts selectedCategory={categoryId} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <div className="container mt-4">
          <h2>Welcome to EasyBuy</h2>
          <p>Check out our latest products and offers!</p>
        </div>
      </div>
     
    </>
  )
}

export default Home