class CartItem {
  constructor(
    quantity,
    productPrice,
    productTitle,
    subTotal,
    productSeller,
    productMinOrder,
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.subTotal = subTotal;
    this.productSeller = productSeller;
    this.productMinOrder = productMinOrder;
  }
}

export default CartItem;