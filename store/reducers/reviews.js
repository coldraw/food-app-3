import { ADD_REVIEW, SET_REVIEWS } from '../actions/reviews';
import Review from '../../models/review';

const initialState = {
  reviews: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        reviews: action.reviews
      }

    case ADD_REVIEW:
      const newReview = new Review(
        action.reviewData.id,
        action.reviewData.sellerUserId,
        action.reviewData.orderBuyerId,
        action.reviewData.review,
        action.reviewData.date,
        action.reviewData.reviewOrderId
      );
      return {
        ...state,
        reviews: state.reviews.concat(newReview)
      };
  }
  return state;
};