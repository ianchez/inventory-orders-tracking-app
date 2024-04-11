import ApiService from '../adapters/secondary/ApiService';
import Article from './models/Article';
import Order from './models/Order';

export const fetchArticles = async () => {
  const articles = await ApiService.getArticles();
  return articles?.map(article =>
    new Article({
      id: article.id,
      name: article.name,
      description: article.description,
      price: article.price,
      taxPercentage: article.taxPercentage
    })) ?? [];
};

export const fetchOrders = async () => {
  const orders = await ApiService.getOrders();
  return orders?.map(order =>
    new Order({
      id: order.id,
      articles: order.articles,
    })) ?? [];
};

export const createArticle = async (newArticleData) => {
  const articles = await fetchArticles();
  const articlesIds = articles
    .map(article => parseInt(article.id))
    .filter(id => !isNaN(id));

  const newId = articles.length > 0
    ? Math.max(...articlesIds) + 1
    : 1;

  const newArticle = {
    ...newArticleData,
    id: newId.toString(),
    price: parseFloat(newArticleData.price),
    taxPercentage: parseFloat(newArticleData.taxPercentage),
  };

  const response = await ApiService.createArticle(newArticle);
  return new Article(response);
};

export const createOrder = async (newOrderData) => {
  const newOrder = await ApiService.createOrder(newOrderData);
  return new Order(newOrder);
};

export const updateArticle = async (articleData) => {
  articleData.price = parseFloat(articleData.price);
  articleData.taxPercentage = parseFloat(articleData.taxPercentage);
  const response = await ApiService.updateArticle(articleData);
  return new Article(response);
};

export const updateOrder = async (orderData) => {
  orderData.articles = orderData.articles.map(article => {
    article.quantity = parseFloat(article.quantity);
    return article;
  });
  const response = await ApiService.updateOrder(orderData);
  return new Order(response);
};