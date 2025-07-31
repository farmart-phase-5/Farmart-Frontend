import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faBagShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged out');
    navigate('/auth');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Farmart logo" className="logo" />
      </div>

      <div className="navbar-right">
        <div className="sidebtn">
          {token && role === 'admin' && (
            <button className="userbtn" onClick={() => navigate('/admin')}>
              <FontAwesomeIcon icon={faUserGear} />
            </button>
          )}
          {token && role === 'user' && (
            <button className="userbtn" onClick={() => navigate('/profile')}>
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
          )}
          {token && (
            <button className="shopbag" onClick={() => navigate('/orders')}>
              <FontAwesomeIcon icon={faBagShopping} />
            </button>
          )}
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>

          {token ? (
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          ) : (
            <Link to="/auth" style={{ marginLeft: '10px' }}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
