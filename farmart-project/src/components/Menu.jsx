import React from 'react'
import FilterExchange from '../subcomponents/FilterExchange'

const Menu = ({products}) => {
  return (
    <div>
      <FilterExchange products={products} />
    </div>
  )
}

export default Menu