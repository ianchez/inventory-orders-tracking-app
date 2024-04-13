
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../context/inventory';
import { routeBuilder } from '../constants/router';
import { formatPrice } from '../utils/format';

export const OrdersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { articles, orders } = useContext(InventoryContext);

  const onClickHandler = (id) => {
    navigate(routeBuilder.ORDER(id));
  }

  return (
    <ul>
      {orders.map(order => {
        const { total, totalWithTax } = order.articles.reduce((acc, article) => {
          const foundArticle = articles.find(a => a.id === article.id);
          const total = acc.total + (foundArticle.price * article.quantity);
          const totalWithTax = acc.totalWithTax +
            (foundArticle.price * article.quantity * (1 + foundArticle.taxPercentage / 100));
          return { total, totalWithTax };
        }, { total: 0, totalWithTax: 0 });

        return (
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
            
            <div style={{ marginTop: 10 }}>
              <h4 className='half-left'>{t('orders.total')} {formatPrice(total)}</h4>
              <h4 className='half-right'>{t('orders.totalTax')} {formatPrice(totalWithTax)}</h4>
            </div>
          </li>
        );
      })}
    </ul>
  );
}