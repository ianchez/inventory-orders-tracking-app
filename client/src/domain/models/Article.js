export default class Article {
  constructor({id = "", name = "", description = "", price = 0, taxPercentage = 0}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.taxPercentage = taxPercentage;
  }
}