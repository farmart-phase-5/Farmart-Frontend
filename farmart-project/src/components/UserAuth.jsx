import React, { useState } from 'react';
import horse from '../assets/horse.jpg'
import poultry from '../assets/poultry.avif'
import sheeps from '../assets/sheeps.jpg'
import cat from '../assets/cat 3.jpg'

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
      const res = await fetch('https://farmart-backend-2-ot47.onrender.com/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });

      if (!res.ok) {
        console.warn('Refresh token failed.');
        return null;
      }

      const data = await res.json();
      localStorage.setItem('userToken', data.access_token);
      return data.access_token;
    } catch (err) {
      console.error('Error refreshing token:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    const url = `https://farmart-backend-2-ot47.onrender.com/login`;

    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || 'Authentication failed.');
        return;
      }

      if (isLogin) {
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('userRole', 'user');
        alert('Login successful!');

        const freshAccessToken = await refreshAccessToken();
        if (freshAccessToken) {
          console.log('Access token refreshed successfully');
        }

        window.location.href = '/menu';
      } else {
        alert('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Auth error:', err);
      alert('An error occurred.');
    }
  };

  return (
    <div className="auth-wrapper">
      
      <div className="auth-left">
        <div className="logo">🟢 Farmart</div>
        <h1>{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
        <p className="sub-text">
          {isLogin ? 'Sign in to continue shopping' : 'Join the marketplace now'}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="auth-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button className="auth-switch" onClick={toggleForm}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>


      <div className="auth-right-gallery">
        <div className="image-box">
          <img src={horse} alt="img1" />
          <img src={poultry} alt="img2" />
          <img src={sheeps} alt="img3" />
          <img src={cat} alt="img4" />
        </div>
      </div>
    </div>
  );
};

export default UserAuth;