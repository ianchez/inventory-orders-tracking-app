// screens
import { HomeScreen } from './screens/HomeScreen';
import { ErrorScreen } from './screens/ErrorScreen';
import { ArticlesScreen } from './screens/articles/ArticlesScreen';
import { ArticleItemScreen } from "./screens/articles/ArticleItemScreen";
import { OrdersScreen } from './screens/orders/OrdersScreen';
import { OrderItemScreen } from "./screens/orders/OrderItemScreen";

import { SCREENS } from './constants/router';

export const ROUTES = [
  {
    path: SCREENS.HOME.PATH,
    element: <HomeScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: SCREENS.ARTICLES.PATH,
    element: <ArticlesScreen />,
  },
  {
    path: SCREENS.ARTICLE_ITEM.PATH,
    element: <ArticleItemScreen />,
  },
  {
    path: SCREENS.ORDERS.PATH,
    element: <OrdersScreen />,
  },
  {
    path: SCREENS.ORDER_ITEM.PATH,
    element: <OrderItemScreen />,
  },
];