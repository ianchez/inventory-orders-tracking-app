import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SCREENS } from '../../constants/router';
import { useOrders } from '../../adapters/primary/useOrders';
import { updateOrder } from '../../domain/InventoryService';

export const OrderItemScreen = () => {
  const params = useParams();
  const { orders } = useOrders();
  const currentOrder = orders.find(order => order.id === params.id);

  const [formState, setFormState] = useState({
    id: currentOrder?.id || "",
    articles: currentOrder?.articles || [],
  });

  useEffect(() => {
    if (!currentOrder) return;

    setFormState({
      id: currentOrder?.id || "",
      articles: currentOrder?.articles || [],
    });
  }, [currentOrder]);

  const handleUpdateOrder = async (event) => {
    event.preventDefault();
    const response = await updateOrder(formState);
    setFormState(response);
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

  const renderOrderForm = () => (
    <form onSubmit={handleUpdateOrder}>
      <input type="text" name="id" value={formState.id} readOnly /><br/>

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
            <label style={{ width: "45%" }}>
              Article ID:
              <input
                type="number"
                name={`id-${article.id}`}
                value={article.id}
                onChange={(e) => handleChangeArticleId({ id: article.id, newId: e.target.value })}
              />
            </label>
            <label style={{ width: "45%" }}>
              Quantity:
              <input
                type="number"
                name={`quantity-${article.id}`}
                value={article.quantity}
                onChange={(e) => handleChangeArticleQuantity({ id: article.id, quantity: e.target.value })}
              />
            </label>
          </li>
        ))}
      </ul>
      <button type="submit" className='primary' disabled={disableButtons}>Update Order</button>
    </form>
  );

  return (
    <div className='screen'>
      <Link to={SCREENS.ORDERS.PATH}>Back to {SCREENS.ORDERS.NAME}</Link>

      <h2>{SCREENS.ORDER_ITEM.NAME}</h2>
      <h4>Order ID:</h4>
      {renderOrderForm()}
    </div>
  );
}