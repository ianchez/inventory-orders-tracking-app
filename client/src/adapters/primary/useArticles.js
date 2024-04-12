import { useState, useEffect } from 'react';
import { fetchArticles } from '../../domain/InventoryService';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchArticles()
      .then((response) => {
        setArticles(response)
        setLoading(false);
      });
  }, [refetchTrigger]);

  const refetch = () => setRefetchTrigger(prev => prev + 1); 

  return {
    articles,
    length: articles.length,
    loading,
    refetch
  };
}