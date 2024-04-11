import { useNavigate  } from "react-router-dom";

import { useArticles } from "../adapters/primary/useArticles";
import { useOrders } from "../adapters/primary/useOrders";
import { SCREENS } from "../constants/router";

export const HomeScreen = () => {
  const navigate = useNavigate();

  const { length: articlesCount } = useArticles();
  const { length: ordersCount } = useOrders();

  return (
    <div className='screen'>
        <h1>Inventory</h1>

        <div className='card pressable' onClick={() => navigate(SCREENS.ARTICLES.PATH)}>
          <h3>Articles</h3>
          <p>Total: {articlesCount}</p>
        </div>
        <div className='card pressable' onClick={() => navigate(SCREENS.ORDERS.PATH)}>
          <h3>Orders</h3>
          <p>Total: {ordersCount}</p>
        </div>
    </div>
  );
}