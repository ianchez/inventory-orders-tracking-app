import { Link } from 'react-router-dom';
import { SCREENS } from '../constants/router';
import { OrdersList } from "../components/OrdersList";

export const OrdersScreen = () => {
  return (
    <div className='screen'>
        <Link to={SCREENS.HOME} className='link'>Back to Home</Link>

        <h2>Orders</h2>
        <OrdersList />
    </div>
  );
}