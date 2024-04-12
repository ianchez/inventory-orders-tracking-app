import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SCREENS } from '../../constants/router';
import { useOrders } from '../../adapters/primary/useOrders';
import { createOrder, updateOrder } from '../../domain/InventoryService';

const DEFAULT_FORM_STATE = {
  ID: '',
  ARTICLES: [],
};

export const OrderItemScreen = () => {
  const navigate = useNavigate();
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

  const handleCreateOrder = async (event) => {
    event.preventDefault();
    const response = await createOrder(formState);
    setFormState(DEFAULT_FORM_STATE);
    navigate(SCREENS.ORDERS.PATH);
  };

  const handleUpdateOrder = async (event) => {
    event.preventDefault();
    const response = await updateOrder(formState);
    // setFormState(DEFAULT_FORM_STATE);
    // navigate(SCREENS.ORDERS.PATH);
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
  const addArticleButtonLabel = disableButtons ? 'Please fill the empty article' : 'Add Article';

  const screenTitle = isNewOrder ? 'New Order' : SCREENS.ORDER_ITEM.NAME;

  const submitButtonLabel = isNewOrder ? 'CREATE ORDER' : 'UPDATE ORDER';
  const disableSubmitButton = disableButtons || formState.articles.length < 1;
  const submitAction = isNewOrder ? handleCreateOrder : handleUpdateOrder;

  const renderOrderForm = () => (
    <form onSubmit={submitAction}>
      {!isNewOrder && [
        <h3>Order ID: {formState.id}</h3>,
        <input className="w45" type="text" name="id" value={formState.id} readOnly disabled/>,
        <br/>
      ]}
      

      <h3>Articles:</h3>
      <button
        type="button"
        className="secondary"
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
              Article ID:
              <input
                className={article.id === '' ? 'warning' : ''}
                type="number"
                name={`id-${article.id}`}
                value={article.id}
                onChange={(e) => handleChangeArticleId({ id: article.id, newId: e.target.value })}
              />
            </label>
            <label className='w45'>
              Quantity:
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
      <Link to={SCREENS.ORDERS.PATH}>Back to {SCREENS.ORDERS.NAME}</Link>

      <h2>{screenTitle}</h2>
      {renderOrderForm()}
    </div>
  );
}