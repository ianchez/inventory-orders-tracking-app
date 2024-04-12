import { useState, useEffect } from 'react';
import { fetchOrders } from '../../domain/InventoryService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchOrders()
      .then((response) => {
        setOrders(response);
        setLoading(false);
      });
  }, [refetchTrigger]);

  const refetch = () => setRefetchTrigger(prev => prev + 1); 

  return {
    length: orders.length,
    loading,
    orders,
    refetch
  };
}