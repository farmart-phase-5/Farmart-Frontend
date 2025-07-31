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
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('https://farmart-backend-2-ot47.onrender.com/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setFormData({
          username: data.username || '',
          email: data.email || '',
          current_password: '',
          new_password: '',
        });
      } catch (err) {
        console.error('Error:', err);
        localStorage.removeItem('token');
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://farmart-backend-2-ot47.onrender.com/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Update failed');
      }

      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const { current_password, new_password } = formData;

      if (!current_password || !new_password) {
        throw new Error('Both passwords are required');
      }

      if (new_password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      const response = await fetch('https://farmart-backend-2-ot47.onrender.com/me/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Password update failed');
      }

      setSuccess('Password updated successfully!');
      setFormData(prev => ({ ...prev, current_password: '', new_password: '' }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone!')) {
      return;
    }

    try {
      const response = await fetch('https://farmart-backend-2-ot47.onrender.com/me', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Delete failed');
      }

      localStorage.clear();
      navigate('/auth');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="user-profile-loading">
        <div className="user-profile-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-header">Your Profile</h2>

      {error && <div className="user-profile-error">{error}</div>}
      {success && <div className="user-profile-success">{success}</div>}

      <form onSubmit={handleUpdateProfile} className="user-profile-form">
        <div className="user-profile-form-group">
          <label className="user-profile-label">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="user-profile-input"
            required
          />
        </div>

        <div className="user-profile-form-group">
          <label className="user-profile-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="user-profile-input"
            required
          />
        </div>

        <button type="submit" className="user-profile-button" disabled={updating}>
          {updating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <form onSubmit={handleUpdatePassword} className="user-profile-form">
        <h3 className="user-profile-section-header">Change Password</h3>

        <div className="user-profile-form-group">
          <label className="user-profile-label">Current Password</label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            className="user-profile-input"
          />
        </div>

        <div className="user-profile-form-group">
          <label className="user-profile-label">New Password</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="user-profile-input"
          />
        </div>

        <button type="submit" className="user-profile-button" disabled={updating}>
          {updating ? 'Updating...' : 'Change Password'}
        </button>
      </form>

      <div className="user-profile-danger-zone">
        <h3 className="user-profile-section-header">Danger Zone</h3>
        <button onClick={handleDeleteAccount} className="user-profile-delete-button">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
