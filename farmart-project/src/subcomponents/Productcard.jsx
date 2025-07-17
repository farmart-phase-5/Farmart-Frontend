import React from 'react'
import { useNavigate } from 'react-router-dom'

const IndividualProduct = ({ image, name, price, product, addToCart }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/product/${product._}`, {state: {product}})

    }
    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

     return(

        <div>
            <img src={image} alt="Product Image" onClick={handleClick} />
            <h2>{name}</h2>
            <p>Price: ${price}</p>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
     )

}

const Productcard = ({ products,addToCart }) => {
    console.log(products)

    return (
        <div className='productdiv'>
            {products.map((product,id) => (
                <IndividualProduct
                key={id}
                image={product.image_url}
                name={product.name}
                price={product.price}
                product={product}
                addToCart={addToCart}

                />
            ))}

        </div>
    )
    
}

export default Productcard