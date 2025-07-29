import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        alert('No token found. Please log in first.');
        navigate('/admin-auth');
        return;
      }

      try {
        const res = await fetch('https://farmart-backend-2-ot47.onrender.com/logout', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log('Logout response:', data);

        if (!res.ok) {
          alert(data.message || 'Logout failed.');
        } else {
          alert('Logged out successfully.');
          localStorage.removeItem('adminToken');
          navigate('/admin-auth');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred during logout.');
      }
    };

    logout();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
