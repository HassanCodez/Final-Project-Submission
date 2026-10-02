import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Task 7.1: Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.cost}</p>
                {/* Task 7.2: Total cost for each plant */}
                <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
          
          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount().toFixed(2)}</h3>
            <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
            <button className="checkout-btn" onClick={() => alert('Coming Soon')}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
