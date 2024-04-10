import { useState, useEffect } from 'react';
import { fetchOrders } from '../../domain/InventoryService';

export const useOrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          <h3>Order {order.id}</h3>
          <ul>
            {order.articles.map(article => (
              <li key={article.id}>
                {article.id} x {article.quantity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}