class Product {
  constructor(id, title, imageUrl, description, price, category, owner) {
    this.id = id;
    this.owner = owner;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}

export default Product;
