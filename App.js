import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './src/navigation/ShopNavigator';
import productsReducer from './src/store/reducers/products'

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
