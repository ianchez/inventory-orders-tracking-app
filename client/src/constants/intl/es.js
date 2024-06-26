const esDictionary = {
  articles: {
    add: 'Agregar Nuevo Artículo',
    button: {
      create: 'CREAR ARTÍCULO',
      update: 'ACTUALIZAR ARTÍCULO',
    },
    create: 'Crear un Nuevo Artículo',
    pleaseFill: 'Por favor complete el artículo vacío',
    itemLabel: {
      id: 'ID:',
      name: 'Nombre:',
      price: 'Precio:',
      unitPrice: 'Precio Unidad:',
      tax: 'Impuesto aplicable:',
      description: 'Descripción:',
    },
    formError: {
      negativeQuantity: 'La cantidad no puede ser negativa',
      negativeID: 'El ID no puede ser negativo',
      notFound: 'Article not found',
    },
    formLabel: {
      id: 'ID Artículo:',
      description: 'Descripción:',
      name: 'Nombre:',
      price: 'Precio:',
      quantity: 'Cantidad:',
      taxPercentage: '% de Impuesto Aplicable:',
    },
    subtitle: {
      missingDetails: 'Ingresa los detalles faltantes del artículo:',
      details: 'Ingresa los detalles del artículo:',
    },
    title: {
      new: 'Nuevo Artículo',
      notFound: 'Artículo No Encontrado',
      singular: 'Artículo',
    },
  },
  error: {
    title: 'Ups!',
    message: 'Disculpanos, ha ocurrido un error inesperado.',
  },
  home: {
    title: 'Inventario',
    cards: {
      articles: 'Artículos',
      orders: 'Pedidos',
      totalLabel: 'Total:',
    },
  },
  orders: {
    button: {
      create: 'CREAR PEDIDO',
      createNew: 'Crear Nuevo Pedido',
      update: 'ACTUALIZAR PEDIDO',
    },
    formError: {
      alreadyContainsArticle: 'El pedido ya contiene este artículo',
      articleNotFound: 'Artículo no encontrado',
    },
    itemLabel: {
      articles: 'Artículos:',
      articleID: 'ID Artículo:',
      id: 'ID:',
      quantity: 'Cantidad:',
    },
    new: 'Nuevo Pedido',
    subtitle: {
      id: 'ID:',
      articles: 'Artículos:',
    },
    title: {
      new: 'Nuevo Pedido',
      notFound: 'Pedido No Encontrado',
    },
    total: 'Total Pedido:',
    totalTax: 'Total con Impuesto:',
  },
  navigation: {
    backTo: 'Volver a',
  },
  screens: {
    Home: 'Inicio',
    Articles: 'Artículos',
    Orders: 'Pedidos',
    'Article Item': 'Artículo',
    'Order Item': 'Pedido',
  },
};

export default esDictionary;
