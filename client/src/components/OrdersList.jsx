import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routeBuilder } from '../constants/router';
import { useOrders } from '../adapters/primary/useOrders';

export const OrdersList = () => {
  const { t } = useTranslation();
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
          <h4>{t('orders.itemLabel.id')} {order.id}</h4>

          <p>{t('orders.itemLabel.articles')}</p>
          <ul>
            {order.articles.map(article => (
              <li key={article.id} >
                {t('orders.itemLabel.id')} {article.id}<br />
                {t('orders.itemLabel.quantity')} {article.quantity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}