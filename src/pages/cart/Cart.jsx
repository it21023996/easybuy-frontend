import React, { use } from 'react'
import { useState,useEffect,useCallback } from 'react'
import {getCartById,updateCartItemQuantity,deleteItemFromCart,clearCart} from '../../api/cartApi'
import { addselectedOrder } from '../../api/orderApi'
import './CartPage.css'
import './CartModal.css'
import { useNavigate } from 'react-router-dom'

function Cart({ variant = "page",onClose }) {
  const navigate = useNavigate();
  const [cart,setCart] = useState({});
  const [address,setAddress] = useState("");
  const [cartItems,setCartItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState("");
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalItems,setTotalItems] = useState(0);
  const [selectedItems,setSelectedItems] = useState([]);

  const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    return !!token
  }

    const fetchCart = async()=>{
      if (!isAuthenticated()) {
      console.log('User not authenticated, skipping cart fetch')
      return
    }
      setLoading(true);
      try {
        const response =  await getCartById();
        setCart(response.data.data);
        setTotalPrice(response.data.data.totalPrice);
        setTotalItems(response.data.data.totalItem);
        setAddress(response.data.data.address);
        console.log(response.data);
      }catch(error){
        console.error("Error fetching cart data:",error);
        setMessage("Failed to load cart data. Please try again later.");
      }finally{
        setLoading(false);
      }
    }

    const updateCartQuantity = async(cartId,cartItemId,quantity)=>{
      setLoading(true);
      const data = {
        quantity : Number(quantity)
      }
      try{
        const response = await updateCartItemQuantity(cartId,cartItemId,data);
        const updatedCart = response.data.data;
        console.log("Updated cart:",updatedCart);
        setCart(updatedCart);
        setCartItems(updatedCart?.items || []);
        setTotalPrice(updatedCart.totalPrice);
        console.log("Total price:",updatedCart.totalPrice);
        setTotalItems(updatedCart.totalItem || 0);
        setMessage("Cart updated successfully!");
      }catch(error){
        console.error("Error updating cart item quantity:",error);
        setMessage("Failed to update cart item quantity. Please try again later.");
      }finally{
        setLoading(false);
      }
    }

    const deleteCartItem = async(cartId,cartItemId)=>{
      setLoading(true);
      try{
        await deleteItemFromCart(cartId,cartItemId);
        fetchCart();
        setMessage("Item removed from cart successfully!");
      }catch(error){
        console.error("Error deleting cart item:",error);
        setMessage("Failed to remove item from cart. Please try again later.");
      }finally{
        setLoading(false);
      }
    }

    const clearCartItems = async(cartId)=>{
      setLoading(true);
      try{
        await clearCart(cartId);
        fetchCart();
        setMessage("Cart cleared successfully!");
      }catch(error){
        console.error("Error clearing cart:",error);
        setMessage("Failed to clear cart. Please try again later.");
      }finally{
        setLoading(false);
      }
    }

  useEffect(()=>{
    fetchCart();
  },[])


  const checkout = async()=>{
    setLoading(true);
    if (selectedItems.length === 0) {
    setMessage("Please select at least one item.");
    return;
  }
    const payload = {
      cartItemIds : selectedItems,
      address : address
    }
    try{
      const response = await addselectedOrder(payload);
      console.log("Checkout response:",response);
      setMessage("Order placed successfully!");
      navigate('/my-orders');
    }catch(error){
      console.error("Error during checkout:",error);
      setMessage("Failed to place order. Please try again later.");
    }finally{
      setLoading(false);
    }
  }

  const handleSelectItem = (itemId)=>{
    setSelectedItems(currentItems => {
      return currentItems.includes(itemId) ? currentItems.filter(id => id != itemId)
      : [...currentItems,itemId]
    })
  }

  

  useEffect(()=>{
    console.log(selectedItems);
  },[selectedItems])

  useEffect(()=> {
    if(cart.cartItemDTOList){
      setCartItems(cart.cartItemDTOList);
    }
  },[cart])
  const handlequantity = (itemId,newQuantity)=>{
    setCartItems(currentItems => {
      return currentItems.map(item => (
        item.cartItemId === itemId ? 
        {...item,quantity:Number(newQuantity)} 
        : item
      ))
    })
  
  }
  const isAllSelected = cartItems?.length > 0 && selectedItems.length === cartItems?.length;

  const handleSelectAll = ()=> {
    if(selectedItems.length === cartItems.length){
      setSelectedItems([]);
    }else{
      const allItemIds = cartItems.map(item => item.cartItemId);
      setSelectedItems(allItemIds);
    }
  }
  const selectedCartItems =
  cart.cartItemDTOList?.filter(item =>
    selectedItems.includes(item.cartItemId)
  ) || [];

const selectedTotalItems = selectedCartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);

const selectedTotalPrice = selectedCartItems.reduce(
  (sum, item) => sum + item.priceAtAdd * item.quantity,
  0
);
  return (
    <>
    <div className={`cart-wrapper ${variant === "modal" ? "cart-modal" : "cart-page"}`}>
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="cart-title"> <span className="me-2">🛒</span> My Cart
      {cartItems.length > 0 && `(${cart.totalItem || 0} items)`}</h2>
      {variant === "modal" && <button className='btn-close' aria-label='Close' type='button' onClick={onClose}>
        </button>}
      </div>

      {message && 
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> setMessage("")}></button>
      </div>}

        {loading ? 
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        <p className="mt-3 text-muted">Loading your cart...</p>
        </div>
        : (
          cart.cartItemDTOList && cart.cartItemDTOList.length <= 0 ?
          <div className="empty-cart text-center py-5">
            <div className="empty-cart-icon mb-3">🛒</div>
            <h3 className="h5 mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
            <button className="btn btn-primary">Continue Shopping</button>
          </div> : 
<>
          <div className="select-all-bar">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
                <span className="checkmark"></span>
                <span className="select-all-text">Select All </span>
              </label>
              {cartItems.length > 0 && (
                <button onClick={()=> clearCartItems(cart.cartId)} className="btn-clear-cart">
                  <span className="clear-icon">🗑️</span>
                  Clear Cart
                </button>
              )}
              <span className="selected-count">{selectedItems.length} items selected</span>
            </div>
            
            


          <div className="cart-items-grid">
            {cartItems?.map(item=>(
              <div key={item.cartItemId} className="cart-item-card">
                <label className="checkbox-container item-checkbox">
                <input 
                type='checkbox' 
                onChange={()=>handleSelectItem(item.cartItemId)} 
                checked={selectedItems.includes(item.cartItemId)}/>
                <span className="checkmark"></span>
                </label>
                
                <div className="item-image-container">
                <img 
                src={item.imageUrl || "/placeholder.jpg"}
                alt={item.productName}
                className="item-image" />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.productName}</h3>
                  <p className="item-price">Price: Rs. {item.priceAtAdd.toLocaleString()}</p>

                  <div className="quantity-wrapper">
                    <label htmlFor={`quantity-${item.cartItemId}`} className="quantity-label">Qty:</label>
                  <input type="number" 
                  value={item.quantity} min="1" max="10" 
                  onChange={(e)=>handlequantity(item.cartItemId,e.target.value)}
                  className="quantity-input"/>
                  </div>               
                </div>

                <button 
                onClick={()=>updateCartQuantity(cart.cartId,item.cartItemId,item.quantity)} 
                className="btn-update"
                  >Update</button>

                  <button onClick={()=>deleteCartItem(cart.cartId,item.cartItemId)} 
                  className="btn-remove">Remove</button>
              </div>
            ))}
          </div>
          <div className="checkout-summary-modern">
              <div className="summary-left">
                <div className="summary-item">
                  <span>Total Items:</span>
                    <strong>{selectedTotalItems}</strong>
                </div>
                <div className="summary-item total">
                  <span>Cart Total:</span>
                    <strong className="total-amount">Rs. {selectedTotalPrice.toLocaleString()}</strong>
                </div>
                <div>
                  <label htmlFor="address" className="form-label">Delivery Address</label>
                  <textarea 
                    id="address" 
                    className="form-control"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}></textarea>
                  
                </div>
      
            </div>
            <button className="btn-checkout" 
            onClick={()=>checkout()}
            disabled={selectedItems.length === 0 || loading}>
                  Proceed to Checkout
                </button>
            </div>
          </>
        )}
    </div>
    </div>
    </>
  )
}

export default Cart