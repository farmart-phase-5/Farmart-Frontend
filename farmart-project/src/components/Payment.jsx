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
      const res = await axios.post('http://localhost:5173/payments/', formData);
      setMessage(`Payment successful! Status: ${res.data.status}`);
    } catch (err) {
      setMessage('Payment failed. Please try again.');
    }
  };

    return (
    <div className="payment-container">
      <h2 className="payment-title">Make a Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <input
          type="text"
          name="order_id"
          value={formData.order_id}
          onChange={handleChange}
          placeholder="Order ID"
          className="payment-input"
          required
        />
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="User ID"
          className="payment-input"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="payment-input"
          required
        />
        <button type="submit" className="payment-button">Pay</button>
      </form>
      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default PaymentForm;