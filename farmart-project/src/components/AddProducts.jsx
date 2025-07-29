import React, { useState } from 'react';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '', // base64
  });

  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.role !== 'farmer') {
      setMessage("Unauthorized: Only farmers can add products.");
      return;
    }

    try {
      const res = await fetch('https://farmart-backend-2-ot47.onrender.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Product added successfully!');
        setFormData({
          name: '',
          category: '',
          price: '',
          description: '',
          image: '',
        });
      } else {
        setMessage(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error occurred while adding product');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Add Animal for Sale</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Price (Ksh):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit" style={{ marginTop: '1rem' }}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
