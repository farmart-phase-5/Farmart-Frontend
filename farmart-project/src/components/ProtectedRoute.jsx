import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No token found, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token exists, allow access

  return children;
};

export default ProtectedRoute;
