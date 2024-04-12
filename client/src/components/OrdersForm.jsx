import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../context/inventory';
import { createOrder, updateOrder } from '../domain/InventoryService';
import { SCREENS } from '../constants/router';
import { ArticleInput } from './ArticleInput';
import { formatPrice } from '../utils/format';

const DEFAULT_FORM_STATE = {
  ID: '',
  ARTICLES: [],
};

export const OrdersForm = ({currentOrder, isNewOrder = false}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { articles, refetch } = useContext(InventoryContext);
  const [errorMessage, setErrorMessage] = useState('');

  const [formState, setFormState] = useState({
    id: currentOrder?.id || DEFAULT_FORM_STATE.ID,
    articles: currentOrder?.articles || DEFAULT_FORM_STATE.ARTICLES,
  });

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    const action = isNewOrder ? createOrder : updateOrder;
    const response = await action(formState);
    if (!response.id) return;

    navigate(SCREENS.ORDERS.PATH);
    refetch();
  };

  const handleAddArticle = () => {
    setFormState((prevState) => {
      const emptyArticle = prevState.articles.find((article) => article.id === '');
      if (emptyArticle) return prevState;

      return ({
        ...prevState,
        articles: [
          ...prevState.articles,
          { id: '', quantity: "0" },
        ],
      });
    });
  };

  const handleChangeArticleQuantity = ({ id, quantity }) => {
    setErrorMessage(''); // Reset error message

    if (Number(quantity) < 0) {
      setErrorMessage(t('articles.formError.negativeQuantity'));
    }

    const foundArticle = articles.find((article) => article.id === id);
    if (!foundArticle && id !== '') {
      setErrorMessage(`${t('orders.formError.articleNotFound')} - ID: ${id}`);
    };

    const updatedArticles = formState.articles.map((article) => {
      if (article.id === id) {
        return { ...article, quantity };
      }
      return article;
    });
  
    setFormState(prevState => ({ ...prevState, articles: updatedArticles }));
  };

  const handleChangeArticleId = ({ id, newId }) => {
    setErrorMessage(''); // Reset error message

    if (Number(newId) < 0) {
      setErrorMessage(t('articles.formError.negativeID'));
      setTimeout(() => setErrorMessage(''), 3000); // 3 seconds
      return;
    }

    const alreadyContainsArticle = formState.articles.find((article) => article.id === newId)
    if (alreadyContainsArticle) {
      setErrorMessage(`${t('orders.formError.alreadyContainsArticle')} - ID: ${newId}`);
      setTimeout(() => setErrorMessage(''), 3000); // 3 seconds
      newId = '';
    };

    const foundArticle = articles.find((article) => article.id === newId);
    if (!foundArticle && newId !== '') {
      setErrorMessage(`${t('orders.formError.articleNotFound')} - ID: ${newId}`);
    };

    const updatedArticles = formState.articles.map((article) => {
      if (article.id === id) {
        return { ...article, id: newId };
      }
      return article;
    });
  
    setFormState(prevState => ({ ...prevState, articles: updatedArticles }));
  };

  // Disable add article button if there is an empty article to avoid duplicates issues
  const disableButtons = formState.articles?.some((article) =>
    article.id === '' ||
    article.id === '0' ||
    article.quantity === '' ||
    article.quantity === '0' ||
    errorMessage !== ''
  );
  const disableSubmitButton = disableButtons || formState.articles.length < 1;

  const addArticleButtonLabel = disableButtons ? t('articles.pleaseFill') : t('articles.add');

  const submitButtonLabel = isNewOrder ? t('orders.button.create') : t('orders.button.update');

  const totalOrder = formState.articles.reduce((total, article) => {
    const foundArticle = articles.find((a) => a.id === article.id);
    if (!foundArticle) return total;
    return total + (foundArticle.price * article.quantity * (1 + foundArticle.taxPercentage / 100));
  }, 0);

  return (
    <form onSubmit={handleSubmitOrder}>
      <button
        type="submit"
        className='primary'
        disabled={disableSubmitButton}
        style={{ marginBottom: '4px + 1.6vw' }}
      >
        {submitButtonLabel}
      </button>
      <p className={`error-message ${errorMessage ? '' : 'transparent'}`}>
        {errorMessage ? `Error: ${errorMessage}` : ''}
      </p>
      
      {!isNewOrder && [
        <h4>{t('orders.subtitle.id')}</h4>,
        <input className="w20" type="text" name="id" value={formState.id} readOnly disabled/>,
      ]}

      <h4 className='total'>{t('orders.total')} {formatPrice(totalOrder)}</h4>
      <h4>{t('orders.subtitle.articles')}</h4>

      <button
        type="button"
        className="secondary w45"
        onClick={handleAddArticle}
        disabled={disableButtons}
      >
        {addArticleButtonLabel}
      </button>

      <ul className='w100'>
        {formState.articles.map((article) =>
          <ArticleInput
            article={article}
            handleChangeId={handleChangeArticleId}
            handleChangeQuantity={handleChangeArticleQuantity}
          />
        )}
      </ul>
    </form>
  );
}