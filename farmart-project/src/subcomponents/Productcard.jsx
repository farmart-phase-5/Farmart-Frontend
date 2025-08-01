import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndividualProduct = ({ image, name, price, product, addToCart }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart(product);
  };

  return (
    <div onClick={handleClick}>
      <img src={image} alt="Product" />
      <h2>{name}</h2>
      <p>Price: KES {price}</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

const Productcard = ({ products, addToCart }) => {
  return (
    <div className="productdiv">
      {products.map((product, index) => (
        <IndividualProduct
          key={index}
          image={product.image}
          name={product.name}
          price={product.price}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default Productcard;
