import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');

  if (!userToken && !adminToken) {
    return <Navigate to="/auth-required" replace />;
  }

  return children;
};

export default ProtectedRoute;