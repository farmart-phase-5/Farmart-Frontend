import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products }) => {
  return (
    <div className="public-products">
      <h1>Livestock Available</h1>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> KES {product.price}</p>
              <Link to={`/product/${product.id}`} state={{ product }}>
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
