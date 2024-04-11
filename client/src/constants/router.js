// screens
import { HomeScreen } from '../screens/HomeScreen';
import { ErrorScreen } from '../screens/ErrorScreen';
import { ArticlesScreen } from '../screens/articles/ArticlesScreen';
import { ArticleItemScreen } from "../screens/articles/ArticleItemScreen";
import { OrdersScreen } from '../screens/orders/OrdersScreen';
import { OrderItemScreen } from "../screens/orders/OrderItemScreen";

export const SCREENS = {
  HOME: {
    PATH: '/',
    NAME: 'Home',
  },
  ARTICLES: {
    PATH: '/articles',
    NAME: 'Articles',
  },
  ARTICLE_ITEM: {
    PATH: '/articles/:id',
    NAME: 'Article Item',
  },
  ORDERS: {
    PATH: '/orders',
    NAME: 'Orders',
  },
  ORDER_ITEM: {
    PATH: '/orders/:id',
    NAME: 'Order Item',
  },
};

export const routeBuilder = {
  ARTICLE: (id = "") => SCREENS.ARTICLE_ITEM.PATH.replace(':id', id),
  ORDER: (id = "") => SCREENS.ORDER_ITEM.PATH.replace(':id', id),
};

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
