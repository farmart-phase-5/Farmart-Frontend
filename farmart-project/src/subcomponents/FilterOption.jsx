import React from 'react'

const FilterOption = ({toggleSidebar,toggleCart,cartItemCount }) => {
  return (
    <div className='filter-options'>
        <button className="filter-btn" onClick={toggleSidebar}><FontAwesomeIcon icon={faFilter} /> Filter</button>
        <div className="logo-text">
          <span className="farmart">Farmart</span>
          <span className="farm">Farm</span>
        </div>
        <button className="cart-btn" onClick={toggleCart}><FontAwesomeIcon icon={faCartShopping} /> Cart ({cartItemCount})</button>

    </div>
  )
}

export default FilterOption