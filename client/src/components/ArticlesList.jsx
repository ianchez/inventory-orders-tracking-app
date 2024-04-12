import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useArticles } from '../adapters/primary/useArticles';
import { routeBuilder } from '../constants/router';

export const ArticlesList = () => {
  const { t } = useTranslation();
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
          <h4>{t('articles.itemLabel.id')} {article.id} | {article.name}</h4>

          {t('articles.itemLabel.price')} ${article.price} | {t('articles.itemLabel.tax')} {article.taxPercentage}%
          <br/>
          {t('articles.itemLabel.description')}<br/>
          <li>{article.description}</li>
        </li>
      ))}
    </ul>
  );
}