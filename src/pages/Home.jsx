import React from 'react'
import posterImage from "../assets/poster.jpg";
import './Home.css'
function Home() {
  return (
    <>
    <div className="page-content">
        <div className="poster-wrapper">
          <img src={posterImage} alt="Poster" className="poster-img" />
        </div>

        {/* Other content below poster */}
        <div className="container mt-4">
          <h2>Welcome to EasyBuy</h2>
          <p>Check out our latest products and offers!</p>
        </div>
      </div>

    </>
  )
}

export default Home