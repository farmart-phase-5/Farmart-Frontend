import React, { useState } from 'react';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productDescription: '',
    productImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    image: formData.image,
    category: formData.category
  };

  try {
    const token = localStorage.getItem("token"); 

    const response = await fetch("https://farmart-backend-2-ot47.onrender.com/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include", 
    });

    if (response.ok) {
      const result = await response.json();
      alert("Product added successfully!");
    } else {
      const err = await response.json();
      console.error("Add failed:", err);
      alert("Failed to add product.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Network error.");
  }
};


  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <label>Product Price:</label>
        <input
          type="number"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />

        <label>Product Category:</label>
        <input
          type="text"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          required
        />

        <label>Product Description (used as breed):</label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label>Image URL:</label>
        <input
          type="url"
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
