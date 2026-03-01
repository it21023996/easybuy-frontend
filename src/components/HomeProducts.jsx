
import './HomeProducts.css'
import { useState,useEffect, use } from 'react'
import { getAllActiveProductsSearch } from '../api/productApi'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import PageNumber from './common/buttons/PageNumber'
import AddToCartbutton from './common/buttons/AddToCartbutton'
function HomeProducts({selectedCategory, searchTerm, setSearchTerm}) {
    const {role} = useContext(AuthContext)
    const isAdmin = role === "ADMIN";
    const isUser = role === "USER";
    const [categoryId,setCategoryId] = useState("")
    useEffect(()=>{
        setCategoryId(selectedCategory)
    },[selectedCategory])
    
    useEffect(()=>{
        setPageNumber(0);
    },[categoryId,searchTerm])

    useEffect(()=>{
        return ()=>{
            setSearchTerm("");
            setCategoryId("");
        }
    },[])

    
    const [pageNumber,setPageNumber] = useState(0)
    const [pageSize,setPageSize] = useState(8)
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")
    const [products,setProducts] = useState([])
    const [totalElements,setTotalElements] = useState(0)
    const [quantity,setQuantity] = useState(1)


    useEffect(()=>{

        const fetchProducts = async()=>{
            setLoading(true);
            console.log("Fetching products with params:", {categoryId, searchTerm, pageNumber, pageSize});
            try{
                const response = await getAllActiveProductsSearch(categoryId,searchTerm,pageNumber,pageSize);
                setProducts(response.data.data.content);
                setTotalElements(response.data.data.totalElements);
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
    },[categoryId,searchTerm,pageNumber,pageSize])

    const formatPrice = (price) => {
        if (!price) return '0.00';
        return Number(price).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const handlePrevImage = (productId, imagesLength, e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => ({
            ...prev,
            [productId]: prev[productId] > 0 ? prev[productId] - 1 : imagesLength - 1
        }));
    };

    const handleNextImage = (productId, imagesLength, e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => ({
            ...prev,
            [productId]: prev[productId] < imagesLength - 1 ? prev[productId] + 1 : 0
        }));
    };

    const goToImage = (productId, index, e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => ({
            ...prev,
            [productId]: index
        }));
    };

    const getOptimizedImageUrl = (url, width = 800, height = 800) => { // Increased from 400
    if (!url) return null;
    
    if (url.includes('cloudinary.com')) {
        // Request much larger images
        return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`);
    }
    return url;
};

  return (
    <>
    <div className="home-page">
     <div className="products-grid-container">
            {loading && <div className="loading-spinner">Loading products...</div>}
            
            {!loading && products.length === 0 ? (
                <div className="no-products-found">
                    <p>No Products Found</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => {
                        const images = product.imageUrls || [];
                        const currentIndex = currentImageIndex[product.productId] || 0;
                        
                        return (
                            <div key={product.productId} className="product-card">
                                {/* Image Carousel */}
                                <div className="product-image-carousel">
                                    {images.length > 0 ? (
                                        <>
                                            <img 
                                                src={getOptimizedImageUrl(images[currentIndex], 400, 400)} 
                                                alt={product.name} 
                                                className="picture"
                                            />
                                            
                                            {/* Navigation Arrows - Only show if more than 1 image */}
                                            {images.length > 1 && (
                                                <>
                                                    <button 
                                                        className="carousel-nav carousel-prev"
                                                        onClick={(e) => handlePrevImage(product.productId, images.length, e)}
                                                    >
                                                        ❮
                                                    </button>
                                                    <button 
                                                        className="carousel-nav carousel-next"
                                                        onClick={(e) => handleNextImage(product.productId, images.length, e)}
                                                    >
                                                        ❯
                                                    </button>
                                                </>
                                            )}
                                            
                                            {/* Image Dots Indicator */}
                                            {images.length > 1 && (
                                                <div className="image-dots">
                                                    {images.map((_, index) => (
                                                        <span 
                                                            key={index}
                                                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                                                            onClick={(e) => goToImage(product.productId, index, e)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="no-image-placeholder">
                                            <svg 
                                                stroke="currentColor" 
                                                fill="currentColor" 
                                                strokeWidth="0" 
                                                viewBox="0 0 24 24" 
                                                height="3em" 
                                                width="3em" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                            </svg>
                                            <span>No image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    
                                    <div className="product-price">
                                        <span className="price-label">Price:</span>
                                        <span className="price-value">Rs. {formatPrice(product.price)}</span>
                                    </div>
                                    
                                    <div className="product-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Stock:</span>
                                            <span className={`meta-value ${product.stockQuantity < 10 ? 'low-stock' : ''}`}>
                                                {product.stockQuantity} units
                                            </span>
                                        </div>
                                        
                                        <div className="meta-item">
                                            <span className="meta-label">Category:</span>
                                            <span className="meta-value">
                                                {product.category?.name || product.categoryName || 'Uncategorized'}
                                            </span>
                                        </div>
                                    </div>
                                    {isUser && (
                                    <div>
                                        <label htmlFor={`quantity-${product.productId}`} className="quantity-label">Quantity:</label>
                                        <input type="number" min="1" defaultValue="1" className="quantity-input"
                                        onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                        )}
                                    
                                    <p className="product-description">{product.description}</p>
                                    {isUser && (
                                        <AddToCartbutton productId={product.productId} quantity={quantity} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        <PageNumber pageNumber={pageNumber} totalElements={totalElements} setPageNumber={setPageNumber} pageSize={pageSize}/>
        </div>
    </>
  )
}

export default HomeProducts