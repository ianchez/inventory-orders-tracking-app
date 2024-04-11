import { useNavigate } from 'react-router-dom';
import { routeBuilder } from '../constants/router';
import { useOrders } from '../adapters/primary/useOrders';

export const OrdersList = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const onClickHandler = (id) => {
    navigate(routeBuilder.ORDER(id));
  }

  return (
    <ul>
      {orders.map(order => (
        <li
          key={order.id}
          className='pressable'
          onClick={() => onClickHandler(order.id)}
        >
          <h4>ID: {order.id}</h4>
          <p>Articles:</p>
          <ul>
            {order.articles.map(article => (
              <li key={article.id} >
                ID: {article.id}<br />
                Quantity: {article.quantity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}