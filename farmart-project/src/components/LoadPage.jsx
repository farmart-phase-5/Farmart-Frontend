import React from 'react'
import {useNavigate } from 'react-router-dom';

const Loadpage = () => {
  const navigate = useNavigate();
  const handleDownloadClick = () => {
  
    window.location.href = 'https://www.apple.com/app-store/';
  };

  return (
    <div>
        <h1>Buy and sell quality farm animals — anytime, anywhere. <br Download Now /></h1>
        <p>Trusted livestock marketplace. Fair prices. Healthy animals. Free delivery included.</p>
        <button className='shop-now-btn' onClick={() => navigate('/orders')}>Shop Now</button>
    </div>
  )
}

export default Loadpage