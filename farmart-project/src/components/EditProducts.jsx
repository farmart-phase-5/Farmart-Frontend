// components/EditProducts.jsx
import React, { useState, useEffect } from 'react';

const EditProducts = ({ editingProduct, setEditingProduct, setproducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        image: editingProduct.image,
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://farmart-backend-2-ot47.onrender.com/animals/${editingProduct.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(updatedAnimal => {
      setproducts(prev =>
        prev.map(p => (p.id === updatedAnimal.id ? updatedAnimal : p))
      );
      setEditingProduct(null);
    });
  };

  if (!editingProduct) return null;

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', background: '#f9f9f9', marginTop: '1rem' }}>
      <h3>Edit Product</h3>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProducts;
