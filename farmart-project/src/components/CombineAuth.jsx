import React, { useState } from 'react';
import UserAuth from './UserAuth';
import AdminAuth from './AdminAuth';

const CombinedAuthPage = () => {
  const [view, setView] = useState('user'); 

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => setView('user')}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: view === 'user' ? '#4caf50' : '#e0e0e0',
            color: view === 'user' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          User
        </button>
        <button
          onClick={() => setView('admin')}
          style={{
            padding: '10px 20px',
            backgroundColor: view === 'admin' ? '#673ab7' : '#e0e0e0',
            color: view === 'admin' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
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

export default CombinedAuthPage;
