const API_BASE_URL = 'http://localhost:5000';

const ApiService = {
  async getArticles() {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`);
      return response.json();
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  },

  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      return response.json();
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  },

  async createArticle(articleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      return response.json();
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  },

  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      return response.json();
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  }
};

export default ApiService;