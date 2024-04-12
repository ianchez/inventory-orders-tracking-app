import React, { useState, useEffect, createContext } from 'react';
import { useArticles } from '../adapters/primary/useArticles';
import { useOrders } from '../adapters/primary/useOrders';

export const InventoryContext = createContext();

const INITIAL_STATE = {
  articles: [],
  orders: [],
  loading: false,
};

// Provider component
export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(INITIAL_STATE);

  const { articles, loading: loadingArticles, refetch: refetchArticles } = useArticles();
  const { orders, loading: loadingOrders, refetch: refetchOrders } = useOrders();

  useEffect(() => {
    setInventory({
      articles: articles,
      orders: orders,
      loading: loadingArticles || loadingOrders,
    });
  } , [articles, orders, loadingArticles, loadingOrders]);


  const refetch = () => {
    refetchArticles();
    refetchOrders();
  };

  return (
    <InventoryContext.Provider value={{...inventory, refetch }}>
      {children}
    </InventoryContext.Provider>
  );
};