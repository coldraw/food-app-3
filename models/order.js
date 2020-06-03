import moment from 'moment';

class Order {
  constructor(
    id, 
    items, 
    totalAmount,
    date,
    orderSellerId,
    isPaid,
    deliveryStatus,
    orderBuyerId,
  ) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
    this.orderSellerId = orderSellerId;
    this.isPaid = isPaid;
    this.deliveryStatus = deliveryStatus;
    this.orderBuyerId = orderBuyerId;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');    
  }
}

export default Order;