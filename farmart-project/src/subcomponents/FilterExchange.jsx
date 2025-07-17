import React, { useState } from 'react';
import Productcard from './Productcard';
import FilterOption from './FilterOption';

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
      
      const orderRes = await fetch('https://brom-e-commerce-backend.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const newOrder = await orderRes.json();
      if (!orderRes.ok) throw new Error(newOrder.error || 'Failed to create order');

      
      for (const item of cartItems) {
        const res = await fetch(`https://brom-e-commerce-backend.onrender.com/api/orders/${newOrder.id}/items`, {
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