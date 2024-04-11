import { useArticles } from '../adapters/primary/useArticles';

export const ArticlesList = () => {
  const { articles } = useArticles(); 

  return (
    <ul>
      {articles.map(article => (
        <li key={article.id} className='pressable'>
          <h4>ID: {article.id} | {article.name}</h4>
          Price: ${article.price} | Tax: {article.taxPercentage}%<br/>
          Description: {article.description}
        </li>
      ))}
    </ul>
  );
}