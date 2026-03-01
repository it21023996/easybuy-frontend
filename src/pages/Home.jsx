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
        
      </div>
     
    </>
  )
}

export default Home