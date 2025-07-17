import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      ? 'https://brom-e-commerce-backend.onrender.com/api/auth/admin/register'
      : 'https://brom-e-commerce-backend.onrender.com/api/auth/admin/login';

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
