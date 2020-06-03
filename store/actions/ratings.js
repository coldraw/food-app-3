import Rating from '../../models/rating';

export const ADD_RATING = 'ADD_RATING';
export const SET_RATINGS = 'SET_RATINGS';

export const fetchRatings = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/ratings.json?auth=${token}`
    );

    const resData = await response.json();
    const loadedRatings = [];

    for (const key in resData) {
      loadedRatings.push(
        new Rating(
          key,
          resData[key].sellerUserId,
          resData[key].buyerId,
          resData[key].rating,
          new Date(resData[key].date),
          resData[key].ratingOrderId,
        )
      );
    };
    dispatch({ type: SET_RATINGS, ratings: loadedRatings });
    console.log('Ratings Loaded');
  }
};

export const addRating = (sellerUserId, rating, ratingOrderId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const orderBuyerId = userId;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/ratings.json?auth=${token}`,
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sellerUserId,
          orderBuyerId,
          rating,
          date: date.toISOString(),
          ratingOrderId
        })
      });

    const resData = await response.json();

    dispatch({
      type: ADD_RATING,
      ratingData: {
        id: resData.name,
        sellerUserId: sellerUserId,
        buyerId: orderBuyerId,
        rating: rating,
        date: date,
        ratingOrderId: ratingOrderId,
      }
    });
  };
};
