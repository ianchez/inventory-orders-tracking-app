import { Link } from 'react-router-dom';
import { SCREENS } from '../../constants/router';
import { OrdersList } from "../../components/OrdersList";

export const OrdersScreen = () => {
  return (
    <div className='screen'>
        <Link to={SCREENS.HOME.PATH} className='link'>Back to {SCREENS.HOME.NAME}</Link>

        <h2>{SCREENS.ORDERS.NAME}</h2>
        <OrdersList />
    </div>
  );
}