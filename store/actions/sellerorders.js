import Order from '../../models/order';

export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const SET_SELLER_ORDERS = 'SET_SELLER_ORDERS';

export const fetchSellerOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://yum-lo-1.firebaseio.com/orders.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong with data retrieval!');
      }

      const resData = await response.json();
      const loadedSellerOrders = [];

      for (const key in resData) {
        loadedSellerOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
            resData[key].orderSellerId,
            resData[key].isPaid,
            resData[key].deliveryStatus,
            resData[key].orderBuyerId,
          )
        );
      };
      dispatch({ type: SET_SELLER_ORDERS, sellerOrders: loadedSellerOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const updateOrderStatus = (id, deliveryStatus) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/orders/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deliveryStatus,
        })
      }
    );

    if (!response.ok) {
      throw new Error('ERROR! UPDATE ORDER STATUS NOT WORKING');
    };

    dispatch({
      type: UPDATE_ORDER_STATUS,
      soid: id,
      sellerOrderData: {
        deliveryStatus: deliveryStatus,
      }
    });
  }
}