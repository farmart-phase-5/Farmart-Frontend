import React, { useEffect, useState } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

  