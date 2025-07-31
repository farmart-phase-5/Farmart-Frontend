import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = ['user', 'admin'], children }) => {
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');

  if (allowedRoles.includes('admin') && adminToken) return children;
  if (allowedRoles.includes('user') && userToken) return children;

  return <Navigate to="/auth-required" replace />;
};

export default ProtectedRoute;
