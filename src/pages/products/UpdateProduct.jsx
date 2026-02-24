import React from 'react'
import { useState,useEffect } from 'react'
import { Form, useParams,useNavigate  } from 'react-router-dom';
import { getProductById } from '../../api/productApi';
import { updateProduct } from '../../api/productApi';
import ProductImages from '../../components/ProductImages';
import CategoryDropdown from '../../components/common/dropdowns/CategoryDropdown';
import './UpdateProduct.css'
function UpdateProduct() {
    const navigate = useNavigate();
    const {productId} = useParams();
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [stockQuantity,setStockQuantity] = useState(0);
    const [categoryName,setCategoryName] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [active,setActive] = useState(null);
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [categoryId,setCategoryId] = useState(null);
    const [buttonTimer,setButtonTimer] = useState(0);
    const [isButtonLocked,setIsButtonLocked] = useState(false);
    useEffect(()=> {
        const getProduct = async() =>{
            setLoading(true)
            try{
                const res = await getProductById(productId)
                const productData = res.data.data;
                console.log(productData)
                setName(productData.name)
                setCategoryName(productData.categoryName);
                setDescription(productData.description);
                setPrice(productData.price)
                setStockQuantity(productData.stockQuantity);
                setActive(productData.active ? true : false)
        
                
                if (productData.imageUrls && productData.imageUrls.length > 0) {
                    setImageUrls(productData.imageUrls);
                }
                console.log(res)
            }catch(err){
                console.log(err)
                setMessageType("error")
            }finally{
                setLoading(false)
            }
        }
        getProduct();
    },[productId])

    const handleUpdateProduct = async(e)=>{
        e.preventDefault();
         if (isButtonLocked) {
        setMessage(`Please wait ${buttonTimer} second${buttonTimer > 1 ? 's' : ''}...`);
        setMessageType("warning");
        return;
    }
        const updateProductDTO  = {
            name,
            description,
            price : Number(price) ,
            active : Boolean(active), 
            stockQuantity : Number(stockQuantity), 
            imageUrls,
            categoryId
        }
        console.log(updateProductDTO)
        setLoading(true)
        try{
            const res = await updateProduct(productId,updateProductDTO )
            setMessage("Succesfully Updated Product")
            setMessageType("success")
            startButtonTimer();
            console.log(res.data.data)
            console.log("Response active status:", res.data.data.active)
        }catch(err){
            console.log(err)
            setMessage("error message",err)
            setMessageType("error")
            startButtonTimer();
        }finally{
            setLoading(false)
        }
    }
    const handleGoBack = () => {
        navigate(-1); 
    };

    const startButtonTimer = ()=> {
        setIsButtonLocked(true);
        setButtonTimer(1);
        const timer = setInterval(()=>{
            setButtonTimer((prev)=> {
                if(prev <= 1){
                    clearInterval(timer);
                    setIsButtonLocked(false);
                    return 0;
                }
                return prev -1;
            });
        },1000);
    };
  return (
    <>
    <div className="update-product-container">
        <button 
                onClick={handleGoBack}
                className="update-back-button-outside"
                title="Go back"
            >
                <i className="bi bi-arrow-left"></i>
                <span>Back</span>
            </button>
        <div className="container">
            {message && (
                <div className={`update-alert update-alert-${messageType}`}>
                    <span><i className={`bi ${messageType === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                     {message}</span>
                     <button className="update-alert-close" onClick={() => setMessage("")}>×</button>
                </div>
            )}
        <div className="update-product-card">
            <div className="update-product-header">
                        <h2 className="update-product-title">
                            <i className="bi bi-pencil-square"></i>
                            Update Product
                        </h2>
                        <p className="update-product-id">
                            Product ID <strong>#{productId}</strong>
                        </p>
                    </div>
                    <div className="update-product-body">
    <form onSubmit={handleUpdateProduct}>
        <div className="update-row">
            <div className="update-col-6">
        <div className="update-form-group">
            <label htmlFor='productName'>
                <i className="bi bi-tag"></i>
                product Name</label>
            <input type='text' id='productName' name='productName' value={name}
            onChange={(e)=> setName(e.target.value)} className="update-form-control update-form-control-lg"></input>
        </div>
        </div>
        <div className="update-col-6">
        <div className="update-form-group">
            <label htmlFor='productprice'><i className="bi bi-currency-dollar"></i>
            product Price</label>
            <input type='number' id='productprice' name='productPrice' value={price}
            onChange={(e)=>setPrice(e.target.value)}  step="0.01" min="0" 
            className="update-form-control update-form-control-lg"></input>
        </div>
        </div>
        <div className="update-col-6">
        <div className="update-form-group">
            <label htmlFor='productStockQuantity' className="update-form-label">product Quantity</label>
            <input type='number' id='productStockQuantity' name='productStockQuantity' value={stockQuantity}
            onChange={(e)=>setStockQuantity(e.target.value)}  step="1"  min="0" 
            className="update-form-control update-form-control-lg"></input>
        </div>
        </div>
        <div className="update-col-6">
        <div className="update-form-group">
                <label htmlFor='categories' className="update-form-label"> <i className="bi bi-folder"></i>
                Product Categories</label>
                <CategoryDropdown id='categories' onChange={setCategoryId} className="update-form-control update-form-control-lg update-select"  value={categoryId}/>
                {categoryName && (
                                            <div className="update-category-info">
                                                <i className="bi bi-info-circle"></i>
                                                Current category: 
                                                <span className="update-category-badge">{categoryName}</span>
                                            </div>
                                        )}
        </div>
        </div>
        <div className="update-col-6">
        <div className="update-form-group">
            <label htmlFor='productActive' className="update-form-label"> <i className="bi bi-toggle-on"></i>
            product Active Status</label>
            <select type='text' id='productActive' name='productActive' value={active} className="update-form-control update-form-control-lg update-select"
             onChange={(e)=>setActive(Number(e.target.value))}>
                <option value={1}>🟢 Active</option>
                <option value={0}>🔴 Inactive</option>
            </select>
             <div className="update-status-badge">
                                            <span className={`badge ${active == 1 ? 'badge-success' : 'badge-secondary'}`}>
                                                <i className={`bi ${active == 1 ? 'bi-check-circle' : 'bi-slash-circle'}`}></i>
                                                Current: {active == 1 ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
        </div>
        </div>
        <div className="update-col-12">
        <div className="update-form-group">
            <label htmlFor='productDescription'className="update-form-label"> <i className="bi bi-text-paragraph"></i>
            product Description</label>
            <textarea type='text' id='productDescription' name='productDescription' value={description} className="update-form-control update-textarea"
             onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        </div>
        <div className="update-col-12">
        <div className="update-form-group">
                    <label className="update-form-label"><i className="bi bi-images"></i>Product images</label>
                    <div className="update-image-section">
                    <ProductImages 
                        onImageChange={setImageUrls}
                        existingImages={imageUrls} 
                         className="product-images-input"
                    />
                    {imageUrls.length > 0 && (
                        <div className="update-image-badge">
                            <span className="badge">
                                <i className="bi bi-check-circle"></i>
                                {imageUrls.length} image(s)
                            </span>
                        </div>
                    )}
                    </div>
                </div>
                </div>

                <div className="update-col-12">
                    <button type="submit" className="update-btn"disabled={loading || isButtonLocked}
    style={{
        opacity: (loading || isButtonLocked) ? 0.7 : 1,
        cursor: (loading || isButtonLocked) ? 'not-allowed' : 'pointer'
    }}
>
    {loading ? (
        <>
            <span className="update-spinner"></span>
            Updating Product...
        </>
    ) : isButtonLocked ? (
        <>
            <i className="bi bi-hourglass-split"></i>
            Wait {buttonTimer}s
        </>
    ) : (
        <>
            <i className="bi bi-cloud-arrow-up"></i>
            Update Product
        </>
    )}</button>
                </div>
                </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default UpdateProduct