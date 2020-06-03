import moment from 'moment';

class Review {
  constructor(
    id,
    sellerUserId,
    orderBuyerId,
    review,
    date,
    reviewOrderId,
  ) {
    this.id = id;
    this.sellerUserId = sellerUserId;
    this.orderBuyerId = orderBuyerId;
    this.review = review;
    this.date = date;
    this.reviewOrderId = reviewOrderId;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
};

export default Review;