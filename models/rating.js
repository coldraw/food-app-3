import moment from 'moment';

class Rating {
  constructor(
    id,
    sellerUserId,
    buyerId,
    rating,
    date,
    ratingOrderId,
  ) {
    this.id = id;
    this.sellerUserId = sellerUserId;
    this.buyerId = buyerId;
    this.rating = rating;
    this.date = date;
    this.ratingOrderId = ratingOrderId;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
};

export default Rating;