import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-required-container">
      <h2 className="auth-required-heading">You must be logged in to view this page.</h2>
      <button
        className="auth-required-button"
        onClick={() => navigate('/user-auth')}
      >
        Go to Login / Register
      </button>
    </div>
  );
};

export default AuthRequired;