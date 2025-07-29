import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
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
import AdminAuth from './components/AdminAuth';
import UserAuth from './components/UserAuth';

function App() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetch('https://farmart-backened.onrender.com/animals') 
      .then(res => res.json())
      .then(data => setproducts(data));
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'About', element: <About /> },
        { path: 'Contact', element: <Contact /> },
        { path: 'products', element: <Products products={products} /> },
        { path: 'product/:id', element: <ProtectedRoute><ProductDetail /></ProtectedRoute> },
        { path: 'orders', element: <ProtectedRoute><OrdersPage /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><UserProfile /></ProtectedRoute> },

        
        { path: 'auth', element: <CombineAuth /> },

        { path: 'forgot-password', element: <ForgotPassword /> },

        { path: 'auth-required', element: <AuthRequired /> },

        {
          path: 'Admin',
          element: localStorage.getItem('adminToken')
            ? <Admin products={products} setproducts={setproducts} />
            : <Navigate to="/auth" />
        }
      ]
    },


    {
      path: '*',
      element: <Errorlink />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
