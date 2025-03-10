import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
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
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
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
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    let isPaid = false;
    let deliveryStatus = '';
    const date = new Date();
    const orderSellerId = getState().cart.cartSellerId;
    const orderBuyerId = userId;


    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/orders.json?auth=${token}`,
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
          orderSellerId,
          isPaid,
          deliveryStatus,
          orderBuyerId,
        })
      });
    if (!response.ok) {
      throw new Error('Something went wrong (order data)!')
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
        cartSellerId: orderSellerId,
        isPaid: isPaid,
        deliveryStatus: deliveryStatus,
        orderBuyerId: orderBuyerId,
      }
    });
  };
};
