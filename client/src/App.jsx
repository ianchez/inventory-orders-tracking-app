import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// styles
import './App.css';

// screens
import { HomeScreen } from './screens/HomeScreen';
import { ErrorScreen } from './screens/ErrorScreen';
import { ArticlesScreen } from './screens/ArticlesScreen';
import { OrdersScreen } from './screens/OrdersScreen';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/articles",
    element: <ArticlesScreen />,
  },
  {
    path: "/orders",
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
