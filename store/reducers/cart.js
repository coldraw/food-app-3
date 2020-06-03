import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';
import CartItem from '../../models/cart-item';
import { ToastAndroid, Alert, Platform } from 'react-native';

const initialState = {
  items: {},
  totalAmount: 0,
  cartSellerId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const prodSeller = addedProduct.sellerId;
      const prodMinOrder = addedProduct.minOrder;
const msg = "Added to cart"

      function notifyMessage(msg: string) {
        if (Platform.OS === 'android') {
                  ToastAndroid.showWithGravity(`added to cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          Alert.alert("added to cart");
        }
      };

      let updatedOrNewCartItem;

      if (state.totalAmount === 0) {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          prodSeller,
          prodMinOrder
        );
        state.cartSellerId = prodSeller;
        notifyMessage();
      } else if (state.items[addedProduct.id]) {
        // cart not empty, already in cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].subTotal + prodPrice,
          prodSeller,
          prodMinOrder,
        );
        state.cartSellerId = prodSeller;
        notifyMessage();
      } else if (!state.items[addedProduct.id] && addedProduct.sellerId === state.cartSellerId) {
        // not in cart, same seller
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          prodSeller,
          prodMinOrder
        );
        state.cartSellerId = state.cartSellerId;
        notifyMessage();
      } else {
        Alert.alert('Please order from one yumchef at a time!', 'Go to "cart" and save or remove current order first', [{ text: 'OK' }]);
        return {
          ...state
        }
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
        cartSellerId: state.cartSellerId,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        //need to reduce, not erase
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.subTotal - selectedCartItem.productPrice,
          selectedCartItem.productSeller,
          selectedCartItem.productMinOrder,
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].subTotal
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      }
  }
  return state;
};