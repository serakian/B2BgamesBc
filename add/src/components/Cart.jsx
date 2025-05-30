import React, { useState } from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import './styling/cart.css';

const CartPopup = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    // { id: 1, name: 'Nightfall Legends', price: 59.99, quantity: 1, image: 'https://via.placeholder.com/80' },
    // { id: 2, name: 'Crimson Empire', price: 49.99, quantity: 2, image: 'https://via.placeholder.com/80' },
    // { id: 3, name: 'Void Champions', price: 39.99, quantity: 1, image: 'https://via.placeholder.com/80' }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`cart-popup ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>
          <FaShoppingCart className="cart-icon" />
          Your Cart ({cartItems.length})
        </h3>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPopup;