import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    current_password: '',
    new_password: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('userToken');

  
  useEffect(() => {
    if (!token) {
      navigate('/user-auth');
      return;
    }

    fetch('https://brom-e-commerce-backend.onrender.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('userToken');
          navigate('/user-auth');
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          username: data.username || '',
          email: data.email || '',
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Please log in again.');
        setLoading(false);
      });
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };