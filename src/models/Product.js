class Product {
  constructor(
    id,
    title,
    imageUrl,
    description,
    price,
    category,
    owner,
    short_title,
  ) {
    this.id = id;
    this.owner = owner;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.short_title = short_title;
  }
}

export default Product;
