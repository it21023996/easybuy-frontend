import React from 'react'
import CategoryDropdown from '../../components/common/dropdowns/CategoryDropdown'
import { useState } from 'react'
import ProductImages from '../../components/ProductImages'
import { createProduct } from '../../api/productApi'
import './AddProducts.css'
function AddProducts() {

    const [productName,setProductName] = useState("")
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [stockQuantity,setStockQuantity] = useState("")
    const [imageUrls,setImageUrls] = useState([])
    const [categoryId,setCategoryId] = useState(null)
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState("")
    const [resetKey, setResetKey] = useState(0)
    console.log(imageUrls)

    const addNewProduct = async(e)=>{
        e.preventDefault()

        if(!productName){
            setError("product Name is required")
            return
        }
        if(!productPrice){
            setError("product Price is required")
            return
        }
        if(!categoryId){
            setError("Please select a category")
            return
        }
        if(!productDescription){
            setError("product Description is required")
            return
        }
        if(!stockQuantity){
            setError("product Description is required")
            return
        }
        if(imageUrls.length === 0){
            setError("Please upload at least one image")
            return
        }
        setIsSubmitting(true)
        setError("")
        setSuccess("")

        const productData = {
            name : productName,
            description : productDescription,
            price : productPrice,
            stockQuantity : stockQuantity,
            imageUrls : imageUrls,
            categoryId : categoryId
        }
        try{
            const response = await createProduct(productData)
            console.log('product added: ',response)
            setSuccess("Product added successfully!")

             setProductName("")
             setProductDescription("")
             setProductPrice("")
             setStockQuantity("")
             setImageUrls([])
             setCategoryId(null)
             setResetKey(prev => prev + 1)
        }catch(error){
            console.log('Failed to add product:', error)
            setError(error.message|| "Failed to add product. Please try again.")
        }finally{
            setIsSubmitting(false)
        }
    
    }

     
  return (
    <>
    <div className="add-product-container container mt-4">
        <div className="row justify-content-center">
            <div className="col-md-8">
             <div className="add-product-card card shadow"> 
                <div className="add-product-header card-header bg-danger text-white">
                    <h2 className="add-product-title mb-0">Add New Product</h2>
                    </div> 
                    <div className="add-product-body card-body">
                        {error && (
                            <div className="aadd-product-alert alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>❌ Error!</strong> {error}
                                <button type="button" className="btn-close" onClick={() => setError("")}></button>
                                </div>
                            )}
                        {success && (
                            <div className="add-product-alert alert alert-success alert-dismissible fade show" role="alert">
                                <strong>✅ Success!</strong> {success}
                                <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
                                </div>
                            )}
            <form onSubmit={addNewProduct} className="add-product-form">
                <div className="add-product-form-group mb-3">
                    <label htmlFor='productName' className='add-product-label form-label'>Product Name</label>
                    <input type="text" id="productName" className='add-product-input form-control' value={productName} onChange={(e)=>setProductName(e.target.value)}></input>
                </div>
                <div className="add-product-form-group mb-3">
                    <label htmlFor='productDescription' className='add-product-label form-label'>Product Description</label>
                    <textarea type="text" id="productDescription" className='add-product-textarea form-control' value={productDescription} onChange={(e)=>setProductDescription(e.target.value)}></textarea>
                </div>
                <div className="add-product-form-group mb-4">
                    <label htmlFor='categories' className='add-product-label form-label'>Product Categories</label>
                    <CategoryDropdown id='categories' onChange={setCategoryId} className="category-dropdown-style" value={categoryId}/>
                </div>
                <div className="add-product-form-group mb-3">
                    <label htmlFor='productPrice' className="add-product-price-group input-group">Product Price</label>
                    <div className="input-group"><span className="add-product-currency input-group-text">Rs.</span>
                    <input type='number' id="productPrice" className='add-product-price-input form-control' value={productPrice}  min="0" onChange={(e)=>setProductPrice(e.target.value)}></input>
                </div></div>
                    
                <div className="add-product-form-group mb-3">
                    <label htmlFor='productStockQuantity' className='add-product-label form-label'>Product stock Quantity</label>
                    <input type='number' id="productStockQuantity" className='add-product-input form-control' value={stockQuantity} min="0" onChange={(e)=>setStockQuantity(e.target.value)}></input>
                </div>
                <div className="add-product-form-group mb-3">
                    <label htmlFor='productImages' className='add-product-label form-label'>Product images</label>
                    <ProductImages onImageChange={setImageUrls} className="product-images-input" key={resetKey}/>
                    {imageUrls.length > 0 && (
                    <div className="add-product-badge-container mt-2">
                      <span className="add-product-badge badge bg-success">{imageUrls.length} image(s) uploaded</span>
                    </div>
                  )}
                </div>
                
                <div className="add-product-button-container d-grid">
                <button type="submit" disabled={isSubmitting} className={`add-product-submit-btn btn ${isSubmitting ? 'btn-secondary' : 'btn-success'} btn-lg`}>
                    {isSubmitting ? <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding Product...
                      </> : 'Add Product'}</button>
                </div>
            </form>
            </div> 
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddProducts