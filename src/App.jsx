import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="app-container">
      {showProducts ? (
        <ProductList />
      ) : (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
