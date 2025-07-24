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

    fetch('https://farmart-backend-1-30rq.onrender.com/api/users/me', {
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

    const handleUpdateProfile = async () => {
    setError('');
    setSuccess('');

    try {
      const res = await fetch(
        'https://brom-e-commerce-backend.onrender.com/api/users/me',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Profile update failed');
        return;
      }

      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError('Something went wrong during profile update.');
    }
  };

  const handleUpdatePassword = async () => {
    setError('');
    setSuccess('');

    const { current_password, new_password } = formData;

    if (!current_password || !new_password) {
      setError('Both current and new password are required');
      return;
    }

    if (new_password.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    if (current_password === new_password) {
      setError('New password must be different from the current one');
      return;
    }

    try {
      const res = await fetch(
        'https://brom-e-commerce-backend.onrender.com/api/users/me/password',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ current_password, new_password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Password update failed');
        return;
      }

      setSuccess('Password updated successfully!');
      setFormData((prev) => ({
        ...prev,
        current_password: '',
        new_password: '',
      }));
    } catch (err) {
      console.error(err);
      setError('Something went wrong while updating password.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    try {
      const res = await fetch(
        'https://brom-e-commerce-backend.onrender.com/api/users/me',
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Delete failed');
        return;
      }

      localStorage.clear();
      alert('Account deleted. Redirecting...');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  if (loading) return <p>Loading...</p>;

    return (
    <div className="profile-page">
      <h2>User Profile</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleUpdateProfile} className="update-button">
        Update Profile
      </button>

      <h3>Change Password</h3>

      <label>
        Current Password:
        <input
          type="password"
          name="current_password"
          value={formData.current_password}
          onChange={handleChange}
        />
      </label>

      <label>
        New Password:
        <input
          type="password"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleUpdatePassword} className="password-button">
        Update Password
      </button>

      <hr />

      <button onClick={handleDelete} className="delete-button">
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;