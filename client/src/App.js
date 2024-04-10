import './App.css';
import { useArticles } from './adapters/primary/useArticles';
import { useOrders } from './adapters/primary/useOrders';

function App() {
  const { length: articlesCount } = useArticles();
  const { length: ordersCount } = useOrders();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory</h1>

        <div className='card'>
          <h3>Articles</h3>
          <p>Total: {articlesCount}</p>
        </div>
        <div className='card'>
          <h3>Orders</h3>
          <p>Total: {articlesCount}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
