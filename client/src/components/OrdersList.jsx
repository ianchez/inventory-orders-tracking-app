
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../context/inventory';
import { routeBuilder } from '../constants/router';

export const OrdersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { orders } = useContext(InventoryContext);

  const onClickHandler = (id) => {
    navigate(routeBuilder.ORDER(id));
  }

  return (
    <ul>
      {orders.map(order => (
        <li
          key={order.id}
          className='pressable main-list-item'
          onClick={() => onClickHandler(order.id)}
        >
          <h3>{t('orders.itemLabel.id')} {order.id}</h3>

          <p>{t('orders.itemLabel.articles')}</p>
          <ul>
            {order.articles.map(article => (
              <li key={article.id} >
                <p className='half-left'>
                  {t('orders.itemLabel.id')} {article.id}
                </p>
                <p className='half-right'>
                  {t('orders.itemLabel.quantity')} {article.quantity}
                </p>
                
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}