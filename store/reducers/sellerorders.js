import { SET_SELLER_ORDERS, UPDATE_ORDER_STATUS } from '../actions/sellerorders';
import Order from '../../models/order';

const initialState = {
  sellerOrders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELLER_ORDERS:
      return {
        sellerOrders: action.sellerOrders
      }

    case UPDATE_ORDER_STATUS:
      const sellerOrderIndex = state.sellerOrders.findIndex(
        sellerOrder => sellerOrder.id === action.soid
      );
      const updatedSellerOrder = new Order(
        action.soid,
        state.sellerOrders[sellerOrderIndex].items,
        state.sellerOrders[sellerOrderIndex].amount,
        state.sellerOrders[sellerOrderIndex].date,
        state.sellerOrders[sellerOrderIndex].cartSellerId,
        state.sellerOrders[sellerOrderIndex].isPaid,
        action.sellerOrderData.deliveryStatus,
        state.sellerOrders[sellerOrderIndex].orderBuyerId,
      );
      const updatedSellerOrderIndex = state.sellerOrders.findIndex(
        sellerOrder => sellerOrder.id === action.soid
      );
      const updatedSellerOrders = [...state.sellerOrders];
      updatedSellerOrders[updatedSellerOrderIndex] = updatedSellerOrder;
      return {
        ...state,
        sellerOrders: updatedSellerOrders
      };
  }
  return state;
};