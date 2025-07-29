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
      ? 'https://farmart-backend-2-ot47.onrender.com/register'
      : 'https://farmart-backend-2-ot47.onrender.com/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
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
    <div className="admin-auth">
      <h2>{isRegister ? 'Admin Register' : 'Admin Login'}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
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
        />

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
  );
};

export default AdminAuth;