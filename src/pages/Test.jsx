import React from 'react'
import { useState,useEffect } from 'react'
import { getAllActiveProducts } from '../api/productApi'
function Test() {
     const [categoryId,setCategoryId] = useState("")
            const [productName,setProductName] = useState("")
            const [pageNumber,setPageNumber] = useState(0)
            const [pageSize,setPageSize] = useState(10)
            const [loading,setLoading] = useState(false)
            const [message,setMessage] = useState("")
            const [products,setProducts] = useState([])
        
            useEffect(()=>{
        
                const fetchProducts = async()=>{
                    setLoading(true);
                    console.log("Fetching products with params:", {categoryId, productName, pageNumber, pageSize});
                    try{
                        const response = await getAllActiveProducts(categoryId,productName,pageNumber,pageSize);
                        setProducts(response.data.data.content);
                        console.log(response.data);
                        }catch(error){
                        setMessage("Failed to load products. Please try again later.");
                        console.error("API Error:", error);
                        throw error;
                    }finally{
                        setLoading(false);
                    }
                        
                    }
                fetchProducts();
            },[categoryId,productName,pageNumber,pageSize])
  return (
   
    <>
    {products.map((product) => (
        <div key={product.id}>
            <h3>{product.name}</h3>
            {product.images && product.images.length > 0 && product.images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index}`} />))}
            </div>
            ))}
    </>
  )
}

export default Test