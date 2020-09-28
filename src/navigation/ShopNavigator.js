import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import CartScreen from '../screens/shop/CartScreen';
import CategoryProducts from '../screens/shop/CategoryProducts';
import FavoritesScreen from '../screens/shop/FavoritesScreen';
import HomeScreen from '../screens/shop/HomeScreen';
import PlaceOrderScreen from '../screens/shop/PlaceOrderScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const ShopNavigator = (props) => {
  return <NavigationContainer></NavigationContainer>;
};

export default ShopNavigator;
