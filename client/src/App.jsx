import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// styles
import './App.css';

// constants
import { SCREENS } from './constants/router';

// screens
import { HomeScreen } from './screens/HomeScreen';
import { ErrorScreen } from './screens/ErrorScreen';
import { ArticlesScreen } from './screens/ArticlesScreen';
import { OrdersScreen } from './screens/OrdersScreen';


const router = createBrowserRouter([
  {
    path: SCREENS.HOME,
    element: <HomeScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: SCREENS.ARTICLES,
    element: <ArticlesScreen />,
  },
  {
    path: SCREENS.ORDERS,
    element: <OrdersScreen />,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
