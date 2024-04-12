const enDictionary = {
  articles: {
    add: 'Add New Article',
    button: {
      create: 'CREATE ARTICLE',
      update: 'UPDATE ARTICLE',
    },
    create: 'Create New Article',
    pleaseFill: 'Please fill the empty article',
    itemLabel: {
      id: 'ID:',
      name: 'Name:',
      price: 'Price:',
      unitPrice: 'Unit Price:',
      tax: 'Tax:',
      description: 'Description:',
    },
    formError: {
      negativeQuantity: 'Quantity cannot be negative',
      negativeID: 'ID cannot be negative',
      notFound: 'Article not found',
    },
    formLabel: {
      id: 'Article ID:',
      description: 'Description:',
      name: 'Name:',
      price: 'Price:',
      quantity: 'Quantity:',
      taxPercentage: 'Tax %:',
    },
    subtitle: {
      missingDetails: 'Enter the missing details of the article:',
      details: 'Enter the details of the article:',
    },
    title: {
      new: 'New Article',
      notFound: 'Article Not Found',
      singular: 'Article',
    },
  },
  error: {
    title: 'Oops!',
    message: 'Sorry, an unexpected error has occurred.',
  },
  home: {
    title: 'Inventory',
    cards: {
      articles: 'Articles',
      orders: 'Orders',
      totalLabel: 'Total:',
    },
  },
  orders: {
    button: {
      create: 'CREATE ORDER',
      createNew: 'Create New Order',
      update: 'UPDATE ORDER',
    },
    formError: {
      alreadyContainsArticle: 'Order already contains the article',
      articleNotFound: 'Article not found',
    },
    itemLabel: {
      articles: 'Articles:',
      articleID: 'Article ID:',
      id: 'ID:',
      quantity: 'Quantity:',
    },

    new: 'New Order',
    subtitle: {
      id: 'ID:',
      articles: 'Articles:',
    },
    title: {
      new: 'New Order',
      notFound: 'Order Not Found',
    },
    total: 'Order Total:',
  },
  navigation: {
    backTo: 'Back to',
  },
  screens: {
    Home: 'Home',
    Articles: 'Articles',
    Orders: 'Orders',
    'Article Item': 'Article Item',
    'Order Item': 'Order Item',
  },
};

export default enDictionary;
