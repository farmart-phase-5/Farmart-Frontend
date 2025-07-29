import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isAdmin = !!localStorage.getItem('adminToken');
    const isUser = !!localStorage.getItem('userToken');

    if (isAdmin) {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
      try {
  const res = await fetch('https://farmart-backend-2-ot47.onrender.com/logout', {
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
    console.error('Logout failed:', data);
    alert(data?.error || 'Logout failed.');
    return;
  }

  localStorage.removeItem('adminToken');
  alert('Logout successful');
  navigate('/admin-auth');
} catch (err) {
  console.error('Logout error (fetch failed):', err);
  alert('An error occurred during logout.');
}


    }

    if (isUser) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('refreshToken');
      alert('User logout successful.');
      navigate('/auth');
    }

    if (!isAdmin && !isUser) {
      alert('No user is logged in.');
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
