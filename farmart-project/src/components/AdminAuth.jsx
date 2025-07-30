import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import horse from '../assets/horse.jpg';
import poultry from '../assets/poultry.avif';
import sheeps from '../assets/sheeps.jpg';
import cat from '../assets/cat 3.jpg';

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`https://farmart-backend-2-ot47.onrender.com/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isRegister ? formData : {
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (!isRegister) {
        if (data.user.role !== 'admin') {
          setError('Access denied: Not an admin.');
          return;
        }

        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('adminInfo', JSON.stringify(data.user));
        setSuccess('Admin login successful! Redirecting...');
        setTimeout(() => navigate('/Admin'), 1500);
      } else {
        setSuccess('Registration successful! You can now login.');
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-lg bg-white rounded-xl overflow-hidden">
      
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-1 p-2">
          <img src={horse} alt="Horse" className="h-48 object-cover rounded" />
          <img src={poultry} alt="Poultry" className="h-48 object-cover rounded" />
          <img src={sheeps} alt="Sheep" className="h-48 object-cover rounded" />
          <img src={cat} alt="Cat" className="h-48 object-cover rounded" />
        </div>

  
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
            {isRegister ? 'Admin Register' : 'Admin Login'}
          </h2>

          {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
          {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            {isRegister && (
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {isRegister ? 'Register as Admin' : 'Login as Admin'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            {isRegister ? 'Already have an account?' : 'Need an account?'}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-blue-600 underline"
            >
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
