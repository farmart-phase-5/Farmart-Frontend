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
