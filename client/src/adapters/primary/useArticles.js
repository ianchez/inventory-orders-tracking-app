import { useState, useEffect } from 'react';
import { fetchArticles } from '../../domain/InventoryService';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return {
    articles,
    length: articles.length,
  };
}