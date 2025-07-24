import React, { useState } from 'react';

const DeleteProducts = ({ products, setproducts, setEditingProduct }) => {
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Unauthorized. Admin token missing.");
      return;
    }

    try {
      setDeletingId(id);

        const res = await fetch(`https://farmart-backend-1-30rq.onrender.com/api/food/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete from server');
      }

      const filtered = products.filter(product => String(product.id) !== String(id));
      setproducts(filtered);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Delete failed: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  }

    return (
    <div className="admin-panel">
      <h2 className="admin-title">Manage Products</h2>
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => setEditingProduct(product)}
                  >
                    ✏️ Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? 'Deleting...' : '🗑️ Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeleteProducts;