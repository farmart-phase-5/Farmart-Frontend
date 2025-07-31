import React, { useState } from 'react';
import Productcard from '../subcomponents/Productcard';
import FilterOption from '../subcomponents/FilterOption';

const FilterExchange = ({ products }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCart, setshowCart] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartItems, setcartItems] = useState([]);

  const addToCart = (product) => {
    setcartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setcartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setcartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const toggleCart = () => {
    setshowCart(prev => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

    const placeOrder = async () => {
    const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      
      const orderRes = await fetch('https://farmart-backend-2-ot47.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const newOrder = await orderRes.json();
      if (!orderRes.ok) throw new Error(newOrder.error || 'Failed to create order');

      
      for (const item of cartItems) {
        const res = await fetch(`https://farmart-backend-2-ot47.onrender.com/orders/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            food_item_id: item.id,
            quantity: item.quantity
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add item');
      }

      alert("Order placed successfully!");
      setcartItems([]); 
      setshowCart(false); 

    } catch (err) {
      console.error("Order failed:", err);
      alert("Order failed: " + err.message);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product =>
        selectedCategories.includes(product.category)
      );

     return (
    <div className="filter-exchange">
      <FilterOption toggleSidebar={toggleSidebar} toggleCart={toggleCart} cartItemCount={cartItems.length} />


      <div className={`sidecart ${showCart ? 'showcart' : 'hidecart'}`}>
        <h3>Your Cart ({cartItems.length})</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image_url} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h4>Total: ${cartTotal.toFixed(2)}</h4>
              <button className="checkout-btn" onClick={placeOrder}>Place Order</button>
            </div>
          </>
        )}
        <button className="sidebtn" onClick={toggleCart}>Close</button>
      </div>

      <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
        <h3>Filter by Category</h3>
        {categories.map((category, id) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
        <button className="sidebtn" onClick={toggleSidebar}>Close</button>
      </div>

      <Productcard products={filteredProducts} addToCart={addToCart} />
    </div>
  );
};

export default FilterExchange;