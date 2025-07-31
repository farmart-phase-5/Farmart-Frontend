// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  const isTokenValid = token && tokenExpiration && Date.now() < Number(tokenExpiration);
  const roleIsAllowed = allowedRoles.length === 0 || allowedRoles.includes(userData.role);

  if (!isTokenValid) {
    localStorage.clear(); 
    return <Navigate to="/login" replace />;
  }

  if (!roleIsAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
