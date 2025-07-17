import React, { useState } from 'react';

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
      const res = await fetch('https://brom-e-commerce-backend.onrender.com/api/auth/refresh', {
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