import { useContext } from "react";
import { useNavigate  } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { InventoryContext } from "../context/inventory";
import { SCREENS } from "../constants/router";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { articles, orders } = useContext(InventoryContext);

  return (
    <div className='screen'>
      <h1>{t('home.title')}</h1>

      <div className='card pressable' onClick={() => navigate(SCREENS.ARTICLES.PATH)}>
        <h3>{t('home.cards.articles')}</h3>
        <p>{t('home.cards.totalLabel')} {articles?.length || 0}</p>
      </div>
      <div className='card pressable' onClick={() => navigate(SCREENS.ORDERS.PATH)}>
        <h3>{t('home.cards.orders')}</h3>
        <p>{t('home.cards.totalLabel')} {orders?.length || 0}</p>
      </div>
    </div>
  );
}