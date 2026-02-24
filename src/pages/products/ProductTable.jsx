import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../api/productApi'
import { useNavigate } from 'react-router-dom'
import './ProductTable.css'
import CategoryDropdown from '../../components/common/dropdowns/CategoryDropdown'
function ProductTable() {
    const navigate = useNavigate();
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [categoryId,setCategoryId] = useState("")
    const [productName,setProductName] = useState("")
    const [pageNumber,setPageNumber] = useState(0)
    const [pageSize,setPageSize] = useState(10)
    const [active,setActive] = useState(null);
    useEffect(()=>{
        
        const fetchProducts = async()=>{
            setLoading(true);
            try{
                 const activeParams = active === true ? 1 : active === false ? 0 : null;
                  let activeParam = null;
                  if (activeParams === 1) activeParam = "true";
                  if (activeParams === 0) activeParam = "false";
                 console.log("Sending params:", activeParam);
                const response = await getAllProducts(
                    categoryId || null,
                    productName || null,
                    activeParam,
                    pageNumber,
                    pageSize
                )
                setProducts(response.data.data.content)

                console.log(response.data)
                
            }catch(err){
                 console.error("API Error:", err);
        console.error("Error response:", err.response);
        console.log("Error response data:", err.response?.data); 
        console.error("Error config:", err.config);
        throw err;
            }finally{
                setLoading(false);
            }
        }
        fetchProducts();
    },[categoryId,productName,active,pageNumber,pageSize])

    const getFirstImage = (imageUrls)=>{
        if(imageUrls && imageUrls.length > 0 && imageUrls[0]){
            return imageUrls[0];
        }
        return null;
    }
    
    const formatPrice = (price) => {
        if (!price) return '0.00';
        return Number(price).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
  return (
    <>
    <div  className="update-product-actions">
        <div className="actions-horizontal">
            <div>
              <div className="toggle-container">
    <label htmlFor='productActive'>Product Active Status</label>
    <div className="toggle-switch tri-state">
    <div className="tri-state-container">
        <button 
            type="button"
            className={`tri-state-btn ${active === null ? 'active' : ''}`}
            onClick={() => setActive(null)}
        >
            All
        </button>
        <button 
            type="button"
            className={`tri-state-btn ${active === true || active === 1 || active === "1" ? 'active' : ''}`}
            onClick={() => setActive(true)}
        >
            Active
        </button>
        <button 
            type="button"
            className={`tri-state-btn ${active === false || active === 0 || active === "0" ? 'active' : ''}`}
            onClick={() => setActive(false)}
        >
            Inactive
        </button>
    </div>
</div>
</div>  
            </div>
    <div className="add-product-form-group">
                    <label htmlFor='categories' className='add-product-label form-label'>Product Categories</label>
                    <CategoryDropdown id='categories' onChange={setCategoryId} className="category-dropdown-style" value={categoryId}/>
                </div>
                </div></div>
    <table className="product-table">
        
        <tbody>
            {products.map((product)=>(
                <tr key={product.productId} className="product-row">
                    <td className="product-cell">
                        <div className="product-container">
                             <div className="product-image-wrapper">
                            <div className="product-image"> 
                                {getFirstImage(product.imageUrls)?(
                                    <img src={getFirstImage(product.imageUrls)} alt={product.name} className='product-img'/>):
                                    (<div className="react-icon">
                                            <svg 
                                                stroke="currentColor" 
                                                fill="currentColor" 
                                                strokeWidth="0" 
                                                viewBox="0 0 24 24" 
                                                height="2em" 
                                                width="2em" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                            </svg>
                                        </div>)
                                }
                            </div>
                            </div>
                            <div className="product-details">
                            
                                <div className="product-name">{product.name}</div>
                                <div className="product-price-row">
                                    <span className="product-price-label">Price:</span>
                                    <span className="product-price-value">Rs. {formatPrice(product.price)}</span></div>
                                <div className="product-stock-row">
                                    <span className="product-stock-label">Stock:</span>
                                    <span className="product-stock-value">{product.stockQuantity}</span></div>
                                <div className="product-category-row">
                                    <span className="product-category-label">Category:</span>
                                    <span className="product-category-value">
                                            {product.category?.name || product.categoryName || 'Uncategorized'}</span></div>
                                <div className="product-active-row">
                                    <span className="product-active-label">Active Status:</span>
                                    <span className={`product-active-value ${product.active ? 'active' : 'inactive'}`}>{product.active ? "Active" : "NotActive"}</span></div>
                                <div className="product-description">{product.description}</div>
                            </div>
                            <div className="product-button">
                                <button onClick={()=> navigate(`/products/update/${product.productId}`)}>update product</button>
                            </div>
                           
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default ProductTable