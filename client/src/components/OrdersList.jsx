import { useOrders } from '../adapters/primary/useOrders';

export const OrdersList = () => {
  const { orders } = useOrders();

  return (
    <ul>
      {orders.map(order => (
        <li key={order.id} className='pressable'>
          <h4>ID: {order.id}</h4>
          <p>Articles:</p>
          <ul>
            {order.articles.map(article => (
              <li key={article.id} >
                ID: {article.id}<br />
                Quantity: {article.quantity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}