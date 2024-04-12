import { useContext } from 'react';
import { useParams, Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../../context/inventory';
import { SCREENS } from '../../constants/router';
import { OrdersForm } from '../../components/OrdersForm';

export const OrderItemScreen = () => {
  const { t } = useTranslation();
  const params = useParams();

  const { orders } = useContext(InventoryContext);
  const currentOrder = orders.find(order => order.id === params.id);
  const isNewOrder = !currentOrder && params.id === 'new';

  const screenTitle =
    isNewOrder
      ? t('orders.title.new')
      : currentOrder
        ? t(`screens.${SCREENS.ORDER_ITEM.NAME}`)
        : t('orders.title.notFound');

  return (
    <div className='screen'>
      <Link to={SCREENS.ORDERS.PATH}>
        {`${t('navigation.backTo')} ${t(`screens.${SCREENS.ORDERS.NAME}`)}`}
      </Link>

      <h2>{screenTitle}</h2>
      {(isNewOrder || currentOrder) &&
        <OrdersForm
          currentOrder={currentOrder}
          isNewOrder={isNewOrder}
        />
      }
    </div>
  );
}