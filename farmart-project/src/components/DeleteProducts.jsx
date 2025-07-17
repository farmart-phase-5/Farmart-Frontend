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

        const res = await fetch(`https://brom-e-commerce-backend.onrender.com/api/food/${id}`, {
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