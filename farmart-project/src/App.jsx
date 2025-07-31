import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ProductDetail from './subcomponents/ProductDetails';
import Layout from './components/Layout';
import Admin from './components/Admin';
import CombineAuth from './components/CombineAuth';
import Errorlink from './components/Errorlink';
import AuthRequired from './components/AuthRequired';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';
import OrdersPage from './components/OrdersPage';
import Products from './subcomponents/Products';
import ForgotPassword from './components/ForgetPassword';
import EditProducts from './components/EditProducts';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // holds user info

  useEffect(() => {
    // Fetch user from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch('https://farmart-backend-2-ot47.onrender.com/animals')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} setUser={setUser} />, // pass user state
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        {
          path: 'products',
          element: products.length ? (
            <Products products={products} />
          ) : (
            <p>Loading products...</p>
          ),
        },
        {
          path: 'product/:id',
          element: (
            <ProtectedRoute allowedRoles={['user', 'admin']} user={user}>
              <ProductDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute allowedRoles={['user', 'admin']} user={user}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: 'orders',
          element: (
            <ProtectedRoute allowedRoles={['user']} user={user}>
              <OrdersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'admin',
          element: (
            <ProtectedRoute allowedRoles={['admin']} user={user}>
              <Admin products={products} setProducts={setProducts} />
            </ProtectedRoute>
          ),
        },
        {
          path: 'edit-product/:id',
          element: (
            <ProtectedRoute allowedRoles={['admin']} user={user}>
              <EditProducts />
            </ProtectedRoute>
          ),
        },
        { path: 'auth', element: <CombineAuth setUser={setUser} /> },
        { path: 'login', element: <Navigate to="/auth" replace /> },
        { path: 'register', element: <Navigate to="/auth" replace /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        {
          path: 'auth-required',
          element: <AuthRequired />,
        },
      ],
    },
    { path: '*', element: <Errorlink /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
