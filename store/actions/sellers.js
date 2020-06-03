import Seller from '../../models/seller';

export const DELETE_SELLER = 'DELETE_SELLER';
export const CREATE_SELLER = 'CREATE_SELLER';
export const UPDATE_SELLER = 'UPDATE_SELLER';
export const SET_SELLERS = 'SET_SELLERS';

export const fetchSellers = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://yum-lo-1.firebaseio.com/sellers.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong with SELLER retrieval!');
      }

      const resData = await response.json();
      const loadedSellers = [];

      for (const key in resData) {
        loadedSellers.push(
          new Seller(
            key,
            resData[key].sellerUserId,
            resData[key].menuName,
            resData[key].imageUrl,
            resData[key].slogan,
            resData[key].imageString,
          )
        );
      }

      dispatch({ type: SET_SELLERS, sellers: loadedSellers })
      console.log('Sellers loaded');
    } catch (err) {
      // eg. send to analytics server
      throw err;
    }
  };
};

export const deleteSeller = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/sellers/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong deleting the seller');
    };
    dispatch({ type: DELETE_SELLER, sid });
  }
};

export const createSeller = (menuName, imageUrl, slogan, image) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const sellerUserId = getState().auth.userId;
    const imageString = image;

    // DISPATCH TO FIREBASE

    const response = await fetch(`https://yum-lo-1.firebaseio.com/sellers.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sellerUserId,
          menuName,
          imageUrl,
          slogan,
          imageString
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_SELLER,
      sellerData: {
        id,
        sellerUserId,
        menuName,
        imageUrl,
        slogan,
        imageString
      }
    });
    console.log('seller CREATED!');
  }
};

// UPDATE SELLER

export const updateSeller = (id, menuName, imageUrl, slogan, image) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const sellerUserId = getState().auth.userId;
    const imageString = image;

    // DISPATCH TO FIREBASE

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/sellers/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          menuName,
          imageUrl,
          slogan,
          imageString
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong! update seller NOT WORKING');
    };

    const resData = await response.json();

    dispatch({
      type: UPDATE_SELLER,
      sid: id,
      sellerData: {
        menuName,
        imageUrl,
        slogan,
        imageString: imageString,
      }
    });
    console.log(sellerUserId, 'has updated seller account');
  };
};
