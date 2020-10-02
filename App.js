import 'react-native-gesture-handler';

import React from 'react';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './src/navigation/ShopNavigator';
import productsReducer from './src/store/reducers/products';
import authReducer from './src/store/reducers/auth';
import cartReducer from './src/store/reducers/cart';
import orderReducer from './src/store/reducers/orders';
import favReducer from './src/store/reducers/favorites';

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: orderReducer,
  fav: favReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk)),
);

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
