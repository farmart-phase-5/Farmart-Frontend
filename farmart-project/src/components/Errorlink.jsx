import React from 'react'
import { Link } from 'react-router-dom'

const Errorlink = () => {
  return (
    <div className='error-page'>
        <h1>Page Not Found</h1>
        <p>Oops! It looks like the page you're looking for doesn't exist.</p>
        <Link to="/">Go Back To Home Page</Link>
    </div>
  )
}

export default Errorlink