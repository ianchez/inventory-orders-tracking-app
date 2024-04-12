import { Link, useNavigate } from 'react-router-dom';
import { SCREENS } from '../../constants/router';
import { OrdersList } from "../../components/OrdersList";
import { routeBuilder } from '../../constants/router';

export const OrdersScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='screen'>
        <Link
          className='link'
          to={SCREENS.HOME.PATH}
        >
          Back to {SCREENS.HOME.NAME}
        </Link>

        <button
          className='primary w80'
          style={{ marginTop: "2vw" }}
          onClick={() => navigate(routeBuilder.NEW_ORDER())}
        >
          Create New Order
        </button>

        <h2>{SCREENS.ORDERS.NAME}</h2>
        <OrdersList />
    </div>
  );
}