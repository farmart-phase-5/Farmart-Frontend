// components/DeleteProducts.jsx
import React from 'react';

const DeleteProducts = ({ products, setproducts, setEditingProduct }) => {
  const handleDelete = (id) => {
    fetch(`https://farmart-backend-2-ot47.onrender.com/animals/${id}`, {
      method: 'DELETE',
    })
    .then(() => setproducts(prev => prev.filter(p => p.id !== id)));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>All Products</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td><img src={prod.image} alt={prod.name} width="60" /></td>
              <td>
                <button onClick={() => setEditingProduct(prod)}>Edit</button>
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteProducts;
