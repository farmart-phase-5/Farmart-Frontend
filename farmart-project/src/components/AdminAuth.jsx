import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Only used for registration
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegister
      ? 'https://farmart-backend-2-ot47.onrender.com/register'
      : 'https://farmart-backend-2-ot47.onrender.com/login';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(`${isRegister ? 'Registration' : 'Login'} response:`, data);

      if (!res.ok) {
        alert(data.message || 'Something went wrong.');
        return;
      }

      if (!isRegister) {
        localStorage.setItem('adminToken', data.access_token);
        alert('Login successful!');
        navigate('/admin'); // Redirect to admin page
      } else {
        alert('Registration successful! You can now log in.');
        setIsRegister(false);
      }
    } catch (error) {
      console.error(error);
      alert('Server error. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>{isRegister ? 'Register' : 'Login'} as Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {isRegister && (
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
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
        {isRegister && (
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p onClick={toggleForm} style={{ cursor: 'pointer', marginTop: '1rem' }}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default AdminAuth;
