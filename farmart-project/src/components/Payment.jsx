import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    order_id: '',
    user_id: '',
    amount: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/payments/', formData);
      setMessage(Payment successful! Status: ${res.data.status});
    } catch (err) {
      setMessage('Payment failed. Please try again.');
    }
  };