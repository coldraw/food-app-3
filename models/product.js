class Product {
  constructor(
    id,
    sellerId,
    title,
    description,
    price,
    minOrder,
    isMeatProduct,
    isGlutenFreeProduct,
    isVegetarianProduct,
    prepTime,
    imageString,
  ) {
    this.id = id;
    this.sellerId = sellerId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.minOrder = minOrder;
    this.isMeatProduct = isMeatProduct;
    this.isGlutenFreeProduct = isGlutenFreeProduct;
    this.isVegetarianProduct = isVegetarianProduct;
    this.prepTime = prepTime;
    this.imageString = imageString;
  }
};

export default Product;