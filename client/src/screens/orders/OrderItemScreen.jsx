import { useParams, Link } from 'react-router-dom';
import { SCREENS } from '../../constants/router';

export const OrderItemScreen = () => {
  const params = useParams();

  return (
    <div className='screen'>
      <Link to={SCREENS.ORDERS.PATH}>Back to {SCREENS.ORDERS.NAME}</Link>

      <h2>{SCREENS.ORDER_ITEM.NAME}</h2>
      <h4>Order ID: {params.id}</h4>

      <p className='subtitle w80'>Items:</p>
      <ul>
        <li>Item 1 | Quantity: 1</li>
        <li>Item 2 | Quantity: 2</li>
      </ul>
    </div>
  );
}