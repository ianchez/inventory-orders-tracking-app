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

export const addArticle = async (name, quantity) => {
  try {
    const newArticle = await ApiService.createArticle({ name, quantity });
    return new Article(newArticle.id, newArticle.name, newArticle.quantity);
  } catch (error) {
    console.error("Failed to add article:", error);
  }
};

export const updateArticle = async (articleData) =>
  await ApiService.updateArticle(articleData);

export const updateOrder = async (orderData) => 
  await ApiService.updateOrder(orderData);