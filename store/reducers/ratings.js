import { ADD_RATING, SET_RATINGS } from '../actions/ratings';
import Rating from '../../models/rating';

const initialState = {
  ratings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RATINGS:
      return {
        ratings: action.ratings
      }

    case ADD_RATING:
      const newRating = new Rating(
        action.ratingData.id,
        action.ratingData.sellerUserId,
        action.ratingData.buyerId,
        action.ratingData.rating,
        action.ratingData.date,
        action.ratingData.ratingOrderId
      );
      return {
        ...state,
        ratings: state.ratings.concat(newRating)
      };
  }
  return state;
};