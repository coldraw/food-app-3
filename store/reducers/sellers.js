import { DELETE_SELLER, CREATE_SELLER, UPDATE_SELLER, SET_SELLERS } from '../actions/sellers';
import Seller from '../../models/seller';

const initialState = {
  availableSellers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELLERS:
      return {
        availableSellers: action.sellers,
      };

    case CREATE_SELLER:
      const newSeller = new Seller(
        action.sellerData.id,
        action.sellerData.sellerUserId,
        action.sellerData.menuName,
        action.sellerData.imageUrl,
        action.sellerData.slogan,
        action.sellerData.imageString,
      );
      return {
        ...state,
        availableSellers: state.availableSellers.concat(newSeller),
      };

    case UPDATE_SELLER:
      const sellerIndex = state.availableSellers.findIndex(
        seller => seller.id === action.sid
      );
      const updatedSeller = new Seller(
        action.sid,
        state.availableSellers[sellerIndex].sellerUserId,
        action.sellerData.menuName,
        action.sellerData.imageUrl,
        action.sellerData.slogan,
        action.sellerData.imageString,
      );
      const availableSellerIndex = state.availableSellers.findIndex(
        seller => seller.id === action.sid
      );
      const updatedAvailableSellers = [...state.availableSellers];
      updatedAvailableSellers[availableSellerIndex] = updatedSeller;
      return {
        ...state,
        availableSellers: updatedAvailableSellers
      }

    case DELETE_SELLER:
      return {
        ...state,
        availableSellers: state.availableSellers.filter(
          seller => seller.id !== action.sid
        )
      };
  }
  return state;
};