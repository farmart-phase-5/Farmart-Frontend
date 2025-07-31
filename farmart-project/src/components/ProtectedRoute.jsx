import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));

  const role = user ? 'user' : admin ? 'admin' : null;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={`/auth-required?role=${allowedRoles[0]}`} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
