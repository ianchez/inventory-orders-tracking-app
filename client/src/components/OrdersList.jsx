import { useOrders } from '../adapters/primary/useOrders';

export const OrdersList = () => {
  const { orders } = useOrders();

  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          <h3>Order {order.id}</h3>
          <ul>
            {order.articles.map(article => (
              <li key={article.id}>
                {article.id} x {article.quantity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}