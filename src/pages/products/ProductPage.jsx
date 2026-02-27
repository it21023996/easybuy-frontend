import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getProductById } from '../../api/productApi';
function ProductPage({productId}) {
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(true);
    const [message,setMessage] = useState("");
    useEffect(()=> {
        const fetchProduct = async()=>{
            setLoading(true);
            try{
                const response = await getProductById(productId);
                setProduct(response.data.data);
                console.log(response.data);
                setMessage("successfully fetched product details");
                }catch(error){
                    setMessage("Error fetching product details. Please try again later.");
                    console.error("Error fetching product details:", error);
                }finally{
                    setLoading(false);
                }
            }
            fetchProduct();    
    },[productId])
  return (
    <>
    <div>
        {loading ? (
            <div>Loading product details...</div>
        ) : product ? (
            <div></div>
        ) : (
            <div>
                <h2>No product found</h2>
            </div>
        )}
    </div>
    </>
  )
}

export default ProductPage