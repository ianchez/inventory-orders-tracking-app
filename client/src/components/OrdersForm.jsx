import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../context/inventory';
import { createOrder, updateOrder } from '../domain/InventoryService';
import { SCREENS } from '../constants/router';
import { ArticleInput } from './ArticleInput';

const DEFAULT_FORM_STATE = {
  ID: '',
  ARTICLES: [],
};

export const OrdersForm = ({currentOrder, isNewOrder = false}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { refetch } = useContext(InventoryContext);

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
    if (Number(quantity) < 0) {
      return;
    }

    const updatedArticles = formState.articles.map((article) => {
      if (article.id === id) {
        return { ...article, quantity };
      }
      return article;
    });
  
    setFormState(prevState => ({ ...prevState, articles: updatedArticles }));
  };

  const handleChangeArticleId = ({ id, newId }) => {
    if (Number(newId) < 0) {
      return;
    }

    const foundArticle = formState.articles.find((article) => article.id === newId);
    if (foundArticle) return;

    const updatedArticles = formState.articles.map((article) => {
      if (article.id === id) {
        return { ...article, id: newId };
      }
      return article;
    });
  
    setFormState(prevState => ({ ...prevState, articles: updatedArticles }));
  };

  // Disable add article button if there is an empty article to avoid duplicates issues
  const disableButtons = formState.articles.some((article) =>
    article.id === '' ||
    article.id === '0' ||
    article.quantity === '' ||
    article.quantity === '0'
  );
  const disableSubmitButton = disableButtons || formState.articles.length < 1;

  const addArticleButtonLabel = disableButtons ? t('articles.pleaseFill') : t('articles.add');

  const submitButtonLabel = isNewOrder ? t('orders.button.create') : t('orders.button.update');

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
      
      {!isNewOrder && [
        <h4>{t('orders.subtitle.id')}</h4>,
        <input className="w20" type="text" name="id" value={formState.id} readOnly disabled/>,
        <br/>
      ]}

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