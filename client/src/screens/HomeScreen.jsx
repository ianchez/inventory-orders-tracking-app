import { useNavigate  } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { useArticles } from "../adapters/primary/useArticles";
import { useOrders } from "../adapters/primary/useOrders";
import { SCREENS } from "../constants/router";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { length: articlesCount } = useArticles();
  const { length: ordersCount } = useOrders();

  return (
    <div className='screen'>
        <h1>{t('home.title')}</h1>

        <div className='card pressable' onClick={() => navigate(SCREENS.ARTICLES.PATH)}>
          <h3>{t('home.cards.articles')}</h3>
          <p>{t('home.cards.totalLabel')} {articlesCount}</p>
        </div>
        <div className='card pressable' onClick={() => navigate(SCREENS.ORDERS.PATH)}>
          <h3>{t('home.cards.orders')}</h3>
          <p>{t('home.cards.totalLabel')} {ordersCount}</p>
        </div>
    </div>
  );
}