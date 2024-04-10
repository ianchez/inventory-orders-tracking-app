import { useState, useEffect } from 'react';
import { fetchOrders } from '../../domain/InventoryService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return {
    orders,
    length: orders.length
  };
}