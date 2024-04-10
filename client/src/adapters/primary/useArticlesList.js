import { useState, useEffect } from 'react';
import { fetchArticles } from '../../domain/InventoryService';

export const useArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>
          {article.name} - Quantity: {article.quantity}
        </li>
      ))}
    </ul>
  );
}