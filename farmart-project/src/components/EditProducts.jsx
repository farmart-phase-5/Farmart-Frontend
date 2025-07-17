import React, { useState, useEffect } from 'react';

const EditProduct = ({ editingProduct, setEditingProduct, setproducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        image_url: editingProduct.image_url || ''
      });
    }
  }, [editingProduct]);

  if (!editingProduct) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Unauthorized. Admin token missing.");
      return;
    }

    const updatedData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    try {
      const res = await fetch(`https://brom-e-commerce-backend.onrender.com/api/food/${editingProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');

      alert('Product updated!');
      setproducts(prev =>
        prev.map(p => (p.id === editingProduct.id ? data : p))
      );
      setEditingProduct(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="image_url"
          type="url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;