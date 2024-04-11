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
  NEW_ARTICLE: () => SCREENS.ARTICLES.PATH + '/new',
  NEW_ORDER: () => SCREENS.ORDERS.PATH + '/new',
};
