import React from 'react'
import FilterExchange from '../subcomponents/FilterExchange'

const Products = ({products}) => {
  return (
    <div>
      <FilterExchange products={products} />
    </div>
  )
}

export default Products