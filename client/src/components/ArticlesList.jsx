import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routeBuilder } from '../constants/router';
import { InventoryContext } from '../context/inventory';

export const ArticlesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { articles } = useContext(InventoryContext);

  const onClickHandler = (id) => {
    navigate(routeBuilder.ARTICLE(id));
  }

  return (
    <ul>
      {articles.map(article => (
        <li
          key={article.id}
          className='main-list-item pressable'
          onClick={() => onClickHandler(article.id)}
        >
          <h4>{t('articles.itemLabel.id')} {article.id} | {article.name}</h4>

          {t('articles.itemLabel.price')} ${article.price} | {t('articles.itemLabel.tax')} {article.taxPercentage}%
          <br/>
          {t('articles.itemLabel.description')}<br/>
          {!!article.description && 
            <ul>
              <li>{article.description}</li>
            </ul>
          }
        </li>
      ))}
    </ul>
  );
}