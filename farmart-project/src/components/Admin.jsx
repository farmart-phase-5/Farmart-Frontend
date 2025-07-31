import React, { useState, useEffect } from 'react';
import AddProducts from '../components/AddProducts';
import DeleteProducts from '../components/DeleteProducts';
import EditProducts from '../components/EditProducts';
import Logout from '../components/Logout';
import AllUsers from '../components/AllUsers';

const Admin = () => {
  const [products, setproducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); 

  useEffect(() => {
    fetch('https://farmart-backend-2-ot47.onrender.com/animals')
      .then(res => res.json())
      .then(data => setproducts(data));
  }, []);

  return (
    <div>
      <Logout />
      <AddProducts products={products} setproducts={setproducts} />
      <EditProducts
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        setproducts={setproducts}
      />
      <DeleteProducts
        products={products}
        setproducts={setproducts}
        setEditingProduct={setEditingProduct} 
      />
      <AllUsers />
    </div>
  );
};

export default Admin;
