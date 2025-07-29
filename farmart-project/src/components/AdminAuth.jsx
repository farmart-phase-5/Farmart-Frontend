import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cat from '../assets/cat 1.jpg';
import dog from '../assets/dog.jpg';
import puppys from '../assets/puppys.jpg';
import chickens from '../assets/chickens.jpeg';

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister(prev => !prev);
    setError('');
    setSuccess('');
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { username, email, password } = formData;
    if (!username || !password || (isRegister && !email)) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    const endpoint = isRegister
      ? 'https://farmart-backened.onrender.com/api/auth/admin/register'
      : 'https://farmart-backened.onrender.com/api/auth/admin/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      if (!isRegister) {
        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('userRole', 'admin');
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/Admin'), 1500);
      } else {
        setSuccess('Registration successful! You can now log in.');
        setIsRegister(false);
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="logo">🟣 Farmart Farm</div>
        <h1>Holla,<br />Welcome </h1>
        <p className="sub-text">Hey, welcome to this special place</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Name or Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {isRegister && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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

          {error && <p className="auth-error" style={{ color: 'red' }}>{error}</p>}
          {success && <p className="auth-success" style={{ color: 'green' }}>{success}</p>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="auth-toggle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="auth-switch" onClick={toggleMode}>
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>


      <div className="auth-right-gallery">
    <div className="image-box">
      <img src={cat} alt="img1" />
      <img src={dog} alt="img2" />
      <img src={puppys} alt="img3" />
      <img src={chickens} alt="img4" />
    </div>
  </div>
    </div>
  );
};

export default AdminAuth;
