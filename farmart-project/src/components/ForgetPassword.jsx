import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('https://farmart-backend-2-ot47.onrender.com/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      setMessage(data.message || 'Check your email for password reset instructions.');
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="auth-up">
  <div className="auth-down">
    <h2>Forgot Password</h2>
    <p>Enter your email and we’ll send reset instructions.</p>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>
    {message && <p style={{ color: 'green' }}>{message}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
</div>

  );
};

export default ForgotPassword;
