import React from 'react'
import { useState } from 'react'
import './AddToCartbutton.css'  
import { addProductsToCart } from '../../../api/cartApi'
function AddToCartbutton({productId,quantity}) {
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)

    const handleaddProductToCart = async()=>{
        setLoading(true);
        const payload = {
            productId: productId,
            quantity: quantity
        }
        try{
            const data = await addProductsToCart(payload);
            setMessage("Product added to cart successfully");
            setTimeout(() => setMessage(""), 3000);
            console.log(data);
        }catch(error){
            setMessage("Failed to add product to cart. Please try again later.");
            setTimeout(() => setMessage(""), 3000);
            console.error("Error adding product to cart:", error);
        }finally{
            setLoading(false);
        }
    }
  return (
    <>
      <button onClick={handleaddProductToCart} disabled={loading} className="add-to-cart-btn">
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {message && <p className="message">{message}</p>}
    </>
  )
}

export default AddToCartbutton