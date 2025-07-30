import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faBagShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';



const NavBar = () => {
  const navigate = useNavigate();
  // const isAuthenticated = !!localStorage.getItem('userToken');

  // const handleLogout = () => {
  //   localStorage.removeItem('userToken');
  //   localStorage.removeItem('userInfo');
  //   localStorage.removeItem('adminToken');
  //   localStorage.removeItem('adminInfo');
  //   navigate('/login');
  // };

  // const user = JSON.parse(localStorage.getItem('userInfo')) || 
  //              JSON.parse(localStorage.getItem('adminInfo'));

  return (
    
    <div className="navbar">
  <div className="navbar-left">
    <img src={logo} alt="Farmart logo" className="logo" />
  </div>

  <div className="navbar-right">
    <div className="sidebtn">
      <button className="userbtn" onClick={() => navigate('/Admin')}>
        <FontAwesomeIcon icon={faUserCircle} />
      </button>
      <button className="shopbag" onClick={() => navigate('/orders')}>
        <FontAwesomeIcon icon={faBagShopping} />
      </button>
    </div>

    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/About">About us</Link>
      <Link to="/Contact">Contact</Link>
    </nav>
  </div>
</div>

    
    
  );
};

export default NavBar;