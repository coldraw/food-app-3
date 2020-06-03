import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.sellerId,
        action.productData.title,
        action.productData.description,
        action.productData.price,
        action.productData.minOrder,
        action.productData.isMeatProduct,
        action.productData.isGlutenFreeProduct,
        action.productData.isVegetarianProduct,
        action.productData.prepTime,
        action.productData.imageString,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.availableProducts[productIndex].sellerId,
        action.productData.title,
        action.productData.description,
        state.availableProducts[productIndex].price,
        action.productData.minOrder,
        action.productData.isMeatProduct,
        action.productData.isGlutenFreeProduct,
        action.productData.isVegetarianProduct,
        action.productData.prepTime,
        action.productData.imageString,
      );
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
  }
  return state;
};