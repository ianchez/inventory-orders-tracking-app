import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SCREENS } from '../../constants/router';
import { useOrders } from '../../adapters/primary/useOrders';
import { createOrder, updateOrder } from '../../domain/InventoryService';

const DEFAULT_FORM_STATE = {
  ID: '',
  ARTICLES: [],
};

export const OrderItemScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const { orders } = useOrders();
  const currentOrder = orders.find(order => order.id === params.id);
  const isNewOrder = !currentOrder && params.id === 'new';

  const [formState, setFormState] = useState({
    id: currentOrder?.id || DEFAULT_FORM_STATE.ID,
    articles: currentOrder?.articles || DEFAULT_FORM_STATE.ARTICLES,
  });

  useEffect(() => {
    if (!currentOrder) return;

    setFormState({
      id: currentOrder.id,
      articles: currentOrder.articles
    });
  }, [currentOrder]);

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    const action = isNewOrder ? createOrder : updateOrder;
    const response = await action(formState);
    if (!response.id) return;

    navigate(SCREENS.ORDERS.PATH);
  };

  const handleChangeArticleQuantity = ({ id, quantity }) => {
    if (Number(quantity) < 0) {
      return; // If it's negative, don't update the state
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
      return; // If it's negative, don't update the state
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
  }

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
  }

  // Disable add article button if there is an empty article to avoid duplicates issues
  const disableButtons = formState.articles.some((article) => article.id === '' || article.quantity === '0');
  const addArticleButtonLabel = disableButtons ? t('articles.pleaseFill') : t('articles.add');

  const screenTitle =
    isNewOrder
      ? t('orders.title.new')
      : currentOrder
        ? t(`screens.${SCREENS.ORDER_ITEM.NAME}`)
        : t('orders.title.notFound');

  const submitButtonLabel = isNewOrder ? t('orders.button.create') : t('orders.button.update');
  const disableSubmitButton = disableButtons || formState.articles.length < 1;

  const renderOrderForm = () => (
    <form onSubmit={handleSubmitOrder}>
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
        {formState.articles.map((article, index) => (
          <li
            key={article.id}
            className={`order-item ${(article.id === '' || article.quantity === 0) ? 'warning' : ''}`}
          >
            <label className='w45'>
              {t('articles.formLabel.id')}
              <input
                className={article.id === '' ? 'warning' : ''}
                type="number"
                name={`id-${article.id}`}
                value={article.id}
                onChange={(e) => handleChangeArticleId({ id: article.id, newId: e.target.value })}
              />
            </label>
            <label className='w45'>
              {t('articles.formLabel.quantity')}
              <input
                className={!article.quantity || article.quantity === '0' ? 'warning' : ''}
                type="number"
                name={`quantity-${article.id}`}
                value={article.quantity}
                onChange={(e) => handleChangeArticleQuantity({ id: article.id, quantity: e.target.value })}
              />
            </label>
          </li>
        ))}
      </ul>
      <button type="submit" className='primary' disabled={disableSubmitButton}>
        {submitButtonLabel}
      </button>
    </form>
  );

  return (
    <div className='screen'>
      <Link to={SCREENS.ORDERS.PATH}>
        {`${t('navigation.backTo')} ${t(`screens.${SCREENS.ORDERS.NAME}`)}`}
      </Link>

      <h2>{screenTitle}</h2>
      {(isNewOrder || currentOrder) && renderOrderForm()}
    </div>
  );
}