import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension'; // JUST FOR REDUX DEBUG
import ReduxThunk from 'redux-thunk';

import sellersReducer from './store/reducers/sellers';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import sellerOrdersReducer from './store/reducers/sellerorders';
import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';
import ratingsReducer from './store/reducers/ratings';
import reviewsReducer from './store/reducers/reviews';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  sellers: sellersReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  sellerOrders: sellerOrdersReducer,
  auth: authReducer,
  users: usersReducer,
  ratings: ratingsReducer,
  reviews: reviewsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk)),
  // composeWithDevTools()); //compose...  JUST FOR REDUX DEBUG
);

const fetchFonts = () => {
  return Font.loadAsync({
    'gloria-hallelujah': require('./assets/fonts/GloriaHallelujah-Regular.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true);
    }}
    />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

