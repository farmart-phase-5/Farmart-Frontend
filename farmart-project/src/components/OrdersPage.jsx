import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      if (!token) return;

      try {
        const res = await fetch('https://farmart-backend-2-ot47.onrender.com/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

    return (
    <div className="orders-page-container">
      <div className="orders-page-wrapper">
        <h2 className="orders-heading">Your Orders</h2>

        {loading ? (
          <p className="orders-loading">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <h3 className="order-title">Order {order.id}</h3>
                {order.items?.length > 0 ? (
                  <ul className="order-items">
                    {order.items.map(item => (
                      <li key={item.id} className="order-item">
                        <span>{item.food_item?.name || 'Unknown Item'}</span>
                        <span className="order-qty">× {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="order-empty">No items in this order.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;