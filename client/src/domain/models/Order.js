export default class Order {
  constructor({id = "", articles = []}) {
    this.id = id;
    this.articles = articles;
  }
}