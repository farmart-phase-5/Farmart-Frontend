import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CombineAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendBaseUrl = 'https://farmart-backend-2-ot47.onrender.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!isLogin) {
      if (!formData.username) {
        setError('Username is required');
        return false;
      }
      if (formData.username.length < 3) {
        setError('Username must be at least 3 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
    }
    return true;
  };

  
const handleAuthSuccess = (responseData) => {
  const token = responseData.access_token || responseData.token;

  if (!token) {
    throw new Error('Authentication token not received');
  }

  
  localStorage.setItem('token', token);

  
  const role = responseData.user?.role || responseData.role || role;
  if (role === 'admin') {
    navigate('/admin');
  } else {
    navigate('/profile');
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setError('');

  try {
    const endpoint = isLogin ? '/auth/login' : '/register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role
        };

    
    const healthCheck = await fetch(`${backendBaseUrl}/healthcheck`);
    if (!healthCheck.ok) {
      throw new Error('Backend server is not responding');
    }

    const response = await fetch(`${backendBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include' 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || 'Authentication failed');
    }

    const data = await response.json();
    handleAuthSuccess(data);
  } catch (err) {
    console.error('Authentication error:', err);
    setError(err.message || 'Failed to connect to server. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>

      {!isLogin && (
        <div className="role-container">
          <label className="role-label">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
              className="radio-input"
            />
            User
          </label>
          <label className="role-label">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="radio-input"
            />
            Admin
          </label>
        </div>
      )}

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              required
              minLength={3}
            />
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
            minLength={8}
          />
        </div>

        {!isLogin && (
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className={`auth-button ${loading ? 'disabled' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="toggle-container">
        <span className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button type="button" onClick={toggleMode} className="toggle-button">
          {isLogin ? 'Create Account' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default CombineAuth;