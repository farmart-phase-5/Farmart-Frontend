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