import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CombineAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const backendUrl = 'https://farmart-backend-2-ot47.onrender.com';

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';
    const url = `${backendUrl}/${role}${endpoint}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      const tokenKey = `${role}Token`;
      const infoKey = `${role}Info`;

      localStorage.setItem(tokenKey, data.access_token);
      localStorage.setItem(infoKey, JSON.stringify(data.user));

      navigate(role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'} as {role}</h2>

      <div className="role-switch">
        <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === 'user'}
            onChange={() => setRole('user')}
          /> User
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          /> Admin
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleMode}>{isLogin ? 'Register' : 'Login'}</button>
      </p>

      {isLogin && (
        <p>
          <button onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
        </p>
      )}
    </div>
  );
};

export default CombineAuth;
