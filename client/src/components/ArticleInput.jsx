import { useTranslation } from 'react-i18next';

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

  const idWarning = article.id === '' || article.id === '0';
  const quantityWarning = article.quantity === '' || article.quantity === '0';
  const articleWarning = idWarning || quantityWarning;

  return (
    <li
      key={article.id}
      className={`order-item ${articleWarning ? 'warning' : ''}`}
    >
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
    </li>
  );
}