import React, { useState, useEffect } from 'react';

const EditProduct = ({ editingProduct, setEditingProduct, setproducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        type: editingProduct.type || '',
        breed: editingProduct.breed || '',
        price: editingProduct.price || '',
        image: editingProduct.image || ''
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
      const res = await fetch(`https://farmart-backend-2-ot47.onrender.com/animals/${editingProduct.id}`, {
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
      <h3>Edit Animal</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <input
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Breed"
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
          name="image"
          type="url"
          value={formData.image}
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
