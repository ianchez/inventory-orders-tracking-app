import { useNavigate } from 'react-router-dom';

import { useArticles } from '../adapters/primary/useArticles';
import { routeBuilder } from '../constants/router';

export const ArticlesList = () => {
  const navigate = useNavigate();
  const { articles } = useArticles();

  const onClickHandler = (id) => {
    navigate(routeBuilder.ARTICLE(id));
  }

  return (
    <ul>
      {articles.map(article => (
        <li
          key={article.id}
          className='pressable'
          onClick={() => onClickHandler(article.id)}
        >
          <h4>ID: {article.id} | {article.name}</h4>
          Price: ${article.price} | Tax: {article.taxPercentage}%<br/>
          Description: {article.description}
        </li>
      ))}
    </ul>
  );
}