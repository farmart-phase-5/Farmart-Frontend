import React, { useState } from 'react'
import AddProducts from './AddProducts'
import DeleteProducts from './DeleteProducts'
import EditProduct from './EditProduct'
import Logout from './Logout'
import AllUsers from './AllUsers'

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