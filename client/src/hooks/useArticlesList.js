import { useArticles } from '../adapters/primary/useArticles';

export const useArticlesList = () => {
  const { articles } = useArticles(); 

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