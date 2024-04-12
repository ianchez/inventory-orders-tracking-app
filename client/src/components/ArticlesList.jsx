import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routeBuilder } from '../constants/router';
import { InventoryContext } from '../context/inventory';
import { formatPrice, formatTax } from '../utils/format';

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
          <h3 className='half-left'>
            {t('articles.itemLabel.id')} {article.id}
          </h3>
          <h3 className='half-right'>
            {article.name}
          </h3>

          <p className='half-left'>
            {t('articles.itemLabel.price')} {formatPrice(article.price)}
          </p>
          <p className='half-right'>
            {t('articles.itemLabel.tax')} {formatTax(article.taxPercentage)}
          </p>
          {!!article.description && 
          <p>
            {t('articles.itemLabel.description')}
            <ul style={{ marginTop: 4 }}>
              <li>{article.description}</li>
            </ul>
          </p>
          }
        </li>
      ))}
    </ul>
  );
}