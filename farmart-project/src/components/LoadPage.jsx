import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom';

const Loadpage = () => {
  const navigate = useNavigate();
  const handleDownloadClick = () => {
  
    window.location.href = 'https://www.apple.com/app-store/';
  };

  return (
    <div>
        <h1>Let's now shop<br></br> For daily food<br></br> & necessary.</h1>
        <p>We are truseted grocery shop you can buy <br></br>your necesary products use your phones</p>
        <button className='shop-now-btn' onClick={() => navigate('/orders')}>Shop Now</button>
        <button className='download-btn' onClick={handleDownloadClick}><FontAwesomeIcon icon={faAppleWhole} /> Download for ios</button>
    </div>
  )
}

export default Loadpage