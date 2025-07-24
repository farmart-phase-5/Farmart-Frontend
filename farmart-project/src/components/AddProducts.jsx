import React, { useState } from 'react';

const AddProducts = ({ products }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productDescription: '',
    productImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized. Admin token missing.");
      return;
    }

    if (formData.productPrice <= 0) {
      alert('Product price must be a positive number.');
      return;
    }

    const productData = {
      name: formData.productName,
      price: parseFloat(formData.productPrice),
      category: formData.productCategory,
      description: formData.productDescription,
      image_url: formData.productImage
    };

    try {
      const res = await fetch('https://farmart-backend-1-30rq.onrender.com/api/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add product');
      }

      alert('Product added successfully!');
      console.log('Product added:', data);

      setFormData({
        productName: '',
        productPrice: '',
        productCategory: '',
        productDescription: '',
        productImage: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className='add-product-container'>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />

        <label htmlFor="productCategory">Product Category:</label>
        <input
          type="text"
          id="productCategory"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          required
        />

        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="productImage">Product Image URL:</label>
        <input
          type="url"
          id="productImage"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;