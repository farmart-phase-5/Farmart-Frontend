import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      alert('Admin not logged in.');
      return;
    }

    try {
      const res = await fetch('https://farmart-backend-1-30rq.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

        const isJson = res.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await res.json() : null;

      console.log("Logout response:", data);

      if (!res.ok) {
        console.error('Logout failed response:', data);
        alert(data?.error || 'Logout failed.');
        return;
      }

      localStorage.removeItem('adminToken');
      alert('Admin logout successful.');
      navigate('/admin-auth');
    } catch (err) {
      console.error('Logout error:', err);
      alert('An error occurred during logout.');
    }
  };
    
    return (
    <button className="logout-button" onClick={handleLogout}>
      <span role="img" aria-label="logout" style={{ marginRight: '8px' }}>🚪</span>
      Logout
    </button>
  );
};

export default Logout;