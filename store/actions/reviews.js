import Review from '../../models/review';

export const ADD_REVIEW = 'ADD_REVIEW';
export const SET_REVIEWS = 'SET_REVIEWS';

export const fetchReviews = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/reviews.json?auth=${token}`
    );

    const resData = await response.json();
    const loadedReviews = [];

    for (const key in resData) {
      loadedReviews.push(
        new Review(
          key,
          resData[key].sellerUserId,
          resData[key].orderBuyerId,
          resData[key].review,
          new Date(resData[key].date),
          resData[key].reviewOrderId,
        )
      );
    };
    dispatch({ type: SET_REVIEWS, reviews: loadedReviews });
    console.log('Reviews Loaded');
  }
};

export const addReview = (sellerUserId, review, reviewOrderId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const orderBuyerId = userId;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/reviews.json?auth=${token}`,
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sellerUserId,
          orderBuyerId,
          review,
          date: date.toISOString(),
          reviewOrderId
        })
      });

    const resData = await response.json();

    dispatch({
      type: ADD_REVIEW,
      reviewData: {
        id: resData.name,
        sellerUserId: sellerUserId,
        orderBuyerId: orderBuyerId,
        review: review,
        date: date,
        reviewOrderId: reviewOrderId,
      }
    });
  };
};
