import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SCREENS } from '../../constants/router';
import { OrdersList } from "../../components/OrdersList";
import { routeBuilder } from '../../constants/router';

export const OrdersScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='screen'>
        <Link to={SCREENS.HOME.PATH}>
          {`${t('navigation.backTo')} ${t(`screens.${SCREENS.HOME.NAME}`)}`}
        </Link>

        <button
          className='primary w80'
          style={{ marginTop: "2vw" }}
          onClick={() => navigate(routeBuilder.NEW_ORDER())}
        >
          {t('orders.button.createNew')}
        </button>

        <h2>{t(`screens.${SCREENS.ORDERS.NAME}`)}</h2>
        <OrdersList />
    </div>
  );
}