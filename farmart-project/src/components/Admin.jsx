import React, { useState } from 'react'
import AddProducts from '../components/AddProducts'
import DeleteProducts from '../components/DeleteProducts'
import EditProduct from '../components/EditProducts'
import Logout from '../components/Logout'
import AllUsers from '../components/AllUsers'

const Admin = ({ products, setproducts }) => {
  const [editingProduct, setEditingProduct] = useState(null); 

  return (
    <div>
      <Logout />
      <AddProducts products={products} />
      <EditProduct
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