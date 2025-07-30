import React, { useEffect, useState } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://brom-e-commerce-backend.onrender.com/api/users/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch users');
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="user-table">
      <h2>All Users</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;