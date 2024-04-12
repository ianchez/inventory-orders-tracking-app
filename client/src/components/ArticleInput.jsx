import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../context/inventory';
import { formatTax, formatPrice } from '../utils/format';

const DEFAULT_ARTICLE_STATE = {
  id: '',
  quantity: '0',
};

export const ArticleInput = ({
  article = DEFAULT_ARTICLE_STATE,
  handleChangeId = () => {},
  handleChangeQuantity = () => {},
}) => {
  const { t } = useTranslation();

  const { articles } = useContext(InventoryContext);
  const currentArticle = articles.find((a) => a.id === article.id);

  const idWarning = article.id === '' || article.id === '0';
  const quantityWarning = article.quantity === '' || article.quantity === '0';
  const articleWarning = idWarning || quantityWarning;

  return (
    <li
      key={article.id}
      className={`order-item ${articleWarning ? 'warning' : ''}`}
    >
      <div>
        <label className='w45'>
          {t('articles.formLabel.id')}
          <input
            className={idWarning ? 'warning' : ''}
            type="number"
            name={`id-${article.id}`}
            value={article.id}
            onChange={(e) => handleChangeId({ id: article.id, newId: e.target.value })}
          />
        </label>

        <label className='w45'>
          {t('articles.formLabel.quantity')}
          <input
            className={quantityWarning ? 'warning' : ''}
            type="number"
            name={`quantity-${article.id}`}
            value={article.quantity}
            onChange={(e) => handleChangeQuantity({ id: article.id, quantity: e.target.value })}
          />
        </label>
      </div>

      {currentArticle && (
        <>
          <p className='half-left'>
            {t('articles.itemLabel.tax')} {formatTax(currentArticle.taxPercentage)}
          </p>
          <p className='half-right'>
            {t('articles.itemLabel.unitPrice')} {formatPrice(currentArticle.price)}
          </p>

          <h3>
            {t('articles.itemLabel.price')} {formatPrice(currentArticle.price * article.quantity * (1 + currentArticle.taxPercentage / 100))}
          </h3>
        </>
      )}
    </li>
  );
}