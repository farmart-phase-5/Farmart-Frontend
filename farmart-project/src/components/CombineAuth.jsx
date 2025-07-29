import React, { useState } from 'react';
import UserAuth from './UserAuth';
import AdminAuth from './AdminAuth';

const CombineAuth = () => {
  const [view, setView] = useState('user');

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setView('user')}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: view === 'user' ? '#4caf50' : '#ccc',
            color: view === 'user' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          User
        </button>
        <button
          onClick={() => setView('admin')}
          style={{
            padding: '10px 20px',
            backgroundColor: view === 'admin' ? '#673ab7' : '#ccc',
            color: view === 'admin' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Admin
        </button>
      </div>

      {view === 'user' ? <UserAuth /> : <AdminAuth />}
    </div>
  );
};

export default CombineAuth;
