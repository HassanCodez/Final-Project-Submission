import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  
  // Calculate total items dynamically for the Navbar cart icon
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Task 6: 3 Categories, 6 plants each (18 total)
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", cost: 15, image: "https://images.unsplash.com/photo-1599009848510-4ed33f81e3f8" },
        { name: "Spider Plant", cost: 12, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b" },
        { name: "Peace Lily", cost: 18, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355" },
        { name: "Boston Fern", cost: 14, image: "https://images.unsplash.com/photo-1606550750567-0c7f2be7e06a" },
        { name: "Aloe Vera", cost: 10, image: "https://images.unsplash.com/photo-1596547609652-9cb5b8ee9e55" },
        { name: "English Ivy", cost: 16, image: "https://images.unsplash.com/photo-1634547900720-75d8d069dc2c" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", cost: 20, image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ca66" },
        { name: "Mint", cost: 8, image: "https://images.unsplash.com/photo-1601627010471-a9fbc7418b6e" },
        { name: "Rosemary", cost: 12, image: "https://images.unsplash.com/photo-1599598425947-33004a43405d" },
        { name: "Basil", cost: 10, image: "https://images.unsplash.com/photo-1615486511484-90f772fd0eb4" },
        { name: "Thyme", cost: 9, image: "https://images.unsplash.com/photo-1616781296180-2d887a0b332b" },
        { name: "Oregano", cost: 11, image: "https://images.unsplash.com/photo-1599021456807-25db0f974333" }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Jade Plant", cost: 15, image: "https://images.unsplash.com/photo-1611078709401-2c9381387d89" },
        { name: "Echeveria", cost: 10, image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797" },
        { name: "Haworthia", cost: 12, image: "https://images.unsplash.com/photo-1609144426578-8314953bf625" },
        { name: "Zebra Plant", cost: 14, image: "https://images.unsplash.com/photo-1619864273030-80eaeb48003a" },
        { name: "Burro's Tail", cost: 16, image: "https://images.unsplash.com/photo-1647413669145-80f0119e2fb7" },
        { name: "String of Pearls", cost: 18, image: "https://images.unsplash.com/photo-1558296726-5b6158e0a29f" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Task 6.4 & 6.5: Navbar with links and dynamic cart icon */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <a onClick={() => setShowCart(false)}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a onClick={() => setShowCart(true)}>
            🛒 Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="products-container">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant, idx) => (
                  <div key={idx} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    {/* Task 6.3: Add to cart and disable if already added */}
                    <button 
                      className="add-btn" 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                    >
                      {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
