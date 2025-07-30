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
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch('https://farmart-backened.onrender.com/animals') 
      .then(res => res.json())
      .then(data => setproducts(data));
  }, []);

  useEffect(() => {
  const userToken = localStorage.getItem('userToken');
  const userInfo = localStorage.getItem('userInfo');

  const adminToken = localStorage.getItem('adminToken');
  const adminInfo = localStorage.getItem('adminInfo');

  if (adminToken && adminInfo) {
    setAuth({ token: adminToken, user: JSON.parse(adminInfo) });
  } else if (userToken && userInfo) {
    setAuth({ token: userToken, user: JSON.parse(userInfo) });
  }
}, []);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'products', element: <Products products={products} /> },
        { path: 'product/:id', element: <ProtectedRoute><ProductDetail /></ProtectedRoute> },
        { path: 'orders', element: <ProtectedRoute><OrdersPage /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><UserProfile /></ProtectedRoute> },

        
        { path: 'auth', element: <CombineAuth /> },
        { path: 'login', element: <Navigate to="/auth" replace /> },
        { path: 'register', element: <Navigate to="/auth" replace /> },

        { path: 'forgot-password', element: <ForgotPassword /> },

        { path: 'auth-required', element: <AuthRequired /> },

        { path: 'admin-auth', element: <AdminAuth /> },

        {
  path: 'admin',
  element: (
    <ProtectedRoute>
      <Admin products={products} setproducts={setproducts} />
    </ProtectedRoute>
  )
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
